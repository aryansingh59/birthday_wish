import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Sync with HTML class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed top-6 right-6 z-50"
    >
      <button
        onClick={() => setIsDark(!isDark)}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-pink-400 hover:bg-pink-500/20 transition-all shadow-lg overflow-hidden relative group"
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Moon className="w-5 h-5 fill-current" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Sun className="w-6 h-6 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-pink-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </motion.div>
  );
}
