'use client'
import { type ColumnDef } from "@tanstack/react-table";
import TableStatusBadge from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import ActiveCol from "@/components/common/table/columns/Ative.column";
import DateCol from "@/components/common/table/columns/date.column";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function BlogColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "slug",
    header: "Slug"
  },
  {
    accessorKey: "excerpt",
    header: "Excerpt"
  },
  {
    accessorKey: "content",
    header: "Content"
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;

      return (
        <TableStatusBadge
          status={status}
        />
      );
    }
  },
  {
    accessorKey: "is_featured",
    header: "Is_featured",
    cell: ({ getValue }) => <ActiveCol value={getValue() as boolean} />
  },
  {
    accessorKey: "published_at",
    header: "Published_at",
   cell: ({ getValue }) => {
		  return (
			<DateCol date={getValue() as string} />
		  );
		}
  },
  {
    accessorKey: "views_count",
    header: "Views_count"
  },
  {
    accessorKey: "tags",
    header: "Tags"
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
    accessorKey: "author",
    header: "Author"
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
