"use client";

import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import PhoneDirectionCol from "@/components/common/table/columns/Phone.direction";
import TableStatusBadge from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import DateCol from "@/components/common/table/columns/date.column";
import LocationCol from "@/components/common/table/columns/Location.column";
import { Building2, Sparkles, User } from "lucide-react";

export default function CustomersColumns(): ColumnDef<Record<string, unknown>>[] {
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
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const item = row.original as any;
        const fullName = `${item.first_name || ""} ${item.last_name || ""}`.trim() || item.company_name || "Customer";
        const initials = `${item.first_name?.[0] || ""}${item.last_name?.[0] || ""}`.toUpperCase() || "CL";

        return (
          <div className="flex items-center gap-2.5 min-w-[200px]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm leading-tight">
                {fullName}
              </span>
              <a
                href={`mailto:${item.email}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors truncate max-w-[170px]"
              >
                {item.email}
              </a>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "company_name",
      header: "Company & Tax",
      cell: ({ row }) => {
        const item = row.original as any;
        if (!item.company_name && !item.tax_number) return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <div className="flex flex-col gap-0.5 min-w-[150px]">
            {item.company_name && (
              <span className="font-semibold text-foreground text-xs flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                {item.company_name}
              </span>
            )}
            {item.tax_number && (
              <span className="text-[11px] font-mono text-muted-foreground">
                {item.tax_number}
              </span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => {
        const item = row.original as any;
        if (!item.phone && !item.alt_phone) return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <div className="flex flex-col gap-0.5">
            {item.phone && <PhoneDirectionCol value={item.phone} />}
            {item.alt_phone && (
              <span className="text-[11px] text-muted-foreground">
                <PhoneDirectionCol value={item.alt_phone} />
              </span>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => {
        const item = row.original as any;
        return (
          <LocationCol
            country={item.country}
            city={item.city}
            address={item.address}
          />
        );
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <TableStatusBadge status={getValue() as string} />
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: ({ getValue }) => {
        const val = getValue() as string;
        if (!val) return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400 max-w-[180px] truncate" title={val}>
            <Sparkles className="h-2.5 w-2.5 shrink-0" />
            <span>{val}</span>
          </span>
        );
      }
    },
    {
      accessorKey: "created_at",
      header: "Registered",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
