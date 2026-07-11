import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export function WaxEnvelope() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const handleRevealAll = () => {
      if (!isOpened) {
        handleOpen();
      }
    };
    window.addEventListener('ai-reveal-all', handleRevealAll);
    return () => window.removeEventListener('ai-reveal-all', handleRevealAll);
  }, [isOpened]);

  const handleOpen = () => {
    if(isOpened) return;
    setIsOpened(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#ec4899'] // Red and pink
    });
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center min-h-[60vh] justify-center">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-serif text-pink-50">A Sealed Confession</h2>
      </div>

      <div className="relative w-full max-w-lg mx-auto aspect-video cursor-none group perspective-1000" onClick={handleOpen}>
        {!isOpened ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            className="w-full h-full bg-red-950 rounded-lg shadow-2xl relative flex items-center justify-center border border-red-900/50"
          >
            {/* Envelope flap lines */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-30">
                 <path d="M0,0 L50,50 L100,0" fill="none" stroke="#fecaca" strokeWidth="1" />
                 <path d="M0,100 L50,50 L100,100" fill="none" stroke="#fecaca" strokeWidth="1" />
               </svg>
            </div>
            
            {/* Wax Seal */}
            <div className="relative z-10 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.5)] border-2 border-red-700">
              <div className="absolute inset-1 rounded-full border border-red-800/50" />
              <Heart className="w-6 h-6 text-red-950 fill-red-950" />
            </div>
            
            <p className="absolute bottom-6 text-red-300 text-sm tracking-widest uppercase font-medium">Break the seal</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full h-full bg-[#fdfbf7] rounded-lg shadow-2xl p-8 flex flex-col items-center justify-center border border-amber-900/10 text-center"
          >
            <Mail className="w-8 h-8 text-pink-400 mb-4" />
            <p className="font-script text-3xl text-slate-800 leading-relaxed">
              "No matter what happens, my heart is always yours."
            </p>
            <p className="mt-6 text-sm text-slate-500 font-serif">— Aryan</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
