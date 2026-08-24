"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { TableStatusBadge } from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import DateCol from "@/components/common/table/columns/date.column";
import PhoneDirectionCol from "@/components/common/table/columns/Phone.direction";
import { Button } from "@/components/ui/button";
import { Reply } from "lucide-react";
import { ContactMessage } from "./types";

export function ContactUsColumns({
  onViewReply
}: {
  onViewReply?: (row: ContactMessage) => void;
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
      accessorKey: "name",
      header: "Sender",
      cell: ({ row }) => {
        const item = row.original as unknown as ContactMessage;
        return (
          <div className="flex items-center gap-2.5 min-w-[180px]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
              {item.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm leading-tight">
                {item.name}
              </span>
              <a
                href={`mailto:${item.email}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors truncate max-w-[160px]"
              >
                {item.email}
              </a>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ getValue }) => {
        const phone = getValue() as string;
        if (!phone) return <span className="text-muted-foreground text-xs">-</span>;
        return <PhoneDirectionCol value={phone} />;
      }
    },
    {
      accessorKey: "subject",
      header: "Subject & Message",
      cell: ({ row }) => {
        const item = row.original as unknown as ContactMessage;
        return (
          <div className="flex flex-col gap-0.5 max-w-[280px]">
            {item.subject && (
              <span className="font-semibold text-foreground text-xs truncate">
                {item.subject}
              </span>
            )}
            <p className="text-xs text-muted-foreground line-clamp-1">
              {item.message}
            </p>
          </div>
        );
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <TableStatusBadge status={getValue() as string} />
    },
    {
      accessorKey: "created_at",
      header: "Received At",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      id: "quick_reply",
      header: "Reply",
      cell: ({ row }) => {
        const item = row.original as unknown as ContactMessage;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewReply?.(item)}
            className="rounded-xl gap-1.5 text-xs font-medium h-8 border-border/60 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
          >
            <Reply className="h-3.5 w-3.5" />
            <span>{item.reply_message ? "View / Edit" : "Reply"}</span>
          </Button>
        );
      }
    }
  ];
}

export default ContactUsColumns;
