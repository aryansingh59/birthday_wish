import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string | number;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      onAnimationComplete={(definition) => {
        if (definition === "exit" || (definition as any)?.opacity === 0) {
          // This fires when exit completes if we wait for it, 
          // but we manage unmount in the parent via AnimatePresence
        }
      }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          filter: ["drop-shadow(0 0 20px rgba(236,72,153,0.3))", "drop-shadow(0 0 40px rgba(236,72,153,0.8))", "drop-shadow(0 0 20px rgba(236,72,153,0.3))"]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8"
      >
        <Heart className="w-20 h-20 text-pink-500 fill-pink-500" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-pink-100 font-serif text-2xl tracking-widest font-light"
      >
        Preparing your surprise...
      </motion.div>
      
      {/* Progress bar line */}
      <div className="w-64 h-px bg-white/10 mt-8 relative overflow-hidden">
        <motion.div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </div>
    </motion.div>
  );
}
