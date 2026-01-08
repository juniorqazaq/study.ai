import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Brain, Zap, Target, BookOpen } from "lucide-react";
import { LiquidBackground } from "../layout/LiquidBackground";
import { cn } from "@/lib/utils";

const principles = [
    {
        icon: Target,
        title: "Active Recall",
        description: "Instead of passive reading, we force your brain to retrieve information, making memories 300% stronger.",
        color: "from-blue-500 to-cyan-400",
        glow: "shadow-blue-500/20"
    },
    {
        icon: Zap,
        title: "Spaced Repetition",
        description: "Our AI calculates the exact moment you're about to forget a concept and brings it back for review.",
        color: "from-indigo-500 to-purple-400",
        glow: "shadow-indigo-500/20"
    },
    {
        icon: Brain,
        title: "AI Adaptation",
        description: "STUDY AI learns your weaknesses and creates custom study paths that adapt in real-time.",
        color: "from-primary to-blue-400",
        glow: "shadow-primary/20"
    }
];

function TiltCard({ p, i }: { p: typeof principles[0], i: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative p-10 squircle-xl bg-white border border-slate-100 hover:border-blue-500/30 transition-all duration-500 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:bg-slate-50"
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
                <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-10 shadow-2xl transition-all duration-500 group-hover:scale-110 border border-white/10",
                    "bg-gradient-to-br", p.color, p.glow
                )}>
                    <p.icon size={32} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase italic">{p.title}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs leading-relaxed group-hover:text-slate-700 transition-colors">
                    {p.description}
                </p>
            </div>

            {/* Inner Glow Effect */}
            <div className="absolute inset-0 squircle-xl bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
}

export function LearningScience() {
    return (
        <section className="py-16 bg-white border-y border-slate-100 overflow-hidden" id="methodology">
            <LiquidBackground className="py-24 md:py-40">
                {/* Background Brand Text with Mask */}
                <div className="absolute top-[20%] -left-[10%] pointer-events-none select-none z-0 text-slate-900 opacity-[0.03] mask-radial-faded hidden xl:block">
                    <h1
                        className="text-[150px] md:text-[250px] font-black leading-none tracking-tighter uppercase whitespace-nowrap"
                        style={{ WebkitTextStroke: '1px currentColor', color: 'transparent' }}
                    >
                        SCIENCE
                    </h1>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-28">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-10 border border-blue-100"
                        >
                            <BookOpen size={14} />
                            Scientific Methodology
                        </motion.div>
                        <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-900 mb-10 tracking-tighter leading-[0.9] uppercase text-balance">
                            How we make learning <span className="text-blue-600 italic">inevitable.</span>
                        </h2>
                        <p className="text-xl font-black text-slate-400 font-heading uppercase tracking-[0.2em] italic">
                            We don't just use AI because it's cool. We automate the most effective study methods known to neuroscientists.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {principles.map((p, i) => (
                            <TiltCard key={i} p={p} i={i} />
                        ))}
                    </div>
                </div>
            </LiquidBackground>
        </section>
    );
}
