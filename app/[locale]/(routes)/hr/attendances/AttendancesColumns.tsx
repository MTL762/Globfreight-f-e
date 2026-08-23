"use client";
import DateCol from "@/components/common/table/columns/date.column";
import StatusCol from "@/components/common/table/columns/status.column";
import { UserCell } from "@/components/common/table/columns/user-cell";
import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { CheckCircle2, Clock, ExternalLink, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { AttendancesEntity } from "./types";

export default function AttendancesColumns(): ColumnDef<AttendancesEntity>[] {
  const t = useTranslations();
  return [
    {
      accessorKey: "id",
      header: "id",
      cell: ({ row }) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id}</span>
      )
    },
    {
      id: "employee",
      header: "Employee",
      cell: ({ row }) => {
        const user = row.original.contract?.user_id;
        if (!user) return <span className="text-muted-foreground">-</span>;
        return <UserCell name={user.name} email={user.email} image={user.profile} />;
      }
    },
    {
      accessorKey: "checkin",
      header: "Checkin",
      cell: ({ getValue }) => {
        const val = getValue() as string;
        if (!val) return <span className="text-muted-foreground italic">-</span>;
        return (
          <div className="flex items-center justify-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {new Date(val).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
        );
      }
    },
    {
      accessorKey: "checkout",
      header: "Checkout",
      cell: ({ getValue }) => {
        const val = getValue() as string;
        if (!val) return <span className="text-muted-foreground italic">-</span>;
        return (
          <div className="flex items-center justify-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {new Date(val).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
        );
      }
    },
    {
      accessorKey: "type",
      header: "type",
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    },
    {
      accessorKey: "late_minutes",
      header: "late_minutes",
      cell: ({ getValue }) => {
        const val = getValue() as number;
        if (!val) return <span className="text-emerald-500 font-medium">0 {t("min_label")}</span>;
        return (
          <div className="flex flex-col items-center">
            <span className="text-amber-600 dark:text-amber-400 font-bold">{val}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">{t("min_label")}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "early_leave_minutes",
      header: "early_leave_minutes",
      cell: ({ getValue }) => {
        const val = getValue() as number;
        if (!val) return <span className="text-emerald-500 font-medium">0 min</span>;
        return (
          <div className="flex flex-col items-center">
            <span className="text-rose-600 dark:text-rose-400 font-bold">{val}</span>
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">{t("min_label")}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "paid",
      header: "Paid",
      cell: ({ getValue }) => {
        const isPaid = (getValue() as number) === 1;
        return (
          <div className="flex items-center justify-center">
            {isPaid ? (
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-bold border border-emerald-100 dark:border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                <span>{t("Paid")}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-full text-xs font-bold border border-rose-100 dark:border-rose-500/20">
                <XCircle className="w-3 h-3" />
                <span>{t("Unpaid")}</span>
              </div>
            )}
          </div>
        );
      }
    },
    {
      accessorKey: "leave_type",
      header: "Leave_type",
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    },
    {
      accessorKey: "leave_description",
      header: "Leave_description",
      cell: ({ getValue }) => {
        const val = getValue() as string;
        if (!val) return <span className="text-muted-foreground">-</span>;
        return (
          <span className="truncate max-w-[150px] block" title={val}>
            {val}
          </span>
        );
      }
    },
    {
      accessorKey: "contract",
      header: "Contract",
      cell: ({ row }) => {
        const contractId = row.original.contract?.id;
        if (!contractId) return null;

        return (
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/5"
          >
            <a
              href={`/hr/contracts/${contractId}`}
              target="_blank"
              rel="noopener noreferrer"
              title="View Contract"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        );
      }
    },
    {
      accessorKey: "created_at",
      header: "Created_at",
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
