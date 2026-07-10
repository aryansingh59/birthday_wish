import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Play, Pause, Gift, Sparkles, ChevronRight } from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSectionDesc, setCurrentSectionDesc] = useState("Ready to explore?");

  // Handle scroll progress and section detection
  useEffect(() => {
    const handleScroll = () => {
      // Calculate percentage
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Detect current section via bounding rects
      const sections = [
        { id: 'hero', name: 'Welcome', desc: 'A grand entrance for the most special person.' },
        { id: 'letter', name: 'Love Letter', desc: 'Words straight from the heart, just for you.' },
        { id: 'voice-message', name: 'Voice Note', desc: 'Listen to my voice, pouring out my feelings.' },
        { id: 'star-map', name: 'Star Map', desc: 'The exact alignment of the stars when you were born.' },
        { id: 'photo-gallery', name: 'Memories', desc: 'A beautiful gallery of our favorite moments together.' },
        { id: 'memory-book', name: 'Our Story', desc: 'Flipping through the chapters of our journey.' },
        { id: 'timeline', name: 'Timeline', desc: 'Milestones that built our beautiful connection.' },
        { id: 'journey-map', name: 'Distance', desc: 'No matter how far, my heart travels to you.' },
        { id: 'love-quiz', name: 'Quiz Time', desc: 'Let\'s see how well you remember our tiny details!' },
        { id: 'reasons', name: '100 Reasons', desc: 'Just a fraction of the reasons why I love you.' },
        { id: 'open-when', name: 'Open When', desc: 'Letters for every mood and every moment.' },
        { id: 'virtual-gift', name: 'Surprise Gift', desc: 'A magical present waiting to be opened.' },
        { id: 'date-ticket', name: 'Golden Ticket', desc: 'Your VIP pass to a perfect romantic date.' },
        { id: 'wish-jar', name: 'Promise Jar', desc: 'Pick a note and see my promises to you.' },
        { id: 'scratch-card', name: 'Scratch Card', desc: 'Scratch away to reveal a sweet hidden reward.' },
        { id: 'wax-envelope', name: 'Sealed Confession', desc: 'Break the seal for a secret message.' },
        { id: 'compliment-generator', name: 'Compliments', desc: 'Click to see what makes you absolutely amazing.' },
        { id: 'countdown', name: 'Countdown', desc: 'Making every single second of your day count.' },
        { id: 'secret-message', name: 'Secret Lock', desc: 'The final, ultimate surprise just for you.' },
      ];

      let found = false;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is above the middle of the screen
          if (rect.top <= window.innerHeight / 2) {
            setCurrentSectionDesc(sections[i].desc);
            found = true;
            break;
          }
        }
      }
      if (!found) setCurrentSectionDesc("Taking a tour of your birthday surprise...");
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Auto-scroll
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScrolling) {
      interval = setInterval(() => {
        window.scrollBy({ top: 2, behavior: 'auto' });
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
          setIsAutoScrolling(false);
        }
      }, 20); // 2px every 20ms = smooth slow scroll
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
    if (!isOpen) setIsOpen(true);
  };

  const revealAllGifts = () => {
    window.dispatchEvent(new Event('ai-reveal-all'));
    // Small success feedback
    setCurrentSectionDesc("✨ Magic activated! All hidden gifts, envelopes, and cards have been opened for you!");
  };

  return (
    <div className="fixed top-24 right-4 md:right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="glass-panel p-5 rounded-2xl w-64 md:w-80 shadow-2xl border-pink-500/30 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-pink-400 to-purple-400" style={{ width: `${scrollProgress}%` }} />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-pink-500" />
              </div>
              <h4 className="font-serif text-pink-50 text-lg">Auto-Tour Guide</h4>
            </div>

            <p className="text-sm text-slate-300 mb-6 font-light leading-relaxed min-h-[3rem]">
              {currentSectionDesc}
            </p>

            <div className="flex flex-col gap-2">
              <button 
                onClick={toggleAutoScroll}
                className="w-full py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 text-pink-100 flex items-center justify-center gap-2 text-sm transition-colors"
              >
                {isAutoScrolling ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAutoScrolling ? 'Pause Tour' : 'Start Auto-Scroll'}
              </button>

              <button 
                onClick={revealAllGifts}
                className="w-full py-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-100 flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Gift className="w-4 h-4" />
                Reveal All Surprises
              </button>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-xs text-slate-400">
              <span>Scroll Progress</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-pink-400 hover:bg-pink-500/20 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] border-pink-500/40 relative group"
      >
        <Bot className="w-6 h-6" />
        
        {/* Radar ping effect */}
        {isAutoScrolling && (
          <span className="absolute inset-0 rounded-full border border-pink-400 animate-ping opacity-50" />
        )}
        
        {/* Progress ring around button */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
          <circle 
            cx="50" cy="50" r="48" 
            fill="none" 
            stroke="rgba(236,72,153,0.5)" 
            strokeWidth="4" 
            strokeDasharray="301.59" 
            strokeDashoffset={301.59 - (scrollProgress / 100) * 301.59}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>
      </button>
    </div>
  );
}
