"use client";
import IconHeader from "@/components/common/table/columns/icon-header";
import StatusCol from "@/components/common/table/columns/status.column";
import { type ColumnDef } from "@tanstack/react-table";
import { leaveTypesEntity } from "./types";

export default function LeaveTypesColumns(): ColumnDef<leaveTypesEntity>[] {
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
      accessorKey: "name",
      header: () => <IconHeader columnKey="name" />,
      cell: ({ getValue }) => (
        <span className="font-semibold">{getValue() as string}</span>
      )
    },
    {
      accessorKey: "description",
      header: () => <IconHeader columnKey="description" />,
      cell: ({ getValue }) => {
        const val = getValue() as string;
        if (!val) return <span className="text-muted-foreground">-</span>;
        return (
          <span className="truncate max-w-[200px] block text-sm text-gray-600 dark:text-gray-400" title={val}>
            {val}
          </span>
        );
      }
    },
    {
      accessorKey: "contract_type_id.bonus_day_off",
      header: () => <IconHeader columnKey="bonus_day_off" />,
      cell: ({ row }) => {
        const value = row.original.contract_type_id?.bonus_day_off;
        return <span className="font-medium text-amber-600 dark:text-amber-400">{value ?? "-"}</span>;
      }
    },
    {
      accessorKey: "contract_type_id.has_attendance",
      header: () => <IconHeader columnKey="has_attendance" />,
      cell: ({ row }) => <StatusCol value={row.original.contract_type_id?.has_attendance} />
    },
    {
      accessorKey: "contract_type_id.has_annual_leave",
      header: () => <IconHeader columnKey="has_annual_leave" />,
      cell: ({ row }) => <StatusCol value={row.original.contract_type_id?.has_annual_leave} />
    }
  ];
}
