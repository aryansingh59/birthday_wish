import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const colors = ['text-pink-400', 'text-rose-400', 'text-fuchsia-400', 'text-purple-400'];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't spawn hearts if clicking a button to avoid interference with button actions
      // (or we can just let it spawn everywhere as it's pointer-events-none)
      const newHeart: FloatingHeart = {
        id: heartCount,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 20 + 16, // 16px to 36px
      };

      setHearts((prev) => [...prev, newHeart]);
      setHeartCount((prev) => prev + 1);

      // Remove heart after animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 3000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [heartCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0, x: heart.x - heart.size/2, y: heart.y - heart.size/2 }}
            animate={{ 
              opacity: 0, 
              scale: 1.5, 
              y: heart.y - 150 - Math.random() * 100,
              x: heart.x - heart.size/2 + (Math.random() * 100 - 50)
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={`absolute ${heart.color} drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]`}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
