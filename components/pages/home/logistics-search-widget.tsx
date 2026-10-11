"use client";

import React, { useState } from "react";
import {
  Ship,
  Plane,
  Truck,
  Box,
  Calendar,
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  FileText,
  Anchor,
  Compass,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// ==========================================
// Types & Data Contracts
// ==========================================

export type TabKey = "rates" | "tracking" | "air" | "schedules" | "load" | "quote";
export type ShippingMode = "fcl" | "lcl" | "air" | "land";

export interface RateRoute {
  carrier: string;
  transitDays: string;
  vessel: string;
  rateRange: string;
  direct: boolean;
  co2: string;
  validUntil: string;
  freeDays: string;
}

export interface RatesResultData {
  origin: string;
  destination: string;
  mode: string;
  container: string;
  routes: RateRoute[];
}

export interface TrackingMilestone {
  label: string;
  location: string;
  date: string;
  done?: boolean;
  current?: boolean;
}

export interface TrackingResultData {
  number: string;
  carrier: string;
  status: string;
  eta: string;
  vessel: string;
  origin: string;
  destination: string;
  currentCoords: string;
  speed: string;
  milestones: TrackingMilestone[];
}

export interface SailingScheduleItem {
  carrier: string;
  vessel: string;
  polCutoff: string;
  etd: string;
  eta: string;
  transit: string;
}

// ==========================================
// Mock Data Generators
// ==========================================

const MOCK_RATE_ROUTES: RateRoute[] = [
  {
    carrier: "MSC Shipping",
    transitDays: "18 - 22 Days",
    vessel: "MSC TINA / Voy 2408W",
    rateRange: "$1,850 - $2,100",
    direct: true,
    co2: "1.42 tons",
    validUntil: "Sep 30, 2026",
    freeDays: "14 Days Demurrage-Free",
  },
  {
    carrier: "Maersk Line",
    transitDays: "20 - 24 Days",
    vessel: "MAERSK MC-KINNEY / Voy 112E",
    rateRange: "$1,920 - $2,180",
    direct: true,
    co2: "1.38 tons",
    validUntil: "Sep 28, 2026",
    freeDays: "12 Days Demurrage-Free",
  },
  {
    carrier: "CMA CGM",
    transitDays: "21 - 25 Days",
    vessel: "CMA CGM ANTOINE / Voy 8810",
    rateRange: "$1,790 - $2,050",
    direct: false,
    co2: "1.55 tons",
    validUntil: "Oct 05, 2026",
    freeDays: "10 Days Demurrage-Free",
  },
];

const MOCK_TRACKING_MILESTONES: TrackingMilestone[] = [
  { label: "Gate In & Customs Filing", location: "Antwerp DP World", date: "Aug 26, 09:30", done: true },
  { label: "Loaded on Vessel", location: "MSC Gulsun", date: "Aug 27, 18:45", done: true },
  { label: "Vessel Departed", location: "Port of Antwerp", date: "Aug 28, 04:15", done: true },
  { label: "Transit Port Call", location: "Port Said East", date: "Sep 05, 14:00", current: true },
  { label: "Discharge at Dest.", location: "Jebel Ali Terminal 2", date: "Sep 12, 08:00", done: false },
  { label: "Customs Clear & Out for Delivery", location: "Bonded Corridor", date: "Sep 13, 11:00", done: false },
];

const MOCK_SAILING_SCHEDULES: SailingScheduleItem[] = [
  { carrier: "MSC", vessel: "MSC AMALFI", polCutoff: "Sep 03", etd: "Sep 05", eta: "Sep 24", transit: "19 Days" },
  { carrier: "Maersk", vessel: "MAERSK HANOI", polCutoff: "Sep 06", etd: "Sep 08", eta: "Sep 28", transit: "20 Days" },
  { carrier: "CMA CGM", vessel: "CMA CGM JACQUES", polCutoff: "Sep 09", etd: "Sep 11", eta: "Oct 01", transit: "20 Days" },
];

const POPULAR_CORRIDORS: [string, string][] = [
  ["Antwerp", "Jebel Ali"],
  ["Rotterdam", "Shanghai"],
  ["Ningbo", "Hamburg"],
  ["Alexandria", "Antwerp"],
];

// Common styling classes to eliminate repetition and ensure responsive text wrapping
const INPUT_BASE_CLASS =
  "w-full min-w-0 h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground placeholder:text-muted-foreground/60 truncate placeholder:truncate focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all";

const SELECT_BASE_CLASS =
  "w-full min-w-0 max-w-full h-11 px-3 pr-8 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm font-semibold text-foreground truncate focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all";

// ==========================================
// Main Component
// ==========================================

export function LogisticsSearchWidget() {
  const t = useTranslations("LandingPage.searchWidget");
  const [activeTab, setActiveTab] = useState<TabKey>("rates");
  const [liveAnnouncement, setLiveAnnouncement] = useState("");

  // Rates State
  const [shippingMode, setShippingMode] = useState<ShippingMode>("fcl");
  const [origin, setOrigin] = useState("Port of Antwerp (BEANR)");
  const [destination, setDestination] = useState("Port of Jebel Ali (AEJEA)");
  const [containerType, setContainerType] = useState("40' High Cube (40' HC)");
  const [cargoReadyDate, setCargoReadyDate] = useState("2026-09-05");
  const [isSearchingRates, setIsSearchingRates] = useState(false);
  const [ratesResult, setRatesResult] = useState<RatesResultData | null>(null);

  // Tracking State
  const [trackingNumber, setTrackingNumber] = useState("MSCU9842173");
  const [trackingCarrier, setTrackingCarrier] = useState("MSC - Mediterranean Shipping Co");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingResultData | null>(null);

  // Air Cargo State
  const [airAwb, setAirAwb] = useState("020-84729104");
  const [airOrigin, setAirOrigin] = useState("Brussels Airport (BRU)");
  const [airDest, setAirDest] = useState("Dubai International (DXB)");
  const [airWeight, setAirWeight] = useState("450");

  // Schedules State
  const [schedOrigin, setSchedOrigin] = useState("Port of Rotterdam (NLRTM)");
  const [schedDest, setSchedDest] = useState("Port of Shanghai (CNSHA)");
  const [schedCarrier, setSchedCarrier] = useState("All Carriers");
  const [schedResult, setSchedResult] = useState<SailingScheduleItem[] | null>(null);

  // Load Calculator State
  const [boxLength, setBoxLength] = useState("120");
  const [boxWidth, setBoxWidth] = useState("80");
  const [boxHeight, setBoxHeight] = useState("100");
  const [boxWeight, setBoxWeight] = useState("250");
  const [boxQuantity, setBoxQuantity] = useState("32");
  const [loadContainer, setLoadContainer] = useState("40_hc");

  // Tab definitions
  const tabsList: { id: TabKey; icon: LucideIcon; label: string }[] = [
    { id: "rates", icon: Ship, label: t("tabs.rates") },
    { id: "tracking", icon: Compass, label: t("tabs.tracking") },
    { id: "air", icon: Plane, label: t("tabs.air") },
    { id: "schedules", icon: Calendar, label: t("tabs.schedules") },
    { id: "load", icon: Box, label: t("tabs.load") },
    { id: "quote", icon: FileText, label: t("tabs.quote") },
  ];

  // Arrow key navigation between tabs (WAI-ARIA Tabs pattern)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % tabsList.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabsList.length) % tabsList.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = tabsList.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      const targetTab = tabsList[nextIndex].id;
      setActiveTab(targetTab);
      const targetEl = document.getElementById(`tab-${targetTab}`);
      targetEl?.focus();
    }
  };

  // Handler for Rates Search
  const handleSearchRates = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingRates(true);
    setLiveAnnouncement(t("rates.searching"));
    setTimeout(() => {
      setIsSearchingRates(false);
      setRatesResult({
        origin,
        destination,
        mode: shippingMode.toUpperCase(),
        container: containerType,
        routes: MOCK_RATE_ROUTES,
      });
      setLiveAnnouncement(`Found ${MOCK_RATE_ROUTES.length} freight rates for ${origin} to ${destination}`);
    }, 600);
  };

  // Handler for Tracking Search
  const handleTrackShipment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    setLiveAnnouncement(t("tracking.tracking"));
    setTimeout(() => {
      setIsTracking(false);
      const result: TrackingResultData = {
        number: trackingNumber || "MSCU9842173",
        carrier: trackingCarrier,
        status: "In Transit - Ocean Voyage",
        eta: "Sep 12, 2026 (On Schedule)",
        vessel: "MSC GULSUN / 9283401",
        origin: "Antwerp-Bruges Gateway (BE)",
        destination: "Jebel Ali Main Port (AE)",
        currentCoords: "36°14'N 15°22'E (Central Mediterranean)",
        speed: "18.4 Knots",
        milestones: MOCK_TRACKING_MILESTONES,
      };
      setTrackingResult(result);
      setLiveAnnouncement(`Shipment status for ${result.number}: ${result.status}, ETA ${result.eta}`);
    }, 600);
  };

  // Calculate Load metrics
  const lengthNum = Number(boxLength) || 0;
  const widthNum = Number(boxWidth) || 0;
  const heightNum = Number(boxHeight) || 0;
  const qtyNum = Number(boxQuantity) || 1;
  const weightNum = Number(boxWeight) || 0;

  const cbmPerBox = (lengthNum * widthNum * heightNum) / 1000000;
  const totalCbm = (cbmPerBox * qtyNum).toFixed(2);
  const totalKg = (weightNum * qtyNum).toLocaleString();
  const maxCbm = loadContainer === "40_hc" ? 76.2 : loadContainer === "40_gp" ? 67.5 : 33.2;
  const maxWeightKg = loadContainer === "40_hc" ? 28600 : loadContainer === "40_gp" ? 26500 : 21700;
  const utilPercent = Math.min(100, Math.round((Number(totalCbm) / maxCbm) * 100));

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-card border border-border/80 shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Screen reader live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveAnnouncement}
      </div>

      {/* Top Navigation Tabs - Touch-scrollable with horizontal snap & keyboard navigation */}
      <div
        role="tablist"
        aria-label="Freight calculation and tracking tools"
        className="flex items-center overflow-x-auto scrollbar-none snap-x snap-mandatory flex-nowrap border-b border-border/80 bg-muted/40 p-1.5 sm:p-2 gap-1 sm:gap-1.5"
      >
        {tabsList.map((tab, idx) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              className={`shrink-0 snap-start flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer min-h-[42px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                  ? "bg-card text-primary shadow-xs border border-border/80 ring-1 ring-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <Icon size={16} className={`shrink-0 ${isSelected ? "text-primary" : ""}`} aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="p-3.5 sm:p-6 lg:p-7 outline-none"
      >
        {/* ========================================================= */}
        {/* TAB 1: LOGISTICS EXPLORER (FREIGHT RATES)                 */}
        {/* ========================================================= */}
        {activeTab === "rates" && (
          <form onSubmit={handleSearchRates} className="space-y-4 sm:space-y-5">
            {/* Mode selection pills */}
            <div
              role="radiogroup"
              aria-labelledby="rates-mode-label"
              className="flex flex-wrap items-center gap-1.5 sm:gap-2 pb-1 sm:pb-2"
            >
              <span id="rates-mode-label" className="text-xs font-semibold text-muted-foreground mr-1 shrink-0">
                {t("modeLabel")}
              </span>
              {(
                [
                  { id: "fcl", icon: Ship, label: t("modes.fcl") },
                  { id: "lcl", icon: Box, label: t("modes.lcl") },
                  { id: "air", icon: Plane, label: t("modes.air") },
                  { id: "land", icon: Truck, label: t("modes.land") },
                ] as const
              ).map(({ id, icon: ModeIcon, label }) => {
                const isChecked = shippingMode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={isChecked}
                    onClick={() => setShippingMode(id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isChecked
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <ModeIcon size={13} className="shrink-0" aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Responsive Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Origin */}
              <div className="min-w-0 space-y-1.5">
                <label htmlFor="rates-origin-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <MapPin size={13} className="text-primary shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("rates.originLabel")}</span>
                </label>
                <div className="relative min-w-0">
                  <input
                    id="rates-origin-input"
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Antwerp, Rotterdam, Shanghai"
                    autoComplete="off"
                    aria-required="true"
                    className={INPUT_BASE_CLASS}
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="min-w-0 space-y-1.5">
                <label htmlFor="rates-dest-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <MapPin size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("rates.destLabel")}</span>
                </label>
                <div className="relative min-w-0">
                  <input
                    id="rates-dest-input"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Jebel Ali, Hamburg, Alexandria"
                    autoComplete="off"
                    aria-required="true"
                    className={INPUT_BASE_CLASS}
                  />
                </div>
              </div>

              {/* Container Size / Cargo Type */}
              <div className="min-w-0 space-y-1.5">
                <label htmlFor="rates-container-select" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <SlidersHorizontal size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("rates.containerLabel")}</span>
                </label>
                <select
                  id="rates-container-select"
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value)}
                  className={SELECT_BASE_CLASS}
                >
                  <option value="20' Standard (20' GP)">20' Standard (20' GP)</option>
                  <option value="40' Standard (40' GP)">40' Standard (40' GP)</option>
                  <option value="40' High Cube (40' HC)">40' High Cube (40' HC)</option>
                  <option value="20' Reefer">20' Reefer</option>
                  <option value="40' Reefer HC">40' Reefer HC</option>
                  <option value="LCL (Per CBM / Ton)">LCL (Per CBM / Ton)</option>
                </select>
              </div>

              {/* Ready Date */}
              <div className="min-w-0 space-y-1.5">
                <label htmlFor="rates-date-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <Calendar size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("rates.dateLabel")}</span>
                </label>
                <input
                  id="rates-date-input"
                  type="date"
                  value={cargoReadyDate}
                  onChange={(e) => setCargoReadyDate(e.target.value)}
                  className={INPUT_BASE_CLASS}
                />
              </div>
            </div>

            {/* Quick Popular Corridors */}
            <div
              role="group"
              aria-label={t("rates.popular")}
              className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground pt-1"
            >
              <span className="font-semibold text-foreground shrink-0">{t("rates.popular")}</span>
              {POPULAR_CORRIDORS.map(([o, d], idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Set corridor ${o} to ${d}`}
                  onClick={() => {
                    const orig = `Port of ${o}`;
                    const dest = `Port of ${d}`;
                    setOrigin(orig);
                    setDestination(dest);
                    setLiveAnnouncement(`Selected corridor: ${orig} to ${dest}`);
                  }}
                  className="px-2.5 py-1 rounded-md bg-muted hover:bg-primary/10 hover:text-primary transition-colors font-medium shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  {o} → {d}
                </button>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-border/70">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 shrink-0">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{t("rates.aeo")}</span>
                </span>
                <span className="hidden sm:inline" aria-hidden="true">•</span>
                <span className="inline-flex items-center gap-1 shrink-0">
                  <Clock size={14} className="text-primary shrink-0" aria-hidden="true" />
                  <span>{t("rates.realtime")}</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSearchingRates}
                aria-busy={isSearchingRates}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-70"
              >
                {isSearchingRates ? (
                  <>
                    <RefreshCw size={16} className="animate-spin shrink-0" aria-hidden="true" />
                    <span>{t("rates.searching")}</span>
                  </>
                ) : (
                  <>
                    <Search size={16} className="shrink-0" aria-hidden="true" />
                    <span>{t("rates.searchButton")}</span>
                    <ArrowRight size={15} className="shrink-0" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            {/* Rates Result Showcase */}
            {ratesResult && (
              <section
                aria-label={t("rates.resultsTitle")}
                tabIndex={-1}
                className="mt-5 p-3.5 sm:p-5 rounded-2xl bg-muted/40 border border-primary/30 space-y-3.5 animate-fadeIn outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider">
                      {t("rates.resultsTitle")} • {ratesResult.mode}
                    </div>
                    <div className="text-sm font-extrabold text-foreground mt-0.5 break-words">
                      {ratesResult.origin} ➔ {ratesResult.destination}
                    </div>
                  </div>
                  <span className="self-start sm:self-auto text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold shrink-0">
                    {ratesResult.container}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {ratesResult.routes.map((route, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 hover:border-primary/50 transition-colors"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-sm font-bold text-foreground">
                            {route.carrier}
                          </strong>
                          {route.direct && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 shrink-0">
                              {t("rates.direct")}
                            </span>
                          )}
                          <span className="text-[11px] text-muted-foreground break-words">
                            {t("rates.vessel")}: {route.vessel}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="shrink-0">⏱️ {route.transitDays}</span>
                          <span aria-hidden="true">•</span>
                          <span className="shrink-0">🌱 CO₂: {route.co2}</span>
                          <span aria-hidden="true">•</span>
                          <span className="text-emerald-600 font-semibold shrink-0">{route.freeDays}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60 shrink-0">
                        <div className="text-left sm:text-right">
                          <div className="text-[11px] text-muted-foreground">{t("rates.rateLabel")}</div>
                          <div className="text-base sm:text-lg font-extrabold text-primary font-mono">
                            {route.rateRange}
                          </div>
                        </div>

                        <Link
                          href={`/contact?origin=${encodeURIComponent(ratesResult.origin)}&destination=${encodeURIComponent(ratesResult.destination)}&mode=${ratesResult.mode}&carrier=${encodeURIComponent(route.carrier)}`}
                          aria-label={`${t("rates.book")} with ${route.carrier} (${route.rateRange})`}
                          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:opacity-90 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        >
                          {t("rates.book")}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </form>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TRACKING SYSTEM                                    */}
        {/* ========================================================= */}
        {activeTab === "tracking" && (
          <form onSubmit={handleTrackShipment} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">
              <div className="min-w-0 md:col-span-7 space-y-1.5">
                <label htmlFor="tracking-num-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug break-words">
                  <Compass size={13} className="text-primary shrink-0" aria-hidden="true" />
                  <span>{t("tracking.numberLabel")}</span>
                </label>
                <input
                  id="tracking-num-input"
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder={t("tracking.placeholder")}
                  autoComplete="off"
                  aria-required="true"
                  className={`${INPUT_BASE_CLASS} font-mono`}
                />
              </div>

              <div className="min-w-0 md:col-span-5 space-y-1.5">
                <label htmlFor="tracking-carrier-select" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <Ship size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("tracking.carrierLabel")}</span>
                </label>
                <select
                  id="tracking-carrier-select"
                  value={trackingCarrier}
                  onChange={(e) => setTrackingCarrier(e.target.value)}
                  className={SELECT_BASE_CLASS}
                >
                  <option value="Auto-Detect Carrier">{t("tracking.allCarriers")}</option>
                  <option value="MSC - Mediterranean Shipping Co">MSC - Mediterranean Shipping Co</option>
                  <option value="Maersk Line">Maersk Line</option>
                  <option value="CMA CGM Group">CMA CGM Group</option>
                  <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                  <option value="COSCO Shipping">COSCO Shipping</option>
                  <option value="ONE - Ocean Network Express">ONE - Ocean Network Express</option>
                  <option value="Evergreen Marine">Evergreen Marine</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{t("tracking.radarFeed")}</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={isTracking}
                aria-busy={isTracking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-70"
              >
                {isTracking ? (
                  <>
                    <RefreshCw size={16} className="animate-spin shrink-0" aria-hidden="true" />
                    <span>{t("tracking.tracking")}</span>
                  </>
                ) : (
                  <>
                    <Search size={16} className="shrink-0" aria-hidden="true" />
                    <span>{t("tracking.trackButton")}</span>
                    <ArrowRight size={15} className="shrink-0" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            {/* Tracking Result View */}
            {trackingResult && (
              <section
                aria-label={t("tracking.resultsTitle")}
                tabIndex={-1}
                className="mt-5 p-3.5 sm:p-6 rounded-2xl bg-muted/40 border border-border space-y-5 animate-fadeIn outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-base sm:text-lg font-mono font-extrabold text-foreground">
                        {trackingResult.number}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                        {trackingResult.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 break-words">
                      {t("tracking.carrierShort")}: {trackingResult.carrier} • {t("tracking.vesselShort")}: {trackingResult.vessel}
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-xs text-muted-foreground">{t("tracking.eta")}</div>
                    <div className="text-sm font-bold text-emerald-600 font-mono">
                      {trackingResult.eta}
                    </div>
                  </div>
                </div>

                {/* Progress Milestones Timeline - Responsive 1 to 6 columns */}
                <ol
                  aria-label="Shipment milestone progression"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 list-none p-0"
                >
                  {trackingResult.milestones.map((m, idx) => (
                    <li
                      key={idx}
                      aria-current={m.current ? "step" : undefined}
                      className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 min-w-0 ${
                        m.current
                          ? "bg-primary/10 border-primary shadow-xs ring-1 ring-primary/20"
                          : m.done
                            ? "bg-card border-border/80"
                            : "bg-muted/20 border-border/40 opacity-70"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground">
                          0{idx + 1}
                        </span>
                        {m.done ? (
                          <CheckCircle2 size={15} className="text-emerald-500 shrink-0" aria-label="Completed" />
                        ) : m.current ? (
                          <span className="relative flex h-2 w-2 shrink-0" aria-label="Current stage">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                          </span>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-border shrink-0" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-foreground leading-snug break-words">
                          {m.label}
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate mt-0.5" title={m.location}>
                          {m.location}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground/80">
                        {m.date}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </form>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AIR CARGO                                          */}
        {/* ========================================================= */}
        {activeTab === "air" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
              <div className="min-w-0 space-y-1.5">
                <label htmlFor="air-origin-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <Plane size={13} className="text-primary shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("air.originLabel")}</span>
                </label>
                <input
                  id="air-origin-input"
                  type="text"
                  value={airOrigin}
                  onChange={(e) => setAirOrigin(e.target.value)}
                  placeholder="e.g. Brussels (BRU), Amsterdam (AMS)"
                  autoComplete="off"
                  className={INPUT_BASE_CLASS}
                />
              </div>

              <div className="min-w-0 space-y-1.5">
                <label htmlFor="air-dest-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <MapPin size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("air.destLabel")}</span>
                </label>
                <input
                  id="air-dest-input"
                  type="text"
                  value={airDest}
                  onChange={(e) => setAirDest(e.target.value)}
                  placeholder="e.g. Dubai (DXB), New York (JFK)"
                  autoComplete="off"
                  className={INPUT_BASE_CLASS}
                />
              </div>

              <div className="min-w-0 space-y-1.5">
                <label htmlFor="air-weight-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <Box size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("air.weightLabel")}</span>
                </label>
                <input
                  id="air-weight-input"
                  type="number"
                  value={airWeight}
                  onChange={(e) => setAirWeight(e.target.value)}
                  className={INPUT_BASE_CLASS}
                />
              </div>

              <div className="min-w-0 space-y-1.5">
                <label htmlFor="air-awb-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <FileText size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("air.awbLabel")}</span>
                </label>
                <input
                  id="air-awb-input"
                  type="text"
                  value={airAwb}
                  onChange={(e) => setAirAwb(e.target.value)}
                  placeholder="020-12345678"
                  autoComplete="off"
                  className={`${INPUT_BASE_CLASS} font-mono`}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs text-muted-foreground break-words">
                {t("air.tagline")}
              </span>
              <Link
                href={`/contact?mode=AIR&origin=${encodeURIComponent(airOrigin)}&dest=${encodeURIComponent(airDest)}&weight=${airWeight}`}
                aria-label={t("air.instantQuote")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>{t("air.instantQuote")}</span>
                <ArrowRight size={15} className="shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SHIP SCHEDULES                                     */}
        {/* ========================================================= */}
        {activeTab === "schedules" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              <div className="min-w-0 sm:col-span-1 space-y-1.5">
                <label htmlFor="sched-origin-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <Anchor size={13} className="text-primary shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("schedules.originLabel")}</span>
                </label>
                <input
                  id="sched-origin-input"
                  type="text"
                  value={schedOrigin}
                  onChange={(e) => setSchedOrigin(e.target.value)}
                  autoComplete="off"
                  className={INPUT_BASE_CLASS}
                />
              </div>

              <div className="min-w-0 sm:col-span-1 space-y-1.5">
                <label htmlFor="sched-dest-input" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <Anchor size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("schedules.destLabel")}</span>
                </label>
                <input
                  id="sched-dest-input"
                  type="text"
                  value={schedDest}
                  onChange={(e) => setSchedDest(e.target.value)}
                  autoComplete="off"
                  className={INPUT_BASE_CLASS}
                />
              </div>

              <div className="min-w-0 sm:col-span-2 lg:col-span-1 space-y-1.5">
                <label htmlFor="sched-carrier-select" className="text-xs font-bold text-foreground flex items-center gap-1.5 leading-snug">
                  <Ship size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                  <span className="whitespace-normal">{t("schedules.carrierLabel")}</span>
                </label>
                <select
                  id="sched-carrier-select"
                  value={schedCarrier}
                  onChange={(e) => setSchedCarrier(e.target.value)}
                  className={SELECT_BASE_CLASS}
                >
                  <option value="All Carriers">{t("schedules.allCarriers")}</option>
                  <option value="MSC">MSC Shipping</option>
                  <option value="Maersk">Maersk Line</option>
                  <option value="CMA CGM">CMA CGM</option>
                  <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs text-muted-foreground break-words">
                {t("schedules.hourlyTagline")}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSchedResult(MOCK_SAILING_SCHEDULES);
                  setLiveAnnouncement(`Found ${MOCK_SAILING_SCHEDULES.length} scheduled sailings`);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>{t("schedules.searchButton")}</span>
                <ArrowRight size={15} className="shrink-0" aria-hidden="true" />
              </button>
            </div>

            {schedResult && (
              <ul aria-label="Available sailing schedules" className="mt-4 space-y-2 animate-fadeIn list-none p-0">
                {schedResult.map((item, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs"
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
                      <strong className="font-bold text-foreground text-sm shrink-0">{item.carrier}</strong>
                      <span className="text-muted-foreground truncate">{item.vessel}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 font-mono">
                      <span className="shrink-0">{t("schedules.cutoff")}: <strong className="text-foreground">{item.polCutoff}</strong></span>
                      <span className="shrink-0">{t("schedules.etd")}: <strong className="text-primary">{item.etd}</strong></span>
                      <span className="shrink-0">{t("schedules.eta")}: <strong className="text-emerald-600">{item.eta}</strong></span>
                      <span className="font-sans font-semibold px-2 py-0.5 rounded bg-muted shrink-0">
                        {item.transit}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: LOAD CALCULATOR                                    */}
        {/* ========================================================= */}
        {activeTab === "load" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
              <div className="min-w-0 space-y-1">
                <label htmlFor="load-box-length" className="text-[11px] font-bold text-foreground block whitespace-normal" title={t("load.length")}>
                  {t("load.length")}
                </label>
                <input
                  id="load-box-length"
                  type="number"
                  value={boxLength}
                  onChange={(e) => setBoxLength(e.target.value)}
                  className="w-full min-w-0 h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <label htmlFor="load-box-width" className="text-[11px] font-bold text-foreground block whitespace-normal" title={t("load.width")}>
                  {t("load.width")}
                </label>
                <input
                  id="load-box-width"
                  type="number"
                  value={boxWidth}
                  onChange={(e) => setBoxWidth(e.target.value)}
                  className="w-full min-w-0 h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <label htmlFor="load-box-height" className="text-[11px] font-bold text-foreground block whitespace-normal" title={t("load.height")}>
                  {t("load.height")}
                </label>
                <input
                  id="load-box-height"
                  type="number"
                  value={boxHeight}
                  onChange={(e) => setBoxHeight(e.target.value)}
                  className="w-full min-w-0 h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <label htmlFor="load-box-weight" className="text-[11px] font-bold text-foreground block whitespace-normal" title={t("load.weight")}>
                  {t("load.weight")}
                </label>
                <input
                  id="load-box-weight"
                  type="number"
                  value={boxWeight}
                  onChange={(e) => setBoxWeight(e.target.value)}
                  className="w-full min-w-0 h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <label htmlFor="load-box-qty" className="text-[11px] font-bold text-foreground block whitespace-normal" title={t("load.quantity")}>
                  {t("load.quantity")}
                </label>
                <input
                  id="load-box-qty"
                  type="number"
                  value={boxQuantity}
                  onChange={(e) => setBoxQuantity(e.target.value)}
                  className="w-full min-w-0 h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="min-w-0 space-y-1">
                <label htmlFor="load-container-type" className="text-[11px] font-bold text-foreground block whitespace-normal" title={t("load.container")}>
                  {t("load.container")}
                </label>
                <select
                  id="load-container-type"
                  value={loadContainer}
                  onChange={(e) => setLoadContainer(e.target.value)}
                  className="w-full min-w-0 max-w-full h-10 px-2 rounded-lg bg-muted/40 border border-border text-xs font-semibold text-foreground truncate focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="40_hc">40' High Cube (76.2 CBM)</option>
                  <option value="40_gp">40' Standard (67.5 CBM)</option>
                  <option value="20_gp">20' Standard (33.2 CBM)</option>
                </select>
              </div>
            </div>

            {/* Visual Stuffing Utilization Bar */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-muted/40 border border-border/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-foreground flex items-center gap-1.5 shrink-0">
                  <Box size={14} className="text-primary shrink-0" aria-hidden="true" />
                  <span>{t("load.utilization")}</span>
                </span>
                <span className="text-primary font-mono">{utilPercent}% {t("load.full")}</span>
              </div>

              <div
                role="progressbar"
                aria-valuenow={utilPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t("load.utilization")}
                aria-valuetext={`${utilPercent}% capacity utilized`}
                className="w-full h-3.5 rounded-full bg-muted overflow-hidden"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-500 transition-all duration-500"
                  style={{ width: `${utilPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div className="min-w-0">
                  <span className="text-muted-foreground block text-[10px] truncate">{t("load.totalVol")}</span>
                  <strong className="text-foreground font-mono block truncate">{totalCbm} CBM</strong>
                </div>
                <div className="min-w-0">
                  <span className="text-muted-foreground block text-[10px] truncate">{t("load.totalWt")}</span>
                  <strong className="text-foreground font-mono block truncate">{totalKg} kg</strong>
                </div>
                <div className="min-w-0">
                  <span className="text-muted-foreground block text-[10px] truncate">{t("load.remaining")}</span>
                  <strong className="text-emerald-600 font-mono block truncate">
                    {Math.max(0, maxCbm - Number(totalCbm)).toFixed(2)} CBM
                  </strong>
                </div>
                <div className="min-w-0">
                  <span className="text-muted-foreground block text-[10px] truncate">{t("load.maxPayload")}</span>
                  <strong className="text-foreground font-mono block truncate">{maxWeightKg.toLocaleString()} kg</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: REQUEST A QUOTE                                    */}
        {/* ========================================================= */}
        {activeTab === "quote" && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground leading-relaxed break-words">
              {t("quote.description")}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="min-w-0 space-y-1">
                <label htmlFor="quote-pickup-input" className="text-xs font-bold text-foreground block whitespace-normal">
                  {t("quote.pickup")}
                </label>
                <input
                  id="quote-pickup-input"
                  type="text"
                  placeholder={t("quote.pickupPlaceholder")}
                  autoComplete="off"
                  className={INPUT_BASE_CLASS}
                />
              </div>
              <div className="min-w-0 space-y-1">
                <label htmlFor="quote-delivery-input" className="text-xs font-bold text-foreground block whitespace-normal">
                  {t("quote.delivery")}
                </label>
                <input
                  id="quote-delivery-input"
                  type="text"
                  placeholder={t("quote.deliveryPlaceholder")}
                  autoComplete="off"
                  className={INPUT_BASE_CLASS}
                />
              </div>
              <div className="min-w-0 sm:col-span-2 lg:col-span-1 space-y-1">
                <label htmlFor="quote-cargo-input" className="text-xs font-bold text-foreground block whitespace-normal">
                  {t("quote.cargo")}
                </label>
                <input
                  id="quote-cargo-input"
                  type="text"
                  placeholder={t("quote.cargoPlaceholder")}
                  autoComplete="off"
                  className={INPUT_BASE_CLASS}
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <Link
                href="/contact"
                aria-label={t("quote.button")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span>{t("quote.button")}</span>
                <ArrowRight size={15} className="shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
