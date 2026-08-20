import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, Flame, Users, Award, Shield, BookOpen, Rocket, Zap, Target } from "lucide-react";
import { FunfinityIcon } from "@/components/brand/FunfinityLogo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CountUp } from "@/components/ui/count-up";
import { useRealtimeStats } from "@/hooks/use-realtime-stats";

type SubjectTheme = "math" | "science" | "social" | "english" | "other";

const subjectColor: Record<SubjectTheme, string> = {
  math: "bg-subject-math",
  science: "bg-subject-science",
  social: "bg-subject-social",
  english: "bg-subject-english",
  other: "bg-subject-other",
};

const subjectTextColor: Record<SubjectTheme, string> = {
  math: "text-subject-math",
  science: "text-subject-science",
  social: "text-subject-social",
  english: "text-subject-english",
  other: "text-subject-other",
};

const subjectBarColor: Record<SubjectTheme, string> = {
  math: "hsl(0, 72%, 50%)",
  science: "hsl(28, 90%, 52%)",
  social: "hsl(30, 50%, 38%)",
  english: "hsl(215, 80%, 50%)",
  other: "hsl(150, 60%, 38%)",
};

const courseCards = [
  { 
    title: "AP Calculus BC", 
    desc: "Advanced calculus", 
    progress: 78, 
    xp: "2,450", 
    theme: "math" as SubjectTheme 
  },
  { 
    title: "Physics I", 
    desc: "Mechanics & waves", 
    progress: 62, 
    xp: "1,890", 
    theme: "science" as SubjectTheme 
  },
  { 
    title: "World History", 
    desc: "Civilizations & empires", 
    progress: 45, 
    xp: "1,200", 
    theme: "social" as SubjectTheme 
  },
  { 
    title: "Creative Writing", 
    desc: "Stories & expression", 
    progress: 88, 
    xp: "3,100", 
    theme: "english" as SubjectTheme 
  },
  { 
    title: "Digital Art", 
    desc: "Design fundamentals", 
    progress: 34, 
    xp: "890", 
    theme: "other" as SubjectTheme 
  },
  { 
    title: "Computer Science", 
    desc: "Algorithms & logic", 
    progress: 56, 
    xp: "1,650", 
    theme: "other" as SubjectTheme 
  },
  { 
    title: "Chemistry", 
    desc: "Reactions & elements", 
    progress: 71, 
    xp: "2,100", 
    theme: "science" as SubjectTheme 
  },
  { 
    title: "Music Theory", 
    desc: "Rhythm & harmony", 
    progress: 29, 
    xp: "720", 
    theme: "other" as SubjectTheme 
  },
];

function VectorRocketAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const rocketY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -300]));
  const rocketRotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 15]));
  const rocketScale = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]));
  const flameOpacity = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.8, 1, 0.6, 0.9]));
  const flameScale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.5]));

  const particleCount = 20;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100
  }));

  return (
    <div ref={containerRef} className="relative w-full h-[500px] flex items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-blue/40"
          initial={{ 
            x: particle.x, 
            y: particle.y,
            opacity: 0
          }}
          animate={{
            y: [particle.y, particle.y - 100, particle.y],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Rocket SVG */}
      <motion.div
        style={{
          y: rocketY,
          rotate: rocketRotate,
          scale: rocketScale
        }}
        className="relative z-10"
      >
        <svg
          width="200"
          height="300"
          viewBox="0 0 200 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl"
        >
          {/* Rocket body */}
          <motion.path
            d="M100 20 L140 100 L140 220 L100 260 L60 220 L60 100 Z"
            fill="url(#rocketGradient)"
            stroke="url(#strokeGradient)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Window */}
          <circle cx="100" cy="80" r="25" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
          <motion.circle
            cx="100"
            cy="80"
            r="20"
            fill="#3b82f6"
            opacity={0.3}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Fins */}
          <motion.path
            d="M60 180 L30 240 L60 220"
            fill="#ef4444"
            stroke="#dc2626"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          <motion.path
            d="M140 180 L170 240 L140 220"
            fill="#ef4444"
            stroke="#dc2626"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Flame */}
          <motion.g
            style={{
              opacity: flameOpacity,
              scale: flameScale
            }}
            animate={{
              y: [0, -5, 0]
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <ellipse cx="100" cy="280" rx="20" ry="40" fill="#f97316" />
            <ellipse cx="100" cy="275" rx="12" ry="30" fill="#fbbf24" />
            <ellipse cx="100" cy="270" rx="6" ry="20" fill="#fef3c7" />
          </motion.g>

          {/* Gradients */}
          <defs>
            <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Speed lines */}
        <motion.div
          className="absolute -left-20 top-1/2 -translate-y-1/2"
          animate={{ x: [-20, -40], opacity: [0.8, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          <div className="w-16 h-1 bg-gradient-to-r from-blue/60 to-transparent rounded-full" />
        </motion.div>
        <motion.div
          className="absolute -left-16 top-1/3"
          animate={{ x: [-16, -35], opacity: [0.6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        >
          <div className="w-12 h-0.5 bg-gradient-to-r from-orange/60 to-transparent rounded-full" />
        </motion.div>
        <motion.div
          className="absolute -left-24 top-2/3"
          animate={{ x: [-24, -45], opacity: [0.7, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }}
        >
          <div className="w-14 h-0.5 bg-gradient-to-r from-pink/60 to-transparent rounded-full" />
        </motion.div>
      </motion.div>

      {/* Course preview cards floating around */}
      {courseCards.slice(0, 4).map((course, i) => (
        <motion.div
          key={course.title}
          className="absolute"
          style={{
            left: `${20 + i * 25}%`,
            top: `${30 + (i % 2) * 40}%`
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ 
            opacity: [0.6, 0.9, 0.6],
            scale: [0.9, 1, 0.9],
            rotate: [-10, 5, -10]
          }}
          transition={{ 
            duration: 4 + i * 0.5, 
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          <div className={`p-3 rounded-xl backdrop-blur-md bg-slate-900/60 border border-white/10 shadow-lg ${i === 0 ? 'w-32' : 'w-28'}`}>
            <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${subjectColor[course.theme]}`}>
              <FunfinityIcon size="sm" className="text-white" />
            </div>
            <p className="text-[9px] font-bold text-white truncate">{course.title}</p>
            <p className="text-[8px] text-white/70">{course.progress}%</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const { stats, isLoading } = useRealtimeStats();

  const trustStats = [
    { icon: Users, value: stats.studentsCount, label: "Students", suffix: "+" },
    { icon: BookOpen, value: stats.coursesCount, label: "Courses", suffix: "+" },
    { icon: Award, value: stats.averageRating, label: "Rating", suffix: "/5", decimals: 1 },
    { icon: Shield, value: stats.userBenefits, label: "User Benefits", suffix: "+" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex flex-col justify-center overflow-hidden" aria-label="Hero section - Funfinity Academy learning platform">
      <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-orange/10 to-pink/10" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[500px] lg:h-[500px] bg-blue/30 rounded-full blur-3xl opacity-50" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] bg-pink/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] bg-orange/30 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-1 flex items-center py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto w-full">
          {/* Left - Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-blue/20 via-orange/20 to-pink/20 backdrop-blur-sm border-2 border-blue/30 mb-3 sm:mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange" />
              <span className="text-xs font-medium text-foreground">
                Where curiosity meets depth
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 md:mb-6 leading-[1.15] sm:leading-[1.2]"
            >
              FunFinity Academy
              <br />
              <span className="text-gradient-brand">Personalized Learning for Grades 8-12</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-foreground/90 max-w-lg mb-4 sm:mb-6 md:mb-8 leading-relaxed font-medium"
            >
              Master mathematics, science, computer science, and humanities through adaptive AI-powered lessons. Built for students, trusted by parents, and designed by educators. COPPA and GDPR compliant.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-6 sm:mb-8"
            >
              <Button
                variant="hero"
                size="lg"
                className="group bg-gradient-to-r from-blue-dark to-orange-dark hover:from-blue hover:to-orange text-white font-extrabold shadow-xl shadow-blue/30 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-105 text-sm sm:text-base"
                asChild
              >
                <Link to="/auth">
                  Start Learning Now - Free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-foreground/30 text-foreground hover:text-foreground hover:bg-foreground/10 font-medium transition-all"
                asChild
              >
                <Link to="/demo">
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* Risk Reversal Copy */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-2 text-xs text-foreground/80"
            >
              <Shield className="w-3.5 h-3.5 text-green-500" />
              <span>14-day free trial. No credit card required. Cancel anytime.</span>
            </motion.div>

            {/* Subject color legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/90"
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue shadow-glow-blue" />
                <span className="font-medium">Math</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange shadow-glow-orange" />
                <span className="font-medium">Science</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-pink shadow-glow-pink" />
                <span className="font-medium">Social Studies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue shadow-glow-blue" />
                <span className="font-medium">English</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange shadow-glow-orange" />
                <span className="font-medium">Other</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Vector Rocket Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <VectorRocketAnimation />
          </motion.div>
        </div>
      </div>

      {/* Trust Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 border-t-2 border-foreground/10 bg-gradient-to-r from-blue/20 via-orange/20 to-pink/20 backdrop-blur-sm"
        aria-label="Trust statistics"
      >
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16">
            {trustStats.map((stat, index) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  index === 0 ? 'bg-blue/20 border border-blue/30' :
                  index === 1 ? 'bg-orange/20 border border-orange/30' :
                  index === 2 ? 'bg-pink/20 border border-pink/30' :
                  'bg-blue/20 border border-blue/30'
                }`} aria-hidden="true">
                  <stat.icon className={`w-4 h-4 ${
                    index === 0 ? 'text-blue' :
                    index === 1 ? 'text-orange' :
                    index === 2 ? 'text-pink' :
                    'text-blue'
                  }`} />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground leading-none" aria-label={`${stat.label}: ${stat.value}${stat.suffix || ''}`}>
                    <CountUp
                      end={stat.value}
                      duration={2}
                      delay={0.8 + index * 0.1}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </p>
                  <p className="text-[11px] text-foreground/90 mt-0.5 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Social Proof & Trust Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 border-t border-foreground/10 bg-background/90 backdrop-blur-sm py-6 sm:py-8"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm font-medium text-foreground/80 uppercase tracking-wider">Trusted by students worldwide</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {[
              { name: "Featured in TechCrunch", icon: "📰" },
              { name: "EdTech Award Winner", icon: "🏆" },
              { name: "4.8/5 Rating", icon: "⭐" },
              { name: "GDPR Compliant", icon: "🔒" },
              { name: "COPPA Safe", icon: "🛡️" },
            ].map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/20"
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-sm font-medium text-foreground/90">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
