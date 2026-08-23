"use client";

import { type ColumnDef } from "@tanstack/react-table";
import DateCol from "@/components/common/table/columns/date.column";
import LocationCol from "@/components/common/table/columns/Location.column";
import { Laptop, Smartphone, Tablet } from "lucide-react";
import { VisitorLogItem } from "./types";

export function VisitorsColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ getValue }) => (
        <span className="font-mono text-xs text-muted-foreground font-semibold">
          #{String(getValue())}
        </span>
      )
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const item = row.original as unknown as VisitorLogItem;
        return (
          <LocationCol
            country={item.country}
            city={item.city}
          />
        );
      }
    },
    {
      accessorKey: "device_type",
      header: "Device & Browser",
      cell: ({ row }) => {
        const item = row.original as unknown as VisitorLogItem;
        const device = (item.device_type || "desktop").toLowerCase();

        return (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground">
              {device === "mobile" ? (
                <Smartphone className="h-4 w-4" />
              ) : device === "tablet" ? (
                <Tablet className="h-4 w-4" />
              ) : (
                <Laptop className="h-4 w-4" />
              )}
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-foreground capitalize">
                {item.device_type || "Desktop"}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {[item.browser, item.platform].filter(Boolean).join(" • ") || "Browser"}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "page_url",
      header: "Visited Path",
      cell: ({ getValue }) => (
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono text-foreground truncate max-w-[240px]">
          {String(getValue() || "/")}
        </span>
      )
    },
    {
      accessorKey: "referer",
      header: "Referer",
      cell: ({ getValue }) => {
        const val = getValue() as string;
        if (!val) return <span className="text-muted-foreground text-xs">Direct</span>;
        return (
          <span className="text-xs text-muted-foreground truncate max-w-[180px]" title={val}>
            {val.replace(/^https?:\/\//, "")}
          </span>
        );
      }
    },
    {
      accessorKey: "ip_address",
      header: "IP Address",
      cell: ({ getValue }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {String(getValue() || "-")}
        </span>
      )
    },
    {
      accessorKey: "created_at",
      header: "Visited At",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}

export default VisitorsColumns;
