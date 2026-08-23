"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import StatusCol from "@/components/common/table/columns/status.column";
import { type ColumnDef } from "@tanstack/react-table";

export default function AnnouncementsColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id as string}</span>
    },
    {
      accessorKey: "title",
      header: () => <IconHeader columnKey="title" />,
      cell: ({ getValue }) => <span className="font-semibold text-primary">{getValue() as string}</span>
    },
    {
      accessorKey: "priority",
      header: () => <IconHeader columnKey="priority" />,
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    },
    {
      accessorKey: "is_published",
      header: () => <IconHeader columnKey="is_published" />,
      cell: ({ getValue }) => {
        const val = getValue();
        return <StatusCol value={val ? "1" : "0"} />;
      }
    },
    {
      accessorKey: "published_at",
      header: () => <IconHeader columnKey="published_at" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      accessorKey: "expires_at",
      header: () => <IconHeader columnKey="expires_at" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    }
  ];
}
