import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Sparkles, Twitter, Github, Linkedin, Instagram } from "lucide-react";

const SOCIALS = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "Github" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" }
];

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Platform", href: "/features" },
  { name: "Solutions", href: "/resources" },
  { name: "Company", href: "/how-it-works" },
  { name: "Contact Us", href: "/register" }
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0A0F1E] font-sans text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_22%)]" />
      <div className="absolute left-[6%] top-[18%] h-64 w-64 rounded-full border border-white/5 bg-white/[0.02]" />
      <div className="absolute right-[8%] top-[10%] h-48 w-48 rounded-full bg-[#1A237E]/55 blur-[20px]" />
      <div className="absolute right-[18%] bottom-[14%] h-36 w-36 rounded-full bg-[#0066FF]/10 blur-[24px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-[-4%] z-0 overflow-hidden text-center">
        <div className="select-none text-[18vw] font-black uppercase leading-none tracking-[0.08em] text-[#0066FF]/[0.07] md:text-[12vw]">
          STUDY.AI
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <Link to="/" className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0066FF] shadow-[0_16px_40px_rgba(0,102,255,0.35)]">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-3xl font-black tracking-tight">
                    <span className="text-[#0066FF]">Study</span><span className="text-white italic lowercase">.ai</span>
                  </div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">
                    Adaptive Learning Platform
                  </div>
                </div>
              </Link>

              <p className="mt-10 max-w-md text-lg leading-9 text-white/78">
                Our mission is to help students turn dense material into faster understanding, better revision habits, and stronger recall.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {SOCIALS.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/5 text-white/78 transition-all duration-200 hover:border-[#0066FF]/40 hover:bg-[#0066FF]/12 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
            <div className="grid gap-6 md:grid-cols-[120px_1fr]">
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-white/35">
                Navigate
              </div>

              <div className="space-y-4">
                {NAV_ITEMS.map((item, idx) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4 transition-all duration-200 hover:border-[#0066FF]/30 hover:bg-[#0066FF]/10"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-black uppercase tracking-[0.24em] text-white/35">
                        0{idx + 1}
                      </span>
                      <span className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-white/30 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white/70">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/8 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-white/55">
              Copyright 2026 Study.ai, All Rights Reserved
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/55">
              <Link to="#" className="transition-colors hover:text-white">Privacy Policy</Link>
              <Link to="#" className="transition-colors hover:text-white">Terms &amp; Conditions</Link>
              <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-white/65">
                <Globe size={12} />
                <span>English</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
