"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import { type ColumnDef } from "@tanstack/react-table";

export default function OfficialHolidaysColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id as string}</span>
      )
    },
    {
      accessorKey: "name",
      header: () => <IconHeader columnKey="name" />,
      cell: ({ getValue }) => (
        <span className="font-semibold text-primary">{getValue() as string}</span>
      )
    },
    {
      accessorKey: "from_date",
      header: () => <IconHeader columnKey="from_date" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      accessorKey: "to_date",
      header: () => <IconHeader columnKey="to_date" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      accessorKey: "created_at",
      header: () => <IconHeader columnKey="created_at" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
