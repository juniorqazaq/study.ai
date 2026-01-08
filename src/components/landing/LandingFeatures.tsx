import { Twitter, Instagram, Linkedin, Github, Sparkles, Send } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiquidBackground } from "../layout/LiquidBackground";

export function LandingFeatures() {
    return (
        <section className="relative overflow-hidden bg-white text-slate-900" id="features">
            <LiquidBackground className="py-24 md:py-40">
                {/* Background Outlined Text */}
                <div className="absolute bottom-10 left-10 md:left-20 pointer-events-none select-none z-0 text-slate-900 opacity-[0.04] hidden sm:block">
                    <h1
                        className="text-[120px] md:text-[200px] lg:text-[280px] font-black leading-none tracking-tighter whitespace-nowrap uppercase"
                        style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
                    >
                        STUDY AI
                    </h1>
                </div>
                <div className="absolute top-20 right-10 pointer-events-none select-none z-0 text-slate-900 opacity-[0.03] mask-radial-faded hidden md:block">
                    <h1
                        className="text-[80px] md:text-[150px] font-black leading-none tracking-tighter whitespace-nowrap uppercase"
                        style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
                    >
                        STUDY AI
                    </h1>
                </div>
                {/* Large Dark Brand Text to fill bottom space */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 text-slate-900 opacity-[0.05] mask-edge-fade hidden lg:block">
                    <h1 className="text-[120px] md:text-[220px] lg:text-[320px] font-black leading-none tracking-tighter whitespace-nowrap uppercase">
                        STUDY AI
                    </h1>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.9] tracking-tight text-slate-900 text-balance uppercase">
                                    <span className="text-primary opacity-50 font-normal mr-2 italic">//</span>
                                    Начни Учиться<br />
                                    <span className="text-slate-400 italic">и Построй</span><br />
                                    Свое Будущее.
                                </h2>
                                <div className="space-y-4 max-w-md">
                                    <p className="text-lg text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                                        Готовы трансформировать свою учебу? Свяжитесь с нами для получения индивидуального плана обучения на базе ИИ.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-all border border-slate-100 shadow-sm"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Content - Waitlist Form */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-white squircle-xl p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.08)] relative overflow-hidden group border border-slate-100">
                                {/* Form Inner Sparkle */}
                                <div className="absolute top-8 right-8 opacity-[0.08] pointer-events-none group-hover:rotate-45 transition-transform duration-700">
                                    <Sparkles className="w-20 h-20 text-slate-900" />
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter uppercase italic">Claim your spot.</h3>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Join 1,200+ students early access.</p>
                                </div>

                                <form className="space-y-8 relative z-10">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">YOUR NAME</Label>
                                            <Input
                                                placeholder="Enter your name"
                                                className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 text-lg font-bold focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-slate-300 text-slate-900 shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">STUDENT EMAIL</Label>
                                            <Input
                                                type="email"
                                                placeholder="your@email.com"
                                                className="h-14 bg-slate-50 border-slate-100 rounded-2xl px-6 text-lg font-bold focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-slate-300 text-slate-900 shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full h-16 bg-slate-900 text-white hover:bg-blue-600 rounded-2xl flex items-center justify-center gap-3 font-black text-lg shadow-xl shadow-blue-500/10 group/btn transition-all uppercase tracking-widest"
                                    >
                                        Secure Early Access
                                        <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </motion.button>
                                </form>
                            </div>

                            {/* Decorative element behind card */}
                            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-primary/5 rounded-[40px] blur-3xl opacity-50" />
                        </motion.div>
                    </div>
                </div>
            </LiquidBackground>
        </section>
    );
}
