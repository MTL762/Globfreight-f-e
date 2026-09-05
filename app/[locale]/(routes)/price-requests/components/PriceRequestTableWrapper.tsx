"use client";

import React, { useState, useTransition, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import {
  PriceRequest,
  CONTAINER_TYPE_OPTIONS,
  CARGO_TYPE_OPTIONS
} from "@/types/priceRequest";
import { PriceRequestColumns } from "../PriceRequestColumns";
import { PriceRequestReplyModal } from "./PriceRequestReplyModal";
import { PriceRequestDetailsModal } from "./PriceRequestDetailsModal";
import { PriceRequestStatusModal } from "./PriceRequestStatusModal";
import { PriceRequestDeleteDialog } from "./PriceRequestDeleteDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import {
  Search,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
  Inbox
} from "lucide-react";

interface PriceRequestTableWrapperProps {
  data: PriceRequest[];
  total?: number;
  currentPage?: number;
  lastPage?: number;
  perPage?: number;
}

const STATUS_TABS: { value: string; labelEn: string; labelAr: string }[] = [
  { value: "all", labelEn: "All Inquiries", labelAr: "جميع الطلبات" },
  { value: "pending", labelEn: "Pending", labelAr: "قيد الانتظار" },
  { value: "reviewing", labelEn: "Reviewing", labelAr: "قيد المراجعة" },
  { value: "quoted", labelEn: "Quoted", labelAr: "تم التسعير" },
  { value: "rejected", labelEn: "Rejected", labelAr: "مرفوض" },
  { value: "archived", labelEn: "Archived", labelAr: "مؤرشف" }
];

