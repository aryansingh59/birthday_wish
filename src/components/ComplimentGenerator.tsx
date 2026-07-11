import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, HeartPulse } from 'lucide-react';

const compliments = [
  "You have the most beautiful soul.",
  "Your smile is my favorite thing in the world.",
  "You make everyone around you feel so loved.",
  "You are incredibly intelligent and thoughtful.",
  "Your laugh is contagious in the best way possible.",
  "You handle everything with such grace.",
  "The world is better because you're in it.",
  "You inspire me to be a better person.",
  "Your kindness knows no bounds.",
  "You are absolutely breathtaking, inside and out."
];

export function ComplimentGenerator() {
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateCompliment = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let next;
    do {
      next = compliments[Math.floor(Math.random() * compliments.length)];
    } while (next === currentCompliment && compliments.length > 1);
    
    setCurrentCompliment(null); // Clear to trigger exit animation
    
    setTimeout(() => {
      setCurrentCompliment(next);
      setIsAnimating(false);
    }, 400); // Wait for exit animation
  };

  return (
    <section className="py-24 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <button
          onClick={generateCompliment}
          className="group relative px-8 py-4 rounded-full glass-panel border border-pink-500/40 hover:bg-pink-500/10 transition-colors overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2 text-pink-100 font-medium tracking-wide">
            <HeartPulse className="w-5 h-5 text-pink-400 group-hover:animate-ping" />
            Click to See What Makes You Amazing
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>

        <div className="h-32 mt-12 w-full flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {currentCompliment && (
              <motion.div
                key={currentCompliment}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="absolute w-full px-4"
              >
                <div className="inline-flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                  <p className="text-2xl md:text-3xl font-serif text-pink-50 leading-tight">
                    "{currentCompliment}"
                  </p>
                  <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
