import { PublicShell } from "./public-shell";
import { HeroSection } from "./hero-section";
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
        {/* Clean, High-Impact Hero Command Center */}
        <HeroSection />

        {/* 4-Stage European Logistics Pipeline */}
        <PipelineSection />

        {/* Core Capabilities Interactive Matrix */}
        <ServicesSection />

        {/* Strategic Gateway Corridors & Port Hubs */}
        <GatewaysSection />

        {/* Operational Trust & Compliance */}
        <TrustSection />

        {/* Latest Logistics Intelligence */}
        <LatestInsightsSection />

        {/* High-Conversion Direct Action Band */}
        <CtaBandSection />
      </div>
    </PublicShell>
  );
}
