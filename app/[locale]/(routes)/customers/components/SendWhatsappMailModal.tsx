"use client";

import { useLocale } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import {
  SendWhatsappMailForm,
  TargetCustomerInfo
} from "./SendWhatsappMailForm";

export interface SendWhatsappMailModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetCustomer?: TargetCustomerInfo | null;
  initialSendToAll?: boolean;
  onSuccess?: () => void;
}

export function SendWhatsappMailModal({
  isOpen,
  onClose,
  targetCustomer,
  initialSendToAll = false,
  onSuccess
}: SendWhatsappMailModalProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-border/60 bg-card shadow-2xl">
        <DialogHeader className="space-y-2 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <div className="relative">
                <FaWhatsapp className="h-5 w-5" />
                <Mail className="h-3 w-3 absolute -bottom-1 -right-1 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight">
                {isRtl
                  ? "إرسال رسالة واتساب وبريد إلكتروني"
                  : "Send WhatsApp & Email Message"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                {targetCustomer
                  ? isRtl
                    ? `إرسال رسالة مباشرة إلى: ${targetCustomer.name}`
                    : `Direct message dispatch to: ${targetCustomer.name}`
                  : isRtl
                    ? "إرسال إشعار أو تحديث عبر الواتساب والبريد لعملاء محددين أو لجميع العملاء"
                    : "Dispatch notification update via WhatsApp & Email to specific customers or broadcast to all"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="pt-2">
          <SendWhatsappMailForm
            targetCustomer={targetCustomer}
            initialSendToAll={initialSendToAll}
            isModal={true}
            onSuccess={() => {
              onClose();
              if (onSuccess) onSuccess();
            }}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
