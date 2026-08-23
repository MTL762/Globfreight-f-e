"use client";
import IconHeader from "@/components/common/table/columns/icon-header";
import { type ColumnDef } from "@tanstack/react-table";

export default function LanguagesColumns(): ColumnDef<Record<string, unknown>>[] {
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
    }
  ];
}
