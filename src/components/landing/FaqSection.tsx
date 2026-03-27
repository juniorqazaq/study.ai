import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: "Is Study.ai free to use?",
    a: "We offer a generous free tier that includes basic flashcard generation and standard quizzes. For power users needing unlimited AI generations, mind maps, and priority processing, we offer an affordable Premium tier."
  },
  {
    q: "What file formats does it support?",
    a: "You can upload PDF, DOCX, TXT, or simply copy and paste direct text. The AI extracts the core concepts automatically, ignoring formatting noise."
  },
  {
    q: "How does the AI generate flashcards?",
    a: "We utilize Google's advanced Gemini AI. It analyzes your provided text contextually, identifies key learning objectives, and structures them into concise point-and-answer pairs optimized for spaced repetition."
  },
  {
    q: "Can I use it on mobile?",
    a: "Yes! Study.ai is fully responsive and functions entirely as a Progressive Web App directly in your mobile browser with near-native performance."
  },
  {
    q: "Which universities is it available at?",
    a: "Currently anyone can register from any institution globally. We are officially partnered with 6 top universities in Kazakhstan to provide specialized academic curriculums pre-loaded."
  },
  {
    q: "How is my data stored and protected?",
    a: "All your uploaded documents and generated study materials are encrypted at rest. We never share your personal study data with third-party advertisers."
  },
  {
    q: "What makes Study.ai different from Anki or Quizlet?",
    a: "While Anki requires tedious manual card creation, Study.ai generates everything for you in 10 seconds. Moreover, we provide multiple synchronized learning modalities (Mind Maps, Fill-in-blanks) from a single source document."
  }
];

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full bg-[#0A0F1E] py-24 relative overflow-hidden font-sans border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-400 max-w-2xl">Everything you need to know about Study.ai and how it works.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Questions List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3">
            {FAQS.map((faq, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`text-left w-full px-6 py-4 rounded-2xl transition-all duration-300 font-medium ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)] scale-105 z-10' 
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white backdrop-blur-md border border-white/5 scale-100'
                  }`}
                >
                  {faq.q}
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Answer Panel */}
          <div className="w-full lg:w-2/3 flex">
            <div className="w-full min-h-[300px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">
                {/* Decorative glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative z-10"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                            {FAQS[activeIndex].q}
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {FAQS[activeIndex].a}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
