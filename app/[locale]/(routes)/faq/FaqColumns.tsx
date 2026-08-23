'use client'
import { type ColumnDef } from "@tanstack/react-table";
import ActiveCol from "@/components/common/table/columns/Ative.column";
import DateCol from "@/components/common/table/columns/date.column";

export default function FaqColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "category_id",
    header: "Category_id"
  },
  {
    accessorKey: "sub_category_id",
    header: "Sub_category_id"
  },
  {
    accessorKey: "question",
    header: "Question"
  },
  {
    accessorKey: "answer",
    header: "Answer"
  },
  {
    accessorKey: "is_active",
    header: "Is_active",
    cell: ({ getValue }) => <ActiveCol value={getValue() as boolean} />
  },
  {
    accessorKey: "order",
    header: "Order"
  },
  {
    accessorKey: "category",
    header: "Category"
  },
  {
    accessorKey: "sub_category",
    header: "Sub_category"
  },
  {
    accessorKey: "created_at",
    header: "Created_at",
   cell: ({ getValue }) => {
		  return (
			<DateCol date={getValue() as string} />
		  );
		}
  },
  {
    accessorKey: "updated_at",
    header: "Updated_at",
   cell: ({ getValue }) => {
		  return (
			<DateCol date={getValue() as string} />
		  );
		}
  }
  ];
}
