import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function VirtualGift() {
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
    if (isOpen) return;
    setIsOpen(true);
    
    // Confetti explosion from the box
    const end = Date.now() + 2000;
    const colors = ['#ec4899', '#a855f7', '#ffffff', '#fbcfe8'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 90,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <section className="py-24 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <span className="text-pink-400 text-sm tracking-widest uppercase mb-4 block">A Little Surprise</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-12 text-pink-50">Open Your Gift</h2>

        <div className="relative h-64 md:h-80 flex items-center justify-center">
          <AnimatePresence>
            {!isOpen ? (
              <motion.div
                key="box"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpen}
                className="relative group cursor-none perspective-1000"
              >
                <div className="w-40 h-40 md:w-48 md:h-48 glass-panel rounded-3xl bg-pink-500/10 border-pink-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_80px_rgba(236,72,153,0.5)] transition-all preserve-3d">
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  >
                    <Gift size={64} className="text-pink-400 drop-shadow-xl" />
                  </motion.div>
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-pink-300 tracking-widest uppercase text-sm font-medium w-full">Tap to open</div>
              </motion.div>
            ) : (
              <motion.div
                key="gift-content"
                initial={{ scale: 0, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", damping: 15, stiffness: 100 }}
                className="absolute inset-0 glass-panel rounded-3xl p-8 border-pink-500/40 flex flex-col items-center justify-center bg-gradient-to-br from-pink-500/20 to-purple-500/10"
              >
                <div className="absolute top-4 right-4">
                  <Sparkles className="w-6 h-6 text-pink-300 animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
                </div>
                
                <Heart size={48} className="text-pink-500 mb-6 animate-bounce" fill="currentColor" />
                <h3 className="text-2xl font-serif text-pink-50 mb-4">A Promise to You</h3>
                <p className="text-pink-100 font-light leading-relaxed">
                  I promise to always be there for you, to celebrate your victories, and to hold your hand through every challenge. My greatest gift is having you in my life.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
