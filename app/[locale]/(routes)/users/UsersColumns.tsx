"use client";
import IconHeader from "@/components/common/table/columns/icon-header";
import { UserCell } from "@/components/common/table/columns/user-cell";
import { type ColumnDef } from "@tanstack/react-table";
import { usersEntity } from "./types";

export default function UsersColumns(): ColumnDef<usersEntity>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => (
        <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id}</span>
      )
    },
    {
      id: "user",
      header: () => <IconHeader columnKey="user" />,
      accessorFn: row => `${row.name} ${row.email}`,
      cell: ({ row }) => {
        const name = row.original.name as string;
        const email = row.original.email as string;
        const image = row.original.avatar as string;
        return <UserCell name={name} email={email} image={image} />;
      }
    },

    {
      accessorKey: "role",
      header: () => <IconHeader columnKey="role" />,
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">{(row.original.role?.name as string) || "-"}</span>
      )
    }
  ];
}
