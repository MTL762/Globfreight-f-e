import { PublicShell } from "./public-shell";
import { HeroSection } from "./hero-section";
import { ServicesSection } from "./services-section";
import { AboutSection } from "./about-section";
import { LatestInsightsSection } from "./latest-insights-section";
import { FaqSection } from "./faq-section";
import { CtaBandSection } from "./cta-band-section";

export async function PublicHome() {
  return (
    <PublicShell>
      <div className="flex w-full flex-col">
        {/* 1. Home (Hero, Search Command Terminal & Key Trust Badges) */}
        <HeroSection />

        {/* 2. Services (Streamlined Freight Booking Solutions: Ocean, Air & Digital) */}
        <ServicesSection />

        {/* 3. About (About Globfreight & Core Operational Pillars) */}
        <AboutSection />

        {/* 4. Blog (Logistics Insights & Booking Guides) */}
        <LatestInsightsSection />

        {/* 5. FAQ (Frequently Asked Questions) */}
        <FaqSection />

        {/* 6. Contact / Action Band */}
        <CtaBandSection />
      </div>
    </PublicShell>
  );
}
