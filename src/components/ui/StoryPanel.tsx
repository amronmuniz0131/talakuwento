import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Play, Pause, Brain } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Story } from '@/data/stories';
import { QuizModal } from './QuizModal';

interface StoryPanelProps {
  story: Story | null;
  onClose: () => void;
  onExplore?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
};

export const StoryPanel = ({ story, onClose, onExplore }: StoryPanelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Handle voice narration
  const toggleNarration = () => {
    if (!story) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(
        `${story.title}. ${story.subtitle}. ${story.description}. ${story.verse}. ${story.verseReference}.`
      );
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsPlaying(false);
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  // Stop narration when panel closes
  useEffect(() => {
    if (!story) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [story]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <AnimatePresence>
      {story && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Centered Card Modal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
          >
            <div className="w-full max-w-lg pointer-events-auto">
              {/* Card Container */}
              <div className="bg-card rounded-3xl overflow-hidden shadow-2xl border border-white/30">
                {/* Header with gradient */}
                <motion.div
                  className="relative h-44 flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, ${story.glowColor}50 0%, ${story.color}30 100%)`
                  }}
                >
                  {/* Decorative circles */}
                  <motion.div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-40"
                    style={{ backgroundColor: story.glowColor }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-30"
                    style={{ backgroundColor: story.color }}
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />

                  {/* Icon */}
                  <motion.span
                    className="text-7xl block mb-3 relative z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    {story.icon}
                  </motion.span>

                  {/* Title */}
                  <motion.h2
                    className="font-display text-3xl font-bold relative z-10"
                    style={{ color: story.color }}
                    variants={itemVariants}
                  >
                    {story.title}
                  </motion.h2>

                  {/* Close button */}
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/90 
                               flex items-center justify-center
                               hover:bg-card transition-colors shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                </motion.div>

                {/* Content */}
                <div className="p-6 space-y-5 bg-card">
                  {/* Description */}
                  <div className="max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    <motion.p
                      variants={itemVariants}
                      className="text-foreground/80 font-body text-base leading-relaxed whitespace-pre-wrap"
                    >
                      {story.description}
                    </motion.p>
                  </div>

                  {/* Action buttons */}
                  <motion.div variants={itemVariants} className="flex gap-3 pt-4">
                    {/* Narration button */}
                    <button
                      onClick={toggleNarration}
                      className="flex-1 py-3 px-4 rounded-3xl font-display font-semibold
                                 flex items-center justify-center gap-2 transition-all duration-300
                                 hover:scale-105 active:scale-95 border-2"
                      style={{
                        backgroundColor: 'white',
                        color: story.color,
                        borderColor: `${story.color}30`,
                      }}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-5 h-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Listen
                        </>
                      )}
                    </button>

                    {/* Quiz button */}
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="flex-1 py-3 px-4 rounded-3xl font-display font-semibold
                                 flex items-center justify-center gap-2 transition-all duration-300
                                 hover:scale-105 active:scale-95 border-2"
                      style={{
                        backgroundColor: 'white',
                        color: story.color,
                        borderColor: `${story.glowColor}30`,
                      }}
                    >
                      <Brain className="w-5 h-5" />
                      Quiz
                    </button>

                    {/* Explore button */}
                    <motion.button
                      onClick={onExplore}
                      className="flex-1 py-3 px-4 rounded-3xl font-display font-semibold text-white
                                 flex items-center justify-center gap-2 relative overflow-hidden
                                 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${story.color}, ${story.glowColor})`,
                      }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                      <span className="relative z-10">Explore</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="relative z-10"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quiz Modal */}
          {showQuiz && (
            <QuizModal
              story={story}
              onClose={() => setShowQuiz(false)}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};
