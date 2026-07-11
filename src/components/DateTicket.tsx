import { motion } from 'motion/react';
import { Ticket, Star, Heart } from 'lucide-react';

export function DateTicket() {
  return (
    <section className="py-24 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, rotate: -5, y: 50 }}
        whileInView={{ opacity: 1, rotate: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 15 }}
        className="w-full max-w-3xl"
      >
        <div className="relative group perspective-1000">
          <motion.div 
            whileHover={{ rotateY: 5, rotateX: 5 }}
            className="w-full rounded-[2rem] overflow-hidden flex flex-col md:flex-row bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 p-1 shadow-[0_0_50px_rgba(251,191,36,0.3)] preserve-3d"
          >
            {/* The Ticket Body */}
            <div className="flex-1 bg-slate-950 rounded-[1.8rem] md:rounded-r-none md:border-r-2 md:border-dashed border-amber-500/50 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-amber-400 mb-6 uppercase tracking-widest text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400" /> VIP Access
                </div>
                
                <h3 className="text-3xl md:text-5xl font-serif text-amber-50 mb-2">Golden Date Ticket</h3>
                <p className="text-amber-200/70 font-light text-sm md:text-base mb-8 max-w-md">
                  Valid for one unforgettable romantic evening, fully planned and paid for by Aryan.
                </p>
                
                <div className="flex flex-wrap gap-6">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-amber-500/70 mb-1">Passenger</span>
                    <span className="font-serif text-xl text-white">Jassi Pandey</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-amber-500/70 mb-1">Destination</span>
                    <span className="font-serif text-xl text-white">Anywhere You Want</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* The Ticket Stub */}
            <div className="md:w-48 bg-slate-900 rounded-[1.8rem] md:rounded-l-none p-8 flex flex-col items-center justify-center relative border-t-2 border-dashed md:border-t-0 border-amber-500/50">
              <Ticket className="w-12 h-12 text-amber-400 mb-4 opacity-50" />
              <div className="text-center">
                <span className="block text-2xl font-serif text-amber-100 mb-1">ADMIT ONE</span>
                <span className="block text-xs uppercase tracking-widest text-amber-500/70">Forever Valid</span>
              </div>
              
              <Heart className="absolute bottom-6 w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
