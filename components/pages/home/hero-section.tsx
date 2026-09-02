import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  Globe2
} from "lucide-react";
import { LogisticsSearchWidget } from "./logistics-search-widget";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-background pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16">
      {/* Background Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[600px] rounded-full bg-primary/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-40 h-[400px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Hero Headline Banner */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-8 sm:mb-10">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-card border border-border/80 text-xs font-semibold text-foreground shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-bold text-primary">SeaRates Powered</span>
            <span className="text-muted-foreground">•</span>
            <span>Global Multimodal Logistics Engine</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-foreground leading-[1.12]">
            Search Freight Rates, Track Cargo & Ship Worldwide
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Compare instant ocean and air freight quotations across 150+ shipping lines, track live multimodal containers via AIS radar, and manage AEO-F certified customs declarations in one unified platform.
          </p>

          {/* Key Assurance Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border/70 text-xs font-medium text-foreground">
              <ShieldCheck size={14} className="text-primary shrink-0" />
              <span>AEO-F Certified Ingress</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border/70 text-xs font-medium text-foreground">
              <Clock size={14} className="text-emerald-600 shrink-0" />
              <span>&lt; 3h Seaport Customs Release</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border/70 text-xs font-medium text-foreground">
              <Globe2 size={14} className="text-primary shrink-0" />
              <span>2,500+ Connected Ports</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border/70 text-xs font-medium text-foreground">
              <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
              <span>Zero Demurrage SLA</span>
            </div>
          </div>
        </div>

        {/* Centerpiece: SeaRates-Style Multimodal Search & Tracking Command Terminal */}
        <div className="max-w-5xl mx-auto">
          <LogisticsSearchWidget />
        </div>
      </div>
    </section>
  );
}
