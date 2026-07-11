import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Heart } from 'lucide-react';

export function LetterSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [displayedText, setDisplayedText] = useState("");
  
  const letterText = `My Dearest Jassi,

Happy Birthday! 

I wanted to make something truly special for you, something that shows even just a fraction of how much you mean to me. You bring so much light and joy into my life, and this day is the perfect excuse to celebrate the amazing person you are.

Every moment with you is a gift. Your kindness, your laugh, your beautiful spirit—they all make the world a better place. 

I hope this year brings you all the happiness, love, and success you deserve. Keep shining, keep smiling, and never forget how incredibly special you are.

With all my heart,
Aryan`;

  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex <= letterText.length) {
          setDisplayedText(letterText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 30); // Typing speed

      return () => clearInterval(intervalId);
    }
  }, [isInView]);

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="glass-panel rounded-[2rem] p-8 md:p-16 relative overflow-hidden bg-white/10"
      >
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Mail size={120} className="text-pink-300" />
        </div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-serif text-pink-200 mb-8 border-b border-pink-500/20 pb-4 inline-block">
            A Letter for You
          </h2>
          
          <div className="min-h-[400px]">
            <p className="font-script text-2xl md:text-3xl text-pink-50 leading-relaxed whitespace-pre-wrap tracking-wide">
              {displayedText}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-6 bg-pink-400 ml-1 translate-y-1"
              />
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
