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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { PriceRequest, CURRENCY_OPTIONS } from "@/types/priceRequest";
import { adminReplyPriceRequest } from "@/api/price-requests";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Send, DollarSign, FileText, Lock, Sparkles, Loader2 } from "lucide-react";
import { PriceRequestStatusBadge } from "./PriceRequestStatusBadge";

interface PriceRequestReplyModalProps {
  request: PriceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function PriceRequestReplyModal({
  request,
  isOpen,
  onClose,
  onSuccess
}: PriceRequestReplyModalProps) {
  const locale = useLocale();
  const router = useRouter();
  const isAr = locale === "ar";

  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Generate quotation template based on current price and currency
  const generateTemplate = (currentPrice: string, currentCurrency: string) => {
    if (!request) return "";
    const p = currentPrice || (isAr ? "[السعر]" : "[Price]");
    const c = currentCurrency || "USD";

    if (isAr) {
      return `عزيزي العميل ${request.name}،
تحية طيبة وبعد،
يسر شركة GlobFreight تقديم عرض السعر التالي لشحنتكم من ${request.from} إلى ${request.to}:
- نوع الحاوية: ${request.container_type}
- نوع البضاعة: ${request.cargo_type}
- الوزن الإجمالي: ${request.weight}
- السعر الإجمالي: ${p} ${c}
- العرض ساري لمدة 7 أيام من تاريخه.

مع خالص التحية والتقدير،
فريق عمليات GlobFreight`;
    }

    return `Dear ${request.name},
Greetings from GlobFreight,

We are pleased to provide the following freight quotation for your shipment from ${request.from} to ${request.to}:
- Equipment / Container: ${request.container_type}
- Cargo Type: ${request.cargo_type}
- Gross Weight: ${request.weight}
- Total Quoted Rate: ${p} ${c}
- Validity: This quotation is valid for 7 business days from today.

Best regards,
GlobFreight Logistics Operations Desk`;
  };

  // Sync state when request opens
  useEffect(() => {
    if (request) {
      const initialPrice = request.quoted_price ? String(request.quoted_price) : "";
      const initialCurrency = request.currency || "USD";
      setPrice(initialPrice);
      setCurrency(initialCurrency);
      setAdminNotes(request.admin_notes || "");

      if (request.reply_message) {
        setReplyMessage(request.reply_message);
      } else {
        setReplyMessage(generateTemplate(initialPrice, initialCurrency));
      }
    } else {
      setPrice("");
      setCurrency("USD");
      setReplyMessage("");
      setAdminNotes("");
    }
  }, [request, isOpen, isAr]);

  const handlePriceChange = (newPrice: string) => {
    setPrice(newPrice);
    // If message is still based on the template, update the price placeholder
    if (!request?.reply_message) {
      setReplyMessage(generateTemplate(newPrice, currency));
    }
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    if (!request?.reply_message) {
      setReplyMessage(generateTemplate(price, newCurrency));
    }
  };

  const handleResetTemplate = () => {
    setReplyMessage(generateTemplate(price, currency));
    toast.info(isAr ? "تم إعادة ملء نموذج عرض السعر" : "Quotation template refreshed");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      toast.error(isAr ? "يرجى إدخال سعر صحيح أكبر من الصفر" : "Please enter a valid quoted price greater than 0");
      return;
    }

    if (!replyMessage.trim()) {
      toast.error(isAr ? "يرجى كتابة نص الرسالة للعميل" : "Please enter a reply message");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        quoted_price: numericPrice,
        currency,
        reply_message: replyMessage.trim(),
        admin_notes: adminNotes.trim() || undefined
      };

      const res = await adminReplyPriceRequest(request.id, payload);

      if (res && res.success !== false) {
        toast.success(
          isAr
            ? `تم إرسال عرض السعر بقيمة ${numericPrice.toLocaleString()} ${currency} بنجاح إلى ${request.email}`
            : `Quotation of ${numericPrice.toLocaleString()} ${currency} sent successfully to ${request.email}`
        );
        onClose();
        router.refresh();
        onSuccess?.();
      } else {
        const errorMsg = res?.message || (isAr ? "فشل إرسال عرض السعر" : "Failed to send quotation");
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error("Error submitting quote reply:", err);
      toast.error(
        err?.response?.data?.message ||
          (isAr ? "حدث خطأ غير متوقع أثناء إرسال عرض السعر" : "An unexpected error occurred while sending quote")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !submitting && onClose()}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  {isAr ? `تسعير والرد على الطلب #${request.id}` : `Reply & Send Official Quote #${request.id}`}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {request.name} {request.company_name ? `(${request.company_name})` : ""} • {request.email}
                </p>
              </div>
            </div>
            <PriceRequestStatusBadge status={request.status} />
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 my-2">
          {/* Quick Route Context Banner */}
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-muted-foreground block text-[11px] font-medium">{isAr ? "المسار:" : "Route:"}</span>
              <span className="font-semibold text-foreground truncate block">{request.from} ➔ {request.to}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px] font-medium">{isAr ? "نوع الحاوية:" : "Container:"}</span>
              <span className="font-semibold text-foreground truncate block">{request.container_type}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px] font-medium">{isAr ? "البضاعة:" : "Cargo:"}</span>
              <span className="font-semibold text-foreground truncate block">{request.cargo_type}</span>
            </div>
            <div>
              <span className="text-muted-foreground block text-[11px] font-medium">{isAr ? "الوزن:" : "Weight:"}</span>
              <span className="font-semibold text-foreground truncate block">{request.weight}</span>
            </div>
          </div>

