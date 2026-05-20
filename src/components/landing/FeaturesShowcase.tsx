import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const springTransition = { type: 'spring', stiffness: 80, damping: 15 };

function FileDropMockup() {
  const [status, setStatus] = useState<'idle' | 'dragging' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus('dragging');

      setTimeout(() => {
        setStatus('uploading');
        setProgress(0);

        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setStatus('success');
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      }, 1200);

      setTimeout(() => {
        setStatus('idle');
      }, 5500);
    }, 6000);

    setTimeout(() => {
      setStatus('dragging');
      setTimeout(() => {
        setStatus('uploading');
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              setStatus('success');
              return 100;
            }
            return prev + 10;
          });
        }, 100);
      }, 1200);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[420px] aspect-[4/3] bg-[#141414] border border-white/[0.08] rounded-[2rem] p-6 flex flex-col justify-between shadow-[0_24px_48px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/[0.1]" />
          <div className="w-3.5 h-1.5 rounded-full bg-white/[0.08]" />
        </div>
        <div className="text-[0.75rem] font-bold text-[#888888]/60 uppercase tracking-widest">
          Upload Manager
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center py-6 relative min-h-[160px]">
        <AnimatePresence mode="popLayout">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/40">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
              </div>
              <div>
                <p className="text-[0.875rem] font-medium text-white/80">Drag & drop your syllabus</p>
                <p className="text-[0.75rem] text-[#888888] mt-1">PDF, DOCX, or text files up to 25MB</p>
              </div>
            </motion.div>
          )}

          {status === 'dragging' && (
            <motion.div
              key="dragging"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400"
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-[0.875rem] font-semibold text-purple-400 animate-pulse">Dropping PDF...</p>
                <p className="text-[0.75rem] text-[#888888] mt-1">Syllabus_Physics_101.pdf</p>
              </div>
            </motion.div>
          )}

          {status === 'uploading' && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full px-6 flex flex-col space-y-4"
            >
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-white/90">Analyzing cells...</span>
                <span className="text-purple-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.04]">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-[0.75rem] text-[#888888] text-center">
                Reading PDF paragraphs, structuring topics
              </span>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-[0.875rem] font-bold text-white">Study Set Built!</p>
                <p className="text-[0.75rem] text-[#888888] mt-1">Physics 101: 24 flashcards ready</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl py-2.5 px-4 flex items-center justify-between text-[0.75rem]">
        <span className="text-[#888888]">Ready to generate</span>
        <span className="text-white font-bold inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-ping" />
          AI Engine Active
        </span>
      </div>
    </div>
  );
}

