import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, BookOpen, Calculator, FlaskConical, Globe, GraduationCap, Check, Target } from "lucide-react";
import { useState } from "react";
import { 
  gradeLevelSchema, 
  subjectsSchema, 
  goalsSchema,
  type AcademicProfileInput 
} from "@/lib/validation-schemas";

interface AcademicProfilingProps {
  onComplete: (data: AcademicProfileData) => void;
}

export interface AcademicProfileData {
  gradeLevel: string;
  subjects: string[];
  testScores: {
    math?: number;
    reading?: number;
    science?: number;
  };
  goals: string[];
}

const gradeLevels = [
  { value: "8", label: "8th Grade" },
  { value: "9", label: "9th Grade (Freshman)" },
  { value: "10", label: "10th Grade (Sophomore)" },
  { value: "11", label: "11th Grade (Junior)" },
  { value: "12", label: "12th Grade (Senior)" },
];

const subjects = [
  { id: "math", label: "Mathematics", icon: Calculator, color: "from-blue-500 to-cyan-500" },
  { id: "science", label: "Science", icon: FlaskConical, color: "from-green-500 to-emerald-500" },
  { id: "english", label: "English/Language Arts", icon: BookOpen, color: "from-purple-500 to-pink-500" },
  { id: "social", label: "Social Studies", icon: Globe, color: "from-orange-500 to-red-500" },
  { id: "foreign", label: "Foreign Language", icon: Globe, color: "from-yellow-500 to-orange-500" },
  { id: "arts", label: "Arts & Music", icon: GraduationCap, color: "from-pink-500 to-rose-500" },
];

const goals = [
  "Improve grades in specific subjects",
  "Prepare for standardized tests (SAT/ACT)",
  "Get college-ready",
  "Explore new subjects",
  "Build study skills",
  "Advanced placement courses",
];

