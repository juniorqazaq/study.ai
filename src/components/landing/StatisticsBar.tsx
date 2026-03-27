import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Inline SVG Icons — Azure Blue (#0066FF)
const IcoUsers = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcoZap = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IcoStar = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcoBuilding = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="12"/><line x1="15" y1="22" x2="15" y2="12"/><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/></svg>;

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

const stats = [
  { icon: <IcoUsers />, end: 1200, suffix: '+', label: 'Students' },
  { icon: <IcoZap />, end: 50000, suffix: '+', label: 'Flashcards Generated' },
  { icon: <IcoStar />, end: 98, suffix: '%', label: 'Satisfaction Rate' },
  { icon: <IcoBuilding />, end: 6, suffix: '', label: 'Universities' },
];

export function StatisticsBar() {
  return (
    <div className="w-full bg-[#07090f] py-16 border-y border-[#1e2235] relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-[#0d0f1a] border border-[#1e2235] rounded-2xl overflow-hidden shadow-2xl">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col items-center justify-center text-center p-8 ${i < 3 ? 'border-r border-[#1e2235]' : ''}`}
            >
              <div className="mb-4">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.end} />{stat.suffix}
              </div>
              <div className="text-sm lg:text-base text-[#e2e8f0]/50 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
