import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Inline SVG Icons — Azure Blue (#0066FF)
const IcoUserPlus = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>;
const IcoSparkles = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>;
const IcoBookOpen = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const IcoBarChart = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
const IcoRotate = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IcoArrowRight = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

const steps = [
    { id: "01", title: "Sign In & Set Goals", desc: "Enter your subjects, level, and learning objectives to kickoff your journey.", Icon: IcoUserPlus, delay: 0.1 },
    { id: "02", title: "Generate Study Plan", desc: "Study.ai creates a personalized plan with recommended materials and exercises.", Icon: IcoSparkles, delay: 0.2 },
    { id: "03", title: "Engage with Resources", desc: "Use notes, flashcards, quizzes, and videos to study efficiently.", Icon: IcoBookOpen, delay: 0.3 },
    { id: "04", title: "Track Progress", desc: "AI monitors your performance and adapts your plan for maximum results.", Icon: IcoBarChart, delay: 0.4 },
    { id: "05", title: "Revise & Improve", desc: "Regularly review weak areas and strengthen knowledge with AI-guided repetition.", Icon: IcoRotate, delay: 0.5 },
];

export function HowItWorks() {
    return (
        <section className="py-24 md:py-40 bg-[#07090f] relative overflow-hidden" id="how-it-works">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#0066FF]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#0066FF]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-[#e2e8f0] tracking-tight mb-8">
                            How It Works
                        </h2>
                        <p className="text-xl text-[#e2e8f0]/50 font-medium">
                            A simple, proven process to achieve your academic goals.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-[40px] left-0 w-full h-px bg-[#1e2235] -translate-y-1/2" />
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
                                    <div className="relative">
                                        <div className="w-20 h-20 rounded-3xl bg-[#0066FF] flex items-center justify-center shadow-[0_0_24px_rgba(0,102,255,0.4)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                                            <s.Icon />
                                        </div>
                                        <div className="absolute -top-4 -right-4 w-10 h-10 rounded-2xl bg-[#0d0f1a] border border-[#1e2235] flex items-center justify-center text-[#e2e8f0] font-black text-sm z-20">
                                            {s.id}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-xl font-bold text-[#e2e8f0] tracking-tight group-hover:text-[#0066FF] transition-colors">
                                            {s.title}
                                        </h3>
                                        <p className="text-sm text-[#e2e8f0]/50 font-medium leading-relaxed px-4">
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
                    <Link
                        to="/register"
                        onClick={() => window.scrollTo(0,0)}
                        className="inline-flex items-center gap-3 btn-gradient text-white h-16 px-10 rounded-2xl font-bold text-lg active:scale-95 transition-all"
                    >
                        Start Your Journey <IcoArrowRight />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
