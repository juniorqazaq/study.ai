import { useMemo, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Guides", "Practice", "Videos", "Templates"];

const RESOURCES = [
  {
    category: "Guides",
    title: "Flashcard Study Guide",
    desc: "Structure dense material into short high-recall study cards.",
    meta: "Guide",
  },
  {
    category: "Practice",
    title: "Mock Exam Sessions",
    desc: "Timed question runs that simulate pressure before the real assessment.",
    meta: "Practice",
  },
  {
    category: "Videos",
    title: "Quick Concept Walkthroughs",
    desc: "Short visual explanations for difficult topics and review cycles.",
    meta: "Video",
  },
  {
    category: "Templates",
    title: "Notes Framework Pack",
    desc: "Reusable note structures for lectures, readings, and revision weeks.",
    meta: "Template",
  },
  {
    category: "Guides",
    title: "Active Recall Playbook",
    desc: "A cleaner system for using retrieval practice instead of passive rereading.",
    meta: "Guide",
  },
  {
    category: "Practice",
    title: "Weak Spot Review Set",
    desc: "Targeted repetition loops for topics you keep missing.",
    meta: "Practice",
  },
];

export function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredResources = useMemo(
    () => activeCategory === "All" ? RESOURCES : RESOURCES.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen bg-[#0A0F1E] font-body text-[#e2e8f0] selection:bg-[#0066FF]/20 selection:text-[#0066FF]">
      <Header />

      <main className="relative overflow-hidden bg-[#0A0F1E] pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,255,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_22%)]" />

        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-10">
          <div className="text-center">
            <div className="mx-auto inline-flex rounded-full border border-[#0066FF]/25 bg-[#0066FF]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#69b4ff]">
              Resources
            </div>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-white md:text-7xl">
              Knowledge
              <span className="text-[#0066FF]"> Hub</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#e2e8f0]/60 md:text-xl">
              Dark background like the landing page, cleaner contrast, and no washed-out white screen.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-white/8 bg-[#0F1523] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-4 rounded-[1.5rem] border border-white/8 bg-[#0B1020] px-5 py-4">
              <div className="text-[#e2e8f0]/35">Search</div>
              <input
                type="text"
                placeholder="Search guides, templates, practice, and videos..."
                className="w-full bg-transparent text-lg font-medium text-white outline-none placeholder:text-[#e2e8f0]/35"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] transition-all ${
                  activeCategory === category
                    ? "border-[#0066FF]/25 bg-[#0066FF] text-white"
                    : "border-white/10 bg-[#0F1523] text-[#e2e8f0]/65 hover:border-white/20 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredResources.map((item, index) => (
              <motion.article
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[2rem] border border-white/8 bg-[#0F1523] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.14)]"
              >
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#69b4ff]">{item.meta}</div>
                <h2 className="mt-5 text-3xl font-black tracking-tight text-white">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-[#e2e8f0]/60">{item.desc}</p>
                <button className="mt-8 rounded-full border border-[#0066FF]/25 bg-[#0066FF]/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#8fc2ff] transition-colors hover:bg-[#0066FF]/16">
                  Open resource
                </button>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
