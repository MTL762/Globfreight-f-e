"use client";
import DateCol from "@/components/common/table/columns/date.column";
import IconHeader from "@/components/common/table/columns/icon-header";
import PhoneDirectionCol from "@/components/common/table/columns/Phone.direction";
import StatusCol from "@/components/common/table/columns/status.column";
import { UserCell } from "@/components/common/table/columns/user-cell";
import TableStatusBadge from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import { Badge } from "@/components/ui/badge";
import { type ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { contractEntity } from "./types";

const SectionCell = ({ row }: { row: { original: contractEntity } }) => (
  <div className="flex flex-col">
    <span className="font-medium">{row.original.section_id?.name || "-"}</span>
    <span className="text-xs text-muted-foreground italic">{row.original.branch_id?.name}</span>
  </div>
);

const SalaryCell = ({ row }: { row: { original: contractEntity } }) => {
  const total = row.original.salaries?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
  const symbol = row.original.currency_id?.symbol || "";
  return (
    <div className="flex items-center gap-1 font-semibold text-primary">
      <span>{total.toLocaleString()}</span>
      <span className="text-xs">{symbol}</span>
    </div>
  );
};

const DateRangeCell = ({ row }: { row: { original: contractEntity } }) => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase text-muted-foreground w-8">{t("From")}</span>
        <DateCol date={row.original.start_at} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] uppercase text-muted-foreground w-8">{t("To")}</span>
        <DateCol date={row.original.end_at} />
      </div>
    </div>
  );
};

const StatusInfoCell = ({ row }: { row: { original: contractEntity } }) => (
  <div className="flex flex-col gap-1">
    <TableStatusBadge status={row.original.marital_status} />
    <StatusCol value={row.original.military_status} />
  </div>
);

const LanguagesCell = ({ languages }: { languages: contractEntity["languages"] }) => (
  <div className="flex flex-wrap gap-1 max-w-[200px]">
    {languages?.map(lang => (
      <Badge key={lang.id} variant="secondary" className="text-[10px] px-1 py-0 h-4">
        {lang.name}
      </Badge>
    ))}
    {!languages?.length && "-"}
  </div>
);

export default function ContractColumns(): ColumnDef<contractEntity>[] {
  return [
    {
      id: "user",
      header: () => <IconHeader columnKey="Employee" />,
      accessorFn: row => `${row.user_id?.name} ${row.user_id?.email}`,
      cell: ({ row }) => {
        const user = row.original.user_id;
        return (
          <UserCell name={user?.name || "-"} email={user?.email || "-"} image={user?.profile} />
        );
      }
    },
    {
      accessorKey: "section_id.name",
      header: () => <IconHeader columnKey="Section" />,
      cell: SectionCell
    },
    {
      accessorKey: "contract_type_id.name",
      header: () => <IconHeader columnKey="Contract" />,
      cell: ({ getValue }) => (
        <Badge variant="outline" className="font-normal">
          {getValue() as string}
        </Badge>
      )
    },
    {
      id: "salary",
      header: () => <IconHeader columnKey="Amount" />,
      cell: SalaryCell
    },
    {
      accessorKey: "phone",
      header: () => <IconHeader columnKey="Phone" />,
      cell: ({ getValue }) => <PhoneDirectionCol value={getValue() as string} />
    },
    {
      accessorKey: "start_at",
      header: () => <IconHeader columnKey="Date" />,
      cell: DateRangeCell
    },
    {
      accessorKey: "marital_status",
      header: () => <IconHeader columnKey="Status" />,
      cell: StatusInfoCell
    },
    {
      accessorKey: "languages",
      header: () => <IconHeader columnKey="Languages Information" />,
      cell: ({ getValue }) => <LanguagesCell languages={getValue() as contractEntity["languages"]} />
    }
  ];
}

