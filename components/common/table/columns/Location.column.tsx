"use client";
import { MapPin } from "lucide-react";

export default function LocationCol({
  country,
  city,
  address
}: {
  country?: string | null;
  city?: string | null;
  address?: string | null;
}) {
  const parts = [city, country].filter(Boolean);
  if (parts.length === 0 && !address) {
    return <span className="text-muted-foreground text-xs">-</span>;
  }

  return (
    <div className="flex flex-col gap-0.5 text-xs">
      {parts.length > 0 && (
        <div className="flex items-center gap-1 font-medium text-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
          <span>{parts.join(", ")}</span>
        </div>
      )}
      {address && (
        <span className="text-[11px] text-muted-foreground truncate max-w-[200px]" title={address}>
          {address}
        </span>
      )}
    </div>
  );
}
