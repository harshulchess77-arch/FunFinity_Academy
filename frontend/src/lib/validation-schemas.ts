import { z } from "zod";

// ============================================
// SECURITY & INPUT SANITIZATION FRAMEWORK
// ============================================
// Comprehensive Zod schemas for all user inputs
// Prevents XSS, injection attacks, and malformed data

/**
 * Sanitizes string input by removing potentially dangerous characters
 * This is a client-side helper - server-side sanitization should also be implemented
 */
export const sanitizeString = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove inline event handlers
    .trim();
};

/**
 * Validates email format and checks against common disposable email domains
 */
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
  'throwawaymail.com', 'sharklasers.com', 'getairmail.com'
];

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .max(255, "Email must be less than 255 characters")
  .email("Please enter a valid email address")
  .transform((val) => sanitizeString(val))
  .refine(
    (email) => {
      const domain = email.split('@')[1]?.toLowerCase();
      return !DISPOSABLE_EMAIL_DOMAINS.includes(domain);
    },
    "Disposable email addresses are not allowed"
  );

/**
 * Password validation with complexity requirements
 */
export const passwordSchema = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)"
  )
  .refine(
    (password) => !password.toLowerCase().includes('password'),
    "Password cannot contain the word 'password'"
  )
  .refine(
    (password) => !/[0-9]{4,}/.test(password),
    "Password cannot contain 4 or more consecutive numbers"
  );

/**
 * Name validation - allows letters, spaces, hyphens, and apostrophes
 */
export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be less than 50 characters")
  .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes")
  .transform((val) => sanitizeString(val));

/**
 * Country code validation (ISO 3166-1 alpha-2)
 */
export const countryCodeSchema = z
  .string()
  .length(2, "Country code must be 2 characters")
  .regex(/^[A-Z]{2}$/, "Country code must be uppercase letters (e.g., US, GB)")
  .transform((val) => val.toUpperCase());

/**
 * Grade level validation
 */
export const gradeLevelSchema = z
  .string()
  .min(1, "Grade level is required")
  .refine((val) => ['8', '9', '10', '11', '12'].includes(val), "Invalid grade level");

/**
 * Subject selection validation
 */
export const subjectsSchema = z
  .array(z.string())
  .min(1, "At least one subject must be selected")
  .max(6, "Cannot select more than 6 subjects")
  .refine(
    (subjects) => {
      const validSubjects = ['math', 'science', 'english', 'social', 'foreign', 'arts'];
      return subjects.every(s => validSubjects.includes(s));
    },
    "Invalid subject selected"
  );

/**
 * Test score validation (0-100)
 */
export const testScoreSchema = z
  .number()
  .min(0, "Score cannot be negative")
  .max(100, "Score cannot exceed 100")
  .optional();

/**
 * Goals validation
 */
export const goalsSchema = z
  .array(z.string())
  .min(1, "At least one goal must be selected")
  .max(5, "Cannot select more than 5 goals");

// ============================================
// AUTH SCHEMAS
// ============================================

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  role: z.literal("student"),
});

export const signinSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(128, "Password is too long"),
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
});

// ============================================
// ONBOARDING SCHEMAS
// ============================================

export const countrySelectionSchema = z.object({
  country: countryCodeSchema,
});

export const academicProfileSchema = z.object({
  gradeLevel: gradeLevelSchema,
  subjects: subjectsSchema,
  testScores: z.object({
    math: testScoreSchema,
    reading: testScoreSchema,
    science: testScoreSchema,
  }),
  goals: goalsSchema,
});

// ============================================
// PROFILE SCHEMAS
// ============================================

export const updateProfileSchema = z.object({
  display_name: nameSchema.optional(),
  bio: z
    .string()
    .max(500, "Bio must be less than 500 characters")
    .transform((val) => sanitizeString(val))
    .optional(),
  avatar_url: z
    .string()
    .url("Invalid avatar URL")
    .optional(),
});

export const updatePreferencesSchema = z.object({
  email_notifications: z.boolean(),
  push_notifications: z.boolean(),
  theme: z.enum(['light', 'dark', 'auto']),
  language: z.string().length(2).optional(),
});

// ============================================
// COURSE SCHEMAS
// ============================================

export const createCourseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .transform((val) => sanitizeString(val)),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be less than 2000 characters")
    .transform((val) => sanitizeString(val)),
  subject: z.enum(['math', 'science', 'english', 'social', 'coding', 'arts', 'business']),
  grade_level: gradeLevelSchema,
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
});

export const updateCourseSchema = createCourseSchema.partial();

