import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle, Network, Layers } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';

const MOCK_CHART_DATA = [
    { name: 'M', hours: 1.5 }, { name: 'T', hours: 2.2 },
    { name: 'W', hours: 1.8 }, { name: 'T', hours: 4.5 },
    { name: 'F', hours: 3.0 }, { name: 'S', hours: 5.2 },
    { name: 'S', hours: 4.8 },
];

export function FeaturesBentoGrid() {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
        setIsFlipped(prev => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#0A0F1E] py-24 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Master Anything Instantly</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Our AI tools do the heavy lifting so you can focus on learning.</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          
          {/* Large Card: Adaptive Flashcards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -mr-10 -mt-10" />
            <div className="relative z-10 flex-1 flex flex-col justify-end">
                <BrainCircuit className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-3xl font-bold text-white mb-3">Adaptive Flashcards</h3>
                <p className="text-gray-400 text-lg w-full md:w-3/4">AI generates and flips cards based on what you don't know, completely optimizing your spaced repetition schedule.</p>
            </div>
            
            {/* Animated 3D Mini Flashcard inside card */}
            <div className="absolute top-10 right-10 w-48 h-56 hidden md:block perspective-1000">
                <div 
                    className="w-full h-full relative transition-transform duration-700 transform-style-3d cursor-pointer"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
                >
                    <div className="absolute inset-0 bg-[#131B2F] border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-lg backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                        <span className="text-blue-400 font-bold mb-2">Q</span>
                        <div className="text-white font-bold text-lg leading-tight">What is Neural Plasticity?</div>
                    </div>
                    <div className="absolute inset-0 bg-blue-600 border border-blue-500 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-lg backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                        <span className="text-white/80 font-bold mb-2">A</span>
                        <div className="text-white font-medium text-sm leading-tight">The brain's ability to reorganize itself by forming new neural connections.</div>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Small Card 1: Smart Quizzes */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent z-0"></div>
            <div className="relative z-10">
                <CheckCircle className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Smart Quizzes</h3>
                <p className="text-sm text-gray-400">Multiple choice questions pinpointing weak spots directly from your notes.</p>
            </div>
            {/* Mock quiz UI */}
            <div className="relative z-10 w-full mt-4 bg-white/5 rounded-xl border border-white/5 p-3 space-y-2">
                <div className="h-2 w-3/4 bg-white/20 rounded-full"></div>
                <div className="w-full h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40"></div>
                <div className="w-full h-8 rounded-lg bg-white/10"></div>
            </div>
          </motion.div>

          {/* Small Card 2: Mind Maps */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-4 right-4 text-blue-500/20 animate-pulse-slow">
               <Network className="w-24 h-24" />
            </div>
            <div className="relative z-10 flex-1">
                <Network className="w-8 h-8 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Mind Maps</h3>
                <p className="text-sm text-gray-400">Visual node-based knowledge graphs of your texts.</p>
            </div>
          </motion.div>

          {/* Small Card 3: Progress Tracking */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col relative group overflow-hidden"
          >
            <div className="relative z-10 pointer-events-none">
                <h3 className="text-xl font-bold text-white mb-1">Progress Tracking</h3>
                <p className="text-sm text-gray-400 mb-4">Real-time mastery insights.</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[100px] opacity-80 z-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                        <defs>
                            <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorProg)" isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Wide Card: Tag Cloud */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-300 flex flex-col md:flex-row items-center justify-between overflow-hidden relative group"
          >
            <div className="md:w-1/3 mb-6 md:mb-0 relative z-10">
                <Layers className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">Works With Any Subject</h3>
                <p className="text-gray-400 text-sm">Perfect for Science, History, Law, Medicine, Programming, and everything in between.</p>
            </div>
            <div className="md:w-2/3 w-full flex overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                {/* Auto scrolling container */}
                <div className="flex gap-4 animate-marquee whitespace-nowrap py-4">
                    {['Anatomy', 'Calculus', 'World History', 'Biochemistry', 'Contract Law', 'Thermodynamics', 'Machine Learning', 'Linguistics', 'Microeconomics', 'Organic Chemistry'].map((tag, i) => (
                        <div key={i} className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white font-medium text-sm items-center shadow-lg whitespace-nowrap">
                            {tag}
                        </div>
                    ))}
                    {/* Duplicate for seamless marquee */}
                    {['Anatomy', 'Calculus', 'World History', 'Biochemistry', 'Contract Law', 'Thermodynamics', 'Machine Learning', 'Linguistics', 'Microeconomics', 'Organic Chemistry'].map((tag, i) => (
                        <div key={i + 'dup'} className="px-5 py-2 rounded-full bg-white/10 border border-white/10 text-white font-medium text-sm items-center shadow-lg whitespace-nowrap">
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
