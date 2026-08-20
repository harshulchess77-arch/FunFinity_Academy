import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Cpu, Database, Zap, CheckCircle, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const diagnosticLogs = [
  "Initializing neural learning pathways...",
  "Calibrating adaptive curriculum engine...",
  "Analyzing academic profile data...",
  "Synthesizing personalized learning plan...",
  "Optimizing study schedule algorithms...",
  "Loading subject-specific resources...",
  "Configuring progress tracking system...",
  "Establishing gamification parameters...",
  "Finalizing user experience settings...",
  "Preparing dashboard interface...",
  "Setting up everything for you now...",
];

export function DeepAnalysis() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentLogIndex < diagnosticLogs.length) {
      const logTimer = setTimeout(() => {
        setLogs((prev) => [...prev, diagnosticLogs[currentLogIndex]]);
        setCurrentLogIndex((prev) => prev + 1);
      }, 800 + Math.random() * 400); // Random delay between 800-1200ms

      return () => clearTimeout(logTimer);
    } else if (currentLogIndex === diagnosticLogs.length && !isComplete) {
      // All logs complete, wait 2 seconds then show completion
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          navigate("/app");
        }, 2000);
      }, 1000);
    }
  }, [currentLogIndex, isComplete, navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="backdrop-blur-xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 sm:p-12 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6 shadow-lg shadow-blue-500/30"
            >
              <Cpu className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
              {isComplete ? "Setup Complete!" : "Deep Analysis in Progress"}
            </h2>
            <p className="text-foreground/80">
              {isComplete 
                ? "Your personalized learning experience is ready"
                : "We're optimizing your learning experience"
              }
            </p>
          </div>

          {/* Countdown Timer */}
          {!isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-bold font-mono text-gradient-brand">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-xs text-foreground/60 uppercase tracking-wider mt-2">Time Remaining</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((60 - timeLeft) / 60) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          )}

          {/* Terminal-style Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="backdrop-blur-md rounded-xl border border-white/10 bg-slate-950/80 p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-foreground/60 ml-2">terminal</span>
              </div>
              
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-green-500 shrink-0">›</span>
                    <span className="text-foreground/90">{log}</span>
                  </motion.div>
                ))}
                
                {!isComplete && currentLogIndex < diagnosticLogs.length && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-blue-500 shrink-0">›</span>
                    <span className="text-foreground/50">Processing...</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Processing Indicators */}
          {!isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {[
                { icon: Database, label: "Data Analysis", color: "from-blue-500 to-cyan-500" },
                { icon: Zap, label: "Optimization", color: "from-purple-500 to-pink-500" },
                { icon: Cpu, label: "AI Processing", color: "from-green-500 to-emerald-500" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs text-foreground/80">{item.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Completion Message */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-lg font-semibold text-white mb-2">Everything is ready!</p>
                <p className="text-foreground/80 text-sm">Redirecting to your dashboard...</p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <div className="inline-flex items-center gap-2 text-sm text-foreground/60">
                    <Rocket className="w-4 h-4" />
                    <span>Launching your learning journey</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 text-sm text-foreground/60"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Please wait while we optimize your experience</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
