import { motion } from "framer-motion";
import { GraduationCap, Users, Building2, Award, Zap, Target, BookOpen, TrendingUp, Shield, Clock, Globe, Star } from "lucide-react";
import { useState } from "react";

type AudienceType = "students" | "teachers" | "parents" | "institutions";

const audienceData = {
  students: {
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
    title: "For Students",
    description: "Unlock your full potential with AI-powered learning",
    features: [
      { icon: Zap, title: "Adaptive Learning", desc: "Personalized curriculum that adapts to your pace" },
      { icon: Target, title: "Goal Tracking", desc: "Set and achieve academic milestones" },
      { icon: BookOpen, title: "50+ Courses", desc: "Comprehensive subjects from Math to Humanities" },
      { icon: TrendingUp, title: "Progress Analytics", desc: "Real-time insights into your learning journey" }
    ]
  },
  teachers: {
    icon: Users,
    color: "from-purple-500 to-pink-500",
    title: "For Teachers",
    description: "Streamline your teaching with powerful tools",
    features: [
      { icon: BookOpen, title: "Course Builder", desc: "Create and manage engaging courses" },
      { icon: Shield, title: "Assessment Tools", desc: "Automated grading and feedback systems" },
      { icon: Clock, title: "Time Saving", desc: "Reduce administrative workload by 40%" },
      { icon: Globe, title: "Global Reach", desc: "Teach students from anywhere in the world" }
    ]
  },
  parents: {
    icon: Users,
    color: "from-orange-500 to-red-500",
    title: "For Parents",
    description: "Stay connected to your child's education",
    features: [
      { icon: Shield, title: "Safe Environment", desc: "COPPA and GDPR compliant platform" },
      { icon: TrendingUp, title: "Progress Reports", desc: "Detailed insights into your child's growth" },
      { icon: Clock, title: "Flexible Scheduling", desc: "Learning that fits your family's schedule" },
      { icon: Star, title: "Quality Content", desc: "Curriculum designed by expert educators" }
    ]
  },
  institutions: {
    icon: Building2,
    color: "from-green-500 to-emerald-500",
    title: "For Institutions",
    description: "Scale your educational programs efficiently",
    features: [
      { icon: Globe, title: "White-Label Solution", desc: "Custom branding for your institution" },
      { icon: Shield, title: "Enterprise Security", desc: "Advanced security and compliance features" },
      { icon: TrendingUp, title: "Scalable Platform", desc: "Support for thousands of students" },
      { icon: Award, title: "Analytics Dashboard", desc: "Comprehensive institutional insights" }
    ]
  }
};

export function ValuePropositions() {
  const [activeAudience, setActiveAudience] = useState<AudienceType>("students");

  return (
    <section className="relative py-20 sm:py-32 overflow-hidden" aria-label="Value propositions for different audiences">
      {/* Background ambient lighting */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6"
          >
            Built for <span className="text-gradient-brand">Everyone</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto"
          >
            Discover how FunFinity Academy transforms learning for students, teachers, parents, and educational institutions.
          </motion.p>
        </motion.div>

        {/* Audience Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          {(Object.keys(audienceData) as AudienceType[]).map((audience) => {
            const data = audienceData[audience];
            const Icon = data.icon;
            const isActive = activeAudience === audience;

            return (
              <motion.button
                key={audience}
                onClick={() => setActiveAudience(audience)}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${data.color}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  {data.title}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active Audience Content */}
        <motion.div
          key={activeAudience}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-r ${audienceData[activeAudience].color} mb-4 sm:mb-6 shadow-lg`}
            >
              {(() => {
                const Icon = audienceData[activeAudience].icon;
                return <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />;
              })()}
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display text-2xl sm:text-3xl font-bold mb-3"
            >
              {audienceData[activeAudience].title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base sm:text-lg text-foreground/80"
            >
              {audienceData[activeAudience].description}
            </motion.p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {audienceData[activeAudience].features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)"
                }}
                className="p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-slate-900/60 border border-white/10 transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${audienceData[activeAudience].color} mb-4 group-hover:shadow-lg transition-shadow`}>
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h4>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
