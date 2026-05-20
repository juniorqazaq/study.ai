import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CtaBanner() {
  return (
    <section className="w-full bg-[#000000] py-24 md:py-32 relative overflow-hidden z-20">
      <div className="noise-overlay absolute inset-0 pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="text-center flex flex-col items-center space-y-6"
        >
          <h2 className="text-[2.25rem] font-bold text-[#F5F5F5] leading-tight tracking-tight max-w-2xl mx-auto">
            Start learning smarter today
          </h2>

          <p className="text-[1rem] font-normal text-[#888888] leading-relaxed max-w-lg mx-auto">
            Join thousands of students who study less and remember more.
          </p>

          <div className="pt-4">
            <Link
              to="/register"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex rounded-full bg-gradient-to-r from-[#0066FF] to-[#3B82F6] hover:opacity-90 active:scale-95 transition-all duration-200 text-white text-[0.9375rem] font-medium px-8 py-3.5 shadow-[0_12px_32px_-6px_rgba(0,102,255,0.3)]"
            >
              Get started for free
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
