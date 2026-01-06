import { UserPlus, Sparkles, BookOpen, BarChart3, RotateCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const steps = [
    {
        id: "01",
        title: "Sign In & Set Goals",
        desc: "Enter your subjects, level, and learning objectives to kickoff your journey.",
        icon: UserPlus,
        color: "bg-blue-500",
        delay: 0.1
    },
    {
        id: "02",
        title: "Generate Study Plan",
        desc: "Study.ai creates a personalized plan with recommended materials and exercises.",
        icon: Sparkles,
        color: "bg-purple-500",
        delay: 0.2
    },
    {
        id: "03",
        title: "Engage with Resources",
        desc: "Use notes, flashcards, quizzes, and videos to study efficiently.",
        icon: BookOpen,
        color: "bg-indigo-500",
        delay: 0.3
    },
    {
        id: "04",
        title: "Track Progress",
        desc: "AI monitors your performance and adapts your plan for maximum results.",
        icon: BarChart3,
        color: "bg-teal-500",
        delay: 0.4
    },
    {
        id: "05",
        title: "Revise & Improve",
        desc: "Regularly review weak areas and strengthen knowledge with AI-guided repetition.",
        icon: RotateCw,
        color: "bg-rose-500",
        delay: 0.5
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 md:py-40 bg-slate-50 relative overflow-hidden" id="how-it-works">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                            How It Works
                        </h2>
                        <p className="text-xl text-slate-500 font-medium">
                            A simple, proven process to achieve your academic goals.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 opacity-50" />

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 relative">
                        {steps.map((s) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: s.delay }}
                                className="group relative"
                            >
                                <div className="flex flex-col items-center text-center space-y-6">
                                    {/* Icon Container */}
                                    <div className="relative">
                                        <div className={`w-20 h-20 rounded-3xl ${s.color} flex items-center justify-center text-white shadow-2xl shadow-${s.color.split('-')[1]}-500/30 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                                            <s.icon size={32} strokeWidth={2.5} />
                                        </div>
                                        {/* Step Number Overlay */}
                                        <div className="absolute -top-4 -right-4 w-10 h-10 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-900 font-black text-sm z-20">
                                            {s.id}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">
                                            {s.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                                            {s.desc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-24 md:mt-32 text-center"
                >
                    <Button size="lg" className="h-16 px-10 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-lg shadow-xl shadow-slate-900/20 active:scale-95 transition-all">
                        Start Your Journey <ArrowRight className="ml-3 w-5 h-5" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
