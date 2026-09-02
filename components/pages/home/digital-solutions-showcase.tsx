"use client";

import { useState } from "react";
import {
  Compass,
  Ship,
  Box,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Activity,
  Cpu
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export function DigitalSolutionsShowcase() {
  const [activeTab, setActiveTab] = useState<"tracking" | "rates" | "load" | "customs">("tracking");

  return (
    <section className="py-16 sm:py-24 bg-muted/20 border-b border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Cpu size={13} />
            <span>Digital Freight Technology</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Next-Generation Tools for Modern Supply Chains
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Engineered to empower shippers, freight forwarders, and logistics teams with total visibility, algorithmic optimization, and automated compliance.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center mb-8 sm:mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-card border border-border shadow-xs gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("tracking")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "tracking"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Compass size={16} />
              <span>Container AIS Tracking</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("rates")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "rates"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Ship size={16} />
              <span>Rate Management (RMS)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("load")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "load"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Box size={16} />
              <span>3D Load Optimization</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("customs")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "customs"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldCheck size={16} />
              <span>AEO-F Customs Ingress</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display Card */}
        <div className="rounded-3xl bg-card border border-border/80 shadow-md p-6 sm:p-8 lg:p-10">
          {activeTab === "tracking" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                  <Activity size={14} />
                  <span>Real-Time AIS Vessel Feeds</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Multimodal Tracking with Predictive ETA Intelligence
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor any container, parcel, or air cargo shipment across 150+ ocean carriers and airlines. Get automated delay alerts, transshipment notifications, and live port discharge milestones on an interactive radar map.
                </p>

                <div className="space-y-3">
                  {[
                    "Unified tracking for MSC, Maersk, CMA CGM, Hapag-Lloyd, COSCO & more",
                    "Satellite AIS radar with precise nautical waypoint positioning",
                    "Automated pre-arrival customs trigger upon vessel entering territorial waters",
                    "Demurrage-risk forecasting and detention window countdown timers"
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-xs hover:opacity-90 transition-all"
                  >
                    <span>Integrate Tracking API</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-4 shadow-inner">
                  {/* Mock UI for live telemetry tracking */}
                  <div className="flex items-center justify-between border-b border-border/80 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-foreground">
                        LIVE RADAR: MSC GULSUN (IMO 9839438)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-primary font-bold">
                      18.4 Knots • HDG 112°
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Current Position:</span>
                      <span className="font-mono font-bold text-foreground">36°14'N 15°22'E (Central Med)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Next Waypoint:</span>
                      <span className="font-mono font-bold text-foreground">Port Said East (Sep 05, 14:00)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Destination ETA:</span>
                      <span className="font-mono font-bold text-emerald-600">Jebel Ali (Sep 12, 08:00)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between text-xs">
                    <span className="font-bold text-primary">Customs Pre-Arrival Status:</span>
                    <span className="font-mono font-bold text-foreground">EDI Declaration Prepared</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "rates" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                  <Sparkles size={14} />
                  <span>Instant Spot & Contract Engine</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Automated Digital Quotations & Rate Management
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Eliminate days of waiting for freight quotes. Compare ocean carrier tariffs, fuel surcharges (BAF), terminal handling charges (THC), and inland drayage in seconds with guaranteed pricing.
                </p>

                <div className="space-y-3">
                  {[
                    "Transparent line-item rate breakdown with zero hidden port surcharges",
                    "Direct API connectivity to ocean shipping lines & air freight carriers",
                    "Instant PDF rate quotation generator with 30-day price locks",
                    "Integrated carbon emissions calculations for green supply chains"
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-xs hover:opacity-90 transition-all"
                  >
                    <span>Request Corporate Rate Card</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3">
                  <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2.5">
                    <div className="flex justify-between text-xs font-bold text-muted-foreground border-b pb-2">
                      <span>Rate Component</span>
                      <span>Amount (USD)</span>
                    </div>
                    <div className="flex justify-between text-xs text-foreground">
                      <span>Base Ocean Freight (40' HC)</span>
                      <span className="font-mono font-bold">$1,650.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-foreground">
                      <span>Bunker Adjustment Factor (BAF)</span>
                      <span className="font-mono font-bold">$220.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-foreground">
                      <span>Port Origin Terminal Handling (THC)</span>
                      <span className="font-mono font-bold">$140.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-foreground">
                      <span>Electronic Customs Ingress (AEO)</span>
                      <span className="font-mono font-bold">$65.00</span>
                    </div>
                    <div className="flex justify-between text-sm font-extrabold text-primary pt-2 border-t">
                      <span>Total Guaranteed Rate</span>
                      <span className="font-mono">$2,075.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "load" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                  <Box size={14} />
                  <span>3D Container Stuffing Simulation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Maximize Container Utilization & Cut Freight Costs
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our 3D packing algorithm calculates the optimal stuffing arrangement for pallets, cartons, and irregular cargo. Minimize empty container space and reduce the total number of containers required.
                </p>

                <div className="space-y-3">
                  {[
                    "Supports 20' GP, 40' GP, 40' HC, Reefer, and flat-rack equipment",
                    "Calculates gross payload weight limits and axle weight distributions",
                    "Generates 3D step-by-step loading plans for warehouse teams",
                    "Reduces ocean transport costs by up to 18% through space optimization"
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-xs hover:opacity-90 transition-all"
                  >
                    <span>Use Load Optimization Tool</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3">
                  <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-foreground">40' High Cube Container</span>
                      <span className="font-mono text-emerald-600 font-bold">94.2% Capacity Reached</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[94%]" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                      <div className="p-2.5 rounded-lg bg-muted/50">
                        <span className="text-[10px] text-muted-foreground block">Packed Pallets</span>
                        <strong className="text-foreground">24 Euro Pallets (120x80)</strong>
                      </div>
                      <div className="p-2.5 rounded-lg bg-muted/50">
                        <span className="text-[10px] text-muted-foreground block">Payload Weight</span>
                        <strong className="text-foreground">22,400 kg / 28,600 kg</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customs" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold">
                  <ShieldCheck size={14} />
                  <span>AEO-F European Customs Priority</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  Sub-4-Hour Port Customs Release & Zero Demurrage
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Direct EDI link to Belgian (PLDA / IDMS) and Dutch (DMS) customs authorities. Fast-track import/export declarations, NCTS T1 transit bonds, and Article 23 import VAT deferral across all major Northern European gateways.
                </p>

                <div className="space-y-3">
                  {[
                    "Direct electronic filing before vessel berthing for same-day release",
                    "Full NCTS T1 / T2 customs transit guarantee coverage",
                    "Fiscal representation with complete VAT cash-flow deferment",
                    "Zero container demurrage and detention avoidance SLA"
                  ].map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-xs hover:opacity-90 transition-all"
                  >
                    <span>Connect Customs Specialist</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3">
                  <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">AEO-F Priority Fast-Track</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-mono font-bold">
                        Average: 2h 45m Release
                      </span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded bg-muted/40">
                        <span>Antwerp Gateway (DP World / MPET)</span>
                        <strong className="text-emerald-600 font-mono">&lt; 3 Hours</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-muted/40">
                        <span>Rotterdam Maasvlakte I & II</span>
                        <strong className="text-emerald-600 font-mono">&lt; 3.5 Hours</strong>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-muted/40">
                        <span>Port of Hamburg (HHLA / Eurogate)</span>
                        <strong className="text-emerald-600 font-mono">&lt; 4 Hours</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
