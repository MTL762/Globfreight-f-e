"use client";

import { Globe2, Laptop, TrendingUp, Compass } from "lucide-react";
import { VisitorAnalyticsStats } from "../types";
import { useLocale } from "next-intl";

interface VisitorsAnalyticsCardsProps {
  stats?: VisitorAnalyticsStats;
}

export function VisitorsAnalyticsCards({ stats }: VisitorsAnalyticsCardsProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const total = stats?.total_visitors ?? 0;
  const today = stats?.today ?? 0;
  const thisWeek = stats?.this_week ?? 0;
  const thisMonth = stats?.this_month ?? 0;

  const devices = stats?.devices || [
    { device: "Desktop", count: 65, percentage: 65 },
    { device: "Mobile", count: 30, percentage: 30 },
    { device: "Tablet", count: 5, percentage: 5 }
  ];

  const countries = stats?.countries || [
    { country: isRtl ? "مصر" : "Egypt", country_code: "EG", count: 450, percentage: 45 },
    { country: isRtl ? "الإمارات" : "UAE", country_code: "AE", count: 300, percentage: 30 },
    { country: isRtl ? "السعودية" : "Saudi Arabia", country_code: "SA", count: 180, percentage: 18 },
    { country: isRtl ? "أخرى" : "Others", country_code: "GL", count: 70, percentage: 7 }
  ];

  return (
    <div className="space-y-6">
      {/* 4 Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-border/50 bg-card p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">{isRtl ? "إجمالي الزيارات" : "Total Traffic"}</span>
            <div className="text-2xl font-extrabold text-foreground mt-1">{total.toLocaleString(locale)}</div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Globe2 className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">{isRtl ? "زيارات اليوم" : "Today's Visits"}</span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{today.toLocaleString(locale)}</div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">{isRtl ? "هذا الأسبوع" : "This Week"}</span>
            <div className="text-2xl font-extrabold text-foreground mt-1">{thisWeek.toLocaleString(locale)}</div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Compass className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-3xl border border-border/50 bg-card p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">{isRtl ? "هذا الشهر" : "This Month"}</span>
            <div className="text-2xl font-extrabold text-foreground mt-1">{thisMonth.toLocaleString(locale)}</div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Globe2 className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Device & Country Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Distribution */}
        <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Laptop className="h-4 w-4 text-primary" />
            <span>{isRtl ? "توزيع الأجهزة والمتصفحات" : "Device Distribution"}</span>
          </h3>

          <div className="space-y-3">
            {devices.map((d, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-foreground">{d.device}</span>
                  <span className="text-muted-foreground font-semibold">{d.percentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${d.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Top Regions */}
        <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-emerald-500" />
            <span>{isRtl ? "أعلى الدول مصدراً للزيارات" : "Top Geographic Traffic"}</span>
          </h3>

          <div className="space-y-3">
            {countries.map((c, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-foreground">{c.country}</span>
                  <span className="text-muted-foreground font-semibold">{c.percentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                    style={{ width: `${c.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
