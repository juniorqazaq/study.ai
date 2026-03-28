import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const IcoSmile = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 10h.01"/><path d="M15 10h.01"/></svg>;
const IcoCards = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="4" width="14" height="6" rx="1.5"/><rect x="5" y="14" width="14" height="6" rx="1.5"/></svg>;
const IcoInvoice = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3h8l3 3v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M15 3v4h4"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>;
const IcoUserPlus = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="3.5"/><path d="M19 8v6"/><path d="M16 11h6"/></svg>;
const IcoMoney = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M7 9h.01"/><path d="M17 15h.01"/></svg>;
const IcoMail = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
const IcoMessage = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 18-4Z"/></svg>;
const IcoPlay = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="m10 9 5 3-5 3V9Z"/></svg>;
const IcoChevron = ({ open }: { open: boolean }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"/></svg>;

type Category = 'General' | 'Pricing' | 'Dashboard' | 'API';

const FAQS: Array<{ category: Category; q: string; a: string; Icon: () => JSX.Element }> = [
  { category: 'General', q: "Is there a free trial available?", a: "Yes. You can try Study.ai for free, test the core modes, and decide later if you want deeper workflows and premium AI generation.", Icon: IcoSmile },
  { category: 'Pricing', q: "Can I change my plan later?", a: "Yes. You can upgrade when you need more capacity or switch back if your usage changes during the semester.", Icon: IcoCards },
  { category: 'Pricing', q: "What is your cancellation policy?", a: "You can cancel before the next billing cycle. Your existing access remains active until the current paid period ends.", Icon: IcoInvoice },
  { category: 'Dashboard', q: "Can other info be added to an invoice?", a: "Yes. If you need institution details or an extra billing reference, support can add them for you.", Icon: IcoUserPlus },
  { category: 'Pricing', q: "How does billing work?", a: "Billing is handled per subscription period. You choose the plan, renew on schedule, and manage the details from your account area.", Icon: IcoMoney },
  { category: 'Dashboard', q: "How do I change my account email?", a: "You can update your account email from the dashboard settings area after verification.", Icon: IcoMail },
  { category: 'API', q: "How does support work?", a: "Support is available for account, billing, and product issues. For platform questions, you can contact the team directly.", Icon: IcoMessage },
  { category: 'General', q: "Do you provide tutorials?", a: "Yes. We provide onboarding guidance, usage flows, and examples so you can start using flashcards, quizzes, notes, and maps quickly.", Icon: IcoPlay }
];

const CATEGORIES: Category[] = ['General', 'Pricing', 'Dashboard', 'API'];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('General');
  const [activeQuestion, setActiveQuestion] = useState(0);

  const filteredFaqs = useMemo(() => FAQS.filter((item) => item.category === activeCategory), [activeCategory]);

  return (
    <section className="relative w-full overflow-hidden border-t border-white/5 bg-transparent py-24 font-sans">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-2xl font-black leading-tight text-white md:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
            These are the most common questions about Study.ai. Can't find what you're looking for? <span className="text-[#8fc2ff] underline underline-offset-4">Chat to our friendly team.</span>
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap justify-center gap-3 md:gap-4">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveQuestion(0);
                }}
                className={`rounded-full border px-5 py-3 text-sm font-bold transition-all md:px-7 md:text-base ${
                  isActive
                    ? 'border-white/[0.07] bg-[#111520] text-white'
                    : 'border-white/[0.07] bg-transparent text-white hover:border-white/15 hover:bg-[#111520]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-14 max-w-5xl space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = idx === activeQuestion;
            return (
              <div key={faq.q} className="rounded-[16px] border border-white/[0.07] bg-[#111520]">
                <button
                  onClick={() => setActiveQuestion(isOpen ? -1 : idx)}
                  className="flex w-full items-start gap-4 px-5 py-5 text-left md:px-6 md:py-6"
                >
                  <div className="mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/[0.07] bg-[#151a26] text-slate-300">
                    <faq.Icon />
                  </div>

                  <div className="min-w-0 flex-1 pr-2">
                    <div className="text-lg font-bold leading-8 text-white md:text-[1.5rem] md:leading-9">
                      {faq.q}
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pt-4 pr-4 text-base leading-8 text-slate-300">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-1 shrink-0 text-slate-400">
                    <IcoChevron open={isOpen} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
