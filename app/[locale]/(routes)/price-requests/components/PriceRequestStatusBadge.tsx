"use client";

import { PriceRequestStatus, PRICE_REQUEST_STATUS_CONFIG } from "@/types/priceRequest";
import { useLocale } from "next-intl";
import { Clock, Eye, CheckCircle2, XCircle, Archive } from "lucide-react";

interface PriceRequestStatusBadgeProps {
  status: PriceRequestStatus | string | null | undefined;
  className?: string;
  showIcon?: boolean;
}

export function PriceRequestStatusBadge({
  status,
  className = "",
  showIcon = true
}: PriceRequestStatusBadgeProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const normalizedStatus = (String(status || "pending").toLowerCase()) as PriceRequestStatus;
  const config = PRICE_REQUEST_STATUS_CONFIG[normalizedStatus] || PRICE_REQUEST_STATUS_CONFIG.pending;

  const label = isAr ? config.labelAr : config.labelEn;

  const getIcon = () => {
    switch (normalizedStatus) {
      case "pending":
        return <Clock className="h-3 w-3 shrink-0" />;
      case "reviewing":
        return <Eye className="h-3 w-3 shrink-0" />;
      case "quoted":
        return <CheckCircle2 className="h-3 w-3 shrink-0" />;
      case "rejected":
        return <XCircle className="h-3 w-3 shrink-0" />;
      case "archived":
        return <Archive className="h-3 w-3 shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors",
        config.badgeClass,
        className
      ].join(" ")}
      title={isAr ? config.descriptionAr : config.descriptionEn}
    >
      {showIcon && getIcon()}
      <span>{label}</span>
    </span>
  );
}

export default PriceRequestStatusBadge;
