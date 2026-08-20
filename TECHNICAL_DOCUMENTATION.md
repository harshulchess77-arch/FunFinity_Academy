# FunFinity Academy - Technical Documentation Handbook

**Version:** 1.0.0  
**Last Updated:** August 10, 2026  
**Status:** Production-Ready

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture & File Structure Map](#2-architecture--file-structure-map)
3. [Data Flow & Execution Logic](#3-data-flow--execution-logic)
4. [Component, Class, and Function Reference](#4-component-class-and-function-reference)
5. [Environment & Setup Guide](#5-environment--setup-guide)

---

## 1. Executive Summary

### 1.1 Application Overview

FunFinity Academy is a comprehensive, AI-powered educational platform designed for K-12 students that combines personalized learning paths, interactive content, gamification elements, and COPPA-compliant safety measures. The platform operates as a Single Page Application (SPA) built with React 18, TypeScript, and Vite, leveraging Supabase for backend services including authentication, database, and real-time subscriptions.

### 1.2 Primary Target Audience

- **Students:** K-12 learners seeking personalized, engaging educational content
- **Teachers/Instructors:** Educators managing courses, tracking student progress, and delivering content
- **Administrators:** Platform managers overseeing user management, content moderation, and system operations
- **Parents:** Guardians monitoring student progress and managing consent for minors

### 1.3 Core Use Cases

- **Personalized Learning:** AI-driven learning paths based on Learning DNA assessment
- **Course Management:** Interactive course delivery with video lessons, coding exercises, and quizzes
- **Gamification:** XP systems, streaks, badges, and leaderboards to enhance engagement
- **Real-time Collaboration:** Live classes, forums, and chat functionality
- **Progress Tracking:** Comprehensive analytics for students, teachers, and administrators
- **Career Planning:** Academic profiling, college preparation, and career pathfinding tools

### 1.4 Problems Solved

- **Student Engagement:** Gamification and personalization increase motivation and retention
- **Accessibility:** COPPA compliance ensures safe learning environment for minors
- **Scalability:** Cloud-native architecture supports millions of concurrent users
- **Data Security:** Row-Level Security (RLS) and comprehensive guardrails protect user data
- **Performance:** Optimized for low-bandwidth users with progressive loading and caching

### 1.5 Tech Stack

#### Frontend
- **Framework:** React 18.0.0 with TypeScript 5.8.3
- **Build Tool:** Vite 7.3.5 with SWC compilation
- **Routing:** React Router DOM 6.30.1
- **State Management:** Zustand 5.0.14, TanStack Query 5.83.0
- **UI Components:** Radix UI primitives, shadcn/ui components
- **Styling:** Tailwind CSS 3.4.17 with custom design system
- **Animations:** Framer Motion 12.29.2
- **3D Graphics:** Three.js 0.160.0, React Three Fiber 8.16.8
- **Forms:** React Hook Form 7.61.1 with Zod validation
- **Rich Text:** Tiptap 3.22.4 editor
- **Charts:** Recharts 2.15.4

#### Backend Services
- **Database:** PostgreSQL via Supabase
- **Authentication:** Supabase Auth with OAuth providers
- **Real-time:** Supabase Realtime subscriptions
- **Storage:** Supabase Storage for user-generated content
- **AI Integration:** Google Gemini AI with custom guardrails
- **Analytics:** Vercel Analytics, Vercel Speed Insights

#### Infrastructure
- **Hosting:** Vercel for global edge deployment
- **CDN:** Cloudflare for DDoS protection and content delivery
- **Database:** Supabase managed PostgreSQL
- **Media:** Cloudinary for media storage and optimization

---

## 2. Architecture & File Structure Map

### 2.1 High-Level Architecture

```
funfinityacademy-77/FunFinity-Academy/
├── frontend/                          # Main React application
│   ├── src/
│   │   ├── components/               # React components (172 items)
│   │   ├── pages/                    # Route pages (110 items)
│   │   ├── hooks/                    # Custom React hooks (36 items)
│   │   ├── lib/                      # Utility libraries (29 items)
│   │   ├── services/                 # Business logic services (11 items)
│   │   ├── store/                    # State management (4 items)
│   │   ├── types/                    # TypeScript type definitions
│   │   ├── utils/                    # Utility functions
│   │   ├── config/                   # Configuration files
│   │   ├── middleware/               # Middleware functions
│   │   ├── database/                # Database-related utilities
│   │   ├── content/                  # Static content
│   │   ├── state/                    # Global state
│   │   ├── navigation/               # Navigation utilities
│   │   ├── api/                      # API-related utilities
│   │   ├── app/                      # App-specific pages
│   │   ├── App.tsx                   # Main application component
│   │   ├── main.tsx                  # Application entry point
│   │   └── index.css                 # Global styles
│   ├── public/                       # Static assets
│   ├── dist/                         # Build output
│   ├── package.json                  # Dependencies and scripts
│   ├── vite.config.ts                # Vite configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   └── tsconfig.json                 # TypeScript configuration
├── supabase/                         # Supabase configuration
├── lib/                              # Shared libraries
├── scripts/                          # Build and deployment scripts
├── tests/                            # Test files
├── FFA_MASTER.sql                    # Master database schema
├── rls-policies.sql                  # Row-Level Security policies
├── coppa-schema.sql                  # COPPA compliance schema
├── package.json                      # Root dependencies
├── vercel.json                       # Vercel deployment config
└── README.md                         # Project documentation
```

### 2.2 Component Architecture

#### 2.2.1 Core Components (`frontend/src/components/`)

**Layout Components**
- `AppLayout.tsx` - Main application layout with sidebar and navigation
- `AdminLayout.tsx` - Admin-specific layout with enhanced permissions
- `Navbar.tsx` - Top navigation bar with user menu
- `Footer.tsx` - Footer component with links and information

**Authentication Components**
- `AgeGate.tsx` - Age verification modal for COPPA compliance
- `AgeVerificationModal.tsx` - Detailed age verification flow
- `ProtectedRoute.tsx` - Route protection with role-based access control

**Educational Components**
- `HeroSection.tsx` - Landing page hero with call-to-action
- `SubjectsSection.tsx` - Subject/category browsing
- `InteractiveQuiz.tsx` - Interactive quiz component
- `LearningStyleQuiz.tsx` - Learning style assessment
- `VideoPlayer.tsx` - Video lesson player with progress tracking
- `CodingConsole.tsx` - Code editor and execution environment

**Gamification Components**
- `Badges.tsx` - Badge display and achievement system
- `Leaderboard.tsx` - Student leaderboard with rankings
- `ReactionSystem.tsx` - Emoji reactions for content

**UI Components** (`components/ui/`)
- 63+ reusable UI components built on Radix UI
- Includes: buttons, dialogs, forms, tables, charts, etc.
- Custom components for accessibility and performance

#### 2.2.2 Page Structure (`frontend/src/pages/`)

**Public Pages**
- `Index.tsx` - Landing page
- `Auth.tsx` - Authentication (login/signup)
- `PrivacyPolicy.tsx` - Privacy policy
- `TermsOfService.tsx` - Terms of service
- `Contact.tsx` - Contact form

**Student App Pages** (`pages/app/`)
- `Dashboard.tsx` - Student dashboard with progress overview
- `Courses.tsx` - Course catalog and browsing
- `CourseDetail.tsx` - Individual course details
- `VideoPlayer.tsx` - Video lesson viewer
- `CodingConsole.tsx` - Coding exercise environment
- `Quizzes.tsx` - Quiz taking interface
- `LiveClasses.tsx` - Live class participation
- `Chat.tsx` - Real-time chat
- `Forums.tsx` - Discussion forums
- `Notes.tsx` - Personal note-taking
- `CalendarPage.tsx` - Calendar and scheduling
- `Analytics.tsx` - Personal analytics
- `Profile.tsx` - User profile management
- `Settings.tsx` - Account settings
- `AIToolkit.tsx` - AI-powered learning tools
- `CareerPathfinder.tsx` - Career exploration
- `LearningDNAQuestionnaire.tsx` - Learning style assessment
- `Badges.tsx` - Achievement viewing
- `OnboardingWizard.tsx` - New user onboarding
- `WelcomeGateway.tsx` - Welcome flow

**Admin Pages** (`pages/admin/`)
- `AdminDashboard.tsx` - Admin overview
- `AdminUsers.tsx` - User management
- `AdminAnalytics.tsx` - Platform analytics
- `AdminCourses.tsx` - Course management
- `AdminAnnouncements.tsx` - Announcement management
- `AdminActivityLogs.tsx` - Activity monitoring
- `AdminEnrollments.tsx` - Enrollment management
- `AdminReports.tsx` - Report generation
- `AdminBilling.tsx` - Billing management
- `AdminSettings.tsx` - Platform settings
- `AdminSecurity.tsx` - Security management

**Parent Portal** (`pages/parent/`)
- `ParentDashboard.tsx` - Parent overview and child monitoring

#### 2.2.3 Custom Hooks (`frontend/src/hooks/`)

**Authentication & Authorization**
- `use-auth.tsx` - Authentication state and operations
- `useAuthSession.ts` - Session management
- `use-security-monitor.ts` - Security event monitoring

**Data Management**
- `use-courses.tsx` - Course data fetching
- `use-quizzes.tsx` - Quiz data management
- `use-notes.tsx` - Note CRUD operations
- `use-bookmarks.tsx` - Bookmark management
- `use-forums.tsx` - Forum data operations
- `use-chat.tsx` - Chat functionality

**Gamification**
- `use-gamification.tsx` - XP, streaks, badges
- `use-gamification-backend.tsx` - Server-side gamification sync

**Learning & Career**
- `use-learning-dna.tsx` - Learning style and preferences
- `use-career.tsx` - Career path management
- `use-student-preferences.tsx` - Student settings

**UI & UX**
- `use-theme.tsx` - Theme management (dark/light)
- `use-accessibility.tsx` - Accessibility features
- `use-notifications.tsx` - Notification system
- `use-announcements.tsx` - Announcement display
- `use-toast.ts` - Toast notifications
- `use-mobile.tsx` - Mobile device detection

**Utilities**
- `use-debounce.ts` - Debouncing function
- `useMounted.ts` - Component mount status
- `use-rate-limit.tsx` - Rate limiting

#### 2.2.4 Services Layer (`frontend/src/services/`)

**Core Services**
- `apiService.ts` - API client with error handling
- `database-service.ts` - Database operations abstraction
- `secure-api-proxy.ts` - Secure API proxy with authentication

**AI Services**
- `ai-guardrail-service.ts` - AI safety and content filtering
- `intelligent-content-service.ts` - AI-powered content generation
- `latex-rendering-service.ts` - LaTeX mathematical rendering

**Business Logic**
- `activity-logs-service.ts` - Activity logging and tracking
- `paddle-checkout-service.ts` - Payment processing
- `production-logger.ts` - Production logging

**Data Management**
- `titan-sqlite.ts` - SQLite database operations
- `stripe.ts` - Stripe payment integration

#### 2.2.5 Library Layer (`frontend/src/lib/`)

**Database & Storage**
- `supabase.ts` - Supabase client configuration
- `database-client.ts` - Database client wrapper
- `database-encryption.ts` - Data encryption utilities
- `secure-storage.ts` - Secure storage operations
- `backup-system.ts` - Backup and restore functionality

**API & Data**
- `api-client.ts` - REST API client
- `data-service.ts` - Data fetching and caching
- `data-prefetch.ts` - Data prefetching for performance

**Security & Compliance**
- `encryption.ts` - Encryption utilities
- `rbac.ts` - Role-based access control
- `tenantIsolation.ts` - Multi-tenant data isolation
- `validation.ts` - Input validation
- `moderation.ts` - Content moderation

**AI & Intelligence**
- `ai-study-assistant.ts` - AI study assistant
- `visual-intelligence.ts` - Visual content analysis

**Communication**
- `email-automation.ts` - Email automation
- `parentalConsentClient.ts` - Parental consent management

**Utilities**
- `error-handler.ts` - Error handling and user-friendly messages
- `backup-encryption.ts` - Backup encryption
- `cookieStorage.ts` - Cookie management
- `consentScriptLoader.ts` - Third-party consent management

#### 2.2.6 State Management (`frontend/src/store/`)

- `AppStore.tsx` - Global application state
- `ProductionState.tsx` - Production environment state
- `useAppStore.ts` - App store hooks
- `useGamificationStore.ts` - Gamification state (XP, badges, streaks)

### 2.3 Database Schema

#### Core Tables

**User Management**
- `profiles` - User profiles with role, points, streak
- `user_roles` - Role assignments (admin, student, instructor)
- `restrictions` - User restrictions and bans

**Content**
- `courses` - Course catalog
- `lessons` - Individual lessons within courses
- `quizzes` - Quiz definitions
- `quiz_questions` - Quiz questions
- `assignments` - Course assignments

**Enrollment & Progress**
- `enrollments` - Student course enrollments
- `course_progress` - Lesson completion tracking
- `quiz_submissions` - Quiz attempt records
- `assignment_submissions` - Assignment submissions

**Gamification**
- `badges` - Badge definitions
- `user_badges` - User earned badges
- `points_history` - XP transaction history
- `user_streaks` - Streak tracking
- `user_gamification` - Gamification state

**Communication**
- `announcements` - Platform announcements
- `forum_posts` - Forum posts
- `forum_replies` - Forum replies
- `conversations` - Message conversations
- `messages` - Individual messages
- `notifications` - User notifications

**Learning & Career**
- `learning_dna_profiles` - Learning style assessments
- `career_profiles` - Career path information
- `experience_logs` - Work/experience tracking
- `academic_profiles` - Academic information
- `milestones` - Achievement milestones
- `resumes` - User resumes

**Live Features**
- `live_classes` - Live class sessions
- `live_class_attendees` - Live class attendance

**System**
- `activity_logs` - System activity logging
- `bug_reports` - Bug tracking
- `system_suggested_plans` - AI-generated learning plans

---

## 3. Data Flow & Execution Logic

### 3.1 Application Initialization Flow

```
1. main.tsx Entry Point
   ↓
2. checkSupabaseConnection() - Verify database connectivity
   ↓
3. createRoot() - React 18 root creation
   ↓
4. App.tsx - Main application component
   ↓
5. Provider Initialization (nested):
   - QueryClientProvider - TanStack Query for data fetching
   - ThemeProvider - Theme management
   - BrowserRouter - React Router for navigation
   - AgeGate - Age verification for COPPA compliance
   - CookieConsent - GDPR cookie consent
   - AuthProvider - Authentication state
   - NotificationProvider - Notification system
   - AccessibilityProvider - Accessibility features
   - AnnouncementProvider - Platform announcements
   - CareerProvider - Career data
   - LearningDNAProvider - Learning preferences
   - StudentPreferencesProvider - Student settings
   ↓
6. Route Rendering with ProtectedRoute guards
   ↓
7. Page Component Rendering with lazy loading
```

### 3.2 Authentication Flow

#### 3.2.1 Sign Up Flow

```
User submits registration form
   ↓
use-auth.tsx: signUp() called
   ↓
Admin email check (whitelist: funfinityacademy@gmail.com, academyfunfinity@gmail.com)
   ↓
Supabase Auth: supabase.auth.signUp()
   ↓
Immediate user state update (optimistic)
   ↓
Background profile creation in profiles table
   ↓
Role assignment (admin for whitelisted emails, student otherwise)
   ↓
Redirect to onboarding or dashboard
```

#### 3.2.2 Sign In Flow

```
User submits login form
   ↓
use-auth.tsx: signIn() called
   ↓
Admin email check
   ↓
Supabase Auth: supabase.auth.signInWithPassword()
   ↓
Immediate user state update with role
   ↓
Background profile check/update
   ↓
Session persistence via cookies
   ↓
Redirect based on role and onboarding status
```

#### 3.2.3 Session Management

- **Storage:** Cookie-based storage with httpOnly, Secure, SameSite=Lax
- **Refresh:** Automatic token refresh via Supabase Auth
- **Events:** Auth state changes trigger user state updates
- **Security:** No localStorage usage for auth tokens (COPPA/GDPR compliant)

### 3.3 Protected Route Flow

```
User navigates to protected route
   ↓
ProtectedRoute component checks:
   1. Authentication state (user exists)
   2. Role authorization (allowedRoles)
   3. Onboarding completion (requireOnboarding)
   4. Maintenance mode status
   5. Admin email verification (for admin routes)
   ↓
If any check fails:
   - Redirect to appropriate route
   - Show loading state during checks
   - Display maintenance page if needed
   ↓
If all checks pass:
   - Render child component
   - Apply layout (AppLayout or AdminLayout)
```

### 3.4 Data Fetching Flow

#### 3.4.1 Standard Data Fetching

```
Component mounts
   ↓
Custom hook (e.g., use-courses.tsx) called
   ↓
TanStack Query useQuery() invoked
   ↓
data-service.ts function called
   ↓
Supabase client query executed
   ↓
Row-Level Security (RLS) policies applied
   ↓
Data returned with error handling
   ↓
Component re-renders with data
   ↓
Automatic background refetching (if configured)
```

#### 3.4.2 Real-time Data Flow

```
Component subscribes to real-time updates
   ↓
useSupabaseRealtime() hook called
   ↓
Supabase realtime subscription created
   ↓
Database change detected via PostgreSQL replication
   ↓
Supabase pushes update to client
   ↓
Subscription callback invoked
   ↓
State updated (Zustand or React state)
   ↓
Component re-renders with new data
```

### 3.5 Gamification System Flow

#### 3.5.1 XP Award Flow

```
User completes learning activity
   ↓
useGamificationStore.addXP(amount) called
   ↓
Optimistic state update (instant UI feedback)
   ↓
Background sync with Supabase user_gamification table
   ↓
Level calculation based on XP thresholds
   ↓
Badge unlock check (checkBadgeUnlocks())
   ↓
If badge criteria met:
   - unlockBadge() called
   - Optimistic badge addition
   - Database sync to user_badges table
   ↓
If sync fails: Rollback state changes
```

#### 3.5.2 Streak Management Flow

```
User logs in or completes activity
   ↓
useGamificationStore.incrementStreak() called
   ↓
Optimistic streak increment
   ↓
Date comparison for streak continuity
   ↓
Background sync to user_streaks table
   ↓
Streak badge eligibility check
   ↓
Streak freeze usage (if available)
```

### 3.6 AI Integration Flow

#### 3.6.1 AI Request Processing

```
User submits AI request
   ↓
ai-guardrail-service.ts: processAIRequest() called
   ↓
Step 1: Prompt structure validation
   ↓
Step 2: Blocked phrase detection
   ↓
Step 3: Prompt length check (max 4000 chars)
   ↓
Step 4: Context size validation (max 10000 chars)
   ↓
Step 5: PII scrubbing (names, emails, phone numbers)
   ↓
Step 6: Domain sanitization (allowed domains only)
   ↓
Step 7: System guardrail application
   ↓
Step 8: Security logging (no sensitive data)
   ↓
Rate limit check (20 requests/hour per user)
   ↓
If all checks pass:
   - Send to Gemini AI API
   - Receive response
   - Response sanitization
   - Return to user
   ↓
If any check fails:
   - Return error with block reason
   - Log security event
```

### 3.7 Learning DNA Assessment Flow

```
User starts Learning DNA questionnaire
   ↓
LearningDNAQuestionnaire component renders
   ↓
User answers questions about:
   - Learning styles (visual, auditory, kinesthetic, etc.)
   - Focus patterns (morning, afternoon, evening)
   - Session preferences
   - Special needs (ADHD, dyslexia, anxiety, etc.)
   ↓
Form submission
   ↓
data-service.ts: generateLearningPlan() called
   ↓
analyzeAndGeneratePlan() algorithm processes answers
   ↓
Personalized learning plan generated with:
   - Learning needs analysis
   - Preferred learning styles
   - Optimal study times
   - Session structure recommendations
   - Learning techniques
   - Focus strategies
   - Weekly schedule template
   ↓
Plan stored in system_suggested_plans table
   ↓
User profile updated (dna_complete = true)
   ↓
Redirect to dashboard with personalized recommendations
```

### 3.8 Course Progress Tracking Flow

```
User enrolls in course
   ↓
Enrollment record created in enrollments table
   ↓
User starts lesson
   ↓
VideoPlayer component loads lesson
   ↓
Progress tracking:
   - Video watch progress
   - Completion status
   - Time spent
   ↓
Lesson completion:
   - course_progress record updated
   - XP awarded via gamification store
   - Badge eligibility checked
   ↓
Course completion:
   - enrollment.completed_at set
   - Course badge awarded
   - Certificate generated
```

### 3.9 COPPA Compliance Flow

#### 3.9.1 Age Verification

```
User attempts to access platform
   ↓
AgeGate component triggers
   ↓
Date of birth collection
   ↓
Age calculation
   ↓
If age < 13:
   - Parental consent flow initiated
   - Parent/guardian information collection
   - Consent modal with legal documentation
   - Electronic signature capture
   - Consent scope selection
   - Consent duration options
   ↓
If age >= 13:
   - Standard registration flow
   ↓
Consent record stored in parental_consents table
   ↓
Audit trail logged (IP, user agent, timestamp)
```

### 3.10 Error Handling Flow

```
Error occurs in component or service
   ↓
error-handler.ts: getUserFriendlyError() called
   ↓
Error categorized and transformed
   ↓
User-friendly message generated
   ↓
Toast notification displayed via use-toast
   ↓
Error logged to production-logger
   ↓
If critical: ErrorPage component rendered
   ↓
Recovery options provided to user
```

---

## 4. Component, Class, and Function Reference

### 4.1 Core Components

#### 4.1.1 App.tsx

**Purpose:** Main application component with routing and provider setup

**Key Props:** None (root component)

**Key Features:**
- Lazy loading for performance optimization
- Route-based skeleton loading
- Provider nesting for state management
- Protected route configuration
- Scroll restoration

**Side Effects:**
- Initializes all context providers
- Sets up routing configuration
- Manages consent script loading

---

#### 4.1.2 ProtectedRoute

**Purpose:** Route protection with authentication and authorization

**Props:**
```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // ['student', 'admin', 'instructor']
  requireOnboarding?: boolean; // Force onboarding completion
}
```

**Return Values:**
- Renders children if all checks pass
- Redirects to appropriate route if checks fail
- Shows loading state during checks

**Side Effects:**
- Checks authentication state
- Validates user role
- Verifies onboarding completion
- Enforces admin email whitelist
- Checks maintenance mode status

**Usage Example:**
```tsx
<Route path="/app" element={
  <ProtectedRoute allowedRoles={['student', 'admin']} requireOnboarding={true}>
    <AppLayout />
  </ProtectedRoute>
}>
```

---

#### 4.1.3 AgeGate

**Purpose:** COPPA-compliant age verification

**Key Features:**
- Date of birth collection
- Age calculation
- Parental consent triggering for minors
- Session persistence

**Side Effects:**
- Stores age verification in session
- Triggers parental consent flow for users < 13
- Prevents access until verification complete

---

### 4.2 Custom Hooks

#### 4.2.1 useAuth

**Purpose:** Authentication state management and operations

**Returns:**
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: string | null;
  signUp: (email: string, password: string, name: string, role: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}
```

**Key Functions:**

**signUp(email, password, name, userRole)**
- Parameters: User registration data
- Returns: Promise with error object
- Side Effects: Creates Supabase auth user, creates profile, assigns role
- Admin Detection: Whitelisted emails automatically get admin role

**signIn(email, password)**
- Parameters: Login credentials
- Returns: Promise with error object
- Side Effects: Authenticates user, loads profile, sets session

**signOut()**
- Parameters: None
- Returns: Promise<void>
- Side Effects: Clears session, removes user state, clears auth tokens

---

#### 4.2.2 useGamificationStore

**Purpose:** Gamification state management with optimistic updates

**State:**
```typescript
interface GamificationState {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  unlockedBadges: Badge[];
  availableBadges: Badge[];
  moduleProgress: ModuleProgress[];
  xpToNextLevel: number; // Computed
  xpProgress: number; // Computed
}
```

**Key Actions:**

**addXP(amount: number)**
- Parameters: XP amount to add
- Returns: Promise<void>
- Side Effects: Optimistic XP update, level calculation, server sync, badge check
- Error Handling: Rolls back on sync failure

**incrementStreak()**
- Parameters: None
- Returns: Promise<void>
- Side Effects: Optimistic streak increment, server sync, badge check
- Error Handling: Rolls back on sync failure

**unlockBadge(badgeId: string)**
- Parameters: Badge identifier
- Returns: Promise<void>
- Side Effects: Optimistic badge unlock, server sync
- Error Handling: Rolls back on sync failure

**updateModuleProgress(moduleId: string, completedLessons: number)**
- Parameters: Module ID and completion count
- Returns: Promise<void>
- Side Effects: Progress update, XP award, server sync
- Error Handling: Rolls back on sync failure

**syncWithServer()**
- Parameters: None
- Returns: Promise<void>
- Side Effects: Fetches all gamification data from server, updates local state

---

#### 4.2.3 useLearningDNA

**Purpose:** Learning style and preference management

**Key Functions:**
- Fetch learning DNA profile
- Update learning preferences
- Generate personalized learning plans
- Track assessment completion

---

### 4.3 Service Layer

#### 4.3.1 data-service.ts

**Purpose:** Centralized data fetching from Supabase

**Key Functions:**

**generateLearningPlan(userId: string, learningDNA: any)**
- Parameters: User ID and learning DNA data
- Returns: Promise with generated plan
- Side Effects: Stores plan in system_suggested_plans table
- Algorithm: Custom analysis of learning styles, needs, and preferences

**fetchUsers()**
- Parameters: None
- Returns: Promise with user array
- Method: RPC function with fallback to direct query
- Side Effects: Fetches profiles with role information

**fetchUserProfile(userId: string)**
- Parameters: User ID
- Returns: Promise with profile data
- Side Effects: Single profile query

**createUser(userData: object)**
- Parameters: User registration data
- Returns: Promise with created profile
- Side Effects: Creates auth user, profile, and role assignment

**restrictUser(userId: string, data: object)**
- Parameters: User ID and restriction data
- Returns: Promise with success status
- Side Effects: Creates restriction record, updates profile status

**banUser(userId: string, reason?: string)**
- Parameters: User ID and ban reason
- Returns: Promise with success status
- Side Effects: Creates ban record, updates profile status to 'banned'

**deleteUser(userId: string)**
- Parameters: User ID
- Returns: Promise with success status
- Side Effects: Deletes auth user, profile, and role records

**fetchCourses()**
- Parameters: None
- Returns: Promise with course array
- Side Effects: Queries courses table ordered by creation date

**fetchCourseById(courseId: string)**
- Parameters: Course ID
- Returns: Promise with course data
- Side Effects: Single course query

**fetchEnrollments()**
- Parameters: None
- Returns: Promise with enrollment array including related data
- Side Effects: Queries enrollments with profile and course relations

**fetchUserEnrollments(userId: string)**
- Parameters: User ID
- Returns: Promise with user's enrollments
- Side Effects: Queries enrollments filtered by user ID

**fetchAnnouncements()**
- Parameters: None
- Returns: Promise with announcement array
- Side Effects: Queries announcements with author profiles

**createAnnouncement(announcementData: object)**
- Parameters: Announcement data
- Returns: Promise with created announcement
- Side Effects: Inserts announcement record

**updateAnnouncement(announcementId: string, announcementData: object)**
- Parameters: Announcement ID and update data
- Returns: Promise with updated announcement
- Side Effects: Updates announcement record

**deleteAnnouncement(announcementId: string)**
- Parameters: Announcement ID
- Returns: Promise with null data
- Side Effects: Deletes announcement record

---

#### 4.3.2 ai-guardrail-service.ts

**Purpose:** AI safety and content filtering

**Key Functions:**

**processAIRequest(request: AIRequest)**
- Parameters: AI request with prompt, context, and user ID
- Returns: Promise with processed request or error
- Validation Steps:
  1. Prompt structure validation
  2. Blocked phrase detection
  3. Prompt length check (max 4000 chars)
  4. Context size validation (max 10000 chars)
  5. PII scrubbing
  6. Domain sanitization
  7. System guardrail application
  8. Security logging
- Side Effects: Logs security events, scrubs sensitive data

**sanitizeAIResponse(response: any)**
- Parameters: AI response
- Returns: Sanitized response
- Side Effects: Removes system prompt leaks and sensitive information

**checkAIRateLimit(userId: string)**
- Parameters: User ID
- Returns: Rate limit status with remaining requests
- Limits: 20 requests per hour per user
- Side Effects: Tracks request history in memory

**getGuardrailStats()**
- Parameters: None
- Returns: Guardrail configuration statistics
- Side Effects: None (read-only)

**Configuration:**
```typescript
const GUARDRAIL_CONFIG = {
  maxPromptLength: 4000,
  maxContextSize: 10000,
  blockedPhrases: [
    'ignore all instructions',
    'ignore previous instructions',
    'override system',
    // ... more blocked phrases
  ],
  allowedDomains: [
    'funfinityacademy.com',
    'example.com',
    'wikipedia.org',
    'khanacademy.org',
  ],
};
```

---

#### 4.3.3 supabase.ts (lib/supabase.ts)

**Purpose:** Supabase client configuration and utilities

**Key Functions:**

**checkSupabaseConnection(retries?: number, delayMs?: number)**
- Parameters: Retry count and delay between retries
- Returns: Promise<boolean> indicating connection status
- Default: 3 retries with 1000ms delay
- Side Effects: Tests database connectivity, sets connection status

**safeQuery(queryFn: Function, fallbackValue: any, context: string)**
- Parameters: Query function, fallback value, and context description
- Returns: Promise with data and error
- Side Effects: Wraps Supabase queries with error handling

**Configuration:**
```typescript
{
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
    storageKey: 'funfinity-auth-token',
    cookieOptions: {
      name: 'funfinity-auth',
      domain: window.location.hostname,
      path: '/',
      sameSite: 'lax',
      secure: window.location.protocol === 'https:',
      httpOnly: true,
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'funfinity-academy-web',
    },
  },
  db: {
    schema: 'public',
  },
}
```

---

### 4.4 Utility Functions

#### 4.4.1 Error Handler (lib/error-handler.ts)

**Purpose:** Transform technical errors into user-friendly messages

**Key Function:**

**getUserFriendlyError(error: any)**
- Parameters: Error object
- Returns: User-friendly error object with message
- Handles: Supabase errors, network errors, validation errors
- Side Effects: None (pure function)

---

#### 4.4.2 Validation (lib/validation.ts)

**Purpose:** Input validation and sanitization

**Key Functions:**
- Email validation
- Password strength validation
- URL validation
- Data sanitization
- Schema validation using Zod

---

### 4.5 Database RPC Functions

#### 4.5.1 fetch_all_users_with_roles

**Purpose:** Fetch users with role information avoiding RLS recursion

**Returns:** Array of users with role data

**Usage:** Called from data-service.ts fetchUsers()

---

## 5. Environment & Setup Guide

### 5.1 Prerequisites

#### System Requirements
- **Node.js:** 18.0.0 or higher (recommended 20.19+)
- **npm:** 9.0.0 or higher
- **Git:** Latest stable version

#### Required Accounts
- **Supabase:** Free tier account for database and auth
- **Google Cloud:** For Gemini AI API access
- **Vercel:** For deployment (optional, can use other platforms)

### 5.2 Installation Steps

#### 5.2.1 Clone Repository

```bash
git clone https://github.com/funfinityacademy/autonomous-ecosystem.git
cd FunFinity-Academy/frontend
```

#### 5.2.2 Install Dependencies

```bash
npm install
```

#### 5.2.3 Environment Configuration

Create `.env.local` file in the `frontend` directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Gemini AI Configuration (optional)
VITE_GEMINI_API_KEY=your-gemini-api-key

# Tawk.to Chat Widget (optional)
VITE_TAWK_TO_PROPERTY_ID=your_property_id
VITE_TAWK_TO_WIDGET_ID=your_widget_id

# API Configuration (optional)
VITE_API_URL=https://your-api.example.com

# Environment
NODE_ENV=development
```

**Environment Variables Explanation:**

| Variable | Required | Description | Source |
|----------|----------|-------------|--------|
| VITE_SUPABASE_URL | Yes | Supabase project URL | Supabase Dashboard → Settings → API |
| VITE_SUPABASE_ANON_KEY | Yes | Supabase anonymous key | Supabase Dashboard → Settings → API |
| VITE_GEMINI_API_KEY | No | Google Gemini AI API key | Google Cloud Console |
| VITE_TAWK_TO_PROPERTY_ID | No | Tawk.to property ID | Tawk.to Dashboard |
| VITE_TAWK_TO_WIDGET_ID | No | Tawk.to widget ID | Tawk.to Dashboard |
| VITE_API_URL | No | Custom API base URL | Your backend server |
| NODE_ENV | No | Environment mode | development/production |

### 5.3 Database Setup

#### 5.3.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Enter project details:
   - Name: FunFinity Academy
   - Database Password: [Generate strong password]
   - Region: Choose nearest region
4. Wait for project initialization (2-3 minutes)

#### 5.3.2 Run Database Schema

1. Open Supabase SQL Editor
2. Copy contents of `FFA_MASTER.sql`
3. Paste into SQL Editor
4. Click "Run" to execute
5. Wait for schema creation (30-60 seconds)

#### 5.3.3 Apply RLS Policies

1. Copy contents of `rls-policies.sql`
2. Paste into SQL Editor
3. Click "Run" to execute
4. Verify policies are applied

#### 5.3.4 Apply COPPA Schema

1. Copy contents of `coppa-schema.sql`
2. Paste into SQL Editor
3. Click "Run" to execute
4. Verify COPPA tables are created

#### 5.3.5 Configure Authentication

1. Go to Supabase Dashboard → Authentication
2. Enable Email/Password authentication
3. Configure email templates (optional)
4. Enable OAuth providers if needed:
   - Google
   - GitHub
   - Other providers as needed

### 5.4 Development Server

#### 5.4.1 Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

#### 5.4.2 Development Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on port 8080 |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run test` | Run Vitest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run clean` | Clean build artifacts |

### 5.5 Testing

#### 5.5.1 Run Unit Tests

```bash
npm run test
```

#### 5.5.2 Run Tests in Watch Mode

```bash
npm run test:watch
```

#### 5.5.3 Generate Coverage Report

```bash
npm run test:coverage
```

#### 5.5.4 Run E2E Tests with Playwright

```bash
npx playwright test
```

### 5.6 Building for Production

#### 5.6.1 Build Application

```bash
npm run build
```

Build output will be in the `dist` directory.

#### 5.6.2 Preview Production Build

```bash
npm run preview
```

### 5.7 Deployment

#### 5.7.1 Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Configure environment variables in Vercel Dashboard:
   - Add all variables from `.env.local`
   - Set production values

5. Deploy to production:
```bash
vercel --prod
```

#### 5.7.2 Configure Custom Domain

1. Go to Vercel Dashboard → Settings → Domains
2. Add custom domain
3. Configure DNS records
4. Enable SSL certificate

#### 5.7.3 Enable Analytics

1. Install analytics packages:
```bash
npm install @vercel/analytics @vercel/speed-insights
```

2. Analytics are automatically enabled in App.tsx

### 5.8 Configuration Files

#### 5.8.1 vite.config.ts

**Purpose:** Vite build configuration

**Key Settings:**
- Root directory: `.`
- Public directory: `public`
- Base path: `/`
- Server port: 8080
- Host: `::` (all interfaces)
- Path alias: `@` → `./src`
- Code splitting: Manual chunks for vendors
- Chunk size warning limit: 1000 KB

#### 5.8.2 tailwind.config.ts

**Purpose:** Tailwind CSS configuration

**Key Settings:**
- Content paths: All source files
- Theme customization: Custom colors, fonts, animations
- Plugins: Typography plugin
- Dark mode: Class-based

#### 5.8.3 tsconfig.json

**Purpose:** TypeScript configuration

**Key Settings:**
- Target: ES2020
- Module resolution: Node
- Strict mode: Enabled
- Path aliases: `@/*` → `./src/*`

### 5.9 Security Configuration

#### 5.9.1 Security Headers

The application implements OWASP-recommended security headers via middleware:

- **Content Security Policy (CSP):** Prevents XSS and data injection
- **Strict-Transport-Security (HSTS):** Enforces HTTPS connections
- **X-Frame-Options:** Prevents clickjacking attacks
- **X-Content-Type-Options:** Prevents MIME sniffing
- **Permissions-Policy:** Controls browser feature access
- **Cross-Origin Policies:** Isolates cross-origin documents

#### 5.9.2 Environment Variable Security

- Never commit `.env.local` to version control
- Use different values for development and production
- Rotate API keys regularly
- Use secrets management in production

#### 5.9.3 Database Security

- Row-Level Security (RLS) enabled on all tables
- Service role key never exposed to client
- API operations via Supabase client with anon key
- Regular security audits of RLS policies

### 5.10 Monitoring and Logging

#### 5.10.1 Production Logging

The application includes production logging via `production-logger.ts`:

- Error logging with context
- Performance monitoring
- User activity tracking
- Security event logging

#### 5.10.2 Analytics

- **Vercel Analytics:** Page views, core web vitals
- **Vercel Speed Insights:** Performance metrics
- **Custom Events:** User interactions, feature usage

#### 5.10.3 Error Tracking

- Client-side error boundary
- Server-side error logging
- User-friendly error messages
- Error aggregation and alerting

### 5.11 Troubleshooting

#### Common Issues

**Issue: Supabase connection failed**
- Solution: Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check Supabase project status
- Verify network connectivity

**Issue: Build fails with TypeScript errors**
- Solution: Run `npm run type-check` to identify issues
- Fix type errors in source files
- Update type definitions if needed

**Issue: Styles not loading**
- Solution: Verify Tailwind CSS configuration
- Check that `index.css` is imported in `main.tsx`
- Clear build cache: `npm run clean`

**Issue: Environment variables not working**
- Solution: Ensure variables start with `VITE_` for client-side access
- Restart development server after changing `.env.local`
- Verify no typos in variable names

**Issue: Authentication not working**
- Solution: Verify Supabase Auth is enabled
- Check email templates are configured
- Verify RLS policies allow auth operations

### 5.12 Performance Optimization

#### 5.12.1 Code Splitting

The application uses automatic code splitting via:
- Route-based splitting with React.lazy()
- Manual vendor chunks in vite.config.ts
- Dynamic imports for heavy components

#### 5.12.2 Image Optimization

- Use `OptimizedImage` component for all images
- WebP format with fallbacks
- Lazy loading for below-fold images
- Responsive image sizes

#### 5.12.3 Caching Strategy

- TanStack Query for data caching
- Service worker for offline support
- LocalStorage for user preferences
- Gamification state persistence

#### 5.12.4 Bundle Analysis

```bash
npm run analyze
```

Generates bundle analysis report to identify large dependencies.

### 5.13 Accessibility

#### 5.13.1 WCAG Compliance

The application aims for WCAG 2.2 AA compliance:

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

#### 5.13.2 Accessibility Features

- `use-accessibility` hook for global settings
- Font size adjustment
- High contrast mode
- Screen reader announcements
- Focus trap in modals
- Skip to main content link

### 5.14 Maintenance

#### 5.14.1 Dependency Updates

```bash
# Check for outdated dependencies
npm outdated

# Update dependencies
npm update

# Update major versions (careful)
npx npm-check-updates -u
npm install
```

#### 5.14.2 Database Backups

- Enable daily backups in Supabase
- Test restore process regularly
- Keep backup of schema files
- Document any schema changes

#### 5.14.3 Log Rotation

- Implement log rotation for production logs
- Archive old logs regularly
- Monitor log storage usage
- Set up log retention policies

---

## Appendix

### A. Glossary

- **COPPA:** Children's Online Privacy Protection Act
- **RLS:** Row-Level Security (database access control)
- **XP:** Experience Points (gamification)
- **SPA:** Single Page Application
- **RBAC:** Role-Based Access Control
- **PII:** Personally Identifiable Information
- **GDPR:** General Data Protection Regulation

### B. Additional Resources

- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

### C. Support

For technical support or questions:
- Email: tech@funfinityacademy.com
- Documentation: [docs.funfinityacademy.com](https://docs.funfinityacademy.com)
- Issues: [GitHub Issues](https://github.com/funfinityacademy/autonomous-ecosystem/issues)

---

**Document Version:** 1.0.0  
**Last Updated:** August 10, 2026  
**Maintained By:** FunFinity Academy Engineering Team  
**License:** Proprietary - All Rights Reserved © 2025 FunFinity Academy
