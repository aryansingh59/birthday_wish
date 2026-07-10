import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const handleRevealAll = () => {
      if (!isScratched) {
        setIsScratched(true);
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#ec4899', '#a855f7', '#ffffff']
        });
      }
    };
    window.addEventListener('ai-reveal-all', handleRevealAll);
    return () => window.removeEventListener('ai-reveal-all', handleRevealAll);
  }, [isScratched]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill the canvas with a silver/pink scratchable layer
    const fillCanvas = () => {
      ctx.fillStyle = '#a855f7'; // Purple base
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some pattern/text
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      for(let i=0; i<100; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.font = '24px Inter';
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.textAlign = 'center';
      ctx.fillText('Scratch to Reveal', canvas.width/2, canvas.height/2);
    };

    fillCanvas();

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;
      
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      return {
        x: ((clientX - rect.left) / rect.width) * canvas.width,
        y: ((clientY - rect.top) / rect.height) * canvas.height
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || isScratched) return;
      e.preventDefault();

      const pos = getMousePos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
      ctx.fill();

      checkScratched();
    };

    const checkScratched = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparentPixels = 0;
      const totalPixels = imageData.data.length / 4;

      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) {
          transparentPixels++;
        }
      }

      if (transparentPixels / totalPixels > 0.5 && !isScratched) {
        setIsScratched(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#ec4899', '#a855f7', '#ffffff']
        });
      }
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true;
      scratch(e);
    };

    const handleUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', scratch);
    window.addEventListener('mouseup', handleUp);

    canvas.addEventListener('touchstart', handleDown, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    window.addEventListener('touchend', handleUp);

    return () => {
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', scratch);
      window.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('touchstart', handleDown);
      canvas.removeEventListener('touchmove', scratch);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isScratched]);

  return (
    <section className="py-24 px-4 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-pink-400 text-sm tracking-widest uppercase mb-4 block">A Hidden Surprise</span>
        <h2 className="text-3xl font-serif mb-12 text-pink-50">Scratch the Card</h2>

        <div className="relative w-[300px] h-[200px] mx-auto rounded-2xl overflow-hidden glass-panel border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
          {/* Revealed Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20">
            <Sparkles className="text-pink-400 w-8 h-8 mb-2 animate-pulse" />
            <h3 className="text-xl font-serif text-pink-50 mb-2">Free Hug Coupon</h3>
            <p className="text-sm text-pink-200">Redeemable anytime, anywhere. Valid forever. ❤️</p>
          </div>

          {/* Scratch Canvas */}
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            className={`absolute inset-0 cursor-crosshair transition-opacity duration-500 ${isScratched ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          />
        </div>
      </motion.div>
    </section>
  );
}
