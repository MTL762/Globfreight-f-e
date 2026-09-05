"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { PriceRequest } from "@/types/priceRequest";
import { PriceRequestStatusBadge } from "./components/PriceRequestStatusBadge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Reply,
  MoreVertical,
  MessageCircle,
  Ship,
  RefreshCw,
  Trash2,
  DollarSign
} from "lucide-react";

interface PriceRequestColumnsOptions {
  onViewDetails?: (item: PriceRequest) => void;
  onReply?: (item: PriceRequest) => void;
  onChangeStatus?: (item: PriceRequest) => void;
  onDelete?: (item: PriceRequest) => void;
  locale?: string;
}

export function PriceRequestColumns({
  onViewDetails,
  onReply,
  onChangeStatus,
  onDelete,
  locale = "en"
}: PriceRequestColumnsOptions = {}): ColumnDef<Record<string, unknown>>[] {
  const isAr = locale === "ar";

  return [
    // 1. ID & Timestamp
    {
      accessorKey: "id",
      header: isAr ? "رقم الطلب" : "ID",
      cell: ({ row }) => {
        const item = row.original as unknown as PriceRequest;
        const dateStr = item.created_at
          ? new Date(item.created_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
          : "—";

        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-xs font-bold text-foreground">
              #{item.id}
            </span>
            <span className="text-[11px] text-muted-foreground whitespace-nowrap">
              {dateStr}
            </span>
          </div>
        );
      }
    },

    // 2. Customer Profile
    {
      accessorKey: "name",
      header: isAr ? "العميل" : "Customer",
      cell: ({ row }) => {
        const item = row.original as unknown as PriceRequest;
        const cleanPhone = item.phone ? item.phone.replace(/[^0-9]/g, "") : "";
        const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

        return (
          <div className="flex items-start gap-2.5 min-w-[200px]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-xs mt-0.5">
              {item.name?.charAt(0).toUpperCase() || "C"}
            </div>
            <div className="flex flex-col gap-0.5 max-w-[190px]">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-bold text-foreground text-sm leading-tight truncate">
                  {item.name}
                </span>
                {item.company_name && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted text-muted-foreground font-medium truncate max-w-[130px]" title={item.company_name}>
                    {item.company_name}
                  </span>
                )}
              </div>

              <a
                href={`mailto:${item.email}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors truncate"
                title={item.email}
              >
                {item.email}
              </a>

              <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                <a
                  href={`tel:${item.phone}`}
                  className="text-[11px] text-muted-foreground hover:text-foreground font-mono"
                  dir="ltr"
                >
                  {item.phone}
                </a>

                {waUrl && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                    title={isAr ? "محادثة واتساب" : "Chat on WhatsApp"}
                  >
                    <MessageCircle className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      }
    },

    // 3. Corridor Route (From ➔ To)
    {
      accessorKey: "route",
      header: isAr ? "المسار البحري" : "Route Corridor",
      cell: ({ row }) => {
        const item = row.original as unknown as PriceRequest;
        return (
          <div className="flex flex-col gap-1 min-w-[210px] max-w-[260px]">
            <div className="flex items-center gap-1.5 text-xs text-foreground font-semibold">
              <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
              <span className="truncate" title={item.from}>{item.from}</span>
            </div>
            <div className="flex items-center gap-1.5 pl-3 rtl:pl-0 rtl:pr-3 text-[11px] text-muted-foreground">
              <span className="text-primary font-bold">➔</span>
              <span className="truncate font-medium" title={item.to}>{item.to}</span>
            </div>
          </div>
        );
      }
    },

    // 4. Shipment Details
    {
      accessorKey: "container_type",
      header: isAr ? "مواصفات الشحنة" : "Shipment Specs",
      cell: ({ row }) => {
        const item = row.original as unknown as PriceRequest;
        return (
          <div className="flex flex-col gap-1 min-w-[170px]">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-primary/10 text-primary font-semibold text-[11px] w-fit">
              <Ship className="h-3 w-3 shrink-0" />
              <span className="truncate max-w-[150px]">{item.container_type}</span>
            </span>
            <div className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="text-foreground font-medium truncate max-w-[120px]">{item.cargo_type}</span>
              <span>•</span>
              <span className="font-mono text-[11px]">{item.weight}</span>
            </div>
          </div>
        );
      }
    },

    // 5. Status Badge
    {
      accessorKey: "status",
      header: isAr ? "الحالة" : "Status",
      cell: ({ getValue }) => <PriceRequestStatusBadge status={getValue() as string} />
    },

    // 6. Quoted Price
    {
      accessorKey: "quoted_price",
      header: isAr ? "عرض السعر" : "Quote",
      cell: ({ row }) => {
        const item = row.original as unknown as PriceRequest;
        if (!item.quoted_price) {
          return (
            <span className="text-xs text-muted-foreground italic">
              {isAr ? "لم يتم التسعير" : "Not quoted"}
            </span>
          );
        }

        return (
          <div className="flex flex-col">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {Number(item.quoted_price).toLocaleString()} {item.currency || "USD"}
            </span>
            {item.replied_at && (
              <span className="text-[10px] text-muted-foreground">
                {new Date(item.replied_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                  month: "numeric",
                  day: "numeric"
                })}
              </span>
            )}
          </div>
        );
      }
    },

    // 7. Interactive Actions
    {
      id: "actions",
      header: isAr ? "الإجراءات" : "Actions",
      cell: ({ row }) => {
        const item = row.original as unknown as PriceRequest;

        return (
          <div className="flex items-center gap-1.5 justify-end">
            {/* Quick Reply / View button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReply?.(item)}
              className="rounded-xl gap-1.5 text-xs font-semibold h-8 border-border/60 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
              title={isAr ? "تسعير وإرسال الرد" : "Reply & Send Official Quote"}
            >
              <Reply className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{item.quoted_price ? (isAr ? "تعديل السعر" : "Edit Quote") : (isAr ? "تسعير" : "Quote")}</span>
            </Button>

            {/* Overflow Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-2xl p-1.5">
                <DropdownMenuLabel className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  {isAr ? "خيارات الطلب" : "Inquiry Actions"}
                </DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() => onViewDetails?.(item)}
                  className="rounded-xl text-xs gap-2 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-primary" />
                  <span>{isAr ? "عرض كامل التفاصيل" : "View Full Details"}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onReply?.(item)}
                  className="rounded-xl text-xs gap-2 cursor-pointer"
                >
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{isAr ? "تسعير وإرسال عرض السعر" : "Reply & Quote"}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onChangeStatus?.(item)}
                  className="rounded-xl text-xs gap-2 cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-blue-600" />
                  <span>{isAr ? "تغيير حالة الطلب" : "Change Status"}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => onDelete?.(item)}
                  className="rounded-xl text-xs gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>{isAr ? "حذف الطلب" : "Delete Inquiry"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }
    }
  ];
}

export default PriceRequestColumns;
