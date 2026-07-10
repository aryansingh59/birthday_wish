import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';

export function StarMap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto overflow-hidden" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-pink-400 text-sm tracking-widest uppercase mb-4 block">Written in the stars</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-pink-50">The Sky When You Were Born</h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto" />
      </motion.div>

      <div className="relative aspect-square max-w-2xl mx-auto flex items-center justify-center">
        {/* Subtle glow behind the map */}
        <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl scale-75" />
        
        <motion.div 
          style={{ rotate, scale }}
          className="w-full h-full rounded-full border border-white/10 glass-panel relative overflow-hidden flex items-center justify-center p-8 shadow-[0_0_100px_rgba(168,85,247,0.15)]"
        >
          {/* Inner ring */}
          <div className="absolute inset-8 rounded-full border border-pink-500/20 border-dashed" />
          
          {/* Constellations simulation - just aesthetic lines and dots */}
          <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 opacity-40">
            <path d="M 20 30 L 40 20 L 60 40 L 80 30 L 70 70 L 50 60 L 30 80 Z" fill="none" stroke="rgba(236,72,153,0.5)" strokeWidth="0.5" />
            <path d="M 10 50 L 30 40 L 40 60 L 20 70 Z" fill="none" stroke="rgba(236,72,153,0.3)" strokeWidth="0.3" />
            
            {/* Stars */}
            <circle cx="20" cy="30" r="1.5" fill="#fff" />
            <circle cx="40" cy="20" r="1" fill="#fff" />
            <circle cx="60" cy="40" r="2" fill="#fff" />
            <circle cx="80" cy="30" r="1" fill="#fff" />
            <circle cx="70" cy="70" r="1.5" fill="#fff" />
            <circle cx="50" cy="60" r="1.5" fill="#fff" />
            <circle cx="30" cy="80" r="1" fill="#fff" />
            
            <circle cx="10" cy="50" r="0.8" fill="#fbcfe8" />
            <circle cx="30" cy="40" r="1.2" fill="#fbcfe8" />
            <circle cx="40" cy="60" r="0.8" fill="#fbcfe8" />
            <circle cx="20" cy="70" r="1" fill="#fbcfe8" />
          </svg>

          {/* Random extra stars */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 2 + 0.5 + 'px',
                height: Math.random() * 2 + 0.5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.1,
              }}
            />
          ))}

          <div className="z-10 text-center bg-slate-950/40 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
            <Star className="w-5 h-5 text-pink-400 mx-auto mb-2" />
            <p className="text-pink-100 font-serif">Mumbai, India</p>
            <p className="text-xs text-slate-400 tracking-widest uppercase mt-1">A Star Was Born</p>
          </div>
        </motion.div>
        
        {/* Floating elements outside map */}
        <motion.div 
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="text-pink-300/50 w-12 h-12" />
        </motion.div>
      </div>
    </section>
  );
}
