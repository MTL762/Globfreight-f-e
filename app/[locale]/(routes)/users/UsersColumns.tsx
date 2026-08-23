'use client'
import { type ColumnDef } from "@tanstack/react-table";
import PhoneDirectionCol from "@/components/common/table/columns/Phone.direction";
import DateCol from "@/components/common/table/columns/date.column";
import { ImageCell } from "@/components/common/table/columns/img-cell";

export default function UsersColumns(): ColumnDef<Record<string, unknown>>[] {
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
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ getValue }) => <PhoneDirectionCol value={getValue() as string} />
  },
  {
    accessorKey: "type",
    header: "Type"
  },
  {
    accessorKey: "email_verified_at",
    header: "Email_verified_at",
   cell: ({ getValue }) => {
		  return (
			<DateCol date={getValue() as string} />
		  );
		}
  },
  {
    accessorKey: "phone_verified_at",
    header: "Phone_verified_at",
   cell: ({ getValue }) => {
		  return (
			<DateCol date={getValue() as string} />
		  );
		}
  },
  {
    accessorKey: "role",
    header: "Role"
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ getValue }) => {
      const image = getValue() as string;
      return (
        <div className="flex items-center justify-center w-full h-12 overflow-hidden">
          <ImageCell cell={image} />
        </div>
      );
    }
  },
  {
    accessorKey: "id",
    header: "Id"
  }
  ];
}
