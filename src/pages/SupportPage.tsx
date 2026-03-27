import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SUPPORT_CHANNELS = [
  {
    title: "Product Help",
    desc: "Questions about flashcards, quizzes, notes, mind maps, and study flows.",
    cta: "Open support",
  },
  {
    title: "Billing & Plans",
    desc: "Invoices, plan changes, subscriptions, and access questions.",
    cta: "Contact billing",
  },
  {
    title: "Institution Setup",
    desc: "University onboarding, bulk access, and team rollouts.",
    cta: "Talk to us",
  },
];

const FAQS = [
  {
    q: "How fast does support reply?",
    a: "Most requests are answered within one business day. Priority subscribers are handled faster.",
  },
  {
    q: "Can you help with account issues?",
    a: "Yes. We can help with login issues, access recovery, billing questions, and profile updates.",
  },
  {
    q: "Do you support universities or teams?",
    a: "Yes. We support academic teams, departments, and institution-wide onboarding.",
  },
];

export function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] font-body text-[#e2e8f0] selection:bg-[#0066FF]/20 selection:text-[#0066FF]">
      <Header />

      <main className="relative overflow-hidden bg-[#0A0F1E] pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,255,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_24%)]" />

        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 md:px-10">
          <div className="text-center">
            <div className="mx-auto inline-flex rounded-full border border-[#0066FF]/25 bg-[#0066FF]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#69b4ff]">
              Support
            </div>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-white md:text-7xl">
              Get help without
              <span className="block text-[#0066FF]">slowing down.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#e2e8f0]/60 md:text-xl">
              Need product guidance, billing support, or rollout help? Reach the Study.ai team from one place.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {SUPPORT_CHANNELS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/8 bg-[#0F1523] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="text-[11px] font-black uppercase tracking-[0.28em] text-[#69b4ff]">Channel 0{index + 1}</div>
                <h2 className="mt-5 text-3xl font-black text-white">{item.title}</h2>
                <p className="mt-4 text-base leading-7 text-[#e2e8f0]/60">{item.desc}</p>
                <Link
                  to="/register"
                  className="mt-8 inline-flex rounded-full border border-[#0066FF]/25 bg-[#0066FF]/12 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#8fc2ff] transition-colors hover:bg-[#0066FF]/18"
                >
                  {item.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 md:px-10">
          <div className="rounded-[2.5rem] border border-white/8 bg-[#0F1523] p-8 md:p-10">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <h2 className="text-4xl font-black tracking-tight text-white">Support FAQ</h2>
                <p className="mt-4 text-lg leading-8 text-[#e2e8f0]/60">
                  Common answers for product access, billing, and rollout support.
                </p>
              </div>
              <Link
                to="/register"
                className="inline-flex rounded-full bg-[#0066FF] px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#0052CC]"
              >
                Contact team
              </Link>
            </div>

            <div className="mt-10 space-y-4">
              {FAQS.map((item) => (
                <div key={item.q} className="rounded-[1.5rem] border border-white/8 bg-[#0B1020] px-6 py-5">
                  <div className="text-xl font-bold text-white">{item.q}</div>
                  <p className="mt-3 text-base leading-7 text-[#e2e8f0]/60">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
