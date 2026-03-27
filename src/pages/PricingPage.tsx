import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingSnapshot } from "@/components/landing/PricingSnapshot";

export function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] font-body text-[#e2e8f0] selection:bg-[#0066FF]/20 selection:text-[#0066FF]">
      <Header />

      <main className="relative overflow-hidden bg-[#0A0F1E] pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,102,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.05),transparent_24%),linear-gradient(180deg,#0A0F1E_0%,#0B1020_100%)]" />

        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-8 md:px-10">
          <div className="text-center">
            <div className="mx-auto inline-flex rounded-full border border-[#0066FF]/25 bg-[#0066FF]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[#69b4ff]">
              Pricing
            </div>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-white md:text-7xl">
              System
              <span className="text-[#0066FF]"> Access</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#e2e8f0]/60 md:text-xl">
              One background system across the whole site, with clearer pricing cards and softer contrast.
            </p>
          </div>
        </section>

        <section className="relative z-10">
          <PricingSnapshot />
        </section>
      </main>

      <Footer />
    </div>
  );
}
