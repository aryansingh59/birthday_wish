import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Mic } from 'lucide-react';

export function VoiceMessage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(120); // Estimated 120s script

  const script = `Happy Birthday Jassi, meri jaan. Aaj ka din sirf ek tareekh nahi hai, aaj wo din hai jab is duniya mein meri sabse favorite insaan aayi thi. Main jaanta hoon ki main hamesha perfect nahi hota, aur shabdon mein apni feelings express karna mujhe utna achha nahi aata, par mera pyaar tumhare liye hamesha sacha aur gehra hai. 
  
Tum jab hasti ho na, toh lagta hai jaise poori duniya thahar gayi ho. Tumhari har chhoti-chhoti aadat, tumhare baat karne ka tareeqa, tumhara mujhe dekhna—mujhe tumse har roz aur zyada pyaar ho jata hai. Aaj ka din mere liye kisi bade festival se kam nahi hai. Main chahta hoon ki tumhari zindagi ki har dua qubool ho, aur main hamesha un duaon mein tumhare saath khada rahoon.

Yeh website, yeh messages, yeh sab sirf ek chhota sa zariya hai tumhe batane ka ki tum mere liye kya maayne rakhti ho. Aryan ki taraf se, duniya ki sabse khubsurat ladki ko, janamdin ki bohot bohot shubhkamnayein. I love you, today, tomorrow, and forever.`;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) return 100;
          return p + (100 / (duration * 10)); // updating every 100ms
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    // Ensure voices are loaded
    window.speechSynthesis.getVoices();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleVoice = () => {
    const synth = window.speechSynthesis;
    
    if (isPlaying) {
      synth.pause(); // Just pause it, or cancel. Let's cancel for simplicity.
      synth.cancel();
      setIsPlaying(false);
      setProgress(0);
    } else {
      synth.cancel();
      setProgress(0);
      
      const utterance = new SpeechSynthesisUtterance(script);
      utterance.rate = 0.85; // Slow, romantic pace
      utterance.pitch = 0.9; // Slightly deeper pitch
      
      const voices = synth.getVoices();
      // Try to find an Indian male voice
      let bestVoice = voices.find(v => v.lang.includes('hi-IN') && v.name.toLowerCase().includes('male'))
                   || voices.find(v => v.lang.includes('hi'))
                   || voices.find(v => v.lang.includes('en-IN') && v.name.toLowerCase().includes('male'))
                   || voices.find(v => v.lang.includes('en-IN'))
                   || voices[0];
                   
      if (bestVoice) {
        utterance.voice = bestVoice;
      }
      
      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(100);
      };
      
      utterance.onstart = () => {
        setIsPlaying(true);
      };
      
      synth.speak(utterance);
    }
  };

  return (
    <section className="py-24 px-4 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <span className="text-pink-400 text-sm tracking-widest uppercase mb-4 block">A Voice From My Heart</span>
        <h2 className="text-4xl font-serif mb-4 text-pink-50">Just For You</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-panel rounded-[2rem] p-4 md:p-6 flex items-center gap-4 md:gap-6 border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10" />
        
        <button 
          onClick={toggleVoice}
          className="relative z-10 w-14 h-14 shrink-0 rounded-full bg-pink-500 text-white flex items-center justify-center hover:bg-pink-400 transition-colors shadow-lg shadow-pink-500/30"
        >
          {isPlaying ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
        </button>

        <div className="flex-1 relative z-10 flex items-center gap-1.5 md:gap-2">
          {/* Simulated audio waveform */}
          {Array.from({ length: 40 }).map((_, i) => {
            const isActive = (i / 40) * 100 <= progress;
            const height = 10 + Math.random() * 30; // Random heights
            return (
              <motion.div
                key={i}
                className={"flex-1 rounded-full transition-colors duration-300 " + (isActive ? 'bg-pink-400' : 'bg-pink-500/20')}
                animate={{ height: isPlaying && isActive && Math.random() > 0.4 ? height * 1.5 : height }}
                transition={{ duration: 0.3 }}
                style={{ minHeight: '4px', maxWidth: '4px' }}
              />
            );
          })}
        </div>

        <div className="relative z-10 shrink-0 flex items-center gap-2 text-pink-300 mr-2 md:mr-4">
          <Mic className="w-4 h-4" />
          <span className="text-sm font-mono tracking-wider">{isPlaying ? 'Playing...' : 'Tap to Listen'}</span>
        </div>
      </motion.div>
    </section>
  );
}
