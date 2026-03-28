import { motion } from 'framer-motion';

// Inline SVG Icons — Azure Blue (#0066FF)
const IcoUpload = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IcoSparkles = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>;
const IcoStart = () => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5 16 12l-6 3.5v-7Z" fill="#0066FF" stroke="none" />
  </svg>
);

const steps = [
  { num: '01', title: 'Upload Your Material', desc: 'Upload a PDF, paste text, or enter a topic.', Icon: IcoUpload, delay: 0.2 },
  { num: '02', title: 'AI Processes It', desc: 'Gemini AI instantly generates flashcards, quizzes, and mind maps.', Icon: IcoSparkles, delay: 0.4 },
  { num: '03', title: 'Start Learning', desc: 'Choose your study mode and track your progress.', Icon: IcoStart, delay: 0.6 },
];

export function HowItWorksProcess() {
  return (
    <div className="relative z-10 w-full overflow-hidden bg-transparent py-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-20"
        >
          <h2 className="mb-4 text-2xl font-bold text-[#e2e8f0] md:text-3xl">How It Works</h2>
          <p className="mx-auto max-w-2xl text-base text-[#e2e8f0]/50 md:text-lg">Three simple steps to transform the way you study forever.</p>
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
                className="group relative flex flex-col items-center overflow-hidden rounded-3xl border border-[#1e2235] bg-[#0d0f1a] p-8 text-center transition-colors duration-300 hover:border-white/12"
              >
                <div className="pointer-events-none absolute -right-5 -top-5 z-0 select-none text-[88px] font-black leading-none text-white/[0.03]">
                  {step.num}
                </div>

                <div className="relative z-10 mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#1e2235] bg-[#0A0F1E] transition-transform duration-500 group-hover:scale-105 group-hover:border-white/15">
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
