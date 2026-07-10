import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Music } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // We use a safe public domain or placeholder audio if needed, 
  // but since we might not have a reliable one, we just toggle state and visually play.
  // Actually, let's use a widely available public domain track.
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-111178.mp3"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Handle autoplay restrictions gracefully
        audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Attempt to play on first interaction anywhere in the document if not playing
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Ignore, user will click play manually
        });
        window.removeEventListener('click', handleFirstInteraction);
      }
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [isPlaying]);

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 glass-panel px-4 py-3 rounded-full"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
    >
      <audio ref={audioRef} loop src={audioSrc} />
      
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-pink-300 font-semibold">Playing</span>
        <span className="text-xs text-slate-300">Our Song</span>
      </div>

      <button 
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 hover:bg-pink-500/40 hover:text-white transition-all ml-2 border border-pink-500/30 relative"
      >
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        
        {isPlaying && (
          <motion.div 
            className="absolute -inset-2 rounded-full border border-pink-500/30"
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </button>

      {/* Visualizer bars */}
      <div className="flex items-end gap-1 h-4 ml-1">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 bg-pink-400 rounded-t-full"
            animate={{ height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%" }}
            transition={{ 
              duration: 1 + Math.random(), 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
