import { Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function VideoDemo() {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [50, -100]);

  return (
    <div className="relative w-full overflow-hidden bg-transparent py-24 font-sans">
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
          className="relative w-full aspect-video overflow-hidden rounded-[2rem] border border-white/[0.07] bg-[#111520] p-2"
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-[#0d1118]">
            <div className="absolute top-6 left-6 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015),rgba(255,255,255,0))]" />
            <svg className="absolute inset-0 h-full w-full text-blue-500 opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>

            <div className="z-10 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-white/[0.07] bg-[#111520] text-white transition-all duration-300 hover:scale-105 hover:bg-[#151a26]">
              <Play className="w-10 h-10 fill-current translate-x-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
