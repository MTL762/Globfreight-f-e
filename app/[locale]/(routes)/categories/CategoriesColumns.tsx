"use client";

import { type ColumnDef } from "@tanstack/react-table";
import ActiveCol from "@/components/common/table/columns/Ative.column";
import DateCol from "@/components/common/table/columns/date.column";
import { ImageCell } from "@/components/common/table/columns/img-cell";
import LocaleViewColumn from "@/components/common/table/columns/locale-view.column";
import { Layers } from "lucide-react";

export default function CategoriesColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ getValue }) => (
        <span className="font-mono text-xs text-muted-foreground font-semibold">
          #{String(getValue() ?? "")}
        </span>
      )
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ getValue }) => {
        const val = getValue() as any;
        if (!val) return <span className="text-muted-foreground text-xs">-</span>;
        const imageUrl =
          typeof val === "object"
            ? val?.en || val?.ar || Object.values(val)[0] || ""
            : val;
        if (!imageUrl) return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <div className="flex items-center justify-center w-12 h-12">
            <ImageCell cell={imageUrl as string} className="w-10 h-10 rounded-md object-cover" />
          </div>
        );
      }
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => <LocaleViewColumn value={getValue() as any} />
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ getValue }) => {
        const val = getValue();
        if (!val) return <span className="text-muted-foreground">-</span>;
        return typeof val === "object" ? (
          <LocaleViewColumn value={val as any} />
        ) : (
          <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
            {String(val)}
          </span>
        );
      }
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => {
        const val = getValue();
        if (!val) return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <div className="max-w-[260px]">
            {typeof val === "object" ? (
              <LocaleViewColumn value={val as any} />
            ) : (
              <span className="text-xs text-muted-foreground line-clamp-2" title={String(val)}>
                {String(val)}
              </span>
            )}
          </div>
        );
      }
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
