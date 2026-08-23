"use client";
import IconHeader from "@/components/common/table/columns/icon-header";
import { type ColumnDef } from "@tanstack/react-table";
import { rolesEntity } from "./types";

export default function Columns(): ColumnDef<rolesEntity>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id}</span>
      )
    },
    {
      accessorKey: "name",
      header: () => <IconHeader columnKey="name" />,
      cell: ({ row }) => {
        const value = row.original.name;
        return <div className="font-semibold text-primary">{value}</div>;
      }
    },
    {
      accessorKey: "permissions",
      header: () => <IconHeader columnKey="permissions" />,
      cell: ({ row }) => {
        const value = row.original.permissions.length;
        return <div className="font-semibold text-primary">{value}</div>;
      }
    }
  ];
}
