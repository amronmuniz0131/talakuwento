import { X, Trophy, Target, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizScore {
  storyTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  completedAt: string;
}

interface UserQuizResult {
  _id: string;
  username: string;
  email: string;
  totalQuizzes: number;
  averageScore: number;
  quizScores: QuizScore[];
}

interface QuizResultsPanelProps {
  user: UserQuizResult | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuizResultsPanel = ({ user, isOpen, onClose }: QuizResultsPanelProps) => {
  if (!user) return null;

  const highestScore = user.quizScores.reduce((max, quiz) => Math.max(max, quiz.percentage), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl shadow-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user.username}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">Total Quizzes</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{user.totalQuizzes}</p>
                </div>
                
                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">Highest Score</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{highestScore}%</p>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz History</h3>
                
                <div className="space-y-3">
                  {user.quizScores.map((quiz, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm hover:border-blue-100 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{quiz.storyTitle}</h4>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          quiz.percentage >= 80 ? 'bg-green-100 text-green-700' :
                          quiz.percentage >= 50 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {quiz.percentage}%
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Target className="w-3.5 h-3.5" />
                          <span>{quiz.score} / {quiz.totalQuestions} correct</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(quiz.completedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Close Panel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuizResultsPanel;
