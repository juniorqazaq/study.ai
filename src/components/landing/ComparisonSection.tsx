import { Card } from '@/components/ui/card';

// Inline SVGs — Azure Blue (#0066FF)
const IcoZap = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IcoBrain = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>;
const IcoClock = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcoTrend = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const IcoCheck = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoX = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoCheckBadge = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcoXBadge = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IcoZapSm = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;

const comparisons = [
    { icon: <IcoZap />, feature: "Flashcard Creation", studyAi: "Auto-generated in seconds", traditional: "Manual creation (hours)" },
    { icon: <IcoBrain />, feature: "Quiz Generation", studyAi: "AI-powered, adaptive questions", traditional: "Generic, one-size-fits-all" },
    { icon: <IcoClock />, feature: "Study Time", studyAi: "Optimized & efficient", traditional: "Time-consuming & repetitive" },
    { icon: <IcoTrend />, feature: "Progress Tracking", studyAi: "Real-time analytics & insights", traditional: "Manual tracking or none" },
];

export function ComparisonSection() {
    return (
        <section className="py-24 bg-[#07090f] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-medium mb-4 border border-[#0066FF]/20">
                        <IcoZapSm />
                        <span>See The Difference</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#e2e8f0]">
                        Study.ai vs <span className="text-[#e2e8f0]/40">Traditional Methods</span>
                    </h2>
                    <p className="text-[#e2e8f0]/50 max-w-2xl mx-auto text-lg">
                        Stop wasting time with outdated study techniques. See why thousands are switching to Study.ai.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-3 gap-4 mb-6 px-4">
                        <div className="text-center">
                            <p className="text-sm font-medium text-[#e2e8f0]/40">Feature</p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20">
                                <IcoCheckBadge />
                                <span className="font-bold text-[#0066FF]">Study.ai</span>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-[#1e2235]">
                                <IcoXBadge />
                                <span className="font-bold text-[#e2e8f0]/40">Traditional</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {comparisons.map((item, idx) => (
                            <Card
                                key={idx}
                                className="grid grid-cols-3 gap-4 p-4 md:p-6 border-[#1e2235] bg-[#0d0f1a] hover:border-[#0066FF]/30 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-[#07090f] border border-[#1e2235]">{item.icon}</div>
                                    <span className="font-semibold text-[#e2e8f0] text-sm md:text-base">{item.feature}</span>
                                </div>
                                <div className="flex items-center justify-center text-center">
                                    <div className="flex items-start gap-2">
                                        <IcoCheck />
                                        <span className="text-sm md:text-base text-[#e2e8f0]/80 font-medium">{item.studyAi}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center text-center">
                                    <div className="flex items-start gap-2">
                                        <IcoX />
                                        <span className="text-sm md:text-base text-[#e2e8f0]/40">{item.traditional}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <div className="inline-flex flex-col md:flex-row items-center gap-3 p-6 rounded-2xl bg-[#0066FF]/5 border border-[#0066FF]/20">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 flex items-center justify-center">
                                    <IcoTrend />
                                </div>
                                <span className="font-bold text-[#e2e8f0] text-lg">95% of users see better results</span>
                            </div>
                            <span className="text-[#e2e8f0]/30 hidden md:inline">•</span>
                            <span className="text-sm text-[#e2e8f0]/50">Join thousands who've already upgraded their study game</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
