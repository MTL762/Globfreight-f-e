"use client";
import { type ColumnDef } from "@tanstack/react-table";
import ActiveCol from "@/components/common/table/columns/Ative.column";
import DateCol from "@/components/common/table/columns/date.column";
import LocaleViewColumn from "@/components/common/table/columns/locale-view.column";
import { Folder } from "lucide-react";

export default function SubCategoriesColumns(): ColumnDef<Record<string, unknown>>[] {
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
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => {
        const cat = getValue() as any;
        if (!cat) return <span className="text-muted-foreground text-xs">-</span>;
        const name = typeof cat === "object" ? (cat.name?.en || cat.name?.ar || cat.name || cat.slug) : cat;
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <Folder className="h-3 w-3" />
            <span>{name}</span>
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
