import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Heart } from 'lucide-react';

export function JourneyMap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const heartPos = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto" ref={containerRef}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-pink-50 mb-4">Our Connection</h2>
        <p className="text-slate-400 font-light">Distance means so little when someone means so much.</p>
      </div>

      <div className="relative h-64 md:h-80 glass-panel rounded-[2rem] border-pink-500/20 p-8 flex items-center justify-between">
        {/* Map Dots */}
        <div className="flex flex-col items-center z-10 w-24">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center border border-pink-500/50 relative">
            <MapPin className="text-pink-400 w-6 h-6" />
            <span className="absolute -bottom-8 font-serif text-pink-100 whitespace-nowrap">Me</span>
          </div>
        </div>

        {/* The connecting line */}
        <div className="flex-1 relative h-full flex items-center px-4">
          <svg width="100%" height="40" className="overflow-visible">
            {/* Background dashed line */}
            <path 
              d="M 0 20 Q 50% -20, 100% 20" 
              fill="none" 
              stroke="rgba(236,72,153,0.2)" 
              strokeWidth="2" 
              strokeDasharray="8 8"
            />
            {/* Animated solid line */}
            <motion.path 
              d="M 0 20 Q 50% -20, 100% 20" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="3"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Traveling Heart */}
          <motion.div 
            className="absolute top-1/2 -translate-y-[calc(50%+25px)] -ml-4"
            style={{ left: heartPos }}
          >
            <motion.div
              animate={{ y: [-5, 5, -5], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="text-pink-500 w-8 h-8 fill-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center z-10 w-24">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50 relative">
            <MapPin className="text-purple-400 w-6 h-6" />
            <span className="absolute -bottom-8 font-serif text-pink-100 whitespace-nowrap">Mumbai (You)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
