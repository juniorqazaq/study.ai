import React from 'react';
import { Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function VideoDemo() {
  const { scrollYProgress } = useScroll();
  // Creates a subtle parallax upward shift between 0 and 0.5 overall scroll progress
  // Since we can't perfectly predict where it is, we will apply an offset mapped to scroll.
  // We offset Y by -50px as you scroll.
  const yOffset = useTransform(scrollYProgress, [0, 1], [50, -100]);

  return (
    <div className="w-full bg-[#0A0F1E] py-24 relative overflow-hidden font-sans">
      
      {/* Background glow behind video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-8"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-widest uppercase mb-4">
            See it in action
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            Watch Study.ai Transform Your Notes in 60 Seconds
          </h2>
        </motion.div>

        <motion.div 
          style={{ y: yOffset }}
          className="w-full aspect-video bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_0_80px_rgba(59,130,246,0.2)] p-2 hover:shadow-[0_0_100px_rgba(59,130,246,0.25)] transition-shadow duration-500 relative group overflow-hidden"
        >
            {/* Inner Video Container Placeholder */}
            <div className="w-full h-full bg-[#050811] rounded-[1.5rem] relative overflow-hidden border border-white/5 flex items-center justify-center">
                {/* Decorative UI elements mimicking a player */}
                <div className="absolute top-6 left-6 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>

                {/* Abstract visualization inside the video area */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-900/10"></div>
                <svg className="w-full h-full opacity-10 absolute inset-0 text-blue-500" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor"/>
                </svg>

                {/* Giant Play Button */}
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer group-hover:scale-110 group-hover:bg-blue-600/90 transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10">
                    <Play className="w-10 h-10 fill-current translate-x-1" />
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
}
