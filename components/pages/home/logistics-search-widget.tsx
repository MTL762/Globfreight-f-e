"use client";

import { useState } from "react";
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
  RefreshCw
} from "lucide-react";
import { Link } from "@/i18n/navigation";

export function LogisticsSearchWidget() {
  const [activeTab, setActiveTab] = useState<
    "rates" | "tracking" | "air" | "schedules" | "load" | "quote"
  >("rates");

  // Rates State
  const [shippingMode, setShippingMode] = useState<"fcl" | "lcl" | "air" | "land">("fcl");
  const [origin, setOrigin] = useState("Port of Antwerp (BEANR)");
  const [destination, setDestination] = useState("Port of Jebel Ali (AEJEA)");
  const [containerType, setContainerType] = useState("40' High Cube (40' HC)");
  const [cargoReadyDate, setCargoReadyDate] = useState("2026-09-05");
  const [isSearchingRates, setIsSearchingRates] = useState(false);
  const [ratesResult, setRatesResult] = useState<any>(null);

  // Tracking State
  const [trackingNumber, setTrackingNumber] = useState("MSCU9842173");
  const [trackingCarrier, setTrackingCarrier] = useState("MSC - Mediterranean Shipping Co");
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  // Air Cargo State
  const [airAwb, setAirAwb] = useState("020-84729104");
  const [airOrigin, setAirOrigin] = useState("Brussels Airport (BRU)");
  const [airDest, setAirDest] = useState("Dubai International (DXB)");
  const [airWeight, setAirWeight] = useState("450");

  // Schedules State
  const [schedOrigin, setSchedOrigin] = useState("Port of Rotterdam (NLRTM)");
  const [schedDest, setSchedDest] = useState("Port of Shanghai (CNSHA)");
  const [schedCarrier, setSchedCarrier] = useState("All Carriers");
  const [schedResult, setSchedResult] = useState<any>(null);

  // Load Calculator State
  const [boxLength, setBoxLength] = useState("120");
  const [boxWidth, setBoxWidth] = useState("80");
  const [boxHeight, setBoxHeight] = useState("100");
  const [boxWeight, setBoxWeight] = useState("250");
  const [boxQuantity, setBoxQuantity] = useState("32");
  const [loadContainer, setLoadContainer] = useState("40_hc");

  // Handler for Rates Search
  const handleSearchRates = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchingRates(true);
    setTimeout(() => {
      setIsSearchingRates(false);
      setRatesResult({
        origin,
        destination,
        mode: shippingMode.toUpperCase(),
        container: containerType,
        routes: [
          {
            carrier: "MSC Shipping",
            transitDays: "18 - 22 Days",
            vessel: "MSC TINA / Voy 2408W",
            rateRange: "$1,850 - $2,100",
            direct: true,
            co2: "1.42 tons",
            validUntil: "Sep 30, 2026",
            freeDays: "14 Days Demurrage-Free"
          },
          {
            carrier: "Maersk Line",
            transitDays: "20 - 24 Days",
            vessel: "MAERSK MC-KINNEY / Voy 112E",
            rateRange: "$1,920 - $2,180",
            direct: true,
            co2: "1.38 tons",
            validUntil: "Sep 28, 2026",
            freeDays: "12 Days Demurrage-Free"
          },
          {
            carrier: "CMA CGM",
            transitDays: "21 - 25 Days",
            vessel: "CMA CGM ANTOINE / Voy 8810",
            rateRange: "$1,790 - $2,050",
            direct: false,
            co2: "1.55 tons",
            validUntil: "Oct 05, 2026",
            freeDays: "10 Days Demurrage-Free"
          }
        ]
      });
    }, 600);
  };

  // Handler for Tracking Search
  const handleTrackShipment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      setTrackingResult({
        number: trackingNumber || "MSCU9842173",
        carrier: trackingCarrier,
        status: "In Transit - Ocean Voyage",
        eta: "Sep 12, 2026 (On Schedule)",
        vessel: "MSC GULSUN / 9283401",
        origin: "Antwerp-Bruges Gateway (BE)",
        destination: "Jebel Ali Main Port (AE)",
        currentCoords: "36°14'N 15°22'E (Central Mediterranean)",
        speed: "18.4 Knots",
        milestones: [
          { label: "Gate In & Customs Filing", location: "Antwerp DP World", date: "Aug 26, 09:30", done: true },
          { label: "Loaded on Vessel", location: "MSC Gulsun", date: "Aug 27, 18:45", done: true },
          { label: "Vessel Departed", location: "Port of Antwerp", date: "Aug 28, 04:15", done: true },
          { label: "Transit Port Call", location: "Port Said East", date: "Sep 05, 14:00", current: true },
          { label: "Discharge at Dest.", location: "Jebel Ali Terminal 2", date: "Sep 12, 08:00", done: false },
          { label: "Customs Clear & Out for Delivery", location: "Bonded Corridor", date: "Sep 13, 11:00", done: false }
        ]
      });
    }, 600);
  };

  // Calculate Load metrics
  const cbmPerBox = (Number(boxLength) * Number(boxWidth) * Number(boxHeight)) / 1000000;
  const totalCbm = (cbmPerBox * Number(boxQuantity || 1)).toFixed(2);
  const totalKg = (Number(boxWeight || 0) * Number(boxQuantity || 1)).toLocaleString();
  const maxCbm = loadContainer === "40_hc" ? 76.2 : loadContainer === "40_gp" ? 67.5 : 33.2;
  const maxWeightKg = loadContainer === "40_hc" ? 28600 : loadContainer === "40_gp" ? 26500 : 21700;
  const utilPercent = Math.min(100, Math.round((Number(totalCbm) / maxCbm) * 100));

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl bg-card border border-border/80 shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Top SeaRates Navigation Tabs */}
      <div className="flex items-center overflow-x-auto border-b border-border/80 bg-muted/40 p-1.5 sm:p-2 gap-1 sm:gap-1.5 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("rates")}
          className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "rates"
              ? "bg-card text-primary shadow-xs border border-border/80 ring-1 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <Ship size={16} className={activeTab === "rates" ? "text-primary" : ""} />
          <span>Logistics Explorer</span>
          <span className="hidden md:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
            Rates
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("tracking")}
          className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "tracking"
              ? "bg-card text-primary shadow-xs border border-border/80 ring-1 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <Compass size={16} className={activeTab === "tracking" ? "text-primary" : ""} />
          <span>Tracking System</span>
          <span className="hidden md:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold">
            Live AIS
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("air")}
          className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "air"
              ? "bg-card text-primary shadow-xs border border-border/80 ring-1 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <Plane size={16} className={activeTab === "air" ? "text-primary" : ""} />
          <span>Air Cargo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("schedules")}
          className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "schedules"
              ? "bg-card text-primary shadow-xs border border-border/80 ring-1 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <Calendar size={16} className={activeTab === "schedules" ? "text-primary" : ""} />
          <span>Ship Schedules</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("load")}
          className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "load"
              ? "bg-card text-primary shadow-xs border border-border/80 ring-1 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <Box size={16} className={activeTab === "load" ? "text-primary" : ""} />
          <span>Load Calculator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("quote")}
          className={`flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "quote"
              ? "bg-card text-primary shadow-xs border border-border/80 ring-1 ring-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <FileText size={16} className={activeTab === "quote" ? "text-primary" : ""} />
          <span>Request a Quote</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-4 sm:p-6 lg:p-7">
        {/* TAB 1: LOGISTICS EXPLORER (FREIGHT RATES) */}
        {activeTab === "rates" && (
          <form onSubmit={handleSearchRates} className="space-y-5">
            {/* Mode selection pills */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs font-semibold text-muted-foreground mr-1">Transport Mode:</span>
              <button
                type="button"
                onClick={() => setShippingMode("fcl")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  shippingMode === "fcl"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Ship size={13} />
                <span>Full Container (FCL)</span>
              </button>
              <button
                type="button"
                onClick={() => setShippingMode("lcl")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  shippingMode === "lcl"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Box size={13} />
                <span>Less than Container (LCL)</span>
              </button>
              <button
                type="button"
                onClick={() => setShippingMode("air")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  shippingMode === "air"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Plane size={13} />
                <span>Air Cargo</span>
              </button>
              <button
                type="button"
                onClick={() => setShippingMode("land")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  shippingMode === "land"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Truck size={13} />
                <span>Inland Drayage</span>
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">
              {/* Origin */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <MapPin size={13} className="text-primary" />
                  <span>Origin Port / City</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Antwerp, Rotterdam, Shanghai"
                    className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                  />
                </div>
              </div>

              {/* Destination */}
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-500" />
                  <span>Destination Port / City</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Jebel Ali, Hamburg, Alexandria"
                    className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                  />
                </div>
              </div>

              {/* Container Size / Cargo Type */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <SlidersHorizontal size={13} className="text-muted-foreground" />
                  <span>Equipment / Size</span>
                </label>
                <select
                  value={containerType}
                  onChange={(e) => setContainerType(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
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
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Calendar size={13} className="text-muted-foreground" />
                  <span>Ready to Load</span>
                </label>
                <input
                  type="date"
                  value={cargoReadyDate}
                  onChange={(e) => setCargoReadyDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>
            </div>

            {/* Quick Popular Corridors */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground pt-1">
              <span className="font-semibold text-foreground">Popular Trade Corridors:</span>
              {[
                ["Antwerp", "Jebel Ali"],
                ["Rotterdam", "Shanghai"],
                ["Ningbo", "Hamburg"],
                ["Alexandria", "Antwerp"]
              ].map(([o, d], idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setOrigin(`Port of ${o}`);
                    setDestination(`Port of ${d}`);
                  }}
                  className="px-2.5 py-1 rounded-md bg-muted hover:bg-primary/10 hover:text-primary transition-colors font-medium cursor-pointer"
                >
                  {o} → {d}
                </button>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border/70">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>AEO-F Customs Guaranteed</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} className="text-primary" />
                  <span>Real-Time Spot & Contract Rates</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSearchingRates}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
              >
                {isSearchingRates ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Searching Rates...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Search Freight Rates</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

            {/* Rates Result Showcase */}
            {ratesResult && (
              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-muted/40 border border-primary/30 space-y-3.5 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-border/80 pb-3">
                  <div>
                    <div className="text-xs font-bold text-primary uppercase tracking-wider">
                      Live Freight Quotations • {ratesResult.mode}
                    </div>
                    <div className="text-sm font-extrabold text-foreground mt-0.5">
                      {ratesResult.origin} ➔ {ratesResult.destination}
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
                    {ratesResult.container}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {ratesResult.routes.map((route: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-card border border-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-primary/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm font-bold text-foreground">
                            {route.carrier}
                          </strong>
                          {route.direct && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                              Direct Sailing
                            </span>
                          )}
                          <span className="text-[11px] text-muted-foreground">
                            Vessel: {route.vessel}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>⏱️ {route.transitDays}</span>
                          <span>•</span>
                          <span>🌱 CO₂: {route.co2}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-semibold">{route.freeDays}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Est. Freight Rate</div>
                          <div className="text-base sm:text-lg font-extrabold text-primary font-mono">
                            {route.rateRange}
                          </div>
                        </div>

                        <Link
                          href={`/contact?origin=${encodeURIComponent(ratesResult.origin)}&destination=${encodeURIComponent(ratesResult.destination)}&mode=${ratesResult.mode}&carrier=${encodeURIComponent(route.carrier)}`}
                          className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:opacity-90 transition-all shrink-0"
                        >
                          Book Rate
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        )}

        {/* TAB 2: TRACKING SYSTEM */}
        {activeTab === "tracking" && (
          <form onSubmit={handleTrackShipment} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">
              <div className="md:col-span-7 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Compass size={13} className="text-primary" />
                  <span>Container Number / Bill of Lading (B/L) / Booking Reference</span>
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. MSCU9842173, MAEU1029384, MEDU8472910"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-mono font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>

              <div className="md:col-span-5 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Ship size={13} className="text-muted-foreground" />
                  <span>Shipping Line / Carrier</span>
                </label>
                <select
                  value={trackingCarrier}
                  onChange={(e) => setTrackingCarrier(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                >
                  <option value="Auto-Detect Carrier">Auto-Detect Carrier (150+ Lines)</option>
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

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Direct AIS Vessel Radar & Port API Feeds</span>
                </span>
              </div>

              <button
                type="submit"
                disabled={isTracking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
              >
                {isTracking ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Tracking Container...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Track Shipment</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

            {/* Tracking Result View */}
            {trackingResult && (
              <div className="mt-5 p-4 sm:p-6 rounded-2xl bg-muted/40 border border-border space-y-5 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-mono font-extrabold text-foreground">
                        {trackingResult.number}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {trackingResult.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Carrier: {trackingResult.carrier} • Vessel: {trackingResult.vessel}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs text-muted-foreground">Predictive Arrival (ETA)</div>
                    <div className="text-sm font-bold text-emerald-600 font-mono">
                      {trackingResult.eta}
                    </div>
                  </div>
                </div>

                {/* Progress Milestones Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {trackingResult.milestones.map((m: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex flex-col justify-between space-y-2 ${
                        m.current
                          ? "bg-primary/10 border-primary shadow-xs"
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
                          <CheckCircle2 size={15} className="text-emerald-500" />
                        ) : m.current ? (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                          </span>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-border" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-foreground leading-snug">
                          {m.label}
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate mt-0.5">
                          {m.location}
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground/80">
                        {m.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        )}

        {/* TAB 3: AIR CARGO */}
        {activeTab === "air" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Plane size={13} className="text-primary" />
                  <span>Departure Airport</span>
                </label>
                <input
                  type="text"
                  value={airOrigin}
                  onChange={(e) => setAirOrigin(e.target.value)}
                  placeholder="e.g. Brussels (BRU), Amsterdam (AMS)"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-500" />
                  <span>Destination Airport</span>
                </label>
                <input
                  type="text"
                  value={airDest}
                  onChange={(e) => setAirDest(e.target.value)}
                  placeholder="e.g. Dubai (DXB), New York (JFK)"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Box size={13} className="text-muted-foreground" />
                  <span>Gross Weight (kg)</span>
                </label>
                <input
                  type="number"
                  value={airWeight}
                  onChange={(e) => setAirWeight(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <FileText size={13} className="text-muted-foreground" />
                  <span>Airway Bill (AWB)</span>
                </label>
                <input
                  type="text"
                  value={airAwb}
                  onChange={(e) => setAirAwb(e.target.value)}
                  placeholder="020-12345678"
                  className="w-full h-11 px-3 rounded-xl bg-muted/40 border border-border text-xs sm:text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                Express IATA scheduled air freight & chartered cargo
              </span>
              <Link
                href={`/contact?mode=AIR&origin=${encodeURIComponent(airOrigin)}&dest=${encodeURIComponent(airDest)}&weight=${airWeight}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-all"
              >
                <span>Get Instant Air Quote</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: SHIP SCHEDULES */}
        {activeTab === "schedules" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4">
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Anchor size={13} className="text-primary" />
                  <span>Port of Loading (POL)</span>
                </label>
                <input
                  type="text"
                  value={schedOrigin}
                  onChange={(e) => setSchedOrigin(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Anchor size={13} className="text-emerald-500" />
                  <span>Port of Discharge (POD)</span>
                </label>
                <input
                  type="text"
                  value={schedDest}
                  onChange={(e) => setSchedDest(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                />
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Ship size={13} className="text-muted-foreground" />
                  <span>Shipping Line</span>
                </label>
                <select
                  value={schedCarrier}
                  onChange={(e) => setSchedCarrier(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-background transition-all"
                >
                  <option value="All Carriers">All Carriers (Aggregated Timetable)</option>
                  <option value="MSC">MSC Shipping</option>
                  <option value="Maersk">Maersk Line</option>
                  <option value="CMA CGM">CMA CGM</option>
                  <option value="Hapag-Lloyd">Hapag-Lloyd</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                Sailing schedules updated hourly with live terminal cutoffs
              </span>
              <button
                type="button"
                onClick={() =>
                  setSchedResult([
                    { carrier: "MSC", vessel: "MSC AMALFI", polCutoff: "Sep 03", etd: "Sep 05", eta: "Sep 24", transit: "19 Days" },
                    { carrier: "Maersk", vessel: "MAERSK HANOI", polCutoff: "Sep 06", etd: "Sep 08", eta: "Sep 28", transit: "20 Days" },
                    { carrier: "CMA CGM", vessel: "CMA CGM JACQUES", polCutoff: "Sep 09", etd: "Sep 11", eta: "Oct 01", transit: "20 Days" }
                  ])
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-all cursor-pointer"
              >
                <span>Find Sailing Schedules</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {schedResult && (
              <div className="mt-4 space-y-2 animate-fadeIn">
                {schedResult.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-card border border-border/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <strong className="font-bold text-foreground text-sm">{item.carrier}</strong>
                      <span className="text-muted-foreground">{item.vessel}</span>
                    </div>
                    <div className="flex items-center gap-4 font-mono">
                      <span>Cutoff: <strong className="text-foreground">{item.polCutoff}</strong></span>
                      <span>ETD: <strong className="text-primary">{item.etd}</strong></span>
                      <span>ETA: <strong className="text-emerald-600">{item.eta}</strong></span>
                      <span className="font-sans font-semibold px-2 py-0.5 rounded bg-muted">
                        {item.transit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: LOAD CALCULATOR */}
        {activeTab === "load" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Length (cm)</label>
                <input
                  type="number"
                  value={boxLength}
                  onChange={(e) => setBoxLength(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Width (cm)</label>
                <input
                  type="number"
                  value={boxWidth}
                  onChange={(e) => setBoxWidth(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Height (cm)</label>
                <input
                  type="number"
                  value={boxHeight}
                  onChange={(e) => setBoxHeight(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Weight/Box (kg)</label>
                <input
                  type="number"
                  value={boxWeight}
                  onChange={(e) => setBoxWeight(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Quantity (Pcs)</label>
                <input
                  type="number"
                  value={boxQuantity}
                  onChange={(e) => setBoxQuantity(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-muted/40 border border-border text-sm font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground">Container Type</label>
                <select
                  value={loadContainer}
                  onChange={(e) => setLoadContainer(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg bg-muted/40 border border-border text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="40_hc">40' High Cube (76.2 CBM)</option>
                  <option value="40_gp">40' Standard (67.5 CBM)</option>
                  <option value="20_gp">20' Standard (33.2 CBM)</option>
                </select>
              </div>
            </div>

            {/* Visual Stuffing Utilization Bar */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-foreground flex items-center gap-1.5">
                  <Box size={14} className="text-primary" />
                  <span>3D Container Volume Utilization</span>
                </span>
                <span className="text-primary font-mono">{utilPercent}% Full</span>
              </div>

              <div className="w-full h-3.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-orange-500 transition-all duration-500"
                  style={{ width: `${utilPercent}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div>
                  <span className="text-muted-foreground block text-[10px]">Total Cargo Volume</span>
                  <strong className="text-foreground font-mono">{totalCbm} CBM</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Total Cargo Weight</span>
                  <strong className="text-foreground font-mono">{totalKg} kg</strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Remaining CBM Space</span>
                  <strong className="text-emerald-600 font-mono">
                    {Math.max(0, maxCbm - Number(totalCbm)).toFixed(2)} CBM
                  </strong>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px]">Max Payload Limit</span>
                  <strong className="text-foreground font-mono">{maxWeightKg.toLocaleString()} kg</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: REQUEST A QUOTE */}
        {activeTab === "quote" && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground">
              Submit custom cargo specs for specialized, project, reefer, or hazardous goods. Our certified forwarders provide direct quotes in &lt; 2 hours.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Pickup Location</label>
                <input
                  type="text"
                  placeholder="City, ZIP, or Seaport"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Delivery Destination</label>
                <input
                  type="text"
                  placeholder="Final City or Facility"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Cargo Description & Special Handling</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Pallets, Temp-Controlled, ADR"
                  className="w-full h-11 px-3.5 rounded-xl bg-muted/40 border border-border text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-all"
              >
                <span>Proceed with Custom Quote</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
