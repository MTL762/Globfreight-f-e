"use client";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Send,
  Archive,
  Ban,
  Eye
} from "lucide-react";

export interface TableStatusBadgeProps {
  status: string | boolean | number | null | undefined;
  className?: string;
}

export function TableStatusBadge({ status, className }: TableStatusBadgeProps) {
  const t = useTranslations();
  if (status === null || status === undefined) return null;

  const rawStatus = typeof status === "boolean" ? (status ? "active" : "inactive") : String(status);
  const statusUpper = rawStatus.toUpperCase();

  let badgeStyle = "bg-muted text-muted-foreground border-border";
  let icon: React.ReactNode = null;

  switch (statusUpper) {
    case "ACTIVE":
    case "PUBLISHED":
    case "APPROVED":
    case "ACCEPTED":
    case "RESOLVED":
    case "SENT":
    case "TRUE":
    case "1":
      badgeStyle = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      icon = <CheckCircle2 className="h-3 w-3" />;
      break;

    case "INACTIVE":
    case "REJECTED":
    case "DENIED":
    case "DELETE":
    case "DELETED":
    case "FALSE":
    case "0":
    case "FAILED":
      badgeStyle = "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      icon = <XCircle className="h-3 w-3" />;
      break;

    case "SUSPENDED":
    case "BANNED":
    case "BLOCKED":
      badgeStyle = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      icon = <Ban className="h-3 w-3" />;
      break;

    case "DRAFT":
    case "ARCHIVED":
    case "HIDDEN":
      badgeStyle = "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
      icon = <Archive className="h-3 w-3" />;
      break;

    case "PENDING":
    case "IN_PROGRESS":
    case "PROCESSING":
      badgeStyle = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      icon = <Clock className="h-3 w-3" />;
      break;

    case "UNREAD":
    case "NEW":
      badgeStyle = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 animate-pulse";
      icon = <Mail className="h-3 w-3" />;
      break;

    case "READ":
    case "OPENED":
      badgeStyle = "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      icon = <Eye className="h-3 w-3" />;
      break;

    case "REPLIED":
    case "RESPONDED":
      badgeStyle = "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20";
      icon = <Send className="h-3 w-3" />;
      break;

    default:
      badgeStyle = "bg-muted text-muted-foreground border-border";
      break;
  }

  let label = rawStatus;
  try {
    const translated = t(statusUpper);
    if (translated && translated !== statusUpper) {
      label = translated;
    } else {
      label = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
    }
  } catch {
    label = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1).toLowerCase();
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeStyle} ${className || ""}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
}

export default TableStatusBadge;
