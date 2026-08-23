"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import StatusCol from "@/components/common/table/columns/status.column";
import { type ColumnDef } from "@tanstack/react-table";

export default function PerformanceReviewsColumns(): ColumnDef<Record<string, unknown>>[] {
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
      accessorKey: "review_period_start",
      header: () => <IconHeader columnKey="review_period_start" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      accessorKey: "review_period_end",
      header: () => <IconHeader columnKey="review_period_end" />,
      cell: ({ getValue }) => <DateCol date={getValue() as string} />
    },
    {
      accessorKey: "overall_rating",
      header: () => <IconHeader columnKey="overall_rating" />,
      cell: ({ getValue }) => <span className="font-semibold text-primary">{getValue() as string}</span>
    },
    {
      accessorKey: "status",
      header: () => <IconHeader columnKey="status" />,
      cell: ({ getValue }) => <StatusCol value={getValue() as string} />
    }
  ];
}
