import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const difference = endOfDay.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-24 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto glass-panel rounded-3xl p-10 md:p-16 border-purple-500/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-purple-500/20 mb-6">
            <Clock className="w-8 h-8 text-purple-300" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">The Celebration Continues</h2>
          <p className="text-purple-200/70 font-light mb-10 tracking-wide uppercase text-sm">Make every second count today</p>
          
          <div className="flex justify-center gap-4 md:gap-8">
            {timeBlocks.map((block, index) => (
              <div key={block.label} className="flex flex-col items-center">
                <div className="w-20 h-24 md:w-28 md:h-32 glass-panel rounded-2xl flex items-center justify-center bg-white/5 border-purple-500/30 mb-3 shadow-[inset_0_0_20px_rgba(168,85,247,0.1)]">
                  <span className="text-4xl md:text-6xl font-serif text-white font-light">
                    {block.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs md:text-sm uppercase tracking-widest text-purple-300 font-medium">
                  {block.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
