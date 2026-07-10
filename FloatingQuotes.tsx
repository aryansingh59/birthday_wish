import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const quotes = [
  "You are my today and all of my tomorrows.",
  "In you, I've found the love of my life and my closest, truest friend.",
  "Every love story is beautiful, but ours is my favorite.",
  "I look at you and see the rest of my life in front of my eyes.",
  "You are the best thing that's ever been mine."
];

export function FloatingQuotes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 8000); // Change quote every 8 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 0.05, scale: 1, filter: "blur(0px)" }} // Very subtle opacity
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute max-w-4xl text-center px-8"
        >
          <p className="font-script text-6xl md:text-8xl text-pink-200 leading-tight">
            "{quotes[currentIndex]}"
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
