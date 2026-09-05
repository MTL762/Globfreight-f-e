"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PriceRequest, PriceRequestStatus, PRICE_REQUEST_STATUS_CONFIG } from "@/types/priceRequest";
import { adminUpdatePriceRequestStatus } from "@/api/price-requests";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { RefreshCw, Lock, Loader2 } from "lucide-react";
import { PriceRequestStatusBadge } from "./PriceRequestStatusBadge";

interface PriceRequestStatusModalProps {
  request: PriceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ALL_STATUSES: PriceRequestStatus[] = ["pending", "reviewing", "quoted", "rejected", "archived"];

export function PriceRequestStatusModal({
  request,
  isOpen,
  onClose,
  onSuccess
}: PriceRequestStatusModalProps) {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";

  const [selectedStatus, setSelectedStatus] = useState<PriceRequestStatus>("pending");
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (request) {
      setSelectedStatus(request.status);
      setAdminNotes(request.admin_notes || "");
    }
  }, [request, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    try {
      setSubmitting(true);
      const res = await adminUpdatePriceRequestStatus(request.id, {
        status: selectedStatus,
        admin_notes: adminNotes.trim() || undefined
      });

      if (res && res.success !== false) {
        toast.success(
          isAr
            ? `تم تحديث حالة الطلب #${request.id} بنجاح إلى (${PRICE_REQUEST_STATUS_CONFIG[selectedStatus]?.labelAr})`
            : `Status for inquiry #${request.id} updated to ${PRICE_REQUEST_STATUS_CONFIG[selectedStatus]?.labelEn}`
        );
        onClose();
        router.refresh();
        onSuccess?.();
      } else {
        toast.error(res?.message || (isAr ? "فشل تحديث الحالة" : "Failed to update status"));
      }
    } catch (err: any) {
      console.error("Error updating price request status:", err);
      toast.error(
        err?.response?.data?.message ||
          (isAr ? "حدث خطأ أثناء تحديث حالة الطلب" : "An error occurred while updating status")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !submitting && onClose()}>
      <DialogContent className="max-w-md rounded-3xl p-6">
        <DialogHeader className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold">
                {isAr ? `تغيير حالة الطلب #${request.id}` : `Change Status for #${request.id}`}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                {request.name} • {request.from} ➔ {request.to}
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 my-2">
          <div className="space-y-1.5">
            <Label htmlFor="status" className="text-xs font-semibold">
              {isAr ? "الحالة الجديدة *" : "New Status *"}
            </Label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => setSelectedStatus(val as PriceRequestStatus)}
            >
              <SelectTrigger id="status" className="rounded-xl font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_STATUSES.map((st) => (
                  <SelectItem key={st} value={st}>
                    <div className="flex items-center gap-2">
                      <PriceRequestStatusBadge status={st} showIcon={false} />
                      <span className="text-xs text-muted-foreground">
                        {isAr ? PRICE_REQUEST_STATUS_CONFIG[st]?.descriptionAr : PRICE_REQUEST_STATUS_CONFIG[st]?.descriptionEn}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin_notes" className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>{isAr ? "ملاحظات إدارية (اختياري)" : "Internal Notes (Optional)"}</span>
            </Label>
            <Textarea
              id="admin_notes"
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder={isAr ? "سبب التغيير أو توجيهات لفريق العمل..." : "Reason for status change or internal notes..."}
              className="rounded-xl border-border/60 text-xs focus-visible:ring-primary"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting} className="rounded-xl">
              {isAr ? "إلغاء" : "Cancel"}
            </Button>
            <Button type="submit" disabled={submitting} className="rounded-xl gap-2 font-medium">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isAr ? "جاري التحديث..." : "Updating..."}</span>
                </>
              ) : (
                <span>{isAr ? "تحديث الحالة" : "Update Status"}</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PriceRequestStatusModal;