export function AcademicProfiling({ onComplete }: AcademicProfilingProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AcademicProfileData>({
    gradeLevel: "",
    subjects: [],
    testScores: {},
    goals: [],
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSubject = (subjectId: string) => {
    setData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter((s) => s !== subjectId)
        : [...prev.subjects, subjectId],
    }));
  };

  const toggleGoal = (goal: string) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const updateTestScore = (subject: string, value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setData((prev) => ({
      ...prev,
      testScores: {
        ...prev.testScores,
        [subject]: numValue,
      },
    }));
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step > i + 1
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : step === i + 1
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-slate-800 text-foreground/50'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {step > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
            </motion.div>
            {i < totalSteps - 1 && (
              <motion.div
                className={`w-16 h-1 mx-2 rounded-full ${
                  step > i + 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-slate-800'
                }`}
                initial={{ width: 0 }}
                animate={{ width: step > i + 1 ? '100%' : '0%' }}
                transition={{ delay: 0.2 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1GradeLevel
            gradeLevel={data.gradeLevel}
            onSelect={(grade) => setData((prev) => ({ ...prev, gradeLevel: grade }))}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2Subjects
            selectedSubjects={data.subjects}
            onToggle={toggleSubject}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <Step3TestScores
            testScores={data.testScores}
            onUpdate={updateTestScore}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 4 && (
          <Step4Goals
            selectedGoals={data.goals}
            onToggle={toggleGoal}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Step1GradeLevel({
  gradeLevel,
  onSelect,
  onNext,
}: {
  gradeLevel: string;
  onSelect: (grade: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-4 shadow-lg"
        >
          <GraduationCap className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">What's Your Grade Level?</h2>
        <p className="text-foreground/80">Select your current grade to personalize your curriculum</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {gradeLevels.map((grade) => (
          <motion.button
            key={grade.value}
            onClick={() => onSelect(grade.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-6 rounded-xl backdrop-blur-md border transition-all ${
              gradeLevel === grade.value
                ? 'bg-slate-900/80 border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-slate-900/60 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${
                gradeLevel === grade.value ? 'text-blue-500' : 'text-foreground'
              }`}>
                {grade.label.split(' ')[0]}
              </div>
              <div className="text-sm text-foreground/80">{grade.label.split(' ').slice(1).join(' ')}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        disabled={!gradeLevel}
        whileHover={{ scale: gradeLevel ? 1.05 : 1 }}
        whileTap={{ scale: gradeLevel ? 0.95 : 1 }}
        className={`w-full py-4 rounded-xl font-semibold text-base transition-all ${
          gradeLevel
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
            : 'bg-slate-800/50 text-foreground/50 cursor-not-allowed'
        }`}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}

function Step2Subjects({
  selectedSubjects,
  onToggle,
  onNext,
  onBack,
}: {
  selectedSubjects: string[];
  onToggle: (subjectId: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4 shadow-lg"
        >
          <BookOpen className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Select Your Subjects</h2>
        <p className="text-foreground/80">Choose the subjects you want to focus on</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          const isSelected = selectedSubjects.includes(subject.id);
          return (
            <motion.button
              key={subject.id}
              onClick={() => onToggle(subject.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-xl backdrop-blur-md border transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900/80 border-white/20'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedSubject"
                  className={`absolute inset-0 bg-gradient-to-r ${subject.color} opacity-20`}
                />
              )}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-white text-center">{subject.label}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-4 rounded-xl font-semibold text-base bg-slate-800/50 text-foreground/80 hover:bg-slate-700/50 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          disabled={selectedSubjects.length === 0}
          whileHover={{ scale: selectedSubjects.length > 0 ? 1.05 : 1 }}
          whileTap={{ scale: selectedSubjects.length > 0 ? 0.95 : 1 }}
          className={`flex-1 py-4 rounded-xl font-semibold text-base transition-all ${
            selectedSubjects.length > 0
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
              : 'bg-slate-800/50 text-foreground/50 cursor-not-allowed'
          }`}
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}

function Step3TestScores({
  testScores,
  onUpdate,
  onNext,
  onBack,
}: {
  testScores: { math?: number; reading?: number; science?: number };
  onUpdate: (subject: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4 shadow-lg"
        >
          <Calculator className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">Test Scores (Optional)</h2>
        <p className="text-foreground/80">Share your recent test scores to help us personalize your learning path</p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          { id: "math", label: "Math", icon: Calculator, color: "from-blue-500 to-cyan-500" },
          { id: "reading", label: "Reading/Writing", icon: BookOpen, color: "from-purple-500 to-pink-500" },
          { id: "science", label: "Science", icon: FlaskConical, color: "from-green-500 to-emerald-500" },
        ].map((subject) => {
          const Icon = subject.icon;
          return (
            <motion.div
              key={subject.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl backdrop-blur-md bg-slate-900/60 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${subject.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-white mb-2">{subject.label}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Score (0-100)"
                    value={testScores[subject.id as keyof typeof testScores] || ""}
                    onChange={(e) => onUpdate(subject.id, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder-foreground/50 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-4 rounded-xl font-semibold text-base bg-slate-800/50 text-foreground/80 hover:bg-slate-700/50 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all"
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}

function Step4Goals({
  selectedGoals,
  onToggle,
  onNext,
  onBack,
}: {
  selectedGoals: string[];
  onToggle: (goal: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-4 shadow-lg"
        >
          <Target className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">What Are Your Goals?</h2>
        <p className="text-foreground/80">Select your learning goals to customize your experience</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {goals.map((goal) => {
          const isSelected = selectedGoals.includes(goal);
          return (
            <motion.button
              key={goal}
              onClick={() => onToggle(goal)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-xl backdrop-blur-md border transition-all text-left ${
                isSelected
                  ? 'bg-slate-900/80 border-blue-500 shadow-lg shadow-blue-500/20'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-white/30'
                }`}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-foreground/80'}`}>
                  {goal}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-4 rounded-xl font-semibold text-base bg-slate-800/50 text-foreground/80 hover:bg-slate-700/50 transition-all"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all"
        >
          Complete Profile
        </motion.button>
      </div>
    </motion.div>
  );
}
