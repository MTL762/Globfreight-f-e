"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TableStatusBadge } from "@/components/common/table/tableHelperComponents/TableStatusBadge";
import { Mail, Phone, Calendar, User, Send, CheckCircle2 } from "lucide-react";
import { ContactMessage } from "../types";
import { fetchHelper } from "@/api/fetch";
import { toast } from "sonner";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

interface ContactReplyModalProps {
  message: ContactMessage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactReplyModal({ message, isOpen, onClose }: ContactReplyModalProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "ar";
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!message) return null;

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      toast.error(isRtl ? "يرجى كتابة نص الرد" : "Please enter a reply message");
      return;
    }

    try {
      setIsSending(true);
      const res = await fetchHelper({
        endPoint: ["adminContactUs", message.id, "reply"],
        method: "POST",
        body: { reply_message: replyText }
      });

      if (res?.success !== false) {
        toast.success(isRtl ? "تم إرسال الرد بنجاح" : "Reply sent successfully");
        setReplyText("");
        onClose();
        router.refresh();
      } else {
        toast.error(res?.message || (isRtl ? "فشل إرسال الرد" : "Failed to send reply"));
      }
    } catch {
      toast.error(isRtl ? "حدث خطأ أثناء إرسال الرد" : "An error occurred while sending reply");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl rounded-3xl p-6 sm:p-8">
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Mail className="h-4 w-4" />
              </div>
              <DialogTitle className="text-xl font-bold">
                {isRtl ? "تفاصيل رسالة التواصل" : "Contact Inquiry Details"}
              </DialogTitle>
            </div>
            <TableStatusBadge status={message.status} />
          </div>
        </DialogHeader>

        <div className="space-y-5 my-2">
          {/* Sender metadata banner */}
          <div className="rounded-2xl border border-border/50 bg-muted/20 p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                  {message.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{message.name}</h4>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {message.email}
                  </a>
                </div>
              </div>

              {message.phone && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background px-3 py-1 rounded-xl border border-border/40">
                  <Phone className="h-3.5 w-3.5 text-emerald-500" />
                  <span dir="ltr">{message.phone}</span>
                </div>
              )}
            </div>

            {message.subject && (
              <div className="pt-2 border-t border-border/30">
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {isRtl ? "الموضوع:" : "Subject:"}
                </span>{" "}
                <span className="text-xs font-medium text-foreground">{message.subject}</span>
              </div>
            )}
          </div>

          {/* Original message content */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {isRtl ? "نص الرسالة الواردة" : "Message Content"}
            </label>
            <div className="rounded-2xl border border-border/50 bg-card p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap max-h-48 overflow-y-auto">
              {message.message}
            </div>
          </div>

          {/* Existing reply if available */}
          {message.reply_message && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {isRtl ? "الرد المرسل سابقاً" : "Previous Reply"}
                </label>
                {message.replied_at && (
                  <span className="text-muted-foreground text-[11px]">
                    {new Date(message.replied_at).toLocaleDateString(isRtl ? "ar-EG" : "en-US")}
                  </span>
                )}
              </div>
              <div className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {message.reply_message}
              </div>
            </div>
          )}

          {/* New Reply Composer */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Send className="h-3.5 w-3.5 text-primary" />
              {isRtl ? "إرسال رد بالبريد الإلكتروني" : "Compose Email Reply"}
            </label>
            <Textarea
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={
                isRtl
                  ? "اكتب نص الرد هنا للعميل..."
                  : "Type your response to the customer here..."
              }
              className="rounded-2xl border-border/60 text-sm focus-visible:ring-primary"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            {isRtl ? "إلغاء" : "Close"}
          </Button>
          <Button
            onClick={handleSendReply}
            disabled={isSending || !replyText.trim()}
            className="rounded-xl gap-2 font-medium"
          >
            <Send className="h-4 w-4" />
            <span>{isSending ? (isRtl ? "جاري الإرسال..." : "Sending...") : (isRtl ? "إرسال الرد" : "Send Reply")}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