          {/* Quoted Price & Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="quoted_price" className="text-xs font-semibold flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{isAr ? "السعر المعروض (المطلوب) *" : "Quoted Freight Price *"}</span>
              </Label>
              <Input
                id="quoted_price"
                type="number"
                step="0.01"
                min="0.01"
                required
                value={price}
                onChange={(e) => handlePriceChange(e.target.value)}
                placeholder="e.g. 3450.00"
                className="text-base font-bold text-emerald-600 dark:text-emerald-400 rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="currency" className="text-xs font-semibold">
                {isAr ? "العملة *" : "Currency *"}
              </Label>
              <Select value={currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger id="currency" className="rounded-xl font-bold">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map((c) => (
                    <SelectItem key={c} value={c} className="font-medium">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Formal Reply Message */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="reply_message" className="text-xs font-semibold flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-primary" />
                <span>{isAr ? "نص رسالة البريد الإلكتروني للعميل *" : "Official Quotation Email Message *"}</span>
              </Label>
              <button
                type="button"
                onClick={handleResetTemplate}
                className="text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <Sparkles className="h-3 w-3" />
                <span>{isAr ? "إعادة تعيين القالب" : "Reset Template"}</span>
              </button>
            </div>
            <Textarea
              id="reply_message"
              rows={7}
              required
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={isAr ? "اكتب تفاصيل عرض السعر هنا..." : "Compose official quotation message..."}
              className="rounded-2xl border-border/60 text-xs sm:text-sm leading-relaxed focus-visible:ring-primary font-mono"
            />
            <p className="text-[11px] text-muted-foreground">
              {isAr
                ? "سيتم إرسال هذه الرسالة مباشرة إلى البريد الإلكتروني للعميل وسيتم تغيير حالة الطلب إلى (تم التسعير والرد)."
                : "This message will be dispatched directly to the customer's email and will set status to Quoted."}
            </p>
          </div>

          {/* Internal Admin Notes */}
          <div className="space-y-1.5 pt-2 border-t border-border/40">
            <Label htmlFor="admin_notes" className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
              <Lock className="h-3 w-3" />
              <span>{isAr ? "ملاحظات داخلية لفريق العمل (خاصة - لا تظهر للعميل)" : "Internal Admin Notes (Private - Not sent to customer)"}</span>
            </Label>
            <Textarea
              id="admin_notes"
              rows={2}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder={isAr ? "مثال: تم تطبيق خصم للعملاء المميزين، تم التنسيق مع خط شحن ميرسك..." : "e.g. Discount applied for bulk client, coordinated with Maersk..."}
              className="rounded-xl border-border/60 text-xs focus-visible:ring-primary"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting} className="rounded-xl">
              {isAr ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              type="submit"
              disabled={submitting || !price}
              className="rounded-xl gap-2 font-medium bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{isAr ? "جاري الإرسال والتسجيل..." : "Sending & Quoting..."}</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>{isAr ? "إرسال عرض السعر وتحديث الحالة" : "Send Official Quote"}</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PriceRequestReplyModal;
