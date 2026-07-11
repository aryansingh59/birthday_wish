import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="py-12 px-4 text-center relative z-10 border-t border-white/5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <p className="text-slate-400 font-light flex items-center justify-center gap-2 flex-wrap">
          Made with endless care, respect, and countless smiles
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          </motion.span>
        </p>
        <p className="text-sm text-slate-500 tracking-widest uppercase">
          For Jassi, From Aryan
        </p>
      </motion.div>
    </footer>
  );
}
