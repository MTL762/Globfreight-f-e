"use client";

import { useState } from "react";
import {
  Ship,
  Plane,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface CorridorItem {
  id: string;
  category: "asia_eu" | "gulf_eu" | "transatlantic" | "med_eu" | "intra_eu";
  originPort: string;
  originCode: string;
  originCountry: string;
  destPort: string;
  destCode: string;
  destCountry: string;
  mode: "FCL 40' HC" | "FCL 20' GP" | "Air Cargo" | "LCL Express";
  carrier: string;
  transitTime: string;
  trend: "down" | "up" | "stable";
  trendPercent: string;
  rateRange: string;
  validUntil: string;
  sla: string;
}

const corridors: CorridorItem[] = [
  {
    id: "sha_rtm",
    category: "asia_eu",
    originPort: "Port of Shanghai",
    originCode: "CNSHA",
    originCountry: "China",
    destPort: "Port of Rotterdam",
    destCode: "NLRTM",
    destCountry: "Netherlands",
    mode: "FCL 40' HC",
    carrier: "MSC / Maersk 2M",
    transitTime: "24 - 28 Days",
    trend: "down",
    trendPercent: "-4.2%",
    rateRange: "$2,450 - $2,680",
    validUntil: "Sep 30, 2026",
    sla: "Direct Deepsea • 14d Free Demurrage"
  },
  {
    id: "anr_jea",
    category: "gulf_eu",
    originPort: "Port of Antwerp-Bruges",
    originCode: "BEANR",
    originCountry: "Belgium",
    destPort: "Port of Jebel Ali",
    destCode: "AEJEA",
    destCountry: "UAE",
    mode: "FCL 40' HC",
    carrier: "CMA CGM / Hapag",
    transitTime: "18 - 22 Days",
    trend: "down",
    trendPercent: "-2.8%",
    rateRange: "$1,850 - $2,100",
    validUntil: "Oct 05, 2026",
    sla: "AEO Direct Clearance • Zero Delay"
  },
  {
    id: "ngb_ham",
    category: "asia_eu",
    originPort: "Port of Ningbo-Zhoushan",
    originCode: "CNNGB",
    originCountry: "China",
    destPort: "Port of Hamburg",
    destCode: "DEHAM",
    destCountry: "Germany",
    mode: "FCL 20' GP",
    carrier: "COSCO / Ocean Alliance",
    transitTime: "26 - 30 Days",
    trend: "stable",
    trendPercent: "0.0%",
    rateRange: "$1,580 - $1,750",
    validUntil: "Sep 28, 2026",
    sla: "Direct Hub Link • Central EU Transit"
  },
  {
    id: "aly_anr",
    category: "med_eu",
    originPort: "Port of Alexandria",
    originCode: "EGALY",
    originCountry: "Egypt",
    destPort: "Port of Antwerp",
    destCode: "BEANR",
    destCountry: "Belgium",
    mode: "FCL 40' HC",
    carrier: "Grimaldi / MSC",
    transitTime: "9 - 12 Days",
    trend: "down",
    trendPercent: "-5.1%",
    rateRange: "$1,280 - $1,450",
    validUntil: "Oct 10, 2026",
    sla: "Express Mediterranean Shuttle"
  },
  {
    id: "lax_rtm",
    category: "transatlantic",
    originPort: "Port of Los Angeles",
    originCode: "USLAX",
    originCountry: "USA",
    destPort: "Port of Rotterdam",
    destCode: "NLRTM",
    destCountry: "Netherlands",
    mode: "FCL 40' HC",
    carrier: "ONE / THE Alliance",
    transitTime: "22 - 25 Days",
    trend: "up",
    trendPercent: "+1.9%",
    rateRange: "$2,890 - $3,150",
    validUntil: "Sep 25, 2026",
    sla: "Panama Canal Express Service"
  },
  {
    id: "bru_dxb",
    category: "gulf_eu",
    originPort: "Brussels Airport",
    originCode: "BRU",
    originCountry: "Belgium",
    destPort: "Dubai International",
    destCode: "DXB",
    destCountry: "UAE",
    mode: "Air Cargo",
    carrier: "Emirates SkyCargo",
    transitTime: "1 - 2 Days",
    trend: "down",
    trendPercent: "-3.4%",
    rateRange: "$2.65 / kg",
    validUntil: "Weekly Spot",
    sla: "Priority Temp-Controlled Cargo"
  }
];

export function LiveMarketRatesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCorridors =
    activeCategory === "all"
      ? corridors
      : corridors.filter((c) => c.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 bg-background border-b border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Live Market Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Trending Global Freight Rates & Corridors
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Real-time spot rate benchmarks across primary deepsea trade lanes, updated daily from carrier EDI feeds.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "all", label: "All Trade Lanes" },
              { id: "asia_eu", label: "Asia – Europe" },
              { id: "gulf_eu", label: "Middle East – Europe" },
              { id: "med_eu", label: "Mediterranean" },
              { id: "transatlantic", label: "Transatlantic" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corridors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCorridors.map((c) => (
            <div
              key={c.id}
              className="group p-5 rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              {/* Route Heading */}
              <div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-border/70">
                  <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
                    {c.mode === "Air Cargo" ? <Plane size={14} className="text-primary" /> : <Ship size={14} className="text-primary" />}
                    <span>{c.mode}</span>
                  </div>

                  <div className="flex items-center gap-1 font-mono font-bold text-xs">
                    {c.trend === "down" ? (
                      <span className="flex items-center gap-0.5 text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        <TrendingDown size={12} />
                        {c.trendPercent}
                      </span>
                    ) : c.trend === "up" ? (
                      <span className="flex items-center gap-0.5 text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        <TrendingUp size={12} />
                        {c.trendPercent}
                      </span>
                    ) : (
                      <span className="text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                        Stable
                      </span>
                    )}
                  </div>
                </div>

                {/* Ports Corridor */}
                <div className="py-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-sm font-bold text-foreground block">
                        {c.originPort}
                      </strong>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {c.originCode} • {c.originCountry}
                      </span>
                    </div>

                    <div className="flex flex-col items-center px-2">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {c.transitTime}
                      </span>
                      <div className="w-16 h-0.5 bg-border relative my-1">
                        <div className="w-2 h-2 rounded-full bg-primary absolute -top-0.5 right-0" />
                      </div>
                    </div>

                    <div className="text-right">
                      <strong className="text-sm font-bold text-foreground block">
                        {c.destPort}
                      </strong>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {c.destCode} • {c.destCountry}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Carrier: <strong className="text-foreground">{c.carrier}</strong></span>
                    <span>Valid: {c.validUntil}</span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-3 border-t border-border/70 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block">Spot Market Rate</span>
                  <strong className="text-base sm:text-lg font-extrabold text-primary font-mono">
                    {c.rateRange}
                  </strong>
                </div>

                <Link
                  href={`/contact?origin=${encodeURIComponent(c.originPort)}&dest=${encodeURIComponent(c.destPort)}&carrier=${encodeURIComponent(c.carrier)}&mode=${encodeURIComponent(c.mode)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <span>Book Rate</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-muted/40 border border-border/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
            <span>
              All rates include standard carrier fuel adjustment factors (BAF) and direct electronic customs manifest ingress.
            </span>
          </div>
          <Link
            href="/contact"
            className="font-bold text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Request custom contract tariffs for bulk volume</span>
            <span>➔</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
