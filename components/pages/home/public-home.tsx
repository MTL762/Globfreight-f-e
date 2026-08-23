import { PublicShell } from "./public-shell";
import { PortSpotlightSection } from "./port-spotlight-section";
import { PipelineSection } from "./pipeline-section";
import { ServicesSection } from "./services-section";
import { GatewaysSection } from "./gateways-section";
import { TrustSection } from "./trust-section";
import { LatestInsightsSection } from "./latest-insights-section";
import { CtaBandSection } from "./cta-band-section";

export async function PublicHome() {
  return (
    <PublicShell>
      <div className="flex w-full flex-col">
        {/* Live Port Status Ribbon */}


        {/* Redesigned Hero Command Center */}
        {/* <HeroSection /> */}

        {/* Visual Port Imagery & Value Banner */}
        <PortSpotlightSection />

        {/* 4-Stage Logistics Pipeline Flow */}
        <PipelineSection />

        {/* Interactive Capabilities Matrix */}
        <ServicesSection />

        {/* European Gateway Corridors Showcase */}
        <GatewaysSection />

        {/* Compliance & Trust Grid */}
        <TrustSection />

        {/* Dynamic Latest Insights Section */}
        <LatestInsightsSection />

        {/* High-Conversion CTA Band */}
        <CtaBandSection />
      </div>
    </PublicShell>
  );
}
