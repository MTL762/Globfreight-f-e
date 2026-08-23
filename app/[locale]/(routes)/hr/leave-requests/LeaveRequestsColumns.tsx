"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import StatusCol from "@/components/common/table/columns/status.column";
import { UserCell } from "@/components/common/table/columns/user-cell";
import { type ColumnDef } from "@tanstack/react-table";

export default function LeaveRequestsColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: () => <IconHeader columnKey="id" />,
      cell: ({ row }) => <span className="font-medium text-gray-700 dark:text-gray-300">#{row.original.id as string}</span>
    },
    {
      id: "user",
      header: "Employee",
      cell: ({ row }) => {
        const user = row.original.user_id as any;
        if (!user) return <span className="text-muted-foreground">-</span>;
        return <UserCell name={user.name} email={user.email} image={user.profile} />;
      }
    },
    {
      accessorKey: "leave_type",
      header: () => <IconHeader columnKey="leave_type" />,
      cell: ({ row }) => {
        const rel = row.original.leave_type as any;
        return <span className="font-semibold text-primary">{rel && typeof rel === 'object' ? (rel.name || rel.title || rel.id) : '-'}</span>;
      }
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
      accessorKey: "status",
      header: () => <IconHeader columnKey="status" />,
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    }
  ];
}
