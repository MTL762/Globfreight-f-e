import React from "react";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen space-y-8 pb-12 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="rounded-3xl border border-border/40 bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-32 rounded-full bg-muted" />
          <div className="h-6 w-24 rounded-full bg-muted" />
        </div>
        <div className="h-8 w-64 rounded-xl bg-muted" />
        <div className="h-4 w-96 rounded-lg bg-muted" />
        <div className="flex gap-2 pt-2">
          <div className="h-7 w-28 rounded-xl bg-muted" />
          <div className="h-7 w-32 rounded-xl bg-muted" />
          <div className="h-7 w-32 rounded-xl bg-muted" />
        </div>
      </div>

      {/* 2. Metric Cards Grid Skeleton (8 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-border/40 bg-card p-5 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-7 w-16 rounded bg-muted" />
              </div>
              <div className="h-10 w-10 rounded-2xl bg-muted" />
            </div>
            <div className="pt-2 border-t border-border/30 flex justify-between">
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="h-4 w-12 rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Analytics & Lists Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-3xl border border-border/40 bg-card p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="h-6 w-48 rounded bg-muted" />
              <div className="h-8 w-36 rounded-xl bg-muted" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded-2xl bg-muted/60" />
              <div className="h-16 rounded-2xl bg-muted/60" />
              <div className="h-16 rounded-2xl bg-muted/60" />
            </div>
            <div className="h-[260px] rounded-2xl bg-muted/40" />
          </div>

          <div className="rounded-3xl border border-border/40 bg-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-44 rounded bg-muted" />
              <div className="h-6 w-20 rounded bg-muted" />
            </div>
            <div className="space-y-3">
              <div className="h-20 rounded-2xl bg-muted/40" />
              <div className="h-20 rounded-2xl bg-muted/40" />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="rounded-3xl border border-border/40 bg-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-40 rounded bg-muted" />
              <div className="h-6 w-20 rounded bg-muted" />
            </div>
            <div className="space-y-3">
              <div className="h-28 rounded-2xl bg-muted/40" />
              <div className="h-28 rounded-2xl bg-muted/40" />
            </div>
          </div>

          <div className="rounded-3xl border border-border/40 bg-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-6 w-40 rounded bg-muted" />
              <div className="h-6 w-20 rounded bg-muted" />
            </div>
            <div className="h-24 rounded-2xl bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
