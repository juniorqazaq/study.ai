import { motion } from "framer-motion";
import { Flag, Rocket, Users, ChevronRight } from "lucide-react";
import { LiquidBackground } from "../layout/LiquidBackground";

const milestones = [
    {
        quarter: "Q1 2026",
        title: "Alpha Labs",
        description: "Launch of the core AI engine for early testers. Feedback collection and model refinement.",
        icon: Rocket,
        status: "current",
        color: "from-blue-500 to-primary"
    },
    {
        quarter: "Q2 2026",
        title: "Mobile Synergy",
        description: "Native iOS and Android apps with offline learning capabilities and voice-to-card sync.",
        icon: Flag,
        status: "upcoming",
        color: "from-indigo-500 to-purple-500"
    },
    {
        quarter: "Q3 2026",
        title: "Collaborative Labs",
        description: "Real-time group study rooms and peer-to-peer card marketplace.",
        icon: Users,
        status: "upcoming",
        color: "from-primary to-cyan-500"
    }
];

export function Roadmap() {
    return (
        <section className="relative overflow-hidden bg-white text-slate-900" id="roadmap">
            <LiquidBackground className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Background Brand Text */}
                <div className="absolute top-[10%] -right-[5%] pointer-events-none select-none z-0 text-slate-900 opacity-[0.03] hidden xl:block mask-radial-faded">
                    <h1
                        className="text-[200px] xl:text-[300px] font-black leading-none tracking-tighter uppercase whitespace-nowrap"
                        style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
                    >
                        STUDY AI
                    </h1>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-2 mb-8"
                            >
                                <div className="h-1 w-12 bg-blue-600 rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Target Milestones</span>
                            </motion.div>
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9] uppercase text-balance">
                                Our Journey to <span className="text-blue-600 italic">Mastery.</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-bold uppercase tracking-widest max-w-xl">
                                We're building the future of education. Here's our strategic plan for the next 12 months.
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 px-8 py-4 squircle-xl bg-slate-50 border border-slate-100 shadow-sm group cursor-default"
                        >
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Building in public</span>
                        </motion.div>
                    </div>

                    <div className="relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[100px] left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0" />

                        <div className="grid lg:grid-cols-3 gap-8 relative z-10">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15 }}
                                    className="group relative"
                                >
                                    <div className="relative bg-white p-10 squircle-xl border border-slate-100 hover:border-blue-500/30 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.04)] h-full flex flex-col hover:bg-slate-50">
                                        <div className="flex items-start justify-between mb-12">
                                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br ${m.color} text-white shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/10`}>
                                                <m.icon size={32} />
                                            </div>
                                            <span className="text-[10px] font-black text-gray-700 tracking-[0.3em] uppercase pt-2">{m.quarter}</span>
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic group-hover:text-blue-600 transition-colors">{m.title}</h3>
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs leading-relaxed mb-10">
                                                {m.description}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-4 transition-all cursor-pointer mt-auto">
                                            Explore Details
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>

                                    {/* Connection Node (Desktop) */}
                                    <div className="hidden lg:block absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 squircle-xl bg-white border border-slate-100 shadow-sm transition-all duration-500 group-hover:scale-125 z-20">
                                        <div className={`absolute inset-2 squircle-lg ${m.status === 'current' ? 'bg-blue-500 animate-pulse' : 'bg-gray-900'}`} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </LiquidBackground>
        </section>
    );
}
