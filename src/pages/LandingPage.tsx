import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { FeaturesShowcase } from '@/components/landing/FeaturesShowcase';
import { AppWorkspaceMockup } from '@/components/landing/AppWorkspaceMockup';
import { FaqSection } from '@/components/landing/FaqSection';
import { CtaBanner } from '@/components/landing/CtaBanner';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#000000] font-body text-[#F5F5F5] selection:bg-[#0066FF]/20 selection:text-[#0066FF] relative overflow-hidden">
      <Header />

      <main className="relative w-full overflow-hidden bg-transparent">
        <Hero />
        <FeaturesShowcase />
        <AppWorkspaceMockup />
        <FaqSection />
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
