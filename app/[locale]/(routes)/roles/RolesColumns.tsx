'use client'
import { type ColumnDef } from "@tanstack/react-table";

export default function RolesColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "permissions",
    header: "Permissions"
  }
  ];
}
