"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PriceRequest } from "@/types/priceRequest";
import { useLocale } from "next-intl";
import {
  Ship,
  MapPin,
  Package,
  Weight,
  Ruler,
  User,
  Building2,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  DollarSign,
  Lock,
  Reply
} from "lucide-react";
import { PriceRequestStatusBadge } from "./PriceRequestStatusBadge";

interface PriceRequestDetailsModalProps {
  request: PriceRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReply?: (request: PriceRequest) => void;
}

export function PriceRequestDetailsModal({
  request,
  isOpen,
  onClose,
  onOpenReply
}: PriceRequestDetailsModalProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!request) return null;

  const cleanPhone = request.phone ? request.phone.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Ship className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  {isAr ? `تفاصيل طلب عرض السعر #${request.id}` : `Freight Quote Inquiry #${request.id}`}
                </DialogTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(request.created_at).toLocaleString(isAr ? "ar-EG" : "en-US", {
                    dateStyle: "medium",
                    timeStyle: "short"
                  })}
                </p>
              </div>
            </div>
            <PriceRequestStatusBadge status={request.status} />
          </div>
        </DialogHeader>

        <div className="space-y-6 my-2">
          {/* Route Corridor Banner */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="h-9 w-9 rounded-xl bg-background flex items-center justify-center border border-border shrink-0 shadow-xs">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                  {isAr ? "ميناء / مدينة الشحن (من)" : "Port of Origin (From)"}
                </span>
                <span className="text-sm font-bold text-foreground">{request.from}</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center px-2 text-primary font-extrabold text-lg">
              ➔
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="h-9 w-9 rounded-xl bg-background flex items-center justify-center border border-border shrink-0 shadow-xs">
                <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block">
                  {isAr ? "ميناء / مدينة الوصول (إلى)" : "Port of Destination (To)"}
                </span>
                <span className="text-sm font-bold text-foreground">{request.to}</span>
              </div>
            </div>
          </div>

          {/* Customer & Company Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-primary" />
              <span>{isAr ? "معلومات العميل والاتصال" : "Customer & Contact Information"}</span>
            </h4>
            <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  {request.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-bold text-foreground text-sm block">{request.name}</span>
                  {request.company_name && (
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3" /> {request.company_name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:items-end justify-center">
                <a
                  href={`mailto:${request.email}`}
                  className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{request.email}</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${request.phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-background border border-border text-foreground hover:bg-muted font-medium transition-colors"
                  >
                    <Phone className="h-3 w-3 text-emerald-600" />
                    <span dir="ltr">{request.phone}</span>
                  </a>

                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 font-medium transition-colors"
                      title={isAr ? "محادثة واتساب مباشرة" : "Chat on WhatsApp"}
                    >
                      <MessageCircle className="h-3 w-3" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Shipment Specifications */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-primary" />
              <span>{isAr ? "مواصفات الشحنة والمعدات" : "Shipment Specifications"}</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-border/60 bg-card p-3 space-y-1">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Ship className="h-3 w-3 text-primary" /> {isAr ? "نوع الحاوية" : "Container"}
                </span>
                <p className="text-xs font-bold text-foreground truncate">{request.container_type}</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-3 space-y-1">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Package className="h-3 w-3 text-amber-500" /> {isAr ? "نوع البضاعة" : "Cargo Type"}
                </span>
                <p className="text-xs font-bold text-foreground truncate">{request.cargo_type}</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-3 space-y-1">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Weight className="h-3 w-3 text-blue-500" /> {isAr ? "الوزن الإجمالي" : "Gross Weight"}
                </span>
                <p className="text-xs font-bold text-foreground truncate">{request.weight}</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card p-3 space-y-1">
                <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <Ruler className="h-3 w-3 text-purple-500" /> {isAr ? "الأبعاد" : "Dimensions"}
                </span>
                <p className="text-xs font-bold text-foreground truncate">{request.dimensions || "—"}</p>
              </div>
            </div>
          </div>

          {/* Customer Special Notes */}
          {request.notes && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-primary" />
                <span>{isAr ? "ملاحظات وتعليمات العميل" : "Customer Notes & Instructions"}</span>
              </h4>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                {request.notes}
              </div>
            </div>
          )}

          {/* Quoted Rate & Official Email Reply (if already quoted) */}
          {request.quoted_price && (
            <div className="space-y-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">
                      {isAr ? "السعر المعروض للعميل" : "Official Quoted Price"}
                    </span>
                    <p className="text-lg font-extrabold text-emerald-800 dark:text-emerald-200 leading-tight">
                      {Number(request.quoted_price).toLocaleString()} {request.currency}
                    </p>
                  </div>
                </div>

                {request.replied_at && (
                  <div className="text-right text-[11px] text-muted-foreground">
                    <span className="block font-medium">
                      {isAr ? "تاريخ الرد:" : "Quoted On:"}{" "}
                      {new Date(request.replied_at).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
                        dateStyle: "medium"
                      })}
                    </span>
                    {request.replied_by && (
                      <span className="text-foreground font-semibold block">
                        {isAr ? "بواسطة:" : "By:"} {request.replied_by.name}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {request.reply_message && (
                <div className="pt-3 border-t border-emerald-500/20 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block">
                    {isAr ? "نص الرد المرسل للعميل:" : "Reply Message Sent to Customer:"}
                  </span>
                  <div className="rounded-xl bg-background/80 p-3 text-xs leading-relaxed text-foreground whitespace-pre-wrap font-mono border border-emerald-500/20">
                    {request.reply_message}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Internal Admin Notes */}
          {request.admin_notes && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-amber-500" />
                <span>{isAr ? "ملاحظات داخلية خاصة" : "Internal Admin Notes"}</span>
              </h4>
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-3.5 text-xs text-foreground leading-relaxed">
                {request.admin_notes}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0 pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            {isAr ? "إغلاق" : "Close"}
          </Button>

          {onOpenReply && (
            <Button
              onClick={() => {
                onClose();
                onOpenReply(request);
              }}
              className="rounded-xl gap-2 font-medium bg-primary text-primary-foreground hover:opacity-90"
            >
              <Reply className="h-4 w-4" />
              <span>{request.quoted_price ? (isAr ? "تعديل عرض السعر" : "Update Quote") : (isAr ? "تسعير والرد الآن" : "Reply & Quote Now")}</span>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PriceRequestDetailsModal;
