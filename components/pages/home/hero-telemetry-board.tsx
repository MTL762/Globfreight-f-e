"use client";

import { useState } from "react";
import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  Clock,
  Radio,
  ShieldCheck,
  Truck,
  Zap,
  Building2,
  Layers
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface TelemetryHub {
  id: string;
  name: string;
  country: string;
  tag: string;
  clearanceTime: string;
  dispatchStatus: string;
  complianceTier: string;
  activeLanes: string;
  steps: {
    title: string;
    status: "completed" | "active" | "queued";
    time: string;
  }[];
}

const telemetryHubs: TelemetryHub[] = [
  {
    id: "antwerp",
    name: "Port of Antwerp-Bruges",
    country: "Belgium",
    tag: "Gateway 01 • Deepsea",
    clearanceTime: "< 2h 30m",
    dispatchStatus: "Express Chassis Ready",
    complianceTier: "AEO-F Direct EDI",
    activeLanes: "E17 / E19 / E313 Corridors",
    steps: [
      { title: "Pre-Arrival EDI Declaration", status: "completed", time: "-3h Pre-Berth" },
      { title: "Customs Green-Lane Release", status: "active", time: "Instant EDI" },
      { title: "Direct Terminal Haulage", status: "queued", time: "Scheduled Pickup" }
    ]
  },
  {
    id: "rotterdam",
    name: "Port of Rotterdam",
    country: "Netherlands",
    tag: "Gateway 02 • Maasvlakte",
    clearanceTime: "< 3h 15m",
    dispatchStatus: "Rhine-Ruhr Active",
    complianceTier: "NCTS T1 Direct Guarantee",
    activeLanes: "A15 / Rhine Freight Link",
    steps: [
      { title: "Electronic Manifest Match", status: "completed", time: "-4h Pre-Berth" },
      { title: "NCTS Transit Clearance", status: "active", time: "Priority Route" },
      { title: "Inland Intermodal Dispatch", status: "queued", time: "Same-Day Dispatch" }
    ]
  },
  {
    id: "zele",
    name: "Zele Bonded Logistics Hub",
    country: "Belgium (HQ)",
    tag: "Central Bonded Warehouse",
    clearanceTime: "Immediate Ingress",
    dispatchStatus: "Cross-Dock Operational",
    complianceTier: "Duty & VAT Suspension",
    activeLanes: "Antwerp-Ghent-Brussels",
    steps: [
      { title: "Bonded Cargo Ingress", status: "completed", time: "Verified" },
      { title: "Customs Inventory Staging", status: "active", time: "Supervised" },
      { title: "Pan-European Last-Mile", status: "queued", time: "On-Demand" }
    ]
  }
];

export function HeroTelemetryBoard() {
  const [activeHubId, setActiveHubId] = useState<string>("antwerp");
  const hub = telemetryHubs.find((h) => h.id === activeHubId) || telemetryHubs[0];

  return (
    <div className="relative z-10 rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5 overflow-hidden ring-1 ring-slate-900/5">
      {/* Board Header & Live Status */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 text-white border-b border-slate-800 text-[11px] font-bold tracking-wider uppercase">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="text-slate-200">European Corridor Telemetry</span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
          <Radio size={13} className="text-blue-400 animate-pulse" />
          <span>EDI 100% Active</span>
        </div>
      </div>

      {/* Gateway Switcher Tabs */}
      <div className="grid grid-cols-3 p-1.5 bg-slate-100/90 border-b border-slate-200/80 gap-1.5" role="tablist">
        {telemetryHubs.map((h) => {
          const isActive = h.id === activeHubId;
          return (
            <button
              key={h.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveHubId(h.id)}
              className={`cursor-pointer flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs transition-all duration-150 ${
                isActive
                  ? "bg-white text-blue-600 font-extrabold shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-200/50 font-semibold"
              }`}
            >
              {h.id === "antwerp" && <Anchor size={13} className={isActive ? "text-blue-600" : "text-slate-500"} />}
              {h.id === "rotterdam" && <Truck size={13} className={isActive ? "text-blue-600" : "text-slate-500"} />}
              {h.id === "zele" && <Building2 size={13} className={isActive ? "text-blue-600" : "text-slate-500"} />}
              <span className="truncate">{h.name.split(" ")[2] || h.name.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Telemetry Body */}
      <div className="p-5 sm:p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-extrabold uppercase text-blue-600 tracking-wider mb-0.5">
              {hub.tag}
            </div>
            <h3 className="text-lg font-extrabold text-slate-950 tracking-tight">
              {hub.name}
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-bold whitespace-nowrap">
            <Clock size={13} />
            <span>Avg. {hub.clearanceTime}</span>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Customs Protocol
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <ShieldCheck size={14} className="text-emerald-600 flex-shrink-0" />
              <span className="truncate">{hub.complianceTier}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Fleet & Drayage
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Zap size={14} className="text-blue-600 flex-shrink-0" />
              <span className="truncate">{hub.dispatchStatus}</span>
            </div>
          </div>

          <div className="col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Primary Inland Corridor
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Layers size={14} className="text-indigo-600 flex-shrink-0" />
              <span className="truncate">{hub.activeLanes}</span>
            </div>
          </div>
        </div>

        {/* Real-time Clearance Flow Checkpoints */}
        <div className="p-3.5 rounded-xl bg-slate-50/90 border border-slate-200/80">
          <div className="text-[11px] font-extrabold uppercase text-slate-600 tracking-wider mb-2.5">
            Operational Flow Sequence
          </div>
          <div className="flex flex-col gap-2">
            {hub.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-xs"
              >
                <div
                  className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    step.status === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : step.status === "active"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {step.status === "completed" && <CheckCircle2 size={13} />}
                  {step.status === "active" && (
                    <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                  )}
                  {step.status === "queued" && <span>{idx + 1}</span>}
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-slate-900">{step.title}</span>
                  <span className="text-[11px] font-bold text-slate-500">{step.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Fast Action */}
        <div className="pt-1">
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>Request Routing for {hub.name.split(" ")[0]}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
