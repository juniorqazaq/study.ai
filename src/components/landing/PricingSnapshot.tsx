import { Link } from 'react-router-dom';

// Inline SVG check icon — Azure Blue
const IcoCheck = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

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

export function PricingSnapshot() {
    return (
        <section className="py-20 md:py-32 bg-[#07090f] relative overflow-hidden" id="pricing">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0066FF]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-[#e2e8f0]">
                        Transparent <span className="text-[#0066FF]">Pricing</span>
                    </h2>
                    <p className="text-[#e2e8f0]/50 font-bold uppercase tracking-widest text-xs">
                        Start for free, upgrade to expand your neural reach.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-3xl p-8 border flex flex-col transition-all duration-300 ${
                                plan.popular
                                    ? 'border-[#0066FF]/50 bg-[#0d0f1a] shadow-[0_0_40px_rgba(0,102,255,0.15)] scale-105 z-10'
                                    : 'border-[#1e2235] bg-[#0d0f1a] hover:border-[#0066FF]/30 hover:-translate-y-1'
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,102,255,0.5)]">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8 text-center">
                                <h3 className="text-[#e2e8f0]/50 font-black uppercase tracking-[0.3em] text-[10px] mb-4">{plan.name} Tier</h3>
                                <div className="flex items-baseline justify-center gap-1 mb-3">
                                    <span className="text-5xl font-black text-[#e2e8f0] tracking-tighter">{plan.price}</span>
                                    <span className="text-[#e2e8f0]/40 font-bold text-sm">{plan.period}</span>
                                </div>
                                <p className="text-sm text-[#e2e8f0]/40 font-medium italic">{plan.desc}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-[#e2e8f0]/70">
                                        <div className="w-5 h-5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 flex items-center justify-center flex-shrink-0">
                                            <IcoCheck />
                                        </div>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to="/register"
                                onClick={() => window.scrollTo(0,0)}
                                className={`w-full py-4 rounded-2xl font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 active:scale-95 text-center ${
                                    plan.popular
                                        ? 'bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_20px_rgba(0,102,255,0.3)]'
                                        : 'bg-[#1a1d2e] hover:bg-[#252840] text-[#e2e8f0] border border-[#1e2235]'
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
