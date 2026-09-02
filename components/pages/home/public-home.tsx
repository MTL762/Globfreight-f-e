import { PublicShell } from "./public-shell";
import { HeroSection } from "./hero-section";
import { CarrierNetworkBand } from "./carrier-network-band";
import { QuickToolsEcosystem } from "./quick-tools-ecosystem";
import { LiveMarketRatesSection } from "./live-market-rates-section";
import { DigitalSolutionsShowcase } from "./digital-solutions-showcase";
import { PipelineSection } from "./pipeline-section";
import { ServicesSection } from "./services-section";
import { GatewaysSection } from "./gateways-section";
import { TrustSection } from "./trust-section";
import { LatestInsightsSection } from "./latest-insights-section";
import { FaqSection } from "./faq-section";
import { CtaBandSection } from "./cta-band-section";

export async function PublicHome() {
  return (
    <PublicShell>
      <div className="flex w-full flex-col">
        {/* 1. SeaRates Multimodal Hero & Freight Search Command Center */}
        <HeroSection />

        {/* 2. Global Carriers & Integrated Ocean Lines Network */}
        <CarrierNetworkBand />

        {/* 3. SeaRates Digital Tools & Freight Apps Ecosystem */}
        <QuickToolsEcosystem />

        {/* 4. Live Spot Freight Rates & Trending Trade Corridors */}
        <LiveMarketRatesSection />

        {/* 5. Interactive Next-Gen Freight Technology Showcase */}
        <DigitalSolutionsShowcase />

        {/* 6. 4-Stage European Delivery Pipeline */}
        <PipelineSection />

        {/* 7. Full-Spectrum Freight Capabilities & 3PL Matrix */}
        <ServicesSection />

        {/* 8. Strategic Gateway Corridors & Port Hubs */}
        <GatewaysSection />

        {/* 9. Operational Trust & AEO-F Certified Compliance */}
        <TrustSection />

        {/* 10. Logistics Market Intelligence & Freight Advisories */}
        <LatestInsightsSection />

        {/* 11. Frequently Asked Questions Guidance */}
        <FaqSection />

        {/* 12. Enterprise API Integration & High-Conversion Action Band */}
        <CtaBandSection />
      </div>
    </PublicShell>
  );
}
