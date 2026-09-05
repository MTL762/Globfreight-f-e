"use client";

import Link from "next/link";
import { Ship, ArrowRight, ArrowLeft } from "lucide-react";
import { PriceRequestStatusBadge } from "../../price-requests/components/PriceRequestStatusBadge";

interface RecentPriceRequestItem {
  id: number | string;
  from: string;
  to: string;
  name: string;
  status: string;
  created_at: string;
}

interface RecentPriceRequestsProps {
  priceRequests?: RecentPriceRequestItem[];
  locale: string;
}

export function RecentPriceRequests({
  priceRequests = [],
  locale
}: RecentPriceRequestsProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  if (!priceRequests || priceRequests.length === 0) return null;

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Ship className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {isRtl ? "أحدث طلبات عروض الأسعار" : "Recent Freight Inquiries"}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {isRtl
              ? "متابعة طلبات الشحن الجديدة الواردة من الموقع الإلكتروني"
              : "Live incoming container quote inquiries from website"}
          </p>
        </div>

        <Link
          href={`/${locale}/price-requests`}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted/70 hover:border-border"
        >
          <span>{isRtl ? "عرض الكل" : "View All"}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {priceRequests.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-border/40 bg-muted/20 p-3.5 transition-all hover:bg-muted/40 hover:border-primary/30"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 text-primary shadow-xs">
                <Ship className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    #{item.id}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {item.from} ➔ {item.to}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <PriceRequestStatusBadge status={item.status} />
              <span className="text-[11px] text-muted-foreground hidden sm:inline-block">
                {formatDate(item.created_at)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentPriceRequests;
