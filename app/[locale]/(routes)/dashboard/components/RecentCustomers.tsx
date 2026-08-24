"use client";

import Link from "next/link";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { RecentCustomer } from "../types";

interface RecentCustomersProps {
  customers?: RecentCustomer[];
  locale: string;
}

export function RecentCustomers({ customers = [], locale }: RecentCustomersProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const formatDate = (dateStr: string) => {
    try {
      return new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Briefcase className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {isRtl ? "أحدث العملاء والشركات" : "Recent Corporate Clients"}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {isRtl
              ? "بيانات العملاء الجدد، عناوينهم وحالة حساباتهم"
              : "Latest onboarding customer accounts, entities and locations"}
          </p>
        </div>

        <Link
          href={`/${locale}/customers`}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted/70 hover:border-border"
        >
          <span>{isRtl ? "عرض الكل" : "View All"}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Customer List */}
      {customers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
          <Briefcase className="h-10 w-10 stroke-1 mb-2 opacity-40" />
          <p className="text-sm font-medium">
            {isRtl ? "لا يوجد عملاء مسجلين حالياً" : "No recent clients found"}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {customers.map((client) => {
            const fullName = `${client.first_name || ""} ${client.last_name || ""}`.trim() || client.company_name || "Client";
            const initials = `${client.first_name?.[0] || ""}${client.last_name?.[0] || ""}`.toUpperCase() || "CL";

            return (
              <div
                key={client.id}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-muted/20 p-4 transition-all duration-200 hover:bg-muted/40 hover:border-emerald-500/30 hover:shadow-xs"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  {/* Avatar & Name */}
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-sm shadow-xs">
                      {initials}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-foreground">
                          {fullName}
                        </h4>

                        {client.status === "active" && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="h-2.5 w-2.5" />
                            {isRtl ? "نشط" : "Active"}
                          </span>
                        )}

                        {client.notes && (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                            <Sparkles className="h-2.5 w-2.5" />
                            {client.notes}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {client.company_name && (
                          <span className="flex items-center gap-1 font-medium text-foreground">
                            <Building2 className="h-3 w-3 text-muted-foreground" />
                            {client.company_name}
                          </span>
                        )}

                        {(client.city || client.country) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            {[client.city, client.country].filter(Boolean).join(", ")}
                          </span>
                        )}

                        {client.tax_number && (
                          <span className="text-[11px] font-mono opacity-80">
                            {client.tax_number}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info & Date */}
                  <div className="flex flex-wrap items-center gap-3 self-start md:self-center text-xs">
                    {client.email && (
                      <a
                        href={`mailto:${client.email}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                      >
                        <Mail className="h-3 w-3 text-emerald-500" />
                        <span>{client.email}</span>
                      </a>
                    )}

                    {client.phone && (
                      <a
                        href={`tel:${client.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background px-2.5 py-1 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                      >
                        <Phone className="h-3 w-3 text-emerald-500" />
                        <span dir="ltr">{client.phone}</span>
                      </a>
                    )}

                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(client.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
