import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function HeaderLogo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-3"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0066FF]">
        <Sparkles size={18} className="text-white" />
      </div>
      <span className="shrink-0 text-[1.8rem] font-black tracking-tighter">
        <span className="text-[#0066FF]">Study</span><span className="text-[#F5F5F5] italic lowercase">.ai</span>
      </span>
    </motion.div>
  );
}
