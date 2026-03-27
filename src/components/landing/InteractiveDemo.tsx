import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const IcoFileText = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>;
const IcoZap = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IcoBrain = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IcoChevronRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
const IcoSparkles = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/></svg>;
import { Card } from '@/components/ui/card';

const DEMO_DATA = {
    biology: {
        title: "Biology: Photosynthesis",
        icon: <IcoZap />,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        text: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. It occurs in the chloroplasts, which contain chlorophyll.",
        flashcards: [
            { q: "Where does photosynthesis occur?", a: "In the Chloroplasts" },
            { q: "What is the primary byproduct?", a: "Oxygen" },
            { q: "What pigment absorbs sunlight?", a: "Chlorophyll" }
        ]
    },
    history: {
        title: "History: The Cold War",
        icon: <IcoFileText />,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/20",
        text: "The Cold War was a period of geopolitical tension between the Soviet Union and the United States. It began after World War II and lasted until the dissolution of the USSR in 1991.",
        flashcards: [
            { q: "Who were the main rivals?", a: "USA & USSR" },
            { q: "When did it end?", a: "1991" },
            { q: "What was the main conflict type?", a: "Geopolitical Tension" }
        ]
    },
    literature: {
        title: "Literature: Shakespeare",
        icon: <IcoBrain />,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        text: "William Shakespeare was an English playwright, poet, and actor. He is widely regarded as the greatest writer in the English language and the world's pre-eminent dramatist. Famous works include Hamlet, Romeo/Juliet.",
        flashcards: [
            { q: "Who is the 'Bard of Avon'?", a: "William Shakespeare" },
            { q: "Name a famous tragedy.", a: "Hamlet" },
            { q: "What was his profession?", a: "Playwright & Poet" }
        ]
    }
};

type Subject = keyof typeof DEMO_DATA;

export function InteractiveDemo() {
    const [activeTab, setActiveTab] = useState<Subject>('biology');
    const [displayText, setDisplayText] = useState('');
    const [showCards, setShowCards] = useState(false);
    const typingSpeed = 30; // ms per char

    const data = DEMO_DATA[activeTab];

    useEffect(() => {
        setDisplayText('');
        setShowCards(false);
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex <= data.text.length) {
                setDisplayText(data.text.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                setShowCards(true);
            }
        }, typingSpeed);

        return () => clearInterval(interval);
    }, [activeTab]);

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-medium mb-4 border border-[#0066FF]/20">
                        <IcoSparkles />
                        <span>Experience the Magic</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#e2e8f0]">
                        See it in <span className="text-primary">Action</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                        Watch how Study.ai instantly transforms raw text into interactive study materials.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Tabs */}
                    <div className="flex justify-center mb-8 gap-2 md:gap-4">
                        {(Object.keys(DEMO_DATA) as Subject[]).map((subject) => (
                            <button
                                key={subject}
                                onClick={() => setActiveTab(subject)}
                                className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTab === subject
                                    ? `bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25 scale-105`
                                    : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                                    }`}
                            >
                                {subject.charAt(0).toUpperCase() + subject.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-start">
                        {/* Input Side */}
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                            <Card className="relative h-[300px] md:h-[400px] bg-card border-border p-6 rounded-2xl shadow-xl flex flex-col">
                                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/20 md:bg-red-500" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 md:bg-yellow-500" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/20 md:bg-green-500" />
                                    </div>
                                    <div className="text-xs text-muted-foreground font-mono">source_material.txt</div>
                                </div>
                                <div className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                    {displayText}
                                    <span className="animate-pulse inline-block w-2 h-5 bg-primary ml-1 align-middle"></span>
                                </div>
                            </Card>
                        </div>

                        {/* Arrow for Desktop */}
                        <div className="hidden md:flex justify-center items-center h-[400px]">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                                <div className="relative bg-background border border-border p-3 rounded-full text-primary">
                                    <IcoChevronRight />
                                </div>
                            </div>
                        </div>

                        {/* Output Side */}
                        <div className="relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-primary rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-1000" />
                            <Card className="relative h-[300px] md:h-[400px] bg-card/50 backdrop-blur-sm border-border/50 p-6 rounded-2xl flex flex-col">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className={`p-2 rounded-lg ${data.bgColor}`}>
                                        {data.icon}
                                    </div>
                                    <span className={`font-semibold ${data.color}`}>{data.title}</span>
                                </div>

                                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                                    <AnimatePresence mode="popLayout">
                                        {showCards && data.flashcards.map((card, idx) => (
                                            <motion.div
                                                key={card.q}
                                                initial={{ opacity: 0, x: 20, y: 10 }}
                                                animate={{ opacity: 1, x: 0, y: 0 }}
                                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 100 }}
                                            >
                                                <div className={`p-4 rounded-xl border bg-card hover:bg-accent/5 transition-colors cursor-default group/card ${data.borderColor}`}>
                                                    <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Question</p>
                                                    <p className="font-medium text-foreground mb-3">{card.q}</p>

                                                    <div className="h-0 group-hover/card:h-auto overflow-hidden transition-all duration-300">
                                                        <div className="pt-3 border-t border-border">
                                                            <p className="text-xs font-medium text-primary mb-1 uppercase tracking-wider">Answer</p>
                                                            <p className={`text-sm ${data.color}`}>{card.a}</p>
                                                        </div>
                                                    </div>
                                                    <div className="group-hover/card:hidden pt-2">
                                                        <p className="text-xs text-muted-foreground underline decoration-dotted">Hover to reveal answer</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>

                                    {!showCards && (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
                                            <p className="text-sm text-muted-foreground">Analyzing content...</p>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
