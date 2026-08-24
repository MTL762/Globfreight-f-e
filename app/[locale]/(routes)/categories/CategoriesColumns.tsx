"use client";

import { type ColumnDef } from "@tanstack/react-table";
import ActiveCol from "@/components/common/table/columns/Ative.column";
import DateCol from "@/components/common/table/columns/date.column";
import LocaleViewColumn from "@/components/common/table/columns/locale-view.column";
import { Layers } from "lucide-react";

export default function CategoriesColumns(): ColumnDef<Record<string, unknown>>[] {
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
      header: "Name",
      cell: ({ getValue }) => <LocaleViewColumn value={getValue() as any} />
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ getValue }) => (
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
          {String(getValue() || "-")}
        </span>
      )
    },
    {
      accessorKey: "sub_categories_count",
      header: "Sub Categories",
      cell: ({ getValue }) => {
        const count = Number(getValue() || 0);
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Layers className="h-3 w-3" />
            <span>{count} Sub-branches</span>
          </span>
        );
      }
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ getValue }) => <ActiveCol value={getValue() as boolean} />
    },
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ getValue }) => (
        <span className="text-xs font-semibold text-muted-foreground">
          {String(getValue() ?? "-")}
        </span>
      )
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
