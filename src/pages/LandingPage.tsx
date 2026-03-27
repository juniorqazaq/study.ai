import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { TrustRow } from "@/components/landing/TrustRow";
import { HowItWorksProcess } from "@/components/landing/HowItWorksProcess";
import { VideoDemo } from "@/components/landing/VideoDemo";
import { FeaturesBentoGrid } from "@/components/landing/FeaturesBentoGrid";
import { TestimonialsMasonry } from "@/components/landing/TestimonialsMasonry";
import { FaqSection } from "@/components/landing/FaqSection";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20 selection:text-primary">
            <Header />

            <main className="bg-[#0A0F1E] w-full overflow-hidden">
                <Hero />
                <TrustRow />
                
                <HowItWorksProcess />
                <VideoDemo />
                <FeaturesBentoGrid />
                <TestimonialsMasonry />
                <FaqSection />
            </main>

            <Footer />
        </div>
    );
}
