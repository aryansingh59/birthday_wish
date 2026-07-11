import { motion } from 'motion/react';
import { CalendarHeart, Star, Coffee, Sparkles } from 'lucide-react';

const memories = [
  {
    id: 1,
    title: "The First Hello",
    description: "The moment that started it all, etched in time forever.",
    icon: <Star className="w-6 h-6 text-pink-400" />,
    date: "A beautiful day",
  },
  {
    id: 2,
    title: "Countless Conversations",
    description: "Hours feeling like seconds whenever we talk.",
    icon: <Coffee className="w-6 h-6 text-purple-400" />,
    date: "Late nights & early mornings",
  },
  {
    id: 3,
    title: "Creating Magic",
    description: "Every small moment with you feels like a grand adventure.",
    icon: <Sparkles className="w-6 h-6 text-pink-300" />,
    date: "Every single day",
  }
];

export function MemoryTimeline() {
  return (
    <section className="py-24 px-4 relative max-w-5xl mx-auto" id="timeline">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-pink-100">Our Beautiful Journey</h2>
        <p className="text-slate-400 font-light max-w-2xl mx-auto">
          Every moment spent with you is a treasure I keep close to my heart.
        </p>
      </motion.div>

      <div className="relative">
        {/* Center Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-pink-500/30 to-transparent hidden md:block" />

        <div className="flex flex-col gap-12 md:gap-24">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full md:text-right">
                <div className={`glass-panel p-8 rounded-3xl relative group overflow-hidden ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <span className="text-pink-400 text-sm font-medium tracking-wider uppercase mb-2 block">
                    {memory.date}
                  </span>
                  <h3 className="text-2xl font-serif mb-3 text-pink-50">{memory.title}</h3>
                  <p className="text-slate-300 font-light leading-relaxed">
                    {memory.description}
                  </p>
                </div>
              </div>

              <div className="relative z-10 w-16 h-16 rounded-full glass-panel flex items-center justify-center shrink-0 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                {memory.icon}
              </div>

              <div className="flex-1 hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
