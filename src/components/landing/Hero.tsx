import { Link } from 'react-router-dom';

const IcoArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IcoSparkles = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z" />
  </svg>
);

const IcoPlay = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="6 4 19 12 6 20 6 4" />
  </svg>
);

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-transparent px-4 pb-24 pt-32 text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="hero-grid-bg absolute inset-0 opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.07)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0.24),rgba(10,13,20,0.38)_35%,rgba(10,13,20,0.9))]" />

      <div className="relative z-10 mx-auto flex max-w-6xl justify-center">
        <div className="max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#22304d] bg-[#101725]/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8cb4ff]">
            <IcoSparkles />
            <span>Adaptive Study Engine</span>
          </div>

          <h1 className="text-balance text-[2.75rem] font-bold leading-[0.95] tracking-[-0.05em] text-white sm:text-[3.6rem] lg:text-[4.4rem]">
            Turn messy notes
            <br />
            into <span className="font-serif text-[0.98em] font-normal italic tracking-[-0.03em] text-[#f5f7fb]">sharp recall</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-[12px] font-semibold uppercase leading-7 tracking-[0.18em] text-slate-300 sm:text-[13px] lg:text-[14px]">
            Study.ai rebuilds your material into flashcards, quizzes, timelines, and memory loops that match how you actually learn.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1f54cb] active:scale-95"
            >
              Get Started Free
              <IcoArrowRight />
            </Link>

            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-100 transition-colors hover:border-white/20 hover:bg-white/[0.05] active:scale-95">
              <IcoPlay />
              See Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
