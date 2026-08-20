/**
 * Adaptive Learning System
 * Real-time difficulty adjustments based on user test scores and onboarding interactions
 */

export interface AdaptiveMetrics {
  recentQuizScores: number[];
  averageScore: number;
  streak: number;
  timeSpentOnQuestions: number[];
  incorrectTopics: string[];
  masteryLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface DifficultyAdjustment {
  newDifficulty: 'beginner' | 'intermediate' | 'advanced';
  reason: string;
  confidence: number;
}

export interface LearningPath {
  recommendedTopics: string[];
  suggestedPacing: 'slow' | 'normal' | 'accelerated';
  focusAreas: string[];
  skipTopics: string[];
}

/**
 * Calculate adaptive metrics from user performance data
 */
export function calculateAdaptiveMetrics(
  quizSubmissions: any[],
  userProgress: any
): AdaptiveMetrics {
  const recentScores = quizSubmissions
    .slice(-10)
    .map((q) => q.score || 0);
  
  const averageScore = recentScores.length > 0
    ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length
    : 0;

  const streak = userProgress?.current_streak || 0;

  const timeSpentOnQuestions = quizSubmissions
    .map((q) => q.time_taken || 60);

  const incorrectTopics = quizSubmissions
    .filter((q) => (q.score || 0) < 70)
    .map((q) => q.topic || 'general');

  // Determine mastery level based on average score and consistency
  let masteryLevel: AdaptiveMetrics['masteryLevel'] = 'beginner';
  if (averageScore >= 90 && recentScores.every(s => s >= 80)) {
    masteryLevel = 'expert';
  } else if (averageScore >= 75) {
    masteryLevel = 'advanced';
  } else if (averageScore >= 60) {
    masteryLevel = 'intermediate';
  }

  return {
    recentQuizScores: recentScores,
    averageScore,
    streak,
    timeSpentOnQuestions,
    incorrectTopics,
    masteryLevel,
  };
}

/**
 * Determine if difficulty should be adjusted
 */
export function shouldAdjustDifficulty(
  metrics: AdaptiveMetrics,
  currentDifficulty: 'beginner' | 'intermediate' | 'advanced'
): DifficultyAdjustment | null {
  const { averageScore, recentQuizScores, masteryLevel } = metrics;

  // Need at least 3 recent quizzes to make a decision
  if (recentQuizScores.length < 3) {
    return null;
  }

  // Check for consistent high performance (upgrade difficulty)
  if (averageScore >= 85 && recentQuizScores.every(s => s >= 80)) {
    if (currentDifficulty === 'beginner') {
      return {
        newDifficulty: 'intermediate',
        reason: 'Consistently scoring above 80% - ready for intermediate content',
        confidence: 0.85,
      };
    } else if (currentDifficulty === 'intermediate') {
      return {
        newDifficulty: 'advanced',
        reason: 'Consistently scoring above 80% - ready for advanced challenges',
        confidence: 0.85,
      };
    }
  }

  // Check for struggling performance (downgrade difficulty)
  if (averageScore < 60 && recentQuizScores.every(s => s < 70)) {
    if (currentDifficulty === 'advanced') {
      return {
        newDifficulty: 'intermediate',
        reason: 'Scoring below 60% consistently - reviewing intermediate concepts',
        confidence: 0.9,
      };
    } else if (currentDifficulty === 'intermediate') {
      return {
        newDifficulty: 'beginner',
        reason: 'Scoring below 60% consistently - reinforcing fundamentals',
        confidence: 0.9,
      };
    }
  }

  // Check for mastery level mismatch
  if (masteryLevel === 'expert' && currentDifficulty !== 'advanced') {
    return {
      newDifficulty: 'advanced',
      reason: 'Mastery level indicates readiness for advanced content',
      confidence: 0.8,
    };
  }

  return null;
}

/**
 * Generate personalized learning path based on adaptive metrics
 */
export function generateLearningPath(
  metrics: AdaptiveMetrics,
  availableTopics: string[]
): LearningPath {
  const { incorrectTopics, averageScore, timeSpentOnQuestions } = metrics;

  // Focus on topics where user struggles
  const focusAreas = incorrectTopics.length > 0
    ? [...new Set(incorrectTopics)].slice(0, 3)
    : [];

  // Skip topics where user has shown mastery
  const skipTopics = availableTopics.filter(topic => 
    !incorrectTopics.includes(topic) && averageScore > 85
  ).slice(0, 2);

  // Determine pacing based on time spent and performance
  let suggestedPacing: LearningPath['suggestedPacing'] = 'normal';
  const avgTime = timeSpentOnQuestions.length > 0
    ? timeSpentOnQuestions.reduce((a, b) => a + b, 0) / timeSpentOnQuestions.length
    : 60;

  if (avgTime > 90 && averageScore < 70) {
    suggestedPacing = 'slow';
  } else if (avgTime < 30 && averageScore > 85) {
    suggestedPacing = 'accelerated';
  }

  // Recommend topics based on focus areas
  const recommendedTopics = focusAreas.length > 0
    ? focusAreas
    : availableTopics.slice(0, 5);

  return {
    recommendedTopics,
    suggestedPacing,
    focusAreas,
    skipTopics,
  };
}

/**
 * Calculate adaptive quiz difficulty
 */
export function calculateAdaptiveQuizDifficulty(
  metrics: AdaptiveMetrics,
  baseDifficulty: number
): number {
  const { averageScore, masteryLevel } = metrics;

  let adjustedDifficulty = baseDifficulty;

  // Adjust based on average score
  if (averageScore > 85) {
    adjustedDifficulty += 0.2;
  } else if (averageScore < 60) {
    adjustedDifficulty -= 0.2;
  }

  // Adjust based on mastery level
  const masteryMultiplier = {
    beginner: 0.8,
    intermediate: 1.0,
    advanced: 1.2,
    expert: 1.4,
  };

  adjustedDifficulty *= masteryMultiplier[masteryLevel];

  // Ensure difficulty stays within bounds
  return Math.max(0.1, Math.min(1.0, adjustedDifficulty));
}

/**
 * Get personalized hints based on user performance
 */
export function getAdaptiveHints(
  metrics: AdaptiveMetrics,
  currentTopic: string
): string[] {
  const { incorrectTopics, averageScore, timeSpentOnQuestions } = metrics;

  const hints: string[] = [];

  // Topic-specific hints
  if (incorrectTopics.includes(currentTopic)) {
    hints.push("Review the fundamentals of this topic before proceeding");
    hints.push("Try breaking down the problem into smaller steps");
  }

  // Performance-based hints
  if (averageScore < 60) {
    hints.push("Take your time - accuracy is more important than speed");
    hints.push("Consider reviewing related lessons before attempting this quiz");
  }

  // Time-based hints
  const avgTime = timeSpentOnQuestions.length > 0
    ? timeSpentOnQuestions.reduce((a, b) => a + b, 0) / timeSpentOnQuestions.length
    : 60;

  if (avgTime > 90) {
    hints.push("You're spending a lot of time on questions - try to identify patterns");
  } else if (avgTime < 20 && averageScore < 70) {
    hints.push("Slow down and read each question carefully");
  }

  return hints;
}

/**
 * Generate adaptive feedback message
 */
export function generateAdaptiveFeedback(
  score: number,
  metrics: AdaptiveMetrics,
  previousScore?: number
): string {
  const { averageScore, streak } = metrics;

  if (score >= 90) {
    return "Excellent work! You've mastered this topic. Consider moving to more challenging content.";
  }

  if (score >= 75) {
    if (previousScore && score > previousScore) {
      return "Great improvement! You're making steady progress. Keep up the momentum!";
    }
    return "Good job! You're understanding the material well. A bit more practice will help you master it.";
  }

  if (score >= 60) {
    return "You're on the right track. Review the concepts you missed and try again - you'll get there!";
  }

  if (streak > 3) {
    return "Don't let this setback break your streak! Take a break, review the material, and come back stronger.";
  }

  return "This topic needs more attention. Review the related lessons and practice the fundamentals before trying again.";
}