function FlashcardStackMockup() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: 'Mitochondria', desc: 'Generates chemical energy (ATP) needed to power cell reactions.', category: 'Biology' },
    { title: 'Quantum Entanglement', desc: 'Linked particles match properties instantly, regardless of distance.', category: 'Physics' },
    { title: 'Endothermic Reaction', desc: 'Chemical system absorbing heat energy from its surroundings.', category: 'Chemistry' },
  ];

  return (
    <div className="w-full max-w-[420px] aspect-[4/3] flex items-center justify-center relative p-6">
      <div className="relative w-72 h-44">
        {cards.map((card, idx) => {
          const diff = (idx - activeIdx + 3) % 3;

          let zIndex = 0;
          let scale = 0.9;
          let rotate = 0;
          let y = 0;
          let opacity = 1;

          if (diff === 0) {
            zIndex = 30;
            scale = 1;
            rotate = -4;
            y = -10;
          } else if (diff === 1) {
            zIndex = 20;
            scale = 0.95;
            rotate = 4;
            y = 10;
          } else {
            zIndex = 10;
            scale = 0.9;
            rotate = 12;
            y = 30;
            opacity = 0.4;
          }

          return (
            <motion.div
              key={idx}
              animate={{ scale, rotate, y, opacity }}
              transition={springTransition}
              style={{ zIndex }}
              className="absolute inset-0 bg-[#141414] border border-white/[0.08] rounded-[1.5rem] p-5 shadow-[0_16px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between select-none"
            >
              <div className="flex justify-between items-center">
                <span className={`text-[0.6875rem] font-bold uppercase tracking-widest ${
                  card.category === 'Biology' ? 'text-emerald-400' :
                  card.category === 'Physics' ? 'text-amber-400' :
                  'text-purple-400'
                }`}>
                  {card.category}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  card.category === 'Biology' ? 'bg-[#10B981]' :
                  card.category === 'Physics' ? 'bg-[#EAB308]' :
                  'bg-[#8B5CF6]'
                }`} />
              </div>

              <div className="my-2">
                <h3 className="text-base font-bold text-white tracking-tight mb-1">
                  {card.title}
                </h3>
                <p className="text-[0.8125rem] text-[#888888] font-normal leading-normal line-clamp-3">
                  {card.desc}
                </p>
              </div>

              <div className="text-[0.6875rem] text-[#888888]/40 font-medium">
                Card {idx + 1} of 3 • Auto-Generated
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ScoreChartMockup() {
  const [score, setScore] = useState(45);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        const next = (prev % 3) + 1;
        if (next === 1) {
          setScore(45);
        } else if (next === 2) {
          setScore(78);
        } else {
          setScore(94);
        }
        return next;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const radius = 32;
  const strokeDash = 2 * Math.PI * radius;
  const offset = strokeDash - (score / 100) * strokeDash;

  return (
    <div className="w-full max-w-[420px] aspect-[4/3] bg-[#141414] border border-white/[0.08] rounded-[2rem] p-6 flex flex-col justify-between shadow-[0_24px_48px_rgba(0,0,0,0.3)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#EAB308]/5 pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="text-[0.75rem] font-bold text-[#888888]/60 uppercase tracking-widest">
          Score Dashboard
        </div>
        <div className="rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 px-2 py-0.5 text-[0.6875rem] font-medium text-[#EAB308]">
          Level 4
        </div>
      </div>

      <div className="flex-1 flex gap-5 items-center justify-center my-4">
        <div className="relative flex items-center justify-center w-24 h-24">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r={radius} stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="transparent" />
            <motion.circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#EAB308"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDash}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold text-[#F5F5F5] tracking-tight leading-none">
              {score}%
            </span>
            <span className="text-[0.55rem] text-[#888888]/80 font-bold uppercase tracking-widest leading-none mt-1">
              MASTERY
            </span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
            <span className="text-[0.6875rem] text-[#888888] font-normal block mb-1">Adaptive Quiz Speed</span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">92% Precision</span>
              <span className="text-[0.6875rem] text-[#EAB308] font-semibold">+12% vs yesterday</span>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.04] p-2.5 rounded-xl">
            <span className="text-[0.6875rem] text-[#888888] font-normal block mb-1">Target Weak Areas</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
              <span className="text-xs font-bold text-white">Chemical Kinetics</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[0.6875rem] text-[#888888] mb-1">
          <span>Quiz Question Progress</span>
          <span>Question {step} of 3</span>
        </div>
        <div className="flex gap-1.5 h-1.5 bg-white/[0.03] rounded-full p-0.5 overflow-hidden">
          <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${step >= 1 ? 'bg-[#EAB308]' : 'bg-white/[0.04]'}`} />
          <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${step >= 2 ? 'bg-[#EAB308]' : 'bg-white/[0.04]'}`} />
          <div className={`h-full flex-1 rounded-full transition-colors duration-300 ${step >= 3 ? 'bg-[#EAB308]' : 'bg-white/[0.04]'}`} />
        </div>
      </div>
    </div>
  );
}

export function FeaturesShowcase() {
  return (
    <section className="w-full bg-[#000000] py-20 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-24">
          <h2 className="text-[2.25rem] font-bold text-[#F5F5F5] leading-tight tracking-tight mb-4">
            Study smarter with AI assistance
          </h2>
          <p className="text-[1rem] font-normal text-[#888888] leading-relaxed">
            Everything you need to master your exams, organized automatically.
          </p>
        </div>

        <div className="space-y-[120px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="inline-flex w-fit rounded-full bg-purple-500/10 border border-purple-500/20 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-purple-400">
                STEP 01
              </div>
              <h3 className="text-[1.25rem] font-semibold text-white tracking-tight leading-tight">
                Upload anything
              </h3>
              <p className="text-[1rem] font-normal text-[#888888] leading-relaxed">
                PDFs, slides, notes, or raw text. Our AI reads it all.
              </p>
            </div>
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <FileDropMockup />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
              <FlashcardStackMockup />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col space-y-4">
              <div className="inline-flex w-fit rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-emerald-400">
                STEP 02
              </div>
              <h3 className="text-[1.25rem] font-semibold text-white tracking-tight leading-tight">
                AI builds your study set
              </h3>
              <p className="text-[1rem] font-normal text-[#888888] leading-relaxed">
                Flashcards, quizzes, and summaries generated in seconds.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="inline-flex w-fit rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[0.75rem] font-bold uppercase tracking-wider text-amber-400">
                STEP 03
              </div>
              <h3 className="text-[1.25rem] font-semibold text-white tracking-tight leading-tight">
                Learn and track progress
              </h3>
              <p className="text-[1rem] font-normal text-[#888888] leading-relaxed">
                Adaptive quizzes adjust to what you know and what you don't.
              </p>
            </div>
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <ScoreChartMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
