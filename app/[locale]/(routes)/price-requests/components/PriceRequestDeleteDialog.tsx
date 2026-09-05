"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PriceRequest } from "@/types/priceRequest";
import { adminDeletePriceRequest } from "@/api/price-requests";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface PriceRequestDeleteDialogProps {
  request: PriceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PriceRequestDeleteDialog({
  request,
  isOpen,
  onClose,
  onSuccess
}: PriceRequestDeleteDialogProps) {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";
  const [deleting, setDeleting] = useState(false);

  if (!request) return null;

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const res = await adminDeletePriceRequest(request.id);

      if (res && res.success !== false) {
        toast.success(
          isAr
            ? `تم حذف طلب عرض السعر #${request.id} بنجاح`
            : `Quote inquiry #${request.id} deleted successfully`
        );
        onClose();
        router.refresh();
        onSuccess?.();
      } else {
        toast.error(res?.message || (isAr ? "فشل حذف الطلب" : "Failed to delete inquiry"));
      }
    } catch (err: any) {
      console.error("Error deleting price request:", err);
      toast.error(
        err?.response?.data?.message ||
          (isAr ? "حدث خطأ أثناء حذف الطلب" : "An error occurred while deleting inquiry")
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !deleting && onClose()}>
      <DialogContent className="max-w-md rounded-3xl p-6">
        <DialogHeader className="space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto">
            <Trash2 className="h-6 w-6" />
          </div>
          <DialogTitle className="text-center text-lg font-bold text-foreground">
            {isAr ? `تأكيد حذف طلب عرض السعر #${request.id}` : `Delete Price Request #${request.id}?`}
          </DialogTitle>
          <DialogDescription className="text-center text-xs text-muted-foreground leading-relaxed">
            {isAr
              ? `هل أنت متأكد من رغبتك في حذف طلب العميل "${request.name}" من ${request.from} إلى ${request.to}؟ يمكن استعادة السجل لاحقاً.`
              : `Are you sure you want to soft-delete the inquiry from "${request.name}" (${request.from} ➔ ${request.to})? This record can be reviewed in archives.`}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0 pt-3">
          <Button variant="outline" onClick={onClose} disabled={deleting} className="rounded-xl">
            {isAr ? "إلغاء" : "Cancel"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-xl gap-2 font-medium"
          >
            {deleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{isAr ? "جاري الحذف..." : "Deleting..."}</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>{isAr ? "تأكيد الحذف" : "Delete Inquiry"}</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PriceRequestDeleteDialog;
