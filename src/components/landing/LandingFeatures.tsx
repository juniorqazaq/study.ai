import { Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";

export function LandingFeatures() {
    return (
        <section className="relative overflow-hidden bg-[#0B0F1A]" id="features">
            {/* Background glow blobs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />
            {/* Gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="py-28 md:py-40 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left — Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-10"
                        >
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    Early Access Open
                                </div>
                                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.9] tracking-tight text-white text-balance uppercase">
                                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic font-normal mr-2 text-4xl sm:text-5xl">//</span>
                                    Начни Учиться<br />
                                    <span className="text-zinc-500">и Построй</span><br />
                                    Своё Будущее.
                                </h2>
                                <p className="text-base text-zinc-400 font-medium leading-relaxed max-w-md">
                                    Готовы трансформировать свою учёбу? Свяжитесь с нами для получения индивидуального плана обучения на базе ИИ.
                                </p>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { label: "1,200+ Students", color: "text-blue-400" },
                                    { label: "50k+ Flashcards", color: "text-indigo-400" },
                                    { label: "98% Satisfaction", color: "text-emerald-400" },
                                ].map((badge) => (
                                    <div key={badge.label} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                                        <span className={`text-sm font-bold ${badge.color}`}>{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Waitlist Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Glow behind card */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-2xl opacity-60" />

                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 overflow-hidden">
                                {/* Decorative inner glow */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />
                                <div className="absolute -top-px left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                                <div className="mb-8 relative z-10">
                                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">Claim your spot.</h3>
                                    <p className="text-zinc-400 text-sm font-medium">Join 1,200+ students on early access.</p>
                                </div>

                                <form className="space-y-5 relative z-10">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Your Name</label>
                                        <input
                                            placeholder="Enter your name"
                                            className="w-full h-13 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 font-medium focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Student Email</label>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            className="w-full h-13 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 font-medium focus:outline-none focus:border-indigo-500/50 focus:bg-white/8 transition-all duration-200"
                                        />
                                    </div>

                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full h-14 btn-gradient text-white rounded-xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest"
                                    >
                                        Secure Early Access
                                        <Send size={16} className="translate-y-[-1px]" />
                                    </motion.button>

                                    <p className="text-center text-zinc-600 text-xs font-medium">
                                        No credit card required · Cancel anytime
                                    </p>
                                </form>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>
    );
}
