"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, ArrowRight } from "lucide-react";
import { fetchHelper } from "@/api/fetch";
import { toast } from "sonner";
import Link from "next/link";

export function ComposeEmailForm() {
  const locale = useLocale();
  const router = useRouter();
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const [formData, setFormData] = useState({
    recipient_email: "",
    recipient_name: "",
    subject: "",
    body: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.recipient_email || !formData.subject || !formData.body) {
      toast.error(isRtl ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetchHelper({
        endPoint: ["adminSentEmails"],
        method: "POST",
        body: formData
      });

      if (res?.success !== false) {
        toast.success(isRtl ? "تم إرسال البريد الإلكتروني بنجاح" : "Email sent successfully");
        router.push(`/${locale}/sent-emails`);
        router.refresh();
      } else {
        toast.error(res?.message || (isRtl ? "فشل إرسال البريد الإلكتروني" : "Failed to send email"));
      }
    } catch {
      toast.error(isRtl ? "حدث خطأ أثناء إرسال البريد" : "An error occurred while sending email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm max-w-4xl mx-auto">
      <CardHeader className="p-0 pb-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">
                {isRtl ? "إنشاء وإرسال بريد إلكتروني" : "Compose & Send Email"}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isRtl
                  ? "إرسال إشعار أو رسالة مباشرة إلى العميل أو المستخدم"
                  : "Dispatch email notification directly to client or user"}
              </p>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild className="rounded-xl">
            <Link href={`/${locale}/sent-emails`}>
              <ArrowIcon className="h-4 w-4 mr-1.5" />
              <span>{isRtl ? "الرجوع للقائمة" : "Back to List"}</span>
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {isRtl ? "البريد الإلكتروني للمستلم *" : "Recipient Email *"}
              </label>
              <Input
                type="email"
                required
                value={formData.recipient_email}
                onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                placeholder="customer@example.com"
                className="rounded-2xl border-border/60"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {isRtl ? "اسم المستلم (اختياري)" : "Recipient Name (Optional)"}
              </label>
              <Input
                type="text"
                value={formData.recipient_name}
                onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                placeholder="Ahmed Hassan"
                className="rounded-2xl border-border/60"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {isRtl ? "عنوان الموضوع *" : "Email Subject *"}
            </label>
            <Input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Shipment Update - Bill of Lading Available"
              className="rounded-2xl border-border/60"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              {isRtl ? "محتوى الرسالة (HTML مدعوم) *" : "Message Body (HTML supported) *"}
            </label>
            <Textarea
              rows={8}
              required
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="<p>Dear Customer, your shipping documents are now ready for download.</p>"
              className="rounded-2xl border-border/60 font-mono text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/${locale}/sent-emails`)}
              className="rounded-xl"
            >
              {isRtl ? "إلغاء" : "Cancel"}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl gap-2 font-medium bg-rose-600 hover:bg-rose-700 text-white"
            >
              <Send className="h-4 w-4" />
              <span>{isSubmitting ? (isRtl ? "جاري الإرسال..." : "Sending...") : (isRtl ? "إرسال الآن" : "Send Now")}</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
