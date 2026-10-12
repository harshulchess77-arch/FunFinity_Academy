import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@/types/database";
import { getUserFriendlyError } from "@/lib/error-handler";
import { isAdminEmail } from "@/lib/constants";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: string | null;
  signUp: (email: string, password: string, name: string, role: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fetchUserRole = async (userId: string, email?: string) => {
  // Direct admin check for whitelisted emails
  if (email && isAdminEmail(email)) {
    return "admin";
  }

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      // If profile doesn't exist, default to student
      if (error.code === 'PGRST116') {
        return "student";
      }
      return "student";
    }

    if (profile && profile.role) {
      return profile.role;
    }

    return "student";
  } catch (error) {
    return "student";
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // Check for existing Supabase session
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          if (session) {
            await loadCurrentUser(session.user);
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        if (session) {
          // Session exists - load user data
          await loadCurrentUser(session.user);
        } else {
          // Only clear user state if this is a SIGN_OUT event
          // This prevents automatic logout on token refresh or other auth events
          if (_event === 'SIGNED_OUT') {
            setUser(null);
            setRole(null);
          }
          // For other events (like TOKEN_REFRESHED), keep the user state
          setLoading(false);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loadCurrentUser = async (authUser: any) => {
    try {
      // Fetch role from profile first, admin email as fallback
      const userRole = await fetchUserRole(authUser.id, authUser.email);
      
      // Set user immediately
      setUser({
        id: authUser.id,
        email: authUser.email,
        display_name: authUser.user_metadata.display_name || authUser.email?.split('@')[0],
        role: userRole
      } as User);
      setRole(userRole);
      
      // Try to load profile in background (don't block)
      (async () => {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          if (profileError || !profile) {
            // Create profile if it doesn't exist
            await supabase
              .from('profiles')
              .insert({
                id: authUser.id,
                email: authUser.email,
                display_name: authUser.user_metadata.display_name || authUser.email?.split('@')[0],
                role: userRole
              });
          } else if (isAdminEmail(authUser.email) && profile.role !== 'admin') {
            // Sync admin email to admin role in profile
            await supabase
              .from('profiles')
              .update({ role: 'admin' })
              .eq('id', authUser.id);
          }
        } catch (err) {
          // Profile operations are non-blocking
        }
      })();
    } catch (error) {
      if (authUser) {
        const fallbackRole = isAdminEmail(authUser.email) ? 'admin' : 'student';
        setUser({
          id: authUser.id,
          email: authUser.email,
          display_name: authUser.user_metadata.display_name || authUser.email?.split('@')[0],
          role: fallbackRole
        } as User);
        setRole(fallbackRole);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, requestedRole: string) => {
    try {
      // Determine final role: admin email gets admin, otherwise respect requested role or default to student
      const isAdmin = isAdminEmail(email);
      const finalRole = isAdmin ? 'admin' : (requestedRole || 'student');
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
            role: finalRole
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Set user immediately
        setUser({
          id: data.user.id,
          email: email,
          display_name: name,
          role: finalRole
        } as User);
        setRole(finalRole);
        
        // Create profile in background (don't block)
        (async () => {
          try {
            await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                email: email,
                display_name: name,
                role: finalRole
              });
          } catch (err) {
            // Profile creation is non-blocking
          }
        })();
      }

      return { error: null };
    } catch (error: any) {
      const userError = getUserFriendlyError(error);
      return { error: { message: userError.message } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Fetch role from profile, admin email as fallback
        const role = await fetchUserRole(data.user.id, data.user.email);
        
        // Set user immediately without waiting for profile
        setUser({
          id: data.user.id,
          email: data.user.email,
          display_name: data.user.user_metadata.display_name || data.user.email?.split('@')[0],
          role: role
        } as User);
        
        setRole(role);
        
        // Try to create/update profile in background (don't block)
        (async () => {
          try {
            const { data: existingProfile, error: profileError } = await supabase
              .from('profiles')
              .select('id, role')
              .eq('id', data.user.id)
              .single();
            
            if (profileError || !existingProfile) {
              await supabase
                .from('profiles')
                .insert({
                  id: data.user.id,
                  email: data.user.email,
                  display_name: data.user.user_metadata.display_name || data.user.email?.split('@')[0],
                  role: role
                });
            } else if (isAdminEmail(data.user.email) && existingProfile.role !== 'admin') {
              await supabase
                .from('profiles')
                .update({ role: 'admin' })
                .eq('id', data.user.id);
            }
          } catch (err) {
            // Profile operations are non-blocking
          }
        })();
      }

      return { error: null };
    } catch (error: any) {
      const userError = getUserFriendlyError(error);
      return { error: { message: userError.message } };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      const userError = getUserFriendlyError(error);
      return { error: { message: userError.message } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    // Cookie-based authentication handles cleanup automatically
    // No localStorage cleanup needed (COPPA/GDPR compliant)
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, signUp, signIn, resetPassword, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
