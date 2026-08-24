"use client";

import Link from "next/link";
import {
  Mail,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Inbox
} from "lucide-react";
import { RecentContact } from "../types";

interface RecentContactsProps {
  contacts?: RecentContact[];
  locale: string;
}

export function RecentContacts({ contacts = [], locale }: RecentContactsProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      return new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(dateStr));
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Mail className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {isRtl ? "أحدث رسائل واستفسارات التواصل" : "Recent Contact Messages"}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {isRtl
              ? "متابعة الرسائل الواردة من نموذج اتصل بنا"
              : "Inbound client communications and inquiries"}
          </p>
        </div>

        <Link
          href={`/${locale}/contact-us`}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted/70 hover:border-border"
        >
          <span>{isRtl ? "عرض الكل" : "View All"}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Messages List */}
      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50 mb-3">
            <Inbox className="h-6 w-6 stroke-1 opacity-50" />
          </div>
          <p className="text-sm font-semibold text-foreground">
            {isRtl ? "صندوق الرسائل محدث تماماً" : "Inbox is fully up to date"}
          </p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs">
            {isRtl
              ? "لا توجد رسائل جديدة معلقة. ستظهر الرسائل والاستفسارات فور وصولها."
              : "No pending inquiries. New customer messages will appear here in real-time."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((item) => {
            const sender = item.name || `${item.first_name || ""} ${item.last_name || ""}`.trim() || item.email;

            return (
              <div
                key={item.id}
                className="group flex items-start gap-3 rounded-2xl border border-border/40 bg-muted/20 p-3.5 transition-all hover:bg-muted/40 hover:border-amber-500/30"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 text-amber-500 shadow-xs mt-0.5">
                  <MessageSquare className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-foreground truncate">
                      {sender}
                    </h4>
                    <span className="text-[11px] text-muted-foreground shrink-0">
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  {item.subject && (
                    <p className="text-xs font-medium text-foreground line-clamp-1">
                      {item.subject}
                    </p>
                  )}

                  {item.message && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
