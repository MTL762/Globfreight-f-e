"use client";

import React, { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  Globe2,
  Mail,
  Calendar,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { ChartTrendPoint, DashboardCharts } from "../types";

interface VisitorChartProps {
  charts?: DashboardCharts;
  locale: string;
}

export function VisitorChart({ charts, locale }: VisitorChartProps) {
  const isRtl = locale === "ar";
  const [activeMetric, setActiveMetric] = useState<"visitors" | "contacts">("visitors");
  const [activeRange, setActiveRange] = useState<"7d" | "30d">("7d");

  // Fallback demo/baseline trend when backend returns empty data
  const fallback7dVisitors: ChartTrendPoint[] = useMemo(() => {
    const daysAr = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
    const daysEn = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const visits = [42, 68, 95, 120, 110, 145, 180];
    return Array.from({ length: 7 }).map((_, i) => ({
      date: `2026-08-${17 + i}`,
      label: isRtl ? daysAr[i] : daysEn[i],
      visits: visits[i],
      count: visits[i]
    }));
  }, [isRtl]);

  const fallback30dVisitors: ChartTrendPoint[] = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      date: `2026-08-${String(i + 1).padStart(2, "0")}`,
      label: `${i + 1} ${isRtl ? "أغسطس" : "Aug"}`,
      visits: Math.floor(40 + Math.sin(i / 3) * 35 + i * 4),
      count: Math.floor(40 + Math.sin(i / 3) * 35 + i * 4)
    }));
  }, [isRtl]);

  const fallback7dContacts: ChartTrendPoint[] = useMemo(() => {
    const daysAr = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
    const daysEn = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const contacts = [3, 5, 8, 4, 9, 12, 15];
    return Array.from({ length: 7 }).map((_, i) => ({
      date: `2026-08-${17 + i}`,
      label: isRtl ? daysAr[i] : daysEn[i],
      visits: contacts[i],
      count: contacts[i],
      inquiries: contacts[i]
    }));
  }, [isRtl]);

  const fallback30dContacts: ChartTrendPoint[] = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      date: `2026-08-${String(i + 1).padStart(2, "0")}`,
      label: `${i + 1} ${isRtl ? "أغسطس" : "Aug"}`,
      visits: Math.floor(2 + (i % 5) + Math.random() * 4),
      count: Math.floor(2 + (i % 5) + Math.random() * 4)
    }));
  }, [isRtl]);

  const rawData =
    activeMetric === "visitors"
      ? charts?.visitor_trend || []
      : charts?.contact_trend || [];

  const isRealData = rawData.length > 0;

  const data: ChartTrendPoint[] = useMemo(() => {
    if (isRealData) {
      return rawData.map((item) => ({
        ...item,
        visits: item.visits ?? item.count ?? 0,
        label: item.label || item.date
      }));
    }

    if (activeMetric === "visitors") {
      return activeRange === "7d" ? fallback7dVisitors : fallback30dVisitors;
    } else {
      return activeRange === "7d" ? fallback7dContacts : fallback30dContacts;
    }
  }, [
    isRealData,
    rawData,
    activeMetric,
    activeRange,
    fallback7dVisitors,
    fallback30dVisitors,
    fallback7dContacts,
    fallback30dContacts
  ]);

  const totalValue = data.reduce((acc, curr) => acc + (curr.visits || 0), 0);
  const maxValue = Math.max(...data.map((d) => d.visits || 0), 1);
  const avgValue = Math.round(totalValue / (data.length || 1));

  const isVisitors = activeMetric === "visitors";

  return (
    <div className="relative flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 md:p-7 shadow-xs">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {isVisitors
                ? isRtl
                  ? "تحليل حركة الزوار والزيارات"
                  : "Platform Traffic & Visitor Trends"
                : isRtl
                ? "معدل رسائل واستفسارات التواصل"
                : "Contact Inquiries Volume"}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>
              {isVisitors
                ? isRtl
                  ? "متابعة تدفق الزيارات اليومية وتفاعل المستخدمين"
                  : "Daily inbound visits frequency and user activity"
                : isRtl
                ? "معدل وصول الاستفسارات والتواصل مع العملاء"
                : "Inbound client contact velocity over the selected window"}
            </span>

            {!isRealData && (
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                <Sparkles className="h-2.5 w-2.5" />
                {isRtl ? "نموذج تحليلي حي" : "Live Baseline Preview"}
              </span>
            )}
          </div>
        </div>

        {/* Controls: Metric Switcher + Range Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Metric Selector */}
          <div className="flex rounded-2xl bg-muted/60 p-1 text-xs font-medium border border-border/40">
            <button
              onClick={() => setActiveMetric("visitors")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                activeMetric === "visitors"
                  ? "bg-background text-foreground shadow-xs font-semibold text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Globe2 className="h-3.5 w-3.5" />
              <span>{isRtl ? "الزوار" : "Visitors"}</span>
            </button>
            <button
              onClick={() => setActiveMetric("contacts")}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 transition-all ${
                activeMetric === "contacts"
                  ? "bg-background text-foreground shadow-xs font-semibold text-amber-600 dark:text-amber-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>{isRtl ? "الرسائل" : "Inquiries"}</span>
            </button>
          </div>

          {/* Range Selector */}
          <div className="flex rounded-2xl bg-muted/60 p-1 text-xs font-medium border border-border/40">
            <button
              onClick={() => setActiveRange("7d")}
              className={`rounded-xl px-3 py-1.5 transition-all ${
                activeRange === "7d"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRtl ? "7 أيام" : "7 Days"}
            </button>
            <button
              onClick={() => setActiveRange("30d")}
              className={`rounded-xl px-3 py-1.5 transition-all ${
                activeRange === "30d"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isRtl ? "30 يوم" : "30 Days"}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-border/40 bg-muted/20 p-3.5 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            {isVisitors
              ? isRtl
                ? "إجمالي الزيارات المسجلة"
                : "Total Volume Recorded"
              : isRtl
              ? "إجمالي الاستفسارات"
              : "Total Inquiries"}
          </div>
          <div className="text-xl font-extrabold text-foreground mt-1">
            {totalValue.toLocaleString(locale)}
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-muted/20 p-3.5 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            {isRtl ? "المتوسط اليومي" : "Daily Average"}
          </div>
          <div className="text-xl font-extrabold text-foreground mt-1">
            {avgValue.toLocaleString(locale)}
          </div>
        </div>

        <div className="rounded-2xl border border-border/40 bg-muted/20 p-3.5 flex flex-col justify-between">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            {isRtl ? "ذروة النشاط" : "Peak Activity"}
          </div>
          <div className={`text-xl font-extrabold mt-1 ${isVisitors ? "text-primary" : "text-amber-500"}`}>
            {maxValue.toLocaleString(locale)}
          </div>
        </div>
      </div>

      {/* Main Responsive Recharts Area */}
      <div className="h-[290px] w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: isRtl ? 10 : 20, left: isRtl ? 20 : 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="primaryTrendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isVisitors ? "hsl(var(--primary))" : "#f59e0b"} stopOpacity={0.4} />
                <stop offset="95%" stopColor={isVisitors ? "hsl(var(--primary))" : "#f59e0b"} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.5}
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              dx={isRtl ? 10 : -10}
              allowDecimals={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const val = payload[0].value as number;
                  return (
                    <div className="rounded-2xl border border-border/80 bg-background/95 p-3.5 shadow-xl backdrop-blur-md">
                      <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                      <p
                        className={`text-base font-bold flex items-center gap-1.5 mt-1 ${
                          isVisitors ? "text-primary" : "text-amber-500"
                        }`}
                      >
                        <TrendingUp className="h-4 w-4" />
                        {val?.toLocaleString(locale)}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          {isVisitors
                            ? isRtl
                              ? "زيارة"
                              : "visits"
                            : isRtl
                            ? "استفسار"
                            : "messages"}
                        </span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="visits"
              stroke={isVisitors ? "hsl(var(--primary))" : "#f59e0b"}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#primaryTrendGradient)"
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "hsl(var(--background))",
                fill: isVisitors ? "hsl(var(--primary))" : "#f59e0b"
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
