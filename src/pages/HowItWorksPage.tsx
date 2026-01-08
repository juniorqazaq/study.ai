import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UserPlus, Sparkles, BookOpenCheck, BarChart2, Repeat } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorksPage() {
    const steps = [
        {
            icon: UserPlus,
            title: "Neural Initialization",
            desc: "Sync your identity and calibrate your terminal with specific cognitive objectives.",
            color: "text-blue-400",
            glow: "shadow-blue-500/20",
        },
        {
            icon: Sparkles,
            title: "Protocol Generation",
            desc: "Study.ai synthesizes a personalized directive set including multidimensional materials.",
            color: "text-purple-400",
            glow: "shadow-purple-500/20",
        },
        {
            icon: BookOpenCheck,
            title: "Active Processing",
            desc: "Engage with liquid-glass nodes, flashcards, and neural simulations for core retention.",
            color: "text-amber-400",
            glow: "shadow-amber-500/20",
        },
        {
            icon: BarChart2,
            title: "Network Diagnostics",
            desc: "Continuous real-time monitoring of your synaptic growth and retention velocity.",
            color: "text-teal-400",
            glow: "shadow-teal-500/20",
        },
        {
            icon: Repeat,
            title: "Recursive Synthesis",
            desc: "Systematically target weak semantic clusters and reinforce knowledge via AI feedback loops.",
            color: "text-rose-400",
            glow: "shadow-rose-500/20",
        }
    ];

    return (
        <div className="min-h-screen bg-black font-body text-white selection:bg-blue-500/20 relative overflow-hidden">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.1, width: '1200px', height: '1200px', left: '-30%' }} />
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.1, width: '1000px', height: '1000px', right: '-20%', bottom: '-20%' }} />
            </div>

            <Header />

            <main className="pt-40 pb-40 px-4 md:px-6 container mx-auto relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
                            The <span className="text-blue-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.4)]">Methodology</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-bold uppercase tracking-tight opacity-70">
                            A recursive computational path to absolute mastery.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto relative px-4 md:px-0">
                    {/* Connecting Line with Glow */}
                    <div className="absolute left-10 md:left-1/2 md:-ml-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600/50 via-purple-600/50 to-rose-600/50 rounded-full blur-[1px]">
                        <div className="absolute inset-0 bg-blue-600/20 blur-xl scale-x-150 rounded-full" />
                    </div>

                    <div className="space-y-24 md:space-y-32">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: idx * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center md:items-start ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse text-right'}`}
                            >
                                {/* Icon Marker */}
                                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-20 h-20 rounded-full border border-white/10 bg-black flex items-center justify-center z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)] group">
                                    <div className="absolute inset-0 bg-blue-600/5 blur-lg rounded-full" />
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 ${step.color} shadow-lg ${step.glow} group-hover:scale-110 transition-transform duration-700`}>
                                        <step.icon size={28} />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className={`mt-24 md:mt-0 md:w-[calc(50%-60px)] p-10 squircle-2xl liquid-glass border-white/10 hover:border-blue-500/30 transition-all duration-700 relative group shadow-2xl overflow-hidden ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                                    {/* Background decoration */}
                                    <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-blue-600/5 blur-[60px] rounded-full pointer-events-none group-hover:bg-blue-600/10 transition-all duration-700 ${idx % 2 === 1 && 'left--20'}`} />

                                    <div className={`inline-block px-5 py-2 squircle-lg bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-6`}>
                                        Segment 0{idx + 1}
                                    </div>
                                    <h3 className="text-4xl font-black mb-4 text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500 leading-none">{step.title}</h3>
                                    <p className="text-gray-500 text-lg leading-relaxed font-bold italic opacity-70">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-32">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-16 py-6 bg-white text-black hover:bg-blue-600 hover:text-white squircle-xl font-black text-xl uppercase tracking-[0.3em] shadow-[0_30px_90px_rgba(255,255,255,0.1)] transition-all duration-700 active:scale-95"
                    >
                        Initiate First Sync
                    </motion.button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
