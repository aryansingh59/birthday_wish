import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export function Cake3D() {
  const [blownOut, setBlownOut] = useState(false);

  const handleBlowOut = () => {
    if (!blownOut) {
      setBlownOut(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#ffffff', '#fcd34d']
      });
    }
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center">
      <div className="text-center mb-24">
        <h2 className="text-4xl font-serif text-pink-50 mb-4">Make a Wish</h2>
        <p className="text-pink-200/70 text-sm tracking-widest uppercase">Tap the candle to blow it out</p>
      </div>

      <div className="relative w-64 h-64 flex items-end justify-center cursor-none group perspective-1000" onClick={handleBlowOut}>
        <motion.div 
          className="relative w-full h-full flex flex-col items-center justify-end preserve-3d"
          animate={{ rotateY: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          {/* Flame */}
          {!blownOut && (
            <motion.div 
              className="absolute top-[-20%] w-6 h-10 bg-orange-400 rounded-t-[50%] rounded-b-[50%] blur-[1px] z-30 origin-bottom"
              animate={{ 
                scale: [1, 1.1, 1], 
                rotate: [-3, 3, -3],
                boxShadow: [
                  "0 0 10px #f97316, 0 0 20px #f97316, 0 0 40px #fcd34d",
                  "0 0 15px #f97316, 0 0 25px #f97316, 0 0 50px #fcd34d",
                  "0 0 10px #f97316, 0 0 20px #f97316, 0 0 40px #fcd34d"
                ]
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            />
          )}

          {/* Smoke (after blow out) */}
          {blownOut && (
            <motion.div
              className="absolute top-[-20%] w-2 h-2 bg-slate-300 rounded-full blur-md z-30"
              animate={{
                y: [0, -50, -100],
                x: [0, -10, 10],
                opacity: [0.8, 0.4, 0],
                scale: [1, 3, 5]
              }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          )}

          {/* Candle */}
          <div className="absolute top-[-5%] w-4 h-16 bg-gradient-to-b from-white to-pink-100 rounded-sm z-20 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.1)]">
             <div className="absolute inset-0 overflow-hidden rounded-sm">
               <div className="w-[150%] h-[20%] bg-pink-400/50 -rotate-45 translate-y-2 -translate-x-2" />
               <div className="w-[150%] h-[20%] bg-pink-400/50 -rotate-45 translate-y-8 -translate-x-2" />
               <div className="w-[150%] h-[20%] bg-pink-400/50 -rotate-45 translate-y-14 -translate-x-2" />
             </div>
          </div>

          {/* Top Tier */}
          <div className="relative w-32 h-16 bg-pink-400 rounded-[50%] z-20 shadow-[inset_0_-15px_15px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center translate-y-4">
             <div className="absolute top-0 w-full h-full rounded-[50%] bg-pink-300 shadow-[inset_0_2px_5px_rgba(255,255,255,0.5)] transform -translate-y-2" />
             
             {/* Frosting drips */}
             <div className="absolute bottom-[-10px] left-4 w-4 h-6 bg-pink-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
             <div className="absolute bottom-[-15px] left-10 w-3 h-8 bg-pink-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
             <div className="absolute bottom-[-8px] right-8 w-5 h-5 bg-pink-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
             <div className="absolute bottom-[-12px] right-2 w-3 h-7 bg-pink-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
          </div>

          {/* Bottom Tier */}
          <div className="relative w-48 h-24 bg-purple-400 rounded-[50%] z-10 shadow-[inset_0_-20px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center -translate-y-2">
             <div className="absolute top-0 w-full h-full rounded-[50%] bg-purple-300 shadow-[inset_0_2px_5px_rgba(255,255,255,0.5)] transform -translate-y-3" />
             
             {/* Frosting drips */}
             <div className="absolute bottom-[-15px] left-8 w-5 h-8 bg-purple-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
             <div className="absolute bottom-[-20px] left-16 w-4 h-12 bg-purple-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
             <div className="absolute bottom-[-12px] right-12 w-6 h-6 bg-purple-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
             <div className="absolute bottom-[-18px] right-4 w-4 h-10 bg-purple-300 rounded-b-full shadow-[0_2px_2px_rgba(0,0,0,0.1)]" />
             
             {/* Sprinkles on top surface of bottom tier */}
             <div className="absolute top-2 left-8 w-1.5 h-3 bg-white rotate-45 rounded-full z-10" />
             <div className="absolute top-4 left-1/2 w-1.5 h-3 bg-pink-200 -rotate-12 rounded-full z-10" />
             <div className="absolute top-3 right-10 w-1.5 h-3 bg-yellow-200 rotate-90 rounded-full z-10" />
          </div>

          {/* Plate */}
          <div className="absolute bottom-[-10%] w-64 h-16 bg-slate-200/20 backdrop-blur-md rounded-[50%] shadow-[0_30px_50px_rgba(0,0,0,0.6)] border border-white/10 z-0" />
        </motion.div>
      </div>

      <AnimatePresence>
        {blownOut && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 text-center relative z-10"
          >
            <p className="text-3xl font-script text-pink-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]">Your wish is my command... ❤️</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
