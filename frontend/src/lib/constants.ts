// Shared constants for the application

export const ADMIN_EMAILS = [
  "funfinityacademy@gmail.com",
  "academyfunfinity@gmail.com"
] as const;

export const isAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) return false;
  const normalizedEmail = email.toLowerCase().trim();
  return ADMIN_EMAILS.includes(normalizedEmail as typeof ADMIN_EMAILS[number]);
};
