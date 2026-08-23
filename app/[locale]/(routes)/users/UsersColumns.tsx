"use client";

import { type ColumnDef } from "@tanstack/react-table";
import DateCol from "@/components/common/table/columns/date.column";
import PhoneDirectionCol from "@/components/common/table/columns/Phone.direction";
import TableStatusBadge from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import { Shield } from "lucide-react";

export default function UsersColumns(): ColumnDef<Record<string, unknown>>[] {
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
      header: "User",
      cell: ({ row }) => {
        const item = row.original as any;
        const initials = item.name?.charAt(0).toUpperCase() || "U";

        return (
          <div className="flex items-center gap-2.5 min-w-[200px]">
            {item.avatar ? (
              <img
                src={item.avatar}
                alt={item.name}
                className="h-9 w-9 rounded-2xl object-cover border border-border/50"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold text-xs">
                {initials}
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm leading-tight">
                {item.name}
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-[170px]">
                {item.email}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ getValue }) => {
        const val = getValue() as string;
        if (!val) return <span className="text-muted-foreground text-xs">-</span>;
        return <PhoneDirectionCol value={val} />;
      }
    },
    {
      accessorKey: "role",
      header: "Role / Type",
      cell: ({ row }) => {
        const item = row.original as any;
        const roleName = item.role?.name || item.type || "Admin";

        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Shield className="h-3 w-3" />
            <span>{roleName}</span>
          </span>
        );
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => <TableStatusBadge status={(getValue() as string) || "active"} />
    },
    {
      accessorKey: "email_verified_at",
      header: "Verified",
      cell: ({ getValue }) => {
        const isVerified = Boolean(getValue());
        return <TableStatusBadge status={isVerified ? "active" : "pending"} />;
      }
    },
    {
      accessorKey: "created_at",
      header: "Joined At",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
