/**
 * Badges & Micro-Credentials System
 * Visual achievement unlockables that reward progress and build user portfolios
 */

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'learning' | 'streak' | 'social' | 'achievement' | 'mastery';
  requirements: BadgeRequirement[];
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface BadgeRequirement {
  type: 'quiz_score' | 'lessons_completed' | 'streak_days' | 'xp_earned' | 'courses_completed' | 'time_spent';
  value: number;
  description: string;
}

export interface MicroCredential {
  id: string;
  name: string;
  description: string;
  issuer: 'Funfinity Academy' | 'Partner Institution';
  badgeIds: string[];
  issuedAt?: Date;
  expiresAt?: Date;
  verificationCode?: string;
  shareableUrl?: string;
}

// Badge definitions
export const BADGE_DEFINITIONS: Omit<Badge, 'unlocked' | 'unlockedAt' | 'progress' | 'maxProgress'>[] = [
  // Learning Badges
  {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    rarity: 'common',
    category: 'learning',
    requirements: [
      { type: 'lessons_completed', value: 1, description: 'Complete 1 lesson' }
    ],
  },
  {
    id: 'lesson-master',
    name: 'Lesson Master',
    description: 'Complete 50 lessons',
    icon: '📚',
    rarity: 'rare',
    category: 'learning',
    requirements: [
      { type: 'lessons_completed', value: 50, description: 'Complete 50 lessons' }
    ],
  },
  {
    id: 'course-graduate',
    name: 'Course Graduate',
    description: 'Complete your first course',
    icon: '🎓',
    rarity: 'rare',
    category: 'learning',
    requirements: [
      { type: 'courses_completed', value: 1, description: 'Complete 1 course' }
    ],
  },
  {
    id: 'polyglot',
    name: 'Knowledge Polyglot',
    description: 'Complete courses in 5 different subjects',
    icon: '🌐',
    rarity: 'epic',
    category: 'learning',
    requirements: [
      { type: 'courses_completed', value: 5, description: 'Complete 5 courses in different subjects' }
    ],
  },

  // Streak Badges
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    rarity: 'rare',
    category: 'streak',
    requirements: [
      { type: 'streak_days', value: 7, description: '7-day streak' }
    ],
  },
  {
    id: 'month-master',
    name: 'Month Master',
    description: 'Maintain a 30-day learning streak',
    icon: '⚡',
    rarity: 'epic',
    category: 'streak',
    requirements: [
      { type: 'streak_days', value: 30, description: '30-day streak' }
    ],
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Maintain a 100-day learning streak',
    icon: '👑',
    rarity: 'legendary',
    category: 'streak',
    requirements: [
      { type: 'streak_days', value: 100, description: '100-day streak' }
    ],
  },

  // Quiz/Score Badges
  {
    id: 'quiz-novice',
    name: 'Quiz Novice',
    description: 'Complete 10 quizzes',
    icon: '📝',
    rarity: 'common',
    category: 'achievement',
    requirements: [
      { type: 'quiz_score', value: 10, description: 'Complete 10 quizzes' }
    ],
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Score 100% on a quiz',
    icon: '💯',
    rarity: 'rare',
    category: 'achievement',
    requirements: [
      { type: 'quiz_score', value: 100, description: 'Score 100% on any quiz' }
    ],
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    icon: '🏆',
    rarity: 'epic',
    category: 'achievement',
    requirements: [
      { type: 'quiz_score', value: 5, description: 'Score 100% on 5 quizzes' }
    ],
  },

  // XP Badges
  {
    id: 'xp-explorer',
    name: 'XP Explorer',
    description: 'Earn 1,000 XP',
    icon: '⭐',
    rarity: 'common',
    category: 'achievement',
    requirements: [
      { type: 'xp_earned', value: 1000, description: 'Earn 1,000 XP' }
    ],
  },
  {
    id: 'xp-champion',
    name: 'XP Champion',
    description: 'Earn 10,000 XP',
    icon: '🌟',
    rarity: 'rare',
    category: 'achievement',
    requirements: [
      { type: 'xp_earned', value: 10000, description: 'Earn 10,000 XP' }
    ],
  },
  {
    id: 'xp-legend',
    name: 'XP Legend',
    description: 'Earn 100,000 XP',
    icon: '💎',
    rarity: 'legendary',
    category: 'achievement',
    requirements: [
      { type: 'xp_earned', value: 100000, description: 'Earn 100,000 XP' }
    ],
  },

  // Time Badges
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete 10 lessons before 8 AM',
    icon: '🌅',
    rarity: 'rare',
    category: 'learning',
    requirements: [
      { type: 'time_spent', value: 10, description: '10 lessons before 8 AM' }
    ],
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete 10 lessons after 10 PM',
    icon: '🦉',
    rarity: 'rare',
    category: 'learning',
    requirements: [
      { type: 'time_spent', value: 10, description: '10 lessons after 10 PM' }
    ],
  },

  // Mastery Badges
  {
    id: 'math-whiz',
    name: 'Math Whiz',
    description: 'Complete all Mathematics courses with 90%+ average',
    icon: '🧮',
    rarity: 'epic',
    category: 'mastery',
    requirements: [
      { type: 'courses_completed', value: 3, description: 'Complete all Math courses with 90%+ average' }
    ],
  },
  {
    id: 'science-explorer',
    name: 'Science Explorer',
    description: 'Complete all Science courses with 90%+ average',
    icon: '🔬',
    rarity: 'epic',
    category: 'mastery',
    requirements: [
      { type: 'courses_completed', value: 3, description: 'Complete all Science courses with 90%+ average' }
    ],
  },
];