// ============================================
// ASSIGNMENT SCHEMAS
// ============================================

export const createAssignmentSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .transform((val) => sanitizeString(val)),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters")
    .transform((val) => sanitizeString(val)),
  due_date: z.string().datetime("Invalid due date format"),
  points: z.number().min(0, "Points cannot be negative").max(1000, "Points cannot exceed 1000"),
  course_id: z.string().uuid("Invalid course ID"),
});

export const submitAssignmentSchema = z.object({
  assignment_id: z.string().uuid("Invalid assignment ID"),
  content: z
    .string()
    .min(1, "Submission content is required")
    .max(10000, "Content is too long")
    .transform((val) => sanitizeString(val)),
  file_url: z.string().url("Invalid file URL").optional(),
});

// ============================================
// QUIZ SCHEMAS
// ============================================

export const createQuizSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .transform((val) => sanitizeString(val)),
  course_id: z.string().uuid("Invalid course ID"),
  time_limit: z.number().min(1, "Time limit must be at least 1 minute").max(180, "Time limit cannot exceed 180 minutes").optional(),
  passing_score: z.number().min(0, "Passing score cannot be negative").max(100, "Passing score cannot exceed 100"),
});

export const quizQuestionSchema = z.object({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters")
    .max(1000, "Question is too long")
    .transform((val) => sanitizeString(val)),
  options: z.array(z.string().min(1).max(500).transform((val) => sanitizeString(val))).min(2).max(6),
  correct_answer: z.number().min(0).max(5),
  points: z.number().min(1).max(100),
});

export const submitQuizSchema = z.object({
  quiz_id: z.string().uuid("Invalid quiz ID"),
  answers: z.record(z.number().min(0).max(5)),
});

// ============================================
// MESSAGE/COMMENT SCHEMAS
// ============================================

export const createMessageSchema = z.object({
  recipient_id: z.string().uuid("Invalid recipient ID"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters")
    .transform((val) => sanitizeString(val)),
  content: z
    .string()
    .min(1, "Message content is required")
    .max(5000, "Message is too long")
    .transform((val) => sanitizeString(val)),
});

export const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment is too long")
    .transform((val) => sanitizeString(val)),
  parent_id: z.string().uuid("Invalid parent comment ID").optional(),
});

// ============================================
// ADMIN SCHEMAS
// ============================================

export const adminUserUpdateSchema = z.object({
  user_id: z.string().uuid("Invalid user ID"),
  role: z.enum(['student', 'teacher', 'parent', 'admin']),
  is_active: z.boolean(),
  is_verified: z.boolean(),
});

export const adminCourseUpdateSchema = z.object({
  course_id: z.string().uuid("Invalid course ID"),
  is_published: z.boolean(),
  featured: z.boolean(),
});

// ============================================
// FEEDBACK SCHEMAS
// ============================================

export const bugReportSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .transform((val) => sanitizeString(val)),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters")
    .transform((val) => sanitizeString(val)),
  steps: z
    .string()
    .max(2000, "Steps must be less than 2000 characters")
    .transform((val) => sanitizeString(val))
    .optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  category: z.enum(['ui', 'performance', 'functionality', 'security', 'content', 'other']),
  email: emailSchema.optional(),
});

export const featureRequestSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .transform((val) => sanitizeString(val)),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters")
    .transform((val) => sanitizeString(val)),
  category: z.enum(['ui', 'performance', 'functionality', 'content', 'other']),
  priority: z.enum(['low', 'medium', 'high']),
});

export const feedbackSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(2000, "Message must be less than 2000 characters")
    .transform((val) => sanitizeString(val)),
  rating: z.number().min(1).max(5).optional(),
});

// ============================================
// EXPORT TYPES
// ============================================

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type CountrySelectionInput = z.infer<typeof countrySelectionSchema>;
export type AcademicProfileInput = z.infer<typeof academicProfileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type CreateAssignmentInput = z.infer<typeof createAssignmentSchema>;
export type SubmitAssignmentInput = z.infer<typeof submitAssignmentSchema>;
export type CreateQuizInput = z.infer<typeof createQuizSchema>;
export type QuizQuestionInput = z.infer<typeof quizQuestionSchema>;
export type SubmitQuizInput = z.infer<typeof submitQuizSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type AdminUserUpdateInput = z.infer<typeof adminUserUpdateSchema>;
export type AdminCourseUpdateInput = z.infer<typeof adminCourseUpdateSchema>;
export type BugReportInput = z.infer<typeof bugReportSchema>;
export type FeatureRequestInput = z.infer<typeof featureRequestSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
