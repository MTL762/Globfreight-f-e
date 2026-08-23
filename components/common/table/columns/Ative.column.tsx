import TableStatusBadge from "../tableHelperComponents/TableStatusBadge";

export default function ActiveCol({ value }: { value: boolean }) {
  return <TableStatusBadge status={value} />;
}
