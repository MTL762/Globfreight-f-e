"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { TableStatusBadge } from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import DateCol from "@/components/common/table/columns/date.column";
import { Button } from "@/components/ui/button";
import { Eye, Mail } from "lucide-react";
import { SentEmailItem } from "./types";

export function SentEmailsColumns({
  onViewEmail
}: {
  onViewEmail?: (row: SentEmailItem) => void;
} = {}): ColumnDef<Record<string, unknown>>[] {
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
      accessorKey: "recipient_email",
      header: "Recipient",
      cell: ({ row }) => {
        const item = row.original as unknown as SentEmailItem;
        return (
          <div className="flex items-center gap-2.5 min-w-[200px]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs">
              <Mail className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              {item.recipient_name && (
                <span className="font-bold text-foreground text-sm leading-tight">
                  {item.recipient_name}
                </span>
              )}
              <span className="text-xs text-muted-foreground font-mono truncate max-w-[180px]">
                {item.recipient_email}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ getValue }) => (
        <span className="font-semibold text-foreground text-xs line-clamp-1 max-w-[260px]">
          {String(getValue() || "-")}
        </span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <TableStatusBadge status={(getValue() as string) || "sent"} />
    },
    {
      accessorKey: "created_at",
      header: "Sent At",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      id: "preview_action",
      header: "View",
      cell: ({ row }) => {
        const item = row.original as unknown as SentEmailItem;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewEmail?.(item)}
            className="rounded-xl gap-1.5 text-xs font-medium h-8 border-border/60 hover:bg-rose-500/10 hover:text-rose-600 hover:border-rose-500/30"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </Button>
        );
      }
    }
  ];
}

export default SentEmailsColumns;
