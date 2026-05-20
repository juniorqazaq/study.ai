import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const IcoChevron = ({ open }: { open: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

type Category = 'General' | 'Pricing' | 'Dashboard' | 'API';

const FAQS: Array<{ category: Category; q: string; a: string }> = [
  { category: 'General', q: 'Is there a free trial available?', a: 'Yes. You can try Study.ai for free, test the core modes, and decide later if you want deeper workflows and premium AI generation.' },
  { category: 'Pricing', q: 'Can I change my plan later?', a: 'Yes. You can upgrade when you need more capacity or switch back if your usage changes during the semester.' },
  { category: 'Pricing', q: 'What is your cancellation policy?', a: 'You can cancel before the next billing cycle. Your existing access remains active until the current paid period ends.' },
  { category: 'Dashboard', q: 'Can other info be added to an invoice?', a: 'Yes. If you need institution details or an extra billing reference, support can add them for you.' },
  { category: 'Pricing', q: 'How does billing work?', a: 'Billing is handled per subscription period. You choose the plan, renew on schedule, and manage the details from your account area.' },
  { category: 'Dashboard', q: 'How do I change my account email?', a: 'You can update your account email from the dashboard settings area after verification.' },
  { category: 'API', q: 'How does support work?', a: 'Support is available for account, billing, and product issues. For platform questions, you can contact the team directly.' },
  { category: 'General', q: 'Do you provide tutorials?', a: 'Yes. We provide onboarding guidance, usage flows, and examples so you can start using flashcards, quizzes, notes, and maps quickly.' }
];

const CATEGORIES: Category[] = ['General', 'Pricing', 'Dashboard', 'API'];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('General');
  const [activeQuestion, setActiveQuestion] = useState(0);

  const filteredFaqs = useMemo(() => FAQS.filter((item) => item.category === activeCategory), [activeCategory]);

  return (
    <section className="relative w-full overflow-hidden border-t border-transparent bg-transparent py-24 font-sans">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto text-center"
        >
          <h2 className="text-[2.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-white">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[1rem] font-normal leading-[1.6] text-[#888888]">
            These are the most common questions about Study.ai. Can't find what you're looking for? <span className="text-[#0066FF] underline underline-offset-4 cursor-pointer hover:text-[#3B82F6] transition-colors">Chat to our friendly team.</span>
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;

            const categoryColors = {
              General: 'border-[#0066FF]/30 bg-[#0066FF]/10 text-white',
              Pricing: 'border-[#EAB308]/30 bg-[#EAB308]/10 text-white',
              Dashboard: 'border-purple-500/30 bg-purple-500/10 text-white',
              API: 'border-emerald-500/30 bg-emerald-500/10 text-white',
            };

            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveQuestion(0);
                }}
                className={`rounded-full border px-5 py-2 text-[0.9375rem] font-medium transition-all ${
                  isActive
                    ? categoryColors[category]
                    : 'border-white/[0.08] bg-transparent text-[#888888] hover:text-white hover:border-white/20'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mt-14 border-t border-white/[0.08]">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = idx === activeQuestion;
            return (
              <div key={faq.q} className="border-b border-white/[0.08] py-5">
                <button
                  onClick={() => setActiveQuestion(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between text-left gap-4"
                >
                  <span className="text-[1rem] font-medium leading-[1.5] text-white">
                    {faq.q}
                  </span>
                  <span className="text-slate-400 shrink-0">
                    <IcoChevron open={isOpen} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-[1rem] font-normal leading-[1.6] text-[#888888]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
