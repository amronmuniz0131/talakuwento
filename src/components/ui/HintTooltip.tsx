import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';

interface HintTooltipProps {
  show: boolean;
}

export const HintTooltip = ({ show }: HintTooltipProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/90 shadow-panel">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <MousePointerClick className="w-5 h-5 text-primary" />
            </motion.div>
            <span className="font-display font-medium text-foreground">
              Click on an island to explore a story!
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
