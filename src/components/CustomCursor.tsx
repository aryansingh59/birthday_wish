import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') != null ||
        target.closest('button') != null;
        
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Use a slightly delayed spring for the trailing effect
  return (
    <>
      {/* Outer glow */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full bg-pink-500/20 blur-xl pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
      {/* Center cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      >
        <Heart 
          className={`w-5 h-5 ${isPointer ? 'fill-pink-400 text-pink-400' : 'text-pink-300'}`} 
          strokeWidth={isPointer ? 2 : 1.5}
        />
      </motion.div>
    </>
  );
}
