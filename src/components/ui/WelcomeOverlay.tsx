import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MapPin, Play, Star, Heart } from 'lucide-react';

interface WelcomeOverlayProps {
  onStart: () => void;
}

const floatingEmojis = ['✨', '🌟', '⭐', '💫', '☁️', '🌈', '🕊️', '❤️', '📖', '🙏'];

export const WelcomeOverlay = ({ onStart }: WelcomeOverlayProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = () => {
    setIsVisible(false);
    setTimeout(onStart, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, hsl(200 70% 85% / 0.98) 0%, hsl(30 70% 90% / 0.98) 50%, hsl(15 80% 88% / 0.98) 100%)',
          }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 pointer-events-none">
            {floatingEmojis.map((emoji, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl md:text-3xl"
                initial={{
                  x: `${10 + (i * 9)}%`,
                  y: '110%',
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  y: '-10%',
                  opacity: [0, 0.7, 0.7, 0],
                  rotate: [0, 20, -20, 0],
                  scale: [0.8, 1.2, 1, 0.8],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: 'linear',
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-center max-w-lg relative z-10"
          >
            {/* Animated icon with orbiting elements */}
            <motion.div className="relative mb-8 inline-block">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative"
              >
                <motion.div
                  className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-primary"
                  animate={{
                    boxShadow: [
                      '0 0 30px 10px rgba(234, 179, 8, 0.3)',
                      '0 0 50px 20px rgba(234, 179, 8, 0.5)',
                      '0 0 30px 10px rgba(234, 179, 8, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-6xl">📖</span>
                </motion.div>

                {/* Orbiting stars */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{ top: '50%', left: '50%' }}
                    animate={{
                      x: [
                        Math.cos((i / 3) * Math.PI * 2) * 60,
                        Math.cos((i / 3) * Math.PI * 2 + Math.PI) * 60,
                        Math.cos((i / 3) * Math.PI * 2) * 60,
                      ],
                      y: [
                        Math.sin((i / 3) * Math.PI * 2) * 60,
                        Math.sin((i / 3) * Math.PI * 2 + Math.PI) * 60,
                        Math.sin((i / 3) * Math.PI * 2) * 60,
                      ],
                      scale: [1, 1.3, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: 'linear',
                    }}
                  >
                    {['⭐', '✨', '🌟'][i]}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Title with letter animation */}
            <motion.div className="mb-4">
              <motion.h1
                className="font-display text-4xl md:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Magandang Buhay!
              </motion.h1>
              <motion.span
                className="font-display text-4xl md:text-5xl font-bold text-primary block"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                Talakuwento
              </motion.span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-muted-foreground mb-8 font-body"
            >

            </motion.p>



            {/* Start button with pulse animation */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="btn-primary py-4 px-12 rounded-2xl text-xl inline-flex items-center gap-3 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <Play className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Halina't mag simula</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence >
  );
};
