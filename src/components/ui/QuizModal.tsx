import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, RotateCcw, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { Story } from '@/data/stories';
import { getQuizForStory, QuizQuestion } from '@/data/quiz-data';
import { saveQuizScore } from '@/services/authService';

interface QuizModalProps {
    story: Story;
    onClose: () => void;
}

export const QuizModal = ({ story, onClose }: QuizModalProps) => {
    const quiz = getQuizForStory(story.id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [userAnswers, setUserAnswers] = useState<number[]>([]);
    const [showScore, setShowScore] = useState(false);

    if (!quiz) {
        return null;
    }

    const question = quiz.questions[currentQuestion];
    const isLastQuestion = currentQuestion === quiz.questions.length - 1;

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
    };

    const handleNext = async () => {
        if (selectedAnswer === null) return;

        const newAnswers = [...userAnswers, selectedAnswer];
        setUserAnswers(newAnswers);

        if (isLastQuestion) {
            setShowScore(true);
            
            let correct = 0;
            newAnswers.forEach((answer, index) => {
                if (answer === quiz.questions[index].correctAnswer) {
                    correct++;
                }
            });
            const finalPercentage = Math.round((correct / quiz.questions.length) * 100);
            
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await saveQuizScore(story.title, correct, quiz.questions.length, finalPercentage);
                }
            } catch (error) {
                console.error("Failed to save quiz score:", error);
            }
        } else {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quiz.questions[index].correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setUserAnswers([]);
        setShowScore(false);
    };

    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);

    return (
        <AnimatePresence>
            <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
                >
                    <div className="w-full max-w-2xl pointer-events-auto">
                        <div className="bg-card rounded-3xl shadow-2xl border border-white/30 flex flex-col max-h-[85vh]">
                            {/* Header */}
                            <div
                                className="relative p-6 flex-shrink-0 flex items-center justify-between z-10"
                                style={{
                                    background: `linear-gradient(135deg, ${story.color}20, ${story.glowColor}20)`
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl">{story.icon}</span>
                                    <div>
                                        <h2 className="font-display text-2xl font-bold" style={{ color: story.color }}>
                                            {story.title} Quiz
                                        </h2>
                                        {!showScore && (
                                            <p className="text-sm text-muted-foreground">
                                                Question {currentQuestion + 1} of {quiz.questions.length}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center
                             hover:bg-card transition-colors shadow-lg"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {!showScore ? (
                                        <motion.div
                                            key={currentQuestion}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6"
                                        >
                                            {/* Question */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-semibold text-foreground mb-6">
                                                    {question.question}
                                                </h3>

                                                {/* Choices */}
                                                <div className="space-y-3">
                                                    {question.choices.map((choice, index) => (
                                                        <motion.button
                                                            key={index}
                                                            onClick={() => handleAnswerSelect(index)}
                                                            className={`w-full p-4 rounded-2xl text-left transition-all duration-200
                                         border-2 font-medium ${selectedAnswer === index
                                                                    ? 'border-current shadow-lg scale-[1.02]'
                                                                    : 'border-muted hover:border-muted-foreground/30 hover:scale-[1.01]'
                                                                }`}
                                                            style={{
                                                                backgroundColor: selectedAnswer === index
                                                                    ? `${story.color}15`
                                                                    : 'transparent',
                                                                color: selectedAnswer === index ? story.color : 'inherit'
                                                            }}
                                                            whileHover={{ y: -2 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div
                                                                    className={`w-8 h-8 rounded-full flex items-center justify-center
                                             font-bold text-sm ${selectedAnswer === index
                                                                            ? 'bg-current text-white'
                                                                            : 'bg-muted text-muted-foreground'
                                                                        }`}
                                                                    style={{
                                                                        backgroundColor: selectedAnswer === index ? story.color : undefined
                                                                    }}
                                                                >
                                                                    {String.fromCharCode(65 + index)}
                                                                </div>
                                                                <span>{choice}</span>
                                                            </div>
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Next Button */}
                                            <motion.button
                                                onClick={handleNext}
                                                disabled={selectedAnswer === null}
                                                className={`w-full py-4 px-6 rounded-2xl font-display font-semibold text-white
                                   flex items-center justify-center gap-2 shadow-lg
                                   ${selectedAnswer === null ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                                                style={{
                                                    background: selectedAnswer === null
                                                        ? '#94a3b8'
                                                        : `linear-gradient(135deg, ${story.color}, ${story.glowColor})`
                                                }}
                                                whileHover={selectedAnswer !== null ? { y: -2 } : {}}
                                                whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
                                            >
                                                {isLastQuestion ? 'See Results' : 'Susunod na tanong'}
                                                <ChevronRight className="w-5 h-5" />
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center space-y-6"
                                        >
                                            {/* Trophy Icon */}
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: 'spring', delay: 0.2 }}
                                            >
                                                <Trophy
                                                    className="w-24 h-24 mx-auto"
                                                    style={{ color: story.color }}
                                                />
                                            </motion.div>

                                            {/* Score */}
                                            <div>
                                                <h3 className="text-3xl font-bold mb-2" style={{ color: story.color }}>
                                                    Quiz Complete!
                                                </h3>
                                                <p className="text-5xl font-bold mb-4">
                                                    {score} / {quiz.questions.length}
                                                </p>
                                                <p className="text-2xl text-muted-foreground">
                                                    {percentage}% Correct
                                                </p>
                                            </div>

                                            {/* Performance Message */}
                                            <div className="p-4 rounded-2xl" style={{ backgroundColor: `${story.color}10` }}>
                                                <p className="text-lg font-medium">
                                                    {percentage >= 80 ? '🎉 Excellent work!' :
                                                        percentage >= 60 ? '👍 Good job!' :
                                                            '💪 Keep learning!'}
                                                </p>
                                            </div>

                                            {/* Answer Review */}
                                            <div className="text-left space-y-3">
                                                <h4 className="font-semibold text-lg mb-3">Review Your Answers:</h4>
                                                {quiz.questions.map((q, index) => {
                                                    const userAnswer = userAnswers[index];
                                                    const isCorrect = userAnswer === q.correctAnswer;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`p-3 rounded-xl border-2 ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'
                                                                }`}
                                                        >
                                                            <div className="flex items-start gap-2">
                                                                {isCorrect ? (
                                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                                ) : (
                                                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                                                )}
                                                                <div className="flex-1">
                                                                    <p className="font-medium text-sm mb-1">Q{index + 1}: {q.question}</p>
                                                                    {!isCorrect && (
                                                                        <p className="text-xs text-muted-foreground">
                                                                            Correct answer: {q.choices[q.correctAnswer]}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4 pb-2">
                                                <button
                                                    onClick={restartQuiz}
                                                    className="flex-1 py-3 px-4 rounded-2xl font-display font-semibold
                                     flex items-center justify-center gap-2 transition-all
                                     hover:scale-105 active:scale-95"
                                                    style={{
                                                        backgroundColor: `${story.color}15`,
                                                        color: story.color,
                                                        border: `2px solid ${story.color}30`
                                                    }}
                                                >
                                                    <RotateCcw className="w-5 h-5" />
                                                    Try Again
                                                </button>
                                                <button
                                                    onClick={onClose}
                                                    className="flex-1 py-3 px-4 rounded-2xl font-display font-semibold text-white
                                     flex items-center justify-center gap-2 shadow-lg
                                     hover:scale-105 active:scale-95"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${story.color}, ${story.glowColor})`
                                                    }}
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </>
        </AnimatePresence>
    );
};
