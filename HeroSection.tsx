import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onOpenSurprise: () => void;
}

export function HeroSection({ onOpenSurprise }: HeroSectionProps) {
  const handleSurpriseClick = () => {
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#a855f7', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#a855f7', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    
    onOpenSurprise();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden pt-20 pb-12">
      {/* Subtle floating background elements */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-pink-500/20 blur-sm"
      >
        <Heart size={120} fill="currentColor" />
      </motion.div>
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 text-purple-500/10 blur-md"
      >
        <Heart size={200} fill="currentColor" />
      </motion.div>

      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-pink-500/30"
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-sm font-medium tracking-widest uppercase text-pink-200">A special day for a special person</span>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif mb-6 leading-tight"
        >
          Happy Birthday,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-300">
            My Most Special Person
          </span> ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl mb-16 leading-relaxed"
        >
          Today the world became more beautiful because you were born.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          onClick={handleSurpriseClick}
          className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium tracking-wide shadow-[0_0_40px_rgba(236,72,153,0.4)] overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Open My Surprise <Heart className="w-5 h-5 fill-white animate-pulse" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll gently</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-12 bg-gradient-to-b from-pink-500/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
