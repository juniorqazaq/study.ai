import { useEffect, useState, useRef } from 'react';
import { Users, Zap, Star, Building } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ end, duration = 2 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatisticsBar() {
  return (
    <div className="w-full bg-[#0A0F1E] py-16 border-y border-white/5 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:divide-x divide-white/5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1 }} className="flex flex-col items-center justify-center text-center p-4">
            <Users className="w-8 h-8 text-blue-500 mb-4" />
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2"><AnimatedCounter end={1200} />+</div>
            <div className="text-sm lg:text-base text-gray-400 font-medium">Students</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.2 }} className="flex flex-col items-center justify-center text-center p-4">
            <Zap className="w-8 h-8 text-blue-500 mb-4" />
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2"><AnimatedCounter end={50000} />+</div>
            <div className="text-sm lg:text-base text-gray-400 font-medium">Flashcards Generated</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.3 }} className="flex flex-col items-center justify-center text-center p-4">
            <Star className="w-8 h-8 text-indigo-500 mb-4" />
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2"><AnimatedCounter end={98} />%</div>
            <div className="text-sm lg:text-base text-gray-400 font-medium">Satisfaction Rate</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.4 }} className="flex flex-col items-center justify-center text-center p-4 lg:border-none">
            <Building className="w-8 h-8 text-indigo-500 mb-4" />
            <div className="text-3xl lg:text-4xl font-bold text-white mb-2"><AnimatedCounter end={6} /></div>
            <div className="text-sm lg:text-base text-gray-400 font-medium">Universities</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