export function PriceRequestTableWrapper({
  data = [],
  total,
  currentPage = 1,
  lastPage = 1,
  perPage: _perPage = 15
}: PriceRequestTableWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isAr = locale === "ar";
  const [isPending, startTransition] = useTransition();

  // Active filters from searchParams
  const activeStatus = searchParams.get("status") || "all";
  const activeSearch = searchParams.get("search") || "";
  const activeContainer = searchParams.get("container_type") || "all";
  const activeCargo = searchParams.get("cargo_type") || "all";

  // Local search text for debounced typing
  const [searchInput, setSearchInput] = useState(activeSearch);

  // Modals state
  const [selectedForDetails, setSelectedForDetails] = useState<PriceRequest | null>(null);
  const [selectedForReply, setSelectedForReply] = useState<PriceRequest | null>(null);
  const [selectedForStatus, setSelectedForStatus] = useState<PriceRequest | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<PriceRequest | null>(null);

  // Status counts from loaded dataset
  const countsByStatus = useMemo(() => {
    const counts: Record<string, number> = {
      all: data.length,
      pending: 0,
      reviewing: 0,
      quoted: 0,
      rejected: 0,
      archived: 0
    };

    data.forEach((item) => {
      const s = String(item.status).toLowerCase();
      if (counts[s] !== undefined) {
        counts[s]++;
      }
    });

    return counts;
  }, [data]);

  // Push new query parameters to URL
  const updateQuery = (key: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value || value === "all") {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    // Always reset to page 1 on filter change
    if (key !== "page") {
      current.delete("page");
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    startTransition(() => {
      router.push(`${pathname}${query}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateQuery("search", searchInput.trim());
  };

  const handleClearFilters = () => {
    setSearchInput("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const columns = useMemo(
    () =>
      PriceRequestColumns({
        onViewDetails: (item) => setSelectedForDetails(item),
        onReply: (item) => setSelectedForReply(item),
        onChangeStatus: (item) => setSelectedForStatus(item),
        onDelete: (item) => setSelectedForDelete(item),
        locale
      }),
    [locale]
  );

  const table = useReactTable({
    data: data as unknown as Record<string, unknown>[],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  const hasActiveFilters = activeStatus !== "all" || activeSearch !== "" || activeContainer !== "all" || activeCargo !== "all";

  return (
    <div className="space-y-5">
      {/* ── 1. Top Metrics & Filter Pills ── */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-border/60">
        {STATUS_TABS.map((tab) => {
          const isSelected = activeStatus === tab.value;
          const count = countsByStatus[tab.value] ?? 0;

          return (
            <button
              key={tab.value}
              onClick={() => updateQuery("status", tab.value)}
              className={[
                "inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-card border border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              ].join(" ")}
            >
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              <span
                className={[
                  "text-[10px] px-1.5 py-0.2 rounded-full font-mono",
                  isSelected
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 2. Search & Filter Bar ── */}
      <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="sm:col-span-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none rtl:left-auto rtl:right-3" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={
                isAr
                  ? "بحث بالاسم، البريد، الهاتف، الميناء، الشركة..."
                  : "Search name, email, phone, port, company..."
              }
              className="pl-9 rtl:pl-3 rtl:pr-9 rounded-xl text-xs bg-background"
            />
          </form>

          {/* Container Type Filter */}
          <div className="sm:col-span-3">
            <Select
              value={activeContainer}
              onValueChange={(val) => updateQuery("container_type", val)}
            >
              <SelectTrigger className="rounded-xl text-xs bg-background">
                <SelectValue placeholder={isAr ? "نوع الحاوية" : "Container Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isAr ? "جميع الحاويات" : "All Equipment"}</SelectItem>
                {CONTAINER_TYPE_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c} className="text-xs">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cargo Type Filter */}
          <div className="sm:col-span-3">
            <Select
              value={activeCargo}
              onValueChange={(val) => updateQuery("cargo_type", val)}
            >
              <SelectTrigger className="rounded-xl text-xs bg-background">
                <SelectValue placeholder={isAr ? "نوع البضاعة" : "Cargo Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{isAr ? "جميع أنواع البضائع" : "All Cargo Types"}</SelectItem>
                {CARGO_TYPE_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c} className="text-xs">
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset button */}
          <div className="sm:col-span-1 flex justify-end">
            {hasActiveFilters ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearFilters}
                className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground"
                title={isAr ? "مسح التصفية" : "Clear filters"}
              >
                <X className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.refresh()}
                className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground"
                title={isAr ? "تحديث" : "Refresh"}
              >
                <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── 3. Data Table ── */}
      <div className="rounded-2xl border border-border/60 bg-card shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-xs font-bold text-muted-foreground uppercase tracking-wider py-3.5 px-4"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-muted/30 transition-colors border-b border-border/40"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3.5 px-4 text-xs">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                        <Inbox className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-foreground">
                          {isAr ? "لا توجد طلبات أسعار مطابقة" : "No price requests found"}
                        </p>
                        <p className="text-xs text-muted-foreground max-w-sm">
                          {hasActiveFilters
                            ? isAr
                              ? "جرب تعديل معايير البحث أو مسح الفلاتر المحددة."
                              : "Try adjusting your search criteria or resetting active filters."
                            : isAr
                              ? "لم يتم تسجيل أي طلبات عروض أسعار حتى الآن."
                              : "No quote inquiries have been submitted yet."}
                        </p>
                      </div>
                      {hasActiveFilters && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleClearFilters}
                          className="rounded-xl text-xs mt-1"
                        >
                          {isAr ? "إعادة تعيين الفلاتر" : "Reset Filters"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ── 4. Pagination Footer ── */}
        <div className="p-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground bg-muted/10">
          <div>
            {isAr ? (
              <span>
                عرض <strong>{data.length}</strong> من إجمالي <strong>{total ?? data.length}</strong> طلب
              </span>
            ) : (
              <span>
                Showing <strong>{data.length}</strong> of <strong>{total ?? data.length}</strong> total inquiries
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium">
              {isAr ? `صفحة ${currentPage} من ${lastPage || 1}` : `Page ${currentPage} of ${lastPage || 1}`}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => updateQuery("page", String(currentPage - 1))}
                className="h-8 w-8 rounded-xl"
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= lastPage}
                onClick={() => updateQuery("page", String(currentPage + 1))}
                className="h-8 w-8 rounded-xl"
              >
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Modals ── */}
      <PriceRequestDetailsModal
        request={selectedForDetails}
        isOpen={Boolean(selectedForDetails)}
        onClose={() => setSelectedForDetails(null)}
        onOpenReply={(req) => setSelectedForReply(req)}
      />

      <PriceRequestReplyModal
        request={selectedForReply}
        isOpen={Boolean(selectedForReply)}
        onClose={() => setSelectedForReply(null)}
        onSuccess={() => {
          setSelectedForReply(null);
          router.refresh();
        }}
      />

      <PriceRequestStatusModal
        request={selectedForStatus}
        isOpen={Boolean(selectedForStatus)}
        onClose={() => setSelectedForStatus(null)}
        onSuccess={() => {
          setSelectedForStatus(null);
          router.refresh();
        }}
      />

      <PriceRequestDeleteDialog
        request={selectedForDelete}
        isOpen={Boolean(selectedForDelete)}
        onClose={() => setSelectedForDelete(null)}
        onSuccess={() => {
          setSelectedForDelete(null);
          router.refresh();
        }}
      />
    </div>
  );
}

export default PriceRequestTableWrapper;
