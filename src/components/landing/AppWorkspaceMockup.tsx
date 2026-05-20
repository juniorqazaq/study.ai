import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, HelpCircle, Layers, Send, CheckCircle2, AlertCircle } from 'lucide-react';

type Tab = 'chat' | 'flashcards' | 'quiz';

export function AppWorkspaceMockup() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [typedText, setTypedText] = useState('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const fullAiResponse = `Based on Chemistry Ch 5 Kinetics, the collision theory states that for a reaction to occur:

1. Collisions: Reactant molecules must physically collide.
2. Orientation: Collisions must occur with the correct geometric alignment.
3. Activation Energy: Particles must collide with enough kinetic energy to overcome the activation barrier (Ea).

Adding a catalyst accelerates this by offering an alternate pathway with a lower Ea.`;

  useEffect(() => {
    if (activeTab !== 'chat') {
      setTypedText('');
      return;
    }

    let currentIndex = 0;
    setTypedText('');
    const interval = setInterval(() => {
      if (currentIndex < fullAiResponse.length) {
        setTypedText(prev => prev + fullAiResponse.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [activeTab]);

  const quizOptions = [
    { id: 1, text: 'Decreasing the reactant concentration', correct: false },
    { id: 2, text: 'Adding a catalyst to lower activation energy', correct: true },
    { id: 3, text: 'Lowering the system temperature', correct: false },
    { id: 4, text: 'Increasing the activation energy barrier', correct: false }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-transparent py-24 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-purple-400">
            <Sparkles size={14} />
            <span>Interactive workspace</span>
          </div>
          <h2 className="text-[2.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-white">
            See your study workspace in action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1rem] font-normal leading-[1.6] text-[#888888]">
            Study.ai transforms raw PDFs into an organized learning dashboard. Tap a tab below to try the mockup.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          className="w-full rounded-[2rem] border border-white/[0.08] bg-[#141414] p-3 md:p-4 shadow-[0_30px_100px_rgba(0,102,255,0.06)] relative overflow-hidden"
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50"></span>
            </div>
            <div className="text-xs text-neutral-500 font-medium select-none bg-neutral-900 px-4 py-1 rounded-full border border-white/[0.04]">
              Study.ai Workspace — Chemistry_Ch_5_Kinetics.pdf
            </div>
            <div className="w-12"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] min-h-[460px]">
            <div className="border-r border-white/[0.08] p-4 flex flex-col gap-6 bg-[#0f0f0f]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">Active Material</span>
                <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/20 p-3 text-[#EAB308]">
                  <FileText size={18} />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white truncate">Chemistry_Ch_5_Kinetics.pdf</p>
                    <p className="text-[10px] text-[#EAB308]/80">Active Study Module</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">Other Modules</span>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2.5 p-2 rounded-lg text-neutral-500 hover:text-neutral-300 transition-colors cursor-not-allowed">
                    <FileText size={16} />
                    <span className="text-xs">Calculus_Ch_2_Derivatives.pdf</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-lg text-neutral-500 hover:text-neutral-300 transition-colors cursor-not-allowed">
                    <FileText size={16} />
                    <span className="text-xs">World_History_Notes.txt</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col bg-[#141414]">
              <div className="flex border-b border-white/[0.08] bg-[#111111]">
                {(['chat', 'flashcards', 'quiz'] as const).map(tab => {
                  const isActive = activeTab === tab;
                  const label = tab === 'chat' ? 'AI Chat' : tab === 'flashcards' ? 'Flashcards' : 'Practice Quiz';
                  const Icon = tab === 'chat' ? Sparkles : tab === 'flashcards' ? Layers : HelpCircle;

                  const tabColors = {
                    chat: 'border-purple-500 text-purple-400 bg-purple-500/5',
                    flashcards: 'border-[#EAB308] text-[#EAB308] bg-[#EAB308]/5',
                    quiz: 'border-emerald-500 text-emerald-400 bg-emerald-500/5',
                  };

                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSelectedOption(null);
                        setIsFlipped(false);
                      }}
                      className={`flex items-center gap-2 px-6 py-4 border-b-2 text-xs font-medium tracking-wide transition-all ${
                        isActive
                          ? tabColors[tab]
                          : 'border-transparent text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 p-6 relative flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeTab === 'chat' && (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-neutral-300">
                            YOU
                          </div>
                          <div className="bg-neutral-800/60 border border-white/[0.04] rounded-2xl rounded-tl-none p-3.5 max-w-[85%] text-xs font-medium text-white">
                            Explain the factors affecting reaction rates in kinetics based on the PDF.
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                            AI
                          </div>
                          <div className="bg-[#181818] border border-purple-500/10 rounded-2xl rounded-tl-none p-4 max-w-[85%] text-xs text-neutral-300 leading-relaxed min-h-[140px] whitespace-pre-wrap">
                            {typedText}
                            <span className="inline-block w-1.5 h-3 bg-purple-500 ml-0.5 animate-pulse" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <div className="flex-1 bg-neutral-900 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-neutral-500 flex items-center justify-between">
                          <span>Ask a question about the PDF...</span>
                          <Send size={14} className="text-neutral-600" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'flashcards' && (
                    <motion.div
                      key="flashcards"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 flex flex-col justify-center items-center py-4"
                    >
                      <div className="w-full max-w-[380px] h-[220px] perspective-1000">
                        <motion.div
                          onClick={() => setIsFlipped(!isFlipped)}
                          className="w-full h-full relative cursor-pointer transform-style-3d transition-transform duration-500"
                          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        >
                          <div
                            className="absolute inset-0 bg-[#181818] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-2xl backface-hidden"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase">Chemistry Kinetics • Card 4</span>
                            <p className="text-sm font-semibold text-white leading-snug">What is the role of activation energy (Ea) in a chemical reaction?</p>
                            <span className="text-[10px] text-neutral-500 font-medium">Click Card to Flip</span>
                          </div>

                          <div
                            className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-indigo-500/5 border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-2xl backface-hidden"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                          >
                            <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase">Answer</span>
                            <p className="text-xs font-medium text-neutral-200 leading-relaxed">
                              It represents the minimum kinetic energy colliding particles must possess to break bonds and initiate the reaction.
                            </p>
                            <span className="text-[10px] text-neutral-500 font-medium">Click Card to Flip Back</span>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'quiz' && (
                    <motion.div
                      key="quiz"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="bg-[#181818] border border-white/[0.04] rounded-xl p-4 mb-4">
                          <p className="text-xs text-neutral-500 font-medium mb-1.5">Question 1 of 5</p>
                          <p className="text-xs font-semibold text-white">How does a catalyst affect the rate of a chemical reaction?</p>
                        </div>

                        <div className="space-y-2">
                          {quizOptions.map((opt) => {
                            const isSelected = selectedOption === opt.id;
                            const isCorrect = opt.correct;
                            let cardStyle = 'border-white/[0.06] bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300';
                            let icon = null;

                            if (selectedOption !== null) {
                              if (isCorrect) {
                                cardStyle = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300';
                                icon = <CheckCircle2 size={16} className="text-emerald-400" />;
                              } else if (isSelected) {
                                cardStyle = 'border-red-500/30 bg-red-500/10 text-red-300';
                                icon = <AlertCircle size={16} className="text-red-400" />;
                              }
                            }

                            return (
                              <button
                                key={opt.id}
                                disabled={selectedOption !== null}
                                onClick={() => setSelectedOption(opt.id)}
                                className={`w-full flex items-center justify-between border rounded-xl p-3 text-left text-xs font-medium transition-all ${cardStyle}`}
                              >
                                <span>{opt.text}</span>
                                {icon}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {selectedOption !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 bg-neutral-900 border border-white/[0.04] rounded-xl flex items-center justify-between"
                        >
                          <span className="text-[11px] text-neutral-400">
                            {selectedOption === 2 ? 'Correct! Catalysts provide a lower energy path.' : 'Incorrect. Try again by resetting the tab.'}
                          </span>
                          <button
                            onClick={() => setSelectedOption(null)}
                            className="text-[10px] font-bold text-[#0066FF] hover:underline"
                          >
                            Reset Question
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
