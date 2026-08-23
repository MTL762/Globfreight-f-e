"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TableStatusBadge } from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import { Send } from "lucide-react";
import { SentEmailItem } from "../types";
import { useLocale } from "next-intl";

interface SentEmailPreviewModalProps {
  email: SentEmailItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SentEmailPreviewModal({ email, isOpen, onClose }: SentEmailPreviewModalProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  if (!email) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Send className="h-4 w-4" />
              </div>
              <DialogTitle className="text-xl font-bold">
                {isRtl ? "تفاصيل الرسالة البريدية المرسلة" : "Dispatched Email Log"}
              </DialogTitle>
            </div>
            <TableStatusBadge status={email.status || "sent"} />
          </div>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {/* Header metadata */}
          <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-muted-foreground">{isRtl ? "المستلم:" : "To:"}</span>
                <span className="font-bold text-foreground">
                  {email.recipient_name ? `${email.recipient_name} <${email.recipient_email}>` : email.recipient_email}
                </span>
              </div>
              <span className="text-muted-foreground">
                {new Date(email.created_at).toLocaleString(isRtl ? "ar-EG" : "en-US")}
              </span>
            </div>

            <div className="pt-2 border-t border-border/30 flex items-center gap-2">
              <span className="font-semibold text-muted-foreground">{isRtl ? "الموضوع:" : "Subject:"}</span>
              <span className="font-bold text-foreground">{email.subject}</span>
            </div>
          </div>

          {/* HTML Body preview */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {isRtl ? "محتوى الرسالة" : "Email Body Content"}
            </label>
            <div
              className="rounded-2xl border border-border/50 bg-card p-4 text-sm leading-relaxed text-foreground max-h-72 overflow-y-auto prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: email.body }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            {isRtl ? "إغلاق" : "Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
