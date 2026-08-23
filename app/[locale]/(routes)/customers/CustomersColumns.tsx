'use client'
import { type ColumnDef } from "@tanstack/react-table";
import PhoneDirectionCol from "@/components/common/table/columns/Phone.direction";
import TableStatusBadge from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import DateCol from "@/components/common/table/columns/date.column";

export default function CustomersColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "user_id",
    header: "User_id"
  },
  {
    accessorKey: "first_name",
    header: "First_name"
  },
  {
    accessorKey: "last_name",
    header: "Last_name"
  },
  {
    accessorKey: "full_name",
    header: "Full_name"
  },
  {
    accessorKey: "company_name",
    header: "Company_name"
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
    accessorKey: "alt_phone",
    header: "Alt_phone",
    cell: ({ getValue }) => <PhoneDirectionCol value={getValue() as string} />
  },
  {
    accessorKey: "country",
    header: "Country"
  },
  {
    accessorKey: "city",
    header: "City"
  },
  {
    accessorKey: "address",
    header: "Address"
  },
  {
    accessorKey: "postal_code",
    header: "Postal_code"
  },
  {
    accessorKey: "tax_number",
    header: "Tax_number"
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
    accessorKey: "notes",
    header: "Notes"
  },
  {
    accessorKey: "user",
    header: "User"
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
