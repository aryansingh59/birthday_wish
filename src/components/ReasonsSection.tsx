import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

const reasons = [
  "The way your smile lights up any room instantly.",
  "Your incredible kindness towards everyone around you.",
  "How you always know exactly what to say to make me feel better.",
  "Your beautiful, genuine laugh that I could listen to all day.",
  "The way you care so deeply about the people you love.",
  "Your unique perspective on the world.",
  "How you make ordinary moments feel extraordinary.",
  "Because you are perfectly, beautifully, unapologetically you."
];

export function ReasonsSection() {
  const [flipped, setFlipped] = useState<number[]>([]);

  const toggleFlip = (index: number) => {
    if (flipped.includes(index)) {
      setFlipped(flipped.filter(i => i !== index));
    } else {
      setFlipped([...flipped, index]);
    }
  };

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-pink-400 text-sm tracking-widest uppercase mb-4 block">Just a few of the</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-6 text-pink-50">Reasons Why You're Special</h2>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative h-64 perspective-1000"
            onClick={() => toggleFlip(index)}
          >
            <motion.div
              className="w-full h-full relative preserve-3d cursor-none"
              animate={{ rotateY: flipped.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden glass-panel rounded-3xl flex flex-col items-center justify-center p-6 border-pink-500/20 hover:border-pink-500/40 transition-colors group">
                <span className="text-5xl font-serif text-pink-500/30 font-light mb-4 group-hover:text-pink-500/50 transition-colors">
                  {index + 1}
                </span>
                <span className="text-pink-200 text-sm uppercase tracking-widest">Reason</span>
                <Heart className="absolute bottom-6 w-4 h-4 text-pink-500/30 group-hover:text-pink-400 transition-colors" />
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel bg-pink-500/10 rounded-3xl flex items-center justify-center p-6 text-center border-pink-400/30">
                <p className="text-pink-50 font-light leading-relaxed">
                  {reason}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-slate-400 font-light italic">...and a million more.</p>
      </div>
    </section>
  );
}
