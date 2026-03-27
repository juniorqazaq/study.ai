import { motion } from 'framer-motion';

// Inline SVG Icons — Azure Blue (#0066FF)
const IcoUpload = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IcoSparkles = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>;
const IcoRocket = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.2 4.8c-2.7.9-5.2 3-6.7 5.6l-1.6 2.7 2.7-1.6c2.6-1.5 4.7-4 5.6-6.7Z" />
    <path d="M13.7 10.3 9.5 14.5" />
    <path d="M7.2 13.6c-1.7.5-2.7 1.6-3.2 3.2 1.6-.5 2.7-1.5 3.2-3.2Z" />
    <path d="M10.4 16.8c-.5 1.7-1.6 2.7-3.2 3.2.5-1.6 1.5-2.7 3.2-3.2Z" />
    <circle cx="14.6" cy="9.4" r="1.2" />
  </svg>
);

const steps = [
  { num: '01', title: 'Upload Your Material', desc: 'Upload a PDF, paste text, or enter a topic.', Icon: IcoUpload, delay: 0.2 },
  { num: '02', title: 'AI Processes It', desc: 'Gemini AI instantly generates flashcards, quizzes, and mind maps.', Icon: IcoSparkles, delay: 0.4 },
  { num: '03', title: 'Start Learning', desc: 'Choose your study mode and track your progress.', Icon: IcoRocket, delay: 0.6 },
];

export function HowItWorksProcess() {
  return (
    <div className="w-full bg-[#0A0F1E] py-24 relative z-10 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#e2e8f0] mb-4">How It Works</h2>
          <p className="text-lg text-[#e2e8f0]/50 max-w-2xl mx-auto">Three simple steps to transform the way you study forever.</p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[120px] left-[10%] right-[10%] h-[2px] bg-[#1e2235] z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#0066FF] to-[#0052CC]"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="relative bg-[#0d0f1a] border border-[#1e2235] rounded-3xl p-8 hover:border-[#0066FF]/30 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] transition-all duration-300 group flex flex-col items-center text-center overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 text-[120px] font-black leading-none text-[#0066FF]/5 pointer-events-none select-none z-0">
                  {step.num}
                </div>

                <div className="w-20 h-20 rounded-2xl bg-[#0A0F1E] border border-[#1e2235] flex items-center justify-center mb-8 relative z-10 shadow-xl group-hover:scale-110 group-hover:border-[#0066FF]/50 transition-transform duration-500">
                    <step.Icon />
                </div>
                
                <h3 className="text-2xl font-bold text-[#e2e8f0] mb-4 relative z-10">{step.title}</h3>
                <p className="text-[#e2e8f0]/50 font-medium relative z-10">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
