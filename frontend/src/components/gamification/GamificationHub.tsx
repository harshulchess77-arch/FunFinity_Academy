import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Flame, Zap, Star, Target, Award, TrendingUp, Lock, CheckCircle2, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { useGamificationBackend } from "@/hooks/use-gamification-backend";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  deadline: Date;
  completed: boolean;
  progress: number;
  maxProgress: number;
}

const rarityColors = {
  common: "from-gray-500 to-gray-400",
  rare: "from-blue-500 to-cyan-500",
  epic: "from-purple-500 to-pink-500",
  legendary: "from-yellow-500 to-orange-500",
};

const rarityBorders = {
  common: "border-gray-500/30",
  rare: "border-blue-500/30",
  epic: "border-purple-500/30",
  legendary: "border-yellow-500/30",
};

export function GamificationHub() {
  const { stats, isLoading } = useGamificationBackend();
  const [activeTab, setActiveTab] = useState<"achievements" | "challenges" | "leaderboard">("achievements");

  const mockAchievements: Achievement[] = [
    {
      id: "first-lesson",
      title: "First Steps",
      description: "Complete your first lesson",
      icon: <Target className="w-6 h-6" />,
      rarity: "common",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "week-streak",
      title: "Week Warrior",
      description: "Maintain a 7-day learning streak",
      icon: <Flame className="w-6 h-6" />,
      rarity: "rare",
      unlocked: true,
      unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Score 100% on 5 quizzes",
      icon: <Star className="w-6 h-6" />,
      rarity: "epic",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
    },
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Complete 10 lessons before 8 AM",
      icon: <Clock className="w-6 h-6" />,
      rarity: "rare",
      unlocked: false,
      progress: 6,
      maxProgress: 10,
    },
    {
      id: "night-owl",
      title: "Night Owl",
      description: "Complete 10 lessons after 10 PM",
      icon: <Zap className="w-6 h-6" />,
      rarity: "rare",
      unlocked: false,
      progress: 2,
      maxProgress: 10,
    },
    {
      id: "perfect-streak",
      title: "Perfect Streak",
      description: "Maintain a 30-day streak with 100% daily goals",
      icon: <Trophy className="w-6 h-6" />,
      rarity: "legendary",
      unlocked: false,
      progress: 12,
      maxProgress: 30,
    },
  ];

  const mockChallenges: Challenge[] = [
    {
      id: "daily-quiz",
      title: "Daily Quiz Challenge",
      description: "Complete 3 quizzes today",
      xpReward: 150,
      deadline: new Date(Date.now() + 12 * 60 * 60 * 1000),
      completed: false,
      progress: 1,
      maxProgress: 3,
    },
    {
      id: "streak-boost",
      title: "Streak Booster",
      description: "Maintain your streak for 5 more days",
      xpReward: 300,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      completed: false,
      progress: 2,
      maxProgress: 5,
    },
    {
      id: "subject-master",
      title: "Subject Master",
      description: "Complete all lessons in Mathematics",
      xpReward: 500,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      completed: false,
      progress: 45,
      maxProgress: 100,
    },
  ];

  const totalXP = stats?.total_points_earned || 0;
  const currentStreak = stats?.current_streak || 0;
  const level = Math.floor(totalXP / 1000) + 1;
  const xpForNextLevel = level * 1000;
  const xpInCurrentLevel = totalXP % 1000;
  const progressToNextLevel = (xpInCurrentLevel / 1000) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="backdrop-blur-xl border-b border-white/10 bg-slate-900/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl font-bold text-white">Gamification Hub</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-white">{totalXP.toLocaleString()} XP</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-white/10">
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="font-bold text-white">{currentStreak} Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Level Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-lg font-bold text-white mb-1">Level {level}</h2>
              <p className="text-sm text-foreground/60">Keep learning to level up!</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-bold text-gradient-brand">{xpInCurrentLevel}</p>
              <p className="text-xs text-foreground/60">/ 1000 XP</p>
            </div>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressToNextLevel}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(["achievements", "challenges", "leaderboard"] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-slate-800/50 text-foreground/70 hover:bg-slate-700/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className={`p-5 rounded-2xl backdrop-blur-xl bg-slate-900/60 border ${rarityBorders[achievement.rarity]} transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${rarityColors[achievement.rarity]} flex items-center justify-center ${achievement.unlocked ? '' : 'opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      {!achievement.unlocked && (
                        <Lock className="w-5 h-5 text-foreground/40" />
                      )}
                      {achievement.unlocked && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-white mb-1">{achievement.title}</h3>
                    <p className="text-sm text-foreground/60 mb-3">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground/60">Progress</span>
                          <span className="text-white font-medium">{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    )}

                    {achievement.unlockedAt && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-xs text-foreground/40">
                          Unlocked {achievement.unlockedAt.toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    <div className="mt-3">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                        achievement.unlocked
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-slate-700/50 text-foreground/60'
                      }`}>
                        {achievement.rarity}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "challenges" && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                {mockChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display font-bold text-white">{challenge.title}</h3>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                            <Zap className="w-3 h-3" />
                            <span className="text-xs font-bold">+{challenge.xpReward} XP</span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/60 mb-3">{challenge.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-foreground/60">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {Math.ceil((challenge.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {challenge.completed && (
                        <CheckCircle2 className="w-8 h-8 text-green-500 shrink-0" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground/60">Progress</span>
                        <span className="text-white font-medium">{challenge.progress}/{challenge.maxProgress}</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(challenge.progress / challenge.maxProgress) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "leaderboard" && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 rounded-2xl backdrop-blur-xl bg-slate-900/60 border border-white/10">
                <div className="text-center mb-6">
                  <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                  <h2 className="font-display text-xl font-bold text-white">Global Leaderboard</h2>
                  <p className="text-sm text-foreground/60">Top learners this week</p>
                </div>

                <div className="space-y-3">
                  {[
                    { rank: 1, name: "Alex Chen", xp: 15420, avatar: "AC" },
                    { rank: 2, name: "Sarah Johnson", xp: 14250, avatar: "SJ" },
                    { rank: 3, name: "Mike Wilson", xp: 13100, avatar: "MW" },
                    { rank: 4, name: "Emily Davis", xp: 12800, avatar: "ED" },
                    { rank: 5, name: "You", xp: totalXP, avatar: "YU", isYou: true },
                  ].map((entry, index) => (
                    <motion.div
                      key={entry.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        entry.isYou
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                          : 'bg-slate-800/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        entry.rank === 1 ? 'bg-yellow-500' :
                        entry.rank === 2 ? 'bg-gray-400' :
                        entry.rank === 3 ? 'bg-amber-600' :
                        'bg-slate-600'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                        {entry.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">{entry.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-white">{entry.xp.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
