import React from 'react';
import { Upload, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function HowItWorksProcess() {
  const steps = [
    {
      num: '01',
      title: 'Upload Your Material',
      desc: 'Upload a PDF, paste text, or enter a topic.',
      icon: Upload,
      delay: 0.2
    },
    {
      num: '02',
      title: 'AI Processes It',
      desc: 'Gemini AI instantly generates flashcards, quizzes, and mind maps.',
      icon: Sparkles,
      delay: 0.4
    },
    {
      num: '03',
      title: 'Start Learning',
      desc: 'Choose your study mode and track your progress.',
      icon: TrendingUp,
      delay: 0.6
    }
  ];

  return (
    <div className="w-full bg-[#0A0F1E] py-24 relative z-10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Three simple steps to transform the way you study forever.</p>
        </motion.div>

        <div className="relative">
          {/* Animated Connecting Line */}
          <div className="hidden lg:block absolute top-[120px] left-[10%] right-[10%] h-[2px] bg-white/5 z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-300 group flex flex-col items-center text-center overflow-hidden"
              >
                {/* Huge Gradient Watermark Number */}
                <div className="absolute -top-6 -right-6 text-[120px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-br from-blue-500/10 to-indigo-500/10 pointer-events-none select-none select-none z-0">
                  {step.num}
                </div>

                <div className="w-20 h-20 rounded-2xl bg-[#0A0F1E] border border-white/10 flex items-center justify-center mb-8 relative z-10 shadow-xl group-hover:scale-110 group-hover:border-indigo-500/50 transition-transform duration-500">
                    <step.icon className="w-8 h-8 text-blue-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
                <p className="text-gray-400 font-medium relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