/**
 * Check if a badge should be unlocked based on user metrics
 */
export function checkBadgeUnlock(
  badge: Omit<Badge, 'unlocked' | 'unlockedAt' | 'progress' | 'maxProgress'>,
  userMetrics: {
    lessonsCompleted: number;
    coursesCompleted: number;
    streakDays: number;
    xpEarned: number;
    quizzesCompleted: number;
    perfectScores: number;
    earlyMorningLessons: number;
    lateNightLessons: number;
  }
): { unlocked: boolean; progress?: number; maxProgress?: number } {
  const { requirements } = badge;
  
  for (const req of requirements) {
    let currentValue = 0;
    let maxValue = req.value;

    switch (req.type) {
      case 'lessons_completed':
        currentValue = userMetrics.lessonsCompleted;
        break;
      case 'courses_completed':
        currentValue = userMetrics.coursesCompleted;
        break;
      case 'streak_days':
        currentValue = userMetrics.streakDays;
        break;
      case 'xp_earned':
        currentValue = userMetrics.xpEarned;
        break;
      case 'quiz_score':
        if (req.value === 100) {
          currentValue = userMetrics.perfectScores;
          maxValue = 1;
        } else {
          currentValue = userMetrics.quizzesCompleted;
        }
        break;
      case 'time_spent':
        currentValue = userMetrics.earlyMorningLessons + userMetrics.lateNightLessons;
        break;
    }

    if (currentValue >= maxValue) {
      return { unlocked: true };
    }

    return { 
      unlocked: false, 
      progress: currentValue, 
      maxProgress: maxValue 
    };
  }

  return { unlocked: false };
}

/**
 * Get all badges with unlock status for a user
 */
export function getUserBadges(
  userMetrics: {
    lessonsCompleted: number;
    coursesCompleted: number;
    streakDays: number;
    xpEarned: number;
    quizzesCompleted: number;
    perfectScores: number;
    earlyMorningLessons: number;
    lateNightLessons: number;
  },
  unlockedBadges: string[] = [],
  unlockedDates: Record<string, Date> = {}
): Badge[] {
  return BADGE_DEFINITIONS.map(badge => {
    const isUnlocked = unlockedBadges.includes(badge.id);
    const checkResult = checkBadgeUnlock(badge, userMetrics);

    return {
      ...badge,
      unlocked: isUnlocked,
      unlockedAt: unlockedDates[badge.id],
      progress: checkResult.progress,
      maxProgress: checkResult.maxProgress,
    };
  });
}

/**
 * Generate micro-credentials based on unlocked badges
 */
