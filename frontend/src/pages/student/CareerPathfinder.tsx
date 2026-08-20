import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/use-auth';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Brain, 
  Code, 
  Palette, 
  Briefcase,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CareerAssessment {
  id: string;
  user_id: string;
  interests: string[];
  skills: string[];
  learning_style: string;
  career_goals: string[];
  strengths: string[];
  areas_for_improvement: string[];
  recommended_paths: string[];
  created_at: string;
  updated_at: string;
}

interface Question {
  id: string;
  category: string;
  question: string;
  options: { value: string; label: string; icon: any }[];
}

const careerQuestions: Question[] = [
  {
    id: 'interests',
    category: 'Interests',
    question: 'What subjects excite you the most?',
    options: [
      { value: 'technology', label: 'Technology & Coding', icon: Code },
      { value: 'creative', label: 'Art & Design', icon: Palette },
      { value: 'business', label: 'Business & Leadership', icon: Briefcase },
      { value: 'science', label: 'Science & Research', icon: Brain },
    ]
  },
  {
    id: 'skills',
    category: 'Skills',
    question: 'What are your strongest skills?',
    options: [
      { value: 'problem-solving', label: 'Problem Solving', icon: Target },
      { value: 'creativity', label: 'Creative Thinking', icon: Sparkles },
      { value: 'communication', label: 'Communication', icon: Briefcase },
      { value: 'analytical', label: 'Analytical Thinking', icon: Brain },
    ]
  },
  {
    id: 'learning-style',
    category: 'Learning Style',
    question: 'How do you learn best?',
    options: [
      { value: 'visual', label: 'Visual (Diagrams, Charts)', icon: Palette },
      { value: 'auditory', label: 'Auditory (Listening, Discussions)', icon: Briefcase },
      { value: 'kinesthetic', label: 'Hands-on (Building, Creating)', icon: Code },
      { value: 'reading', label: 'Reading & Writing', icon: Brain },
    ]
  },
  {
    id: 'career-goals',
    category: 'Career Goals',
    question: 'What type of work environment appeals to you?',
    options: [
      { value: 'startup', label: 'Fast-paced Startup', icon: Rocket },
      { value: 'corporate', label: 'Established Corporation', icon: Briefcase },
      { value: 'freelance', label: 'Freelance/Remote', icon: Code },
      { value: 'research', label: 'Research/Academic', icon: Brain },
    ]
  },
  {
    id: 'strengths',
    category: 'Strengths',
    question: 'What do others often praise you for?',
    options: [
      { value: 'leadership', label: 'Leadership & Teamwork', icon: Briefcase },
      { value: 'innovation', label: 'Creative Innovation', icon: Sparkles },
      { value: 'technical', label: 'Technical Skills', icon: Code },
      { value: 'organization', label: 'Organization & Planning', icon: Target },
    ]
  }
];

const careerPaths = {
  technology: [
    'Software Engineer',
    'Data Scientist',
    'Cybersecurity Specialist',
    'AI/ML Engineer',
    'Full Stack Developer'
  ],
  creative: [
    'UX/UI Designer',
    'Digital Artist',
    'Content Creator',
    'Game Designer',
    'Creative Director'
  ],
  business: [
    'Product Manager',
    'Business Analyst',
    'Marketing Manager',
    'Entrepreneur',
    'Consultant'
  ],
  science: [
    'Research Scientist',
    'Biomedical Engineer',
    'Environmental Scientist',
    'Data Analyst',
    'Lab Director'
  ]
};

export default function CareerPathfinder() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [assessment, setAssessment] = useState<CareerAssessment | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadExistingAssessment();
  }, [user]);

  const loadExistingAssessment = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('career_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data && !error) {
        setAssessment(data);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateCareerPaths = (userAnswers: Record<string, string>) => {
    const interest = userAnswers['interests'];
    const paths = careerPaths[interest as keyof typeof careerPaths] || [];
    
    const recommendations = paths.slice(0, 3);
    const strengths = [userAnswers['strengths']];
    const improvements = ['Public Speaking', 'Advanced Mathematics', 'Leadership'];
    
    return {
      recommended_paths: recommendations,
      strengths,
      areas_for_improvement: improvements,
      interests: [interest],
      skills: [userAnswers['skills']],
      learning_style: userAnswers['learning-style'],
      career_goals: [userAnswers['career-goals']]
    };
  };

  const handleSubmit = async () => {
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      const careerData = calculateCareerPaths(answers);
      
      const { data, error } = await supabase
        .from('career_profiles')
        .upsert({
          user_id: user.id,
          ...careerData,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      setAssessment(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error saving assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep < careerQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setAssessment(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showResults && assessment) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Career Path Results
            </h1>
            <p className="text-gray-600">
              Based on your assessment, here are your personalized career recommendations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="text-purple-600" />
                  Recommended Career Paths
                </CardTitle>
                <CardDescription>
                  Top career matches based on your interests and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.recommended_paths.map((path, index) => (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg"
                    >
                      <Badge variant="secondary" className="bg-purple-600 text-white">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{path}</span>
                      <TrendingUp className="ml-auto text-green-600" size={16} />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="text-blue-600" />
                  Your Strengths
                </CardTitle>
                <CardDescription>
                  Areas where you excel and should focus on
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.strengths.map((strength, index) => (
                    <motion.div
                      key={strength}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <CheckCircle className="text-blue-600" size={20} />
                      <span className="font-medium">{strength}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="text-green-600" />
                  Learning Style
                </CardTitle>
                <CardDescription>
                  How you learn best
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-700 capitalize">
                    {assessment.learning_style}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Tailor your study methods to match this learning style for better results.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="text-orange-600" />
                  Areas for Growth
                </CardTitle>
                <CardDescription>
                  Skills to develop for career advancement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.areas_for_improvement.map((area, index) => (
                    <motion.div
                      key={area}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                    >
                      <ArrowRight className="text-orange-600" size={20} />
                      <span className="font-medium">{area}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={handleRetake} size="lg" variant="outline">
              Retake Assessment
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = careerQuestions[currentStep];
  const progress = ((currentStep + 1) / careerQuestions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Career Pathfinder Assessment
          </h1>
          <p className="text-gray-600">
            Discover your ideal career path based on your interests, skills, and goals
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">
                Question {currentStep + 1} of {careerQuestions.length}
              </Badge>
              <Badge variant="outline">
                {currentQuestion.category}
              </Badge>
            </div>
            <Progress value={progress} className="mb-4" />
            <CardTitle className="text-2xl">{currentQuestion.question}</CardTitle>
            <CardDescription>
              Select the option that best describes you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {currentQuestion.options.map((option) => {
                const Icon = option.icon;
                const isSelected = answers[currentQuestion.id] === option.value;
                
                return (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(currentQuestion.id, option.value)}
                    className={`p-6 rounded-lg border-2 text-left transition-all ${
                      isSelected 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100'
                      }`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{option.label}</p>
                      </div>
                      {isSelected && (
                        <CheckCircle className="text-purple-600" size={24} />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id] || isSubmitting}
              >
                {currentStep === careerQuestions.length - 1 ? 'Submit' : 'Next'}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
