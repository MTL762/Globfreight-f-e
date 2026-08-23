"use client";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

function TableStatusBadge({ status }: { status: string | boolean | null | undefined }) {
  const t = useTranslations();
  if (status === null || status === undefined) return null;

  const statusStr = status.toString().toUpperCase();
  let variant: "default" | "destructive" | "secondary" | "outline" | "success" = "default";

  switch (statusStr) {
    case "APPROVED":
    case "ACCEPTED":
    case "RESOLVED":
    case "GET":
    case "TRUE":
    case "1":
      variant = "success";
      break;
    case "IN_PROGRESS":
      variant = "outline";
      break;
    case "REJECTED":
    case "DELETE":
    case "FALSE":
    case "0":
    case "DENIED":
      variant = "destructive";
      break;
    case "PENDING":
    case "POST":
    case "PATCH":
      variant = "secondary";
      break;
  }
  return (
    <Badge variant={variant}>
      <p className="text-sm text-nowrap font-normal">{t(statusStr)}</p>
    </Badge>
  );
}

export default TableStatusBadge;
