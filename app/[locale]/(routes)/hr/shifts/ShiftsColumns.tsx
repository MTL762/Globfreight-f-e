"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import StatusCol from "@/components/common/table/columns/status.column";
import { type ColumnDef } from "@tanstack/react-table";
import { Clock } from "lucide-react";
import { shiftsEntity } from "./types";

export default function ShiftsColumns(): ColumnDef<shiftsEntity>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id}</span>
      )
    },
    {
      accessorKey: "contract_type_id.name",
      header: () => <IconHeader columnKey="contract_type_name" />,
      cell: ({ row }) => {
        const value = row.original.contract_type_id?.name;
        return <span className="font-medium text-primary">{value || "-"}</span>;
      }
    },
    {
      accessorKey: "day",
      header: () => <IconHeader columnKey="day" />,
      cell: ({ getValue }) => (
        <span className="capitalize font-medium">{getValue() as string}</span>
      )
    },
    {
      accessorKey: "from",
      header: () => <IconHeader columnKey="from" />,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          {getValue() as string}
        </div>
      )
    },
    {
      accessorKey: "to",
      header: () => <IconHeader columnKey="to" />,
      cell: ({ getValue }) => (
        <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
          <Clock className="w-3.5 h-3.5" />
          {getValue() as string}
        </div>
      )
    },
    {
      accessorKey: "rest",
      header: () => <IconHeader columnKey="rest" />,
      cell: ({ getValue }) => (
        <span className="text-muted-foreground">{getValue() as string} min</span>
      )
    },
    {
      accessorKey: "is_week_end",
      header: () => <IconHeader columnKey="is_week_end" />,
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    },
    {
      accessorKey: "created_at",
      header: () => <IconHeader columnKey="created_at" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
