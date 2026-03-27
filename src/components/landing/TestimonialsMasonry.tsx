import { motion } from 'framer-motion';

const IcoStar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="#00A6FF" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

const TESTIMONIALS = [
  {
    quote: "I went from failing biochemistry to top of my class in one semester.",
    name: "Aisha K.",
    university: "Eurasian National University",
  },
  {
    quote: "The mind map feature completely changed how I study for law exams.",
    name: "Daniyar M.",
    university: "KIMEP University",
  },
  {
    quote: "Finally an AI tool that actually understands how students learn.",
    name: "Arman T.",
    university: "KBTU",
  },
  {
    quote: "Generating 200 flashcards from a 40-page PDF in 10 seconds is insane.",
    name: "Sofiya R.",
    university: "Astana IT University",
  },
  {
    quote: "The quiz mode caught every weak point I had before my finals.",
    name: "Zarina B.",
    university: "MNU",
  },
  {
    quote: "I recommended Study.ai to my entire study group. Everyone passed.",
    name: "Nursultan A.",
    university: "Astana IT University",
  }
];

export function TestimonialsMasonry() {
  const looped = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="w-full bg-[#0A0F1E] py-24 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Don't just take our word for it</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Join thousands of students who have already transformed their academic careers.</p>
        </motion.div>

        <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <div className="flex gap-6 w-max animate-marquee py-4">
            {looped.map((t, idx) => (
              <article
                key={`${t.name}-${idx}`}
                className="w-[320px] md:w-[380px] min-h-[300px] rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <IcoStar key={s} />
                    ))}
                  </div>
                  <p className="text-2xl leading-[1.55] text-white font-medium">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#69c7ff] to-[#00A6FF] flex items-center justify-center text-white font-black text-lg border border-white/10 shadow-lg shrink-0">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.university}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
