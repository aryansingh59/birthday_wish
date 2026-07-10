import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart } from 'lucide-react';

const letters = [
  { title: "Open when you miss me", message: "I'm always with you in your heart. Just close your eyes and you'll feel me there. I miss you too, more than words can say." },
  { title: "Open when you're stressed", message: "Take a deep breath. You are incredibly strong and capable. Whatever it is, you've got this, and I've got you." },
  { title: "Open when you feel lonely", message: "You are never alone. I am just a call or a thought away. I love you so much, Jassi." },
  { title: "Open when you can't sleep", message: "Think of our best memories. Think of how much I love you. Let my love wrap around you like a warm blanket." }
];

export function OpenWhen() {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-pink-400 text-sm tracking-widest uppercase mb-4 block">For Every Mood</span>
        <h2 className="text-4xl font-serif text-pink-50">Open When... Letters</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <motion.div 
              className={`glass-panel p-6 rounded-2xl border-pink-500/20 cursor-none transition-colors ${openedIndex === index ? 'bg-pink-500/10' : 'hover:bg-white/5'}`}
              onClick={() => setOpenedIndex(openedIndex === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${openedIndex === index ? 'bg-pink-500/30' : 'bg-white/5'}`}>
                  <Mail className={`w-6 h-6 ${openedIndex === index ? 'text-pink-300' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-lg text-pink-100 font-serif">{letter.title}</h3>
              </div>

              <AnimatePresence>
                {openedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-black/20 rounded-xl text-pink-200/80 font-light border border-white/5">
                      <Heart className="w-4 h-4 text-pink-500 mb-2" fill="currentColor" />
                      {letter.message}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
