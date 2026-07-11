import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const pages = [
  { text: "Page 1: The day I realized I was falling for you. It was sudden, beautiful, and completely out of my control." },
  { text: "Page 2: Your laugh. It's my favorite sound in the entire world, better than any song." },
  { text: "Page 3: The way you look at me. Sometimes I catch you staring, and my heart skips a beat." },
  { text: "Page 4: Our future. I don't know exactly where we'll go, but I know I want you there." }
];

export function MemoryBook() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(p => p + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif text-pink-50 mb-4">Our Story Book</h2>
      </div>

      <div className="relative w-full max-w-2xl aspect-[3/2] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ rotateY: -90, opacity: 0, originX: 0 }}
            animate={{ rotateY: 0, opacity: 1, originX: 0 }}
            exit={{ rotateY: 90, opacity: 0, originX: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="absolute inset-0 bg-[#fdfbf7] rounded-r-3xl rounded-l-md shadow-2xl flex items-center p-8 md:p-16 border-l-[12px] border-[#3b2d28] before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] before:opacity-50"
          >
            <p className="font-script text-2xl md:text-4xl text-slate-800 leading-relaxed text-center w-full relative z-10">
              {pages[currentPage].text}
            </p>
            <div className="absolute bottom-6 right-8 text-slate-400 font-serif text-sm">
              {currentPage + 1}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-6 mt-12">
        <button 
          onClick={prevPage}
          disabled={currentPage === 0}
          className="p-4 rounded-full glass-panel disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-500/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-pink-300" />
        </button>
        <button 
          onClick={nextPage}
          disabled={currentPage === pages.length - 1}
          className="p-4 rounded-full glass-panel disabled:opacity-30 disabled:cursor-not-allowed hover:bg-pink-500/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-pink-300" />
        </button>
      </div>
    </section>
  );
}
