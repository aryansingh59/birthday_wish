import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Archive, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const promises = [
  "I promise to always listen to you.",
  "I promise to make you laugh when you're sad.",
  "I promise to support your dreams, no matter how big.",
  "I promise to always choose you, every single day.",
  "I promise to share my food with you (most of the time)."
];

export function WishJar() {
  const [showPromise, setShowPromise] = useState(false);
  const [currentPromise, setCurrentPromise] = useState("");

  const drawPromise = () => {
    if (showPromise) return;
    const randomPromise = promises[Math.floor(Math.random() * promises.length)];
    setCurrentPromise(randomPromise);
    setShowPromise(true);
    
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#a855f7', '#fbcfe8']
    });
  };

  return (
    <section className="py-24 px-4 text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-purple-400 text-sm tracking-widest uppercase mb-4 block">Pick a note</span>
        <h2 className="text-4xl font-serif mb-12 text-pink-50">The Promise Jar</h2>
        
        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={drawPromise}
            className="w-32 h-40 mx-auto relative cursor-none group perspective-1000"
          >
            {/* The Jar */}
            <div className="absolute inset-0 glass-panel rounded-b-3xl rounded-t-xl bg-white/5 border-white/20 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] transition-all">
              {/* Fake papers inside */}
              <div className="absolute bottom-2 left-4 w-12 h-6 bg-pink-200/40 rounded-sm rotate-12" />
              <div className="absolute bottom-4 right-4 w-10 h-8 bg-purple-200/40 rounded-sm -rotate-12" />
              <div className="absolute bottom-8 left-8 w-14 h-5 bg-white/40 rounded-sm rotate-6" />
              
              <Archive className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/30 w-12 h-12" />
            </div>
            {/* Lid */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-md bg-pink-900/40 border border-white/10" />
            
            <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-pink-300 uppercase tracking-widest group-hover:text-pink-200">Tap the Jar</p>
          </motion.div>

          <AnimatePresence>
            {showPromise && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.5 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-64 glass-panel bg-gradient-to-br from-pink-100 to-white text-slate-800 p-6 rounded-xl shadow-2xl z-20"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowPromise(false); }}
                  className="absolute top-2 right-2 text-slate-400 hover:text-slate-800"
                >
                  <X size={16} />
                </button>
                <Sparkles className="w-6 h-6 text-pink-500 mb-3 mx-auto" />
                <p className="font-script text-2xl text-pink-600 leading-tight">
                  "{currentPromise}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
