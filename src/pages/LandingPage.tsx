import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { TrustRow } from "@/components/landing/TrustRow";
import { LearningScience } from "@/components/landing/LearningScience";
import { Roadmap } from "@/components/landing/Roadmap";
import { LandingFeatures } from "@/components/landing/LandingFeatures";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20 selection:text-primary">
            <Header />

            <main>
                <Hero />
                <TrustRow />
                <LearningScience />
                <Roadmap />
                <LandingFeatures />
            </main>

            <Footer />
        </div>
    );
}
