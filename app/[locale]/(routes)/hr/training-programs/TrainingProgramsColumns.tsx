"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import StatusCol from "@/components/common/table/columns/status.column";
import { type ColumnDef } from "@tanstack/react-table";

export default function TrainingProgramsColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id as string}</span>
    },
    {
      accessorKey: "name",
      header: () => <IconHeader columnKey="name" />,
      cell: ({ getValue }) => <span className="font-semibold text-primary">{getValue() as string}</span>
    },
    {
      accessorKey: "trainer",
      header: () => <IconHeader columnKey="trainer" />,
      cell: ({ getValue }) => <span className="font-semibold text-primary">{getValue() as string}</span>
    },
    {
      accessorKey: "location",
      header: () => <IconHeader columnKey="location" />,
      cell: ({ getValue }) => <span className="font-semibold text-primary">{getValue() as string}</span>
    },
    {
      accessorKey: "start_date",
      header: () => <IconHeader columnKey="start_date" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      accessorKey: "end_date",
      header: () => <IconHeader columnKey="end_date" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      accessorKey: "status",
      header: () => <IconHeader columnKey="status" />,
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    }
  ];
}
