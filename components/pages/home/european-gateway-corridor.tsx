"use client";

import { useState } from "react";
import { Anchor, Building2, ChevronRight, Navigation, ShieldCheck, Zap } from "lucide-react";

interface Hub {
  id: string;
  name: string;
  country: string;
  role: string;
  clearanceSpeed: string;
  connections: string;
  description: string;
  features: string[];
}

const hubs: Hub[] = [
  {
    id: "antwerp",
    name: "Port of Antwerp-Bruges",
    country: "Belgium",
    role: "Primary European Gateway",
    clearanceSpeed: "< 3 Hours",
    connections: "Direct access to E17 / E19 / E313 highways and European rail network",
    description: "Main logistics hub with dedicated customs declarants stationed for direct electronic clearance and instant container collection from all main sea terminals.",
    features: ["Direct EDI port release", "Chemical & ADR certified lanes", "Reefer plug-in staging"]
  },
  {
    id: "rotterdam",
    name: "Port of Rotterdam",
    country: "Netherlands",
    role: "Maasvlakte Deepsea Corridor",
    clearanceSpeed: "< 4 Hours",
    connections: "Rhine-Ruhr inland barge, rail, and dedicated motorway links into Germany",
    description: "Seamless clearance and immediate drayage connection from Maasvlakte I & II terminals directly into Germany, Benelux, and Central Europe.",
    features: ["Pre-arrival digital filing", "Rhine corridor transit", "Heavy container haulage"]
  },
  {
    id: "zele",
    name: "Zele Bonded Logistics Center",
    country: "Belgium (HQ)",
    role: "Bonded Staging & Cross-Dock Hub",
    clearanceSpeed: "Instant Ingress",
    connections: "Strategically poised on the Antwerp-Ghent-Brussels freight triangle",
    description: "Full customs-supervised bonded warehouse for duty suspension, pallet reworking, rapid transshipment, and flexible last-mile distribution.",
    features: ["Duty & VAT suspension", "Cross-dock transshipment", "Value-added packing"]
  },
  {
    id: "hamburg",
    name: "Port of Hamburg & North Hubs",
    country: "Germany / North Sea",
    role: "Central & Nordic Distribution",
    clearanceSpeed: "< 4 Hours",
    connections: "High-speed rail and road links to Scandinavia, Poland, and Czech Republic",
    description: "Expert customs handling of NCTS T1 transit declarations and cross-border haulage connecting Northern Europe's major manufacturing hubs.",
    features: ["NCTS T1 guarantee coverage", "Nordic border compliance", "Multi-modal dispatch"]
  }
];

export function EuropeanGatewayCorridor() {
  const [selectedHub, setSelectedHub] = useState<string>(hubs[0].id);
  const current = hubs.find((h) => h.id === selectedHub) || hubs[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Sidebar List */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        {hubs.map((hub) => {
          const isSelected = selectedHub === hub.id;
          return (
            <button
              key={hub.id}
              onClick={() => setSelectedHub(hub.id)}
              className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-card border-primary/50 shadow-sm ring-1 ring-primary/20"
                  : "bg-card/40 border-border/70 hover:bg-card hover:border-border"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {hub.id === "zele" ? <Building2 size={18} /> : <Anchor size={18} />}
                </div>
                <div className="min-w-0">
                  <strong className="block text-sm font-bold text-foreground truncate">
                    {hub.name}
                  </strong>
                  <span className="block text-xs text-muted-foreground truncate mt-0.5">
                    {hub.country} • {hub.role}
                  </span>
                </div>
              </div>
              <ChevronRight
                size={18}
                className={`shrink-0 ml-2 transition-transform duration-200 ${
                  isSelected ? "text-primary translate-x-1" : "text-muted-foreground"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Hub Detail Card */}
      <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <span className="inline-block text-[11px] font-bold text-primary uppercase tracking-wider mb-1">
              {current.country}
            </span>
            <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
              {current.name}
            </h4>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">
              {current.role}
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold w-fit shrink-0">
            <Zap size={14} className="text-emerald-500" />
            <span>{current.clearanceSpeed}</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {current.description}
        </p>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/40 border border-border/50">
          <Navigation size={16} className="text-primary shrink-0 mt-0.5" />
          <span className="text-xs sm:text-sm font-medium text-foreground">
            {current.connections}
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2">
          {current.features.map((feat, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground shadow-2xs"
            >
              <ShieldCheck size={14} className="text-primary" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
