import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Key, Heart, Star, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function SecretMessage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleRevealAll = () => {
      if (!isOpen) {
        handleOpen();
      }
    };
    window.addEventListener('ai-reveal-all', handleRevealAll);
    return () => window.removeEventListener('ai-reveal-all', handleRevealAll);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    
    // Grand finale confetti
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#a855f7', '#ffffff', '#fbcfe8']
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#a855f7', '#ffffff', '#fbcfe8']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="py-32 px-4 text-center relative">
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <p className="text-slate-500 font-light mb-6 text-sm tracking-widest uppercase">You found the secret lock</p>
          <button
            onClick={handleOpen}
            className="group w-16 h-16 rounded-full glass-panel flex items-center justify-center hover:bg-pink-500/20 transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] border-pink-500/30"
          >
            <Key className="w-6 h-6 text-pink-400 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="max-w-2xl mx-auto glass-panel rounded-[3rem] p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex gap-4 mb-8">
              <Star className="w-8 h-8 text-pink-300 animate-pulse" />
              <Heart className="w-8 h-8 text-pink-500 animate-bounce" fill="currentColor" />
              <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif text-pink-50 mb-6">You Are My Everything</h2>
            
            <p className="text-lg md:text-xl text-pink-100 font-light leading-relaxed">
              I just wanted to remind you one last time today that you are the most incredible person I've ever met. 
              Thank you for being you. Happy Birthday, Jassi! ❤️
            </p>
          </div>
        </motion.div>
      )}
    </section>
  );
}
