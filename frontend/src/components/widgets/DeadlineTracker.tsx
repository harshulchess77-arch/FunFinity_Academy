import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertCircle, CheckCircle2, Calendar, MoreVertical, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: Date;
  status: "pending" | "in_progress" | "completed";
  progress: number;
  priority: "high" | "medium" | "low";
}

interface DeadlineTrackerProps {
  assignments?: Assignment[];
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "AP Calculus BC - Chapter 5 Quiz",
    subject: "Mathematics",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: "in_progress",
    progress: 65,
    priority: "high"
  },
  {
    id: "2",
    title: "Physics Lab Report - Newton's Laws",
    subject: "Physics",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: "pending",
    progress: 0,
    priority: "medium"
  },
  {
    id: "3",
    title: "World History Essay - Industrial Revolution",
    subject: "History",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "in_progress",
    progress: 30,
    priority: "medium"
  },
  {
    id: "4",
    title: "Creative Writing Portfolio Draft",
    subject: "English",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    status: "pending",
    progress: 0,
    priority: "low"
  },
];

export function DeadlineTracker({ assignments = mockAssignments }: DeadlineTrackerProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "in_progress" | "completed">("all");

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true;
    return assignment.status === filter;
  });

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return "from-green-500 to-emerald-500";
      case "in_progress":
        return "from-blue-500 to-cyan-500";
      case "pending":
        return "from-orange-500 to-red-500";
    }
  };

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return CheckCircle2;
      case "in_progress":
        return Clock;
      case "pending":
        return AlertCircle;
    }
  };

  const getPriorityColor = (priority: Assignment["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
    }
  };

  const getTimeRemaining = (dueDate: Date) => {
    const now = new Date();
    const diff = dueDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return "Due soon";
  };

  const CircularProgress = ({ progress, size = 40 }: { progress: number; size?: number }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#progressGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">Assignments</h3>
            <p className="text-xs text-foreground/60">{assignments.length} total tasks</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <MoreVertical className="w-5 h-5 text-foreground/60" />
        </motion.button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(["all", "pending", "in_progress", "completed"] as const).map((filterType) => (
          <motion.button
            key={filterType}
            onClick={() => setFilter(filterType)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              filter === filterType
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                : "bg-slate-800/50 text-foreground/70 hover:bg-slate-700/50"
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1).replace("_", " ")}
            <span className="ml-1.5 opacity-70">
              {filterType === "all"
                ? assignments.length
                : assignments.filter((a) => a.status === filterType).length}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Assignment List */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {filteredAssignments.map((assignment, index) => {
            const StatusIcon = getStatusIcon(assignment.status);
            const timeRemaining = getTimeRemaining(assignment.dueDate);
            const isUrgent = assignment.dueDate.getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;

            return (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-4 rounded-xl backdrop-blur-md bg-slate-800/50 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  {/* Progress Ring */}
                  <div className="relative shrink-0">
                    <CircularProgress progress={assignment.progress} size={48} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">{assignment.progress}%</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-white text-sm truncate">{assignment.title}</h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(assignment.priority)} shrink-0`} />
                    </div>
                    <p className="text-xs text-foreground/60 mb-2">{assignment.subject}</p>
                    
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${
                        isUrgent ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">{timeRemaining}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r ${getStatusColor(assignment.status)} bg-opacity-20 text-white`}>
                        <StatusIcon className="w-3 h-3" />
                        <span className="text-xs font-medium capitalize">
                          {assignment.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground/40" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredAssignments.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3 opacity-50" />
          <p className="text-foreground/60 text-sm">No assignments found</p>
        </motion.div>
      )}

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 pt-4 border-t border-white/10"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 text-white text-sm font-medium hover:from-blue-500/30 hover:to-purple-500/30 transition-all"
        >
          View All Assignments
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
