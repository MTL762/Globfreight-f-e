"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import StatusCol from "@/components/common/table/columns/status.column";
import { type ColumnDef } from "@tanstack/react-table";

export default function ExpensesColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id as string}</span>
    },
    {
      accessorKey: "contract",
      header: () => <IconHeader columnKey="contract" />,
      cell: ({ row }) => {
        const rel = row.original.contract as any;
        return <span className="font-semibold text-primary">{rel && typeof rel === 'object' ? (rel.name || rel.title || rel.id) : '-'}</span>;
      }
    },
    {
      accessorKey: "category",
      header: () => <IconHeader columnKey="category" />,
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    },
    {
      accessorKey: "amount",
      header: () => <IconHeader columnKey="amount" />,
      cell: ({ getValue }) => <span className="font-semibold text-primary">{getValue() as string}</span>
    },
    {
      accessorKey: "receipt_date",
      header: () => <IconHeader columnKey="receipt_date" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
