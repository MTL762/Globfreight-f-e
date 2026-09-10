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
import { useTranslations } from "next-intl";

export function DigitalSolutionsShowcase() {
  const t = useTranslations("LandingPage.solutions");
  const [activeTab, setActiveTab] = useState<"tracking" | "rates" | "load" | "customs">("tracking");

  return (
    <section className="py-16 sm:py-24 bg-muted/20 border-b border-border/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Cpu size={13} />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t("subtitle")}
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
              <span>{t("tabs.tracking")}</span>
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
              <span>{t("tabs.rates")}</span>
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
              <span>{t("tabs.load")}</span>
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
              <span>{t("tabs.customs")}</span>
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
                  <span>{t("tabs.tracking")}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {t("trackingTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("trackingDesc")}
                </p>

                <div className="space-y-3">
                  {[
                    t("trackingPoint1"),
                    t("trackingPoint2"),
                    t("trackingPoint3")
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
                    <span>{t("viewDetails")}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-4 shadow-inner">
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
                      <span className="text-muted-foreground">Coordinates:</span>
                      <span className="font-mono font-bold text-foreground">36°14'N 15°22'E (Central Med)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Next Waypoint:</span>
                      <span className="font-mono font-bold text-foreground">Port Said East (Sep 05)</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Destination ETA:</span>
                      <span className="font-mono font-bold text-emerald-600">Jebel Ali (Sep 12)</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between text-xs">
                    <span className="font-bold text-primary">Customs Pre-Arrival:</span>
                    <span className="font-mono font-bold text-foreground">EDI Declaration Ingress Ready</span>
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
                  <span>{t("tabs.rates")}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {t("ratesTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("ratesDesc")}
                </p>

                <div className="space-y-3">
                  {[
                    t("ratesPoint1"),
                    t("ratesPoint2"),
                    t("ratesPoint3")
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
                    <span>{t("requestDemo")}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3">
                  <div className="p-4 rounded-xl bg-card border border-border/70 space-y-2.5">
                    <div className="flex justify-between text-xs font-bold text-muted-foreground border-b pb-2">
                      <span>Base Ocean Freight (40' HC)</span>
                      <span className="font-mono font-bold text-foreground">$1,650.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-foreground">
                      <span>Bunker Adjustment Factor (BAF)</span>
                      <span className="font-mono font-bold">$220.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-foreground">
                      <span>Terminal Handling (THC)</span>
                      <span className="font-mono font-bold">$140.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-foreground">
                      <span>Customs Ingress (AEO)</span>
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
                  <span>{t("tabs.load")}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {t("loadTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("loadDesc")}
                </p>

                <div className="space-y-3">
                  {[
                    t("loadPoint1"),
                    t("loadPoint2"),
                    t("loadPoint3")
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
                    <span>{t("viewDetails")}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 space-y-3">
                  <div className="p-4 rounded-xl bg-card border border-border/70 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-foreground">40' High Cube Container</span>
                      <span className="font-mono text-emerald-600 font-bold">94.2% Volume Utilized</span>
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
                  <span>{t("tabs.customs")}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {t("customsTitle")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("customsDesc")}
                </p>

                <div className="space-y-3">
                  {[
                    t("customsPoint1"),
                    t("customsPoint2"),
                    t("customsPoint3")
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
                    <span>{t("requestDemo")}</span>
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