export function generateMicroCredentials(
  unlockedBadges: Badge[]
): MicroCredential[] {
  const credentials: MicroCredential[] = [];

  // Learning Fundamentals Credential
  const learningBadges = unlockedBadges.filter(b => b.category === 'learning');
  if (learningBadges.length >= 3) {
    credentials.push({
      id: 'learning-fundamentals',
      name: 'Learning Fundamentals',
      description: 'Demonstrated commitment to continuous learning across multiple subjects',
      issuer: 'Funfinity Academy',
      badgeIds: learningBadges.map(b => b.id).slice(0, 5),
      issuedAt: new Date(),
      verificationCode: generateVerificationCode('learning-fundamentals'),
    });
  }

  // Streak Champion Credential
  const streakBadges = unlockedBadges.filter(b => b.category === 'streak');
  if (streakBadges.some(b => b.id === 'month-master')) {
    credentials.push({
      id: 'streak-champion',
      name: 'Streak Champion',
      description: 'Maintained exceptional consistency in learning habits',
      issuer: 'Funfinity Academy',
      badgeIds: streakBadges.map(b => b.id),
      issuedAt: new Date(),
      verificationCode: generateVerificationCode('streak-champion'),
    });
  }

  // Achievement Master Credential
  const achievementBadges = unlockedBadges.filter(b => b.category === 'achievement');
  if (achievementBadges.length >= 5) {
    credentials.push({
      id: 'achievement-master',
      name: 'Achievement Master',
      description: 'Earned multiple achievement badges demonstrating excellence',
      issuer: 'Funfinity Academy',
      badgeIds: achievementBadges.map(b => b.id).slice(0, 5),
      issuedAt: new Date(),
      verificationCode: generateVerificationCode('achievement-master'),
    });
  }

  // Subject Mastery Credential
  const masteryBadges = unlockedBadges.filter(b => b.category === 'mastery');
  if (masteryBadges.length >= 2) {
    credentials.push({
      id: 'subject-mastery',
      name: 'Subject Mastery',
      description: 'Demonstrated deep understanding in specific subject areas',
      issuer: 'Funfinity Academy',
      badgeIds: masteryBadges.map(b => b.id),
      issuedAt: new Date(),
      verificationCode: generateVerificationCode('subject-mastery'),
    });
  }

  return credentials;
}

/**
 * Generate a unique verification code for credentials
 */
function generateVerificationCode(seed: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${seed.substring(0, 4).toUpperCase()}-${timestamp}-${random}`.toUpperCase();
}

/**
 * Get badge rarity color for UI
 */
export function getBadgeRarityColor(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'from-gray-500 to-gray-400';
    case 'rare':
      return 'from-blue-500 to-cyan-500';
    case 'epic':
      return 'from-purple-500 to-pink-500';
    case 'legendary':
      return 'from-yellow-500 to-orange-500';
    default:
      return 'from-gray-500 to-gray-400';
  }
}

/**
 * Get badge rarity border color for UI
 */
export function getBadgeRarityBorder(rarity: Badge['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'border-gray-500/30';
    case 'rare':
      return 'border-blue-500/30';
    case 'epic':
      return 'border-purple-500/30';
    case 'legendary':
      return 'border-yellow-500/30';
    default:
      return 'border-gray-500/30';
  }
}

/**
 * Calculate badge progress percentage
 */
export function getBadgeProgress(badge: Badge): number {
  if (badge.unlocked) return 100;
  if (badge.progress !== undefined && badge.maxProgress !== undefined) {
    return Math.round((badge.progress / badge.maxProgress) * 100);
  }
  return 0;
}

/**
 * Sort badges by rarity and unlock status
 */
export function sortBadges(badges: Badge[]): Badge[] {
  const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
  
  return badges.sort((a, b) => {
    // Unlocked badges first
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    
    // Then by rarity
    const rarityDiff = rarityOrder[a.rarity] - rarityOrder[b.rarity];
    if (rarityDiff !== 0) return rarityDiff;
    
    // Then by progress (for unlocked badges)
    if (a.unlocked && b.unlocked) {
      return (b.unlockedAt?.getTime() || 0) - (a.unlockedAt?.getTime() || 0);
    }
    
    // For locked badges, sort by progress
    const aProgress = getBadgeProgress(a);
    const bProgress = getBadgeProgress(b);
    return bProgress - aProgress;
  });
}
