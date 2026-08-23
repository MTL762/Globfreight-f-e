'use client'
import { type ColumnDef } from "@tanstack/react-table";
import ActiveCol from "@/components/common/table/columns/Ative.column";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import DateCol from "@/components/common/table/columns/date.column";

export default function CategoriesColumns(): ColumnDef<Record<string, unknown>>[] {
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
    accessorKey: "slug",
    header: "Slug"
  },
  {
    accessorKey: "description",
    header: "Description"
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
    accessorKey: "parent_id",
    header: "Parent_id"
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ getValue }) => {
      const link = getValue() as string;
      if (!link) return <span className="text-gray-400">No link</span>;

      return (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="truncate max-w-[200px]">
              {link?.replace(/^https?:\/\//, "")}
            </span>
          </a>
        </Button>
      );
    }
  },
  {
    accessorKey: "parent",
    header: "Parent"
  },
  {
    accessorKey: "sub_categories",
    header: "Sub_categories"
  },
  {
    accessorKey: "sub_categories_count",
    header: "Sub_categories_count"
  },
  {
    accessorKey: "seo",
    header: "Seo"
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
