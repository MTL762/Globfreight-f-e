import TableStatusBadge from "../tableHelperComponents/TableStatusBadge";

export default function StatusCol({ value }: { value: string | boolean | null | undefined }) {
  return <TableStatusBadge status={value} />;
}
