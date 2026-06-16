import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, hsl(200 70% 85%) 0%, hsl(30 70% 90%) 50%, hsl(15 80% 88%) 100%)',
      }}
    >
      {/* Animated loader */}
      <div className="relative mb-8">
        <motion.div
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-3xl"
          >
            📖
          </motion.span>
        </div>
      </div>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Loading Adventure...
        </h2>
        <p className="text-muted-foreground font-body">
          Preparing your magical journey
        </p>
      </motion.div>

      {/* Floating decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: '110%',
              opacity: 0.5
            }}
            animate={{ 
              y: '-10%',
              opacity: 0
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear'
            }}
            className="absolute text-2xl"
          >
            {['✨', '⭐', '🌟', '💫', '☁️', '🌈'][i]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
