import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

// Accent palette: azure, red, green, yellow
const IcoBrain = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00A6FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IcoCheck = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FF5A5F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const IcoNetwork = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00C26F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="6" y1="6" x2="9" y2="11"/><line x1="18" y1="6" x2="15" y2="11"/><line x1="6" y1="18" x2="9" y2="13"/><line x1="18" y1="18" x2="15" y2="13"/></svg>;
const IcoNetworkBig = () => <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="6" y1="6" x2="9" y2="11"/><line x1="18" y1="6" x2="15" y2="11"/><line x1="6" y1="18" x2="9" y2="13"/><line x1="18" y1="18" x2="15" y2="13"/></svg>;
const IcoNotes = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/><line x1="8" y1="9" x2="10" y2="9"/></svg>;
const IcoLayers = () => <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFCC33" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;

const MOCK_CHART_DATA = [
    { name: 'M', hours: 1.5 }, { name: 'T', hours: 2.2 },
    { name: 'W', hours: 1.8 }, { name: 'T', hours: 4.5 },
    { name: 'F', hours: 3.0 }, { name: 'S', hours: 5.2 },
    { name: 'S', hours: 4.8 },
];

const cardBase = "bg-[#0d0f1a] border border-[#1e2235] rounded-3xl p-6 transition-all duration-300 relative overflow-hidden";

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
          <h2 className="text-4xl md:text-5xl font-bold text-[#e2e8f0] mb-4">Master Anything Instantly</h2>
          <p className="text-lg text-[#e2e8f0]/50 max-w-2xl mx-auto">Our AI tools do the heavy lifting so you can focus on learning.</p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[250px]">
          
          {/* Large Card: Adaptive Flashcards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className={`md:col-span-2 md:row-span-2 ${cardBase} flex flex-col hover:border-[#00A6FF]/35 hover:shadow-[0_0_38px_rgba(0,166,255,0.14)]`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A6FF]/10 rounded-full blur-[80px] -mr-10 -mt-10" />
            <div className="relative z-10 flex-1 flex flex-col justify-end">
                <IcoBrain />
                <h3 className="text-3xl font-bold text-[#e2e8f0] mt-6 mb-3">Adaptive Flashcards</h3>
                <p className="text-[#e2e8f0]/50 text-lg w-full md:w-3/4">AI generates and flips cards based on what you don't know, completely optimizing your spaced repetition schedule.</p>
            </div>
            
            {/* Animated Mini Flashcard */}
            <div className="absolute top-10 right-10 w-48 h-56 hidden md:block perspective-1000">
                <div 
                    className="w-full h-full relative transition-transform duration-700"
                    style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
                >
                    <div className="absolute inset-0 bg-[#1a1d2e] border border-[#1e2235] rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-lg backface-hidden" style={{ backfaceVisibility: 'hidden' }}>
                        <span className="text-[#00A6FF] font-bold mb-2">Q</span>
                        <div className="text-white font-bold text-lg leading-tight">What is Neural Plasticity?</div>
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,#00A6FF,#1D4ED8)] border border-[#1D4ED8] rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-lg backface-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
                        <span className="text-white/80 font-bold mb-2">A</span>
                        <div className="text-white font-medium text-sm leading-tight">The brain's ability to reorganize itself by forming new neural connections.</div>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Small Card: Smart Quizzes */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className={`${cardBase} flex flex-col justify-between hover:border-[#FF5A5F]/35 hover:shadow-[0_0_38px_rgba(255,90,95,0.14)]`}
          >
            <div>
                <IcoCheck />
                <h3 className="text-xl font-bold text-[#e2e8f0] mt-4 mb-2">Smart Quizzes</h3>
                <p className="text-sm text-[#e2e8f0]/50">Multiple choice questions pinpointing weak spots directly from your notes.</p>
            </div>
            <div className="w-full mt-4 bg-white/5 rounded-xl border border-[#1e2235] p-3 space-y-2">
                <div className="h-2 w-3/4 bg-white/20 rounded-full"></div>
                <div className="w-full h-8 rounded-lg bg-[#FF5A5F]/18 border border-[#FF5A5F]/40"></div>
                <div className="w-full h-8 rounded-lg bg-[#FFCC33]/14 border border-[#FFCC33]/25"></div>
            </div>
          </motion.div>

          {/* Small Card: Mind Maps */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3 }}
            className={`${cardBase} flex flex-col justify-between hover:border-[#00C26F]/35 hover:shadow-[0_0_38px_rgba(0,194,111,0.14)]`}
          >
            <div className="absolute top-4 right-4 text-[#00C26F]/12 animate-pulse-slow">
               <IcoNetworkBig />
            </div>
            <div className="relative z-10 flex-1">
                <IcoNetwork />
                <h3 className="text-xl font-bold text-[#e2e8f0] mt-4 mb-2">Mind Maps</h3>
                <p className="text-sm text-[#e2e8f0]/50">Visual node-based knowledge graphs of your texts.</p>
            </div>
          </motion.div>

          {/* Small Card: Progress Tracking */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.4 }}
            className={`${cardBase} flex flex-col hover:border-[#FFCC33]/35 hover:shadow-[0_0_38px_rgba(255,204,51,0.14)]`}
          >
            <div className="relative z-10 pointer-events-none">
                <h3 className="text-xl font-bold text-[#e2e8f0] mb-1">Progress Tracking</h3>
                <p className="text-sm text-[#e2e8f0]/50 mb-4">Real-time mastery insights.</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-[100px] opacity-80 z-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_CHART_DATA}>
                        <defs>
                            <linearGradient id="colorProg" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#FF5A5F" stopOpacity={0.45} />
                                <stop offset="55%" stopColor="#FFCC33" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#00A6FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="hours" stroke="#FFCC33" strokeWidth={3} fillOpacity={1} fill="url(#colorProg)" isAnimationActive={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Wide Card: Notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.45 }}
            className={`md:col-span-2 ${cardBase} flex flex-col justify-between hover:border-[#0066FF]/35 hover:shadow-[0_0_38px_rgba(0,102,255,0.14)]`}
          >
            <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-[#0066FF]/10 blur-[80px]" />
            <div className="relative z-10">
              <IcoNotes />
              <h3 className="text-2xl font-bold text-[#e2e8f0] mt-4 mb-2">Notes</h3>
              <p className="text-[#e2e8f0]/50 text-sm max-w-xl">
                Capture key ideas, save summaries, and keep important explanations in one clean workspace next to your quizzes, flashcards, and maps.
              </p>
            </div>
            <div className="relative z-10 mt-6 rounded-2xl border border-[#1e2235] bg-[#121626] p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#0066FF]" />
                <div className="h-2 w-28 rounded-full bg-white/15" />
              </div>
              <div className="space-y-3">
                <div className="h-3 w-full rounded-full bg-white/10" />
                <div className="h-3 w-[92%] rounded-full bg-white/10" />
                <div className="h-3 w-[80%] rounded-full bg-[#0066FF]/18" />
                <div className="h-3 w-[65%] rounded-full bg-white/10" />
              </div>
            </div>
          </motion.div>

          {/* Wide Card: Tag Cloud */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.5 }}
            className={`md:col-span-3 ${cardBase} flex flex-col md:flex-row items-center justify-between hover:border-[#8B5CF6]/28 hover:shadow-[0_0_38px_rgba(139,92,246,0.1)]`}
          >
            <div className="md:w-1/3 mb-6 md:mb-0 relative z-10">
                <IcoLayers />
                <h3 className="text-2xl font-bold text-[#e2e8f0] mt-4 mb-2 leading-tight">Works With Any Subject</h3>
                <p className="text-[#e2e8f0]/50 text-sm">Perfect for Science, History, Law, Medicine, Programming, and everything in between.</p>
            </div>
            <div className="md:w-2/3 w-full flex overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <div className="flex gap-4 animate-marquee whitespace-nowrap py-4">
                    {['Anatomy', 'Calculus', 'World History', 'Biochemistry', 'Contract Law', 'Thermodynamics', 'Machine Learning', 'Linguistics', 'Microeconomics', 'Organic Chemistry'].map((tag, i) => (
                        <div key={i} className={`px-5 py-2 rounded-full text-[#e2e8f0] font-medium text-sm shadow-lg whitespace-nowrap ${
                            i % 5 === 0 ? 'bg-[#00A6FF]/10 border border-[#00A6FF]/25' :
                            i % 5 === 1 ? 'bg-[#FF5A5F]/10 border border-[#FF5A5F]/25' :
                            i % 5 === 2 ? 'bg-[#00C26F]/10 border border-[#00C26F]/25' :
                            i % 5 === 3 ? 'bg-[#FFCC33]/10 border border-[#FFCC33]/25' :
                            'bg-[#8B5CF6]/10 border border-[#8B5CF6]/25'
                        }`}>
                            {tag}
                        </div>
                    ))}
                    {['Anatomy', 'Calculus', 'World History', 'Biochemistry', 'Contract Law', 'Thermodynamics', 'Machine Learning', 'Linguistics', 'Microeconomics', 'Organic Chemistry'].map((tag, i) => (
                        <div key={i + 'dup'} className={`px-5 py-2 rounded-full text-[#e2e8f0] font-medium text-sm shadow-lg whitespace-nowrap ${
                            i % 5 === 0 ? 'bg-[#00A6FF]/10 border border-[#00A6FF]/25' :
                            i % 5 === 1 ? 'bg-[#FF5A5F]/10 border border-[#FF5A5F]/25' :
                            i % 5 === 2 ? 'bg-[#00C26F]/10 border border-[#00C26F]/25' :
                            i % 5 === 3 ? 'bg-[#FFCC33]/10 border border-[#FFCC33]/25' :
                            'bg-[#8B5CF6]/10 border border-[#8B5CF6]/25'
                        }`}>
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
