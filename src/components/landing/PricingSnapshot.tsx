import { Check } from "lucide-react";

export function PricingSnapshot() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/forever",
            desc: "Perfect for getting started.",
            features: ["5 PDF uploads / month", "Basic flashcards", "Community support"],
            cta: "Get Started Free",
            popular: false
        },
        {
            name: "Student",
            price: "$9",
            period: "/month",
            desc: "Unlock your full potential.",
            features: ["Unlimited uploads", "Export to Anki/PDF", "Priority support", "Advanced Analytics"],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "Pro",
            price: "$19",
            period: "/month",
            desc: "For power users & teams.",
            features: ["Everything in Student", "Team collaboration", "API Access", "Early access to new features"],
            cta: "Go Pro",
            popular: false
        }
    ];

    return (
        <section className="py-20 md:py-32 relative overflow-hidden" id="pricing">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-950">Transparent <span className="text-blue-600">Calibration</span></h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Start for free, upgrade to expand your neural reach.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-[3rem] p-10 border liquid-glass-light flex flex-col transition-all duration-700 group bg-gradient-to-br from-white to-slate-50/50 ${plan.popular ? 'border-blue-500 shadow-[0_0_50px_rgba(37,99,235,0.08)] scale-105 z-10' : 'border-slate-100 shadow-2xl hover:border-blue-500/20 hover:-translate-y-2'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                                    Highly Compatible
                                </div>
                            )}

                            {/* Decorative Glow for popular card */}
                            {plan.popular && (
                                <div className="absolute -inset-1 bg-blue-500 blur-2xl opacity-5 -z-10 rounded-[40px]" />
                            )}

                            <div className="mb-10 text-center">
                                <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">{plan.name} Tier</h3>
                                <div className="flex items-baseline justify-center gap-1 mb-4">
                                    <span className="text-5xl font-black text-slate-950 tracking-tighter">{plan.price}</span>
                                    <span className="text-slate-300 font-bold text-sm">{plan.period}</span>
                                </div>
                                <p className="text-sm text-slate-400 font-bold italic opacity-60 leading-relaxed">{plan.desc}</p>
                            </div>

                            <ul className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-bold text-slate-600">
                                        <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <Check className="w-3 h-3 text-blue-400" />
                                        </div>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 active:scale-95 ${plan.popular ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-xl' : 'bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200'}`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
