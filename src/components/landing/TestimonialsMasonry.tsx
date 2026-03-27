import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "I went from failing biochemistry to top of my class in one semester.",
    name: "Aisha K.",
    university: "Eurasian National University",
    rotation: "-rotate-1"
  },
  {
    quote: "The mind map feature completely changed how I study for law exams.",
    name: "Daniyar M.",
    university: "KIMEP University",
    rotation: "rotate-1"
  },
  {
    quote: "Finally an AI tool that actually understands how students learn.",
    name: "Arman T.",
    university: "KBTU",
    rotation: "-rotate-[1.5deg]"
  },
  {
    quote: "Generating 200 flashcards from a 40-page PDF in 10 seconds is insane.",
    name: "Sofiya R.",
    university: "Astana IT University",
    rotation: "rotate-[1deg]"
  },
  {
    quote: "The quiz mode caught every weak point I had before my finals.",
    name: "Zarina B.",
    university: "MNU",
    rotation: "-rotate-1"
  },
  {
    quote: "I recommended Study.ai to my entire study group. Everyone passed.",
    name: "Nursultan A.",
    university: "Astana IT University",
    rotation: "rotate-1"
  }
];

export function TestimonialsMasonry() {
  return (
    <div className="w-full bg-[#0A0F1E] py-24 relative overflow-hidden font-sans">
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

        {/* Masonry Layout via CSS columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.1 }}
              className={`break-inside-avoid bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transform origin-center transition-all duration-300 ${t.rotation} hover:!rotate-0 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(99,102,241,0.1)] group flex flex-col justify-between`}
            >
              <div>
                  <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-4 h-4 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${s * 50}ms` }} />
                      ))}
                  </div>
                  <p className="text-lg text-white font-medium mb-8 leading-relaxed">
                      "{t.quote}"
                  </p>
              </div>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold border-2 border-[#0A0F1E] shadow-lg shrink-0">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-bold">{t.name}</div>
                  <div className="text-sm text-gray-400">{t.university}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
