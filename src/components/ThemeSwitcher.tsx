
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-full transition-colors',
        theme === 'dark' ? 'bg-slate-800 text-yellow-300' : 'bg-sky-100 text-sky-800'
      )}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeSwitcher;
