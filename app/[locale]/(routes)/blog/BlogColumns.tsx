"use client";

import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import TableStatusBadge from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import ActiveCol from "@/components/common/table/columns/Ative.column";
import DateCol from "@/components/common/table/columns/date.column";
import LocaleViewColumn from "@/components/common/table/columns/locale-view.column";
import TagsCol from "@/components/common/table/columns/Tags.column";
import { Eye, Folder, Sparkles, User } from "lucide-react";

export default function BlogColumns(): ColumnDef<Record<string, unknown>>[] {
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
      accessorKey: "title",
      header: "Title",
      cell: ({ getValue }) => <LocaleViewColumn value={getValue() as any} />
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
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <TableStatusBadge status={getValue() as string} />
    },
    {
      accessorKey: "is_featured",
      header: "Featured",
      cell: ({ getValue }) => {
        const isFeatured = Boolean(getValue());
        if (!isFeatured) return <span className="text-muted-foreground text-xs">-</span>;
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
            <Sparkles className="h-2.5 w-2.5" />
            <span>Featured</span>
          </span>
        );
      }
    },
    {
      accessorKey: "views_count",
      header: "Views",
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{Number(getValue() || 0).toLocaleString()}</span>
        </div>
      )
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ getValue }) => <TagsCol tags={getValue() as any} />
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ getValue }) => {
        const auth = getValue() as any;
        if (!auth) return <span className="text-muted-foreground text-xs">-</span>;
        const name = typeof auth === "object" ? auth.name : auth;
        return (
          <div className="flex items-center gap-1.5 text-xs text-foreground">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
              {String(name || "A").charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">{name}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "published_at",
      header: "Published",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
