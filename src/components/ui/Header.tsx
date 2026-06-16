import { motion } from 'framer-motion';
import { BookOpen, Map, Home, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
      className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

        </div>
      </div>
    </motion.header>
  );
};

interface NavButtonProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  index: number;
}

const NavButton = ({ icon: Icon, label, active, index }: NavButtonProps) => (
  <motion.button
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, type: 'spring' }}
    whileHover={{ scale: 1.08, y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`
      flex items-center gap-2 px-4 py-2.5 rounded-xl font-display font-medium text-sm
      transition-colors relative overflow-hidden
      ${active
        ? 'bg-primary text-primary-foreground shadow-soft'
        : 'bg-card/80 text-foreground hover:bg-card'
      }
    `}
  >
    {active && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />
    )}
    <Icon className="w-4 h-4 relative z-10" />
    <span className="hidden sm:inline relative z-10">{label}</span>
  </motion.button>
);
