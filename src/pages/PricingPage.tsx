import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingSnapshot } from "@/components/landing/PricingSnapshot";

export function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-950 relative overflow-hidden font-body flex flex-col">
            {/* Liquid Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div className="liquid-blob liquid-blob-2" style={{ opacity: 0.05 }} />
                <div className="liquid-blob liquid-blob-1" style={{ opacity: 0.03 }} />
            </div>

            <Header />

            <main className="flex-grow pt-40 pb-20 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text text-transparent">
                            System <span className="text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">Access</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto font-bold uppercase tracking-tight opacity-70">
                            Select your cognitive subscription tier.
                        </p>
                    </div>

                    <div className="relative group">
                        {/* Decorative background glow for the pricing cards */}
                        <div className="absolute -inset-40 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />
                        <PricingSnapshot />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
