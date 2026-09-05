"use client";

import Link from "next/link";
import {
  Users,
  Briefcase,
  FileText,
  Layers,
  HelpCircle,
  Mail,
  Send,
  Globe2,
  Ship,
  ArrowUpRight
} from "lucide-react";
import { DashboardMetrics } from "../types";

interface MetricCardsProps {
  metrics?: DashboardMetrics;
  locale: string;
}

interface StatCardConfig {
  id: string;
  title: string;
  value: string | number;
  subValue: string;
  secondaryPill?: {
    text: string;
    variant: "success" | "warning" | "info" | "purple" | "default";
  };
  icon: React.ElementType;
  href?: string;
  gradient: string;
  accentColor: string;
  badgeBg: string;
  hoverBorder: string;
}

export function MetricCards({ metrics, locale }: MetricCardsProps) {
  const isRtl = locale === "ar";

  const cards: StatCardConfig[] = [
    {
      id: "visitors",
      title: isRtl ? "إجمالي زوار المنصة" : "Platform Visitors",
      value: (metrics?.visitors?.total ?? 0).toLocaleString(locale),
      subValue: isRtl
        ? `اليوم: ${(metrics?.visitors?.today ?? 0).toLocaleString(locale)} • هذا الأسبوع: ${(metrics?.visitors?.this_week ?? 0).toLocaleString(locale)}`
        : `Today: ${(metrics?.visitors?.today ?? 0).toLocaleString(locale)} • Week: ${(metrics?.visitors?.this_week ?? 0).toLocaleString(locale)}`,
      secondaryPill: {
        text: isRtl
          ? `الشهر: ${(metrics?.visitors?.this_month ?? 0).toLocaleString(locale)}`
          : `Month: ${(metrics?.visitors?.this_month ?? 0).toLocaleString(locale)}`,
        variant: "info"
      },
      icon: Globe2,
      gradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
      accentColor: "text-blue-600 dark:text-blue-400",
      badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      hoverBorder: "hover:border-blue-500/30"
    },
    {
      id: "customers",
      title: isRtl ? "العملاء والشركات" : "Corporate Clients",
      value: (metrics?.customers?.total ?? 0).toLocaleString(locale),
      subValue: isRtl
        ? `العملاء النشطين: ${(metrics?.customers?.active ?? 0).toLocaleString(locale)}`
        : `Active Clients: ${(metrics?.customers?.active ?? 0).toLocaleString(locale)}`,
      secondaryPill: {
        text: isRtl ? "نشط" : "Active",
        variant: "success"
      },
      icon: Briefcase,
      href: `/${locale}/customers`,
      gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      accentColor: "text-emerald-600 dark:text-emerald-400",
      badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      hoverBorder: "hover:border-emerald-500/30"
    },
    {
      id: "blog_posts",
      title: isRtl ? "المقالات والمنشورات" : "Articles & Posts",
      value: (metrics?.blog_posts?.total ?? 0).toLocaleString(locale),
      subValue: isRtl
        ? `المنشور: ${(metrics?.blog_posts?.published ?? 0).toLocaleString(locale)} • المسودات: ${(metrics?.blog_posts?.draft ?? 0).toLocaleString(locale)}`
        : `Published: ${(metrics?.blog_posts?.published ?? 0).toLocaleString(locale)} • Drafts: ${(metrics?.blog_posts?.draft ?? 0).toLocaleString(locale)}`,
      secondaryPill: {
        text: `${(metrics?.blog_posts?.published ?? 0)} ${isRtl ? "منشور" : "live"}`,
        variant: "purple"
      },
      icon: FileText,
      href: `/${locale}/blog`,
      gradient: "from-purple-500/10 via-pink-500/5 to-transparent",
      accentColor: "text-purple-600 dark:text-purple-400",
      badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
      hoverBorder: "hover:border-purple-500/30"
    },
    {
      id: "categories",
      title: isRtl ? "التصنيفات والأقسام" : "Categories & Branches",
      value: (metrics?.categories?.total ?? 0).toLocaleString(locale),
      subValue: isRtl
        ? `الأقسام الفرعية: ${(metrics?.categories?.sub_categories_total ?? 0).toLocaleString(locale)}`
        : `Sub-categories: ${(metrics?.categories?.sub_categories_total ?? 0).toLocaleString(locale)}`,
      secondaryPill: {
        text: isRtl ? "هيكلة الخدمات" : "Structured",
        variant: "default"
      },
      icon: Layers,
      href: `/${locale}/categories`,
      gradient: "from-indigo-500/10 via-violet-500/5 to-transparent",
      accentColor: "text-indigo-600 dark:text-indigo-400",
      badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
      hoverBorder: "hover:border-indigo-500/30"
    },
    {
      id: "users",
      title: isRtl ? "المستخدمين والمشرفين" : "Users & Admins",
      value: (metrics?.users?.total ?? 0).toLocaleString(locale),
      subValue: isRtl ? "حسابات النظام المسجلة" : "System administrative accounts",
      secondaryPill: {
        text: isRtl ? "فريق العمل" : "Team",
        variant: "info"
      },
      icon: Users,
      href: `/${locale}/users`,
      gradient: "from-sky-500/10 via-blue-500/5 to-transparent",
      accentColor: "text-sky-600 dark:text-sky-400",
      badgeBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
      hoverBorder: "hover:border-sky-500/30"
    },
    {
      id: "contact_us",
      title: isRtl ? "استفسارات التواصل" : "Contact Inquiries",
      value: (metrics?.contact_us?.total ?? 0).toLocaleString(locale),
      subValue: isRtl
        ? `غير مقروء: ${(metrics?.contact_us?.unread ?? 0).toLocaleString(locale)}`
        : `Unread: ${(metrics?.contact_us?.unread ?? 0).toLocaleString(locale)}`,
      secondaryPill: (metrics?.contact_us?.unread ?? 0) > 0
        ? {
            text: isRtl ? "رسائل جديدة" : "Action required",
            variant: "warning"
          }
        : {
            text: isRtl ? "مُحدث" : "Clear",
            variant: "success"
          },
      icon: Mail,
      href: `/${locale}/contact-us`,
      gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
      accentColor: "text-amber-600 dark:text-amber-400",
      badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      hoverBorder: "hover:border-amber-500/30"
    },
    {
      id: "price_requests",
      title: isRtl ? "طلبات عروض الأسعار" : "Freight Price Requests",
      value: (
        metrics?.price_requests?.total ??
        metrics?.stats?.total_price_requests ??
        0
      ).toLocaleString(locale),
      subValue: isRtl
        ? `قيد الانتظار: ${(metrics?.price_requests?.pending ?? metrics?.stats?.pending_price_requests ?? 0).toLocaleString(locale)} • تم التسعير: ${(metrics?.price_requests?.quoted ?? metrics?.stats?.quoted_price_requests ?? 0).toLocaleString(locale)}`
        : `Pending: ${(metrics?.price_requests?.pending ?? metrics?.stats?.pending_price_requests ?? 0).toLocaleString(locale)} • Quoted: ${(metrics?.price_requests?.quoted ?? metrics?.stats?.quoted_price_requests ?? 0).toLocaleString(locale)}`,
      secondaryPill: (metrics?.price_requests?.pending ?? metrics?.stats?.pending_price_requests ?? 0) > 0
        ? {
            text: isRtl ? "طلبات جديدة" : "Action required",
            variant: "warning"
          }
        : {
            text: isRtl ? "مُحدث" : "Clear",
            variant: "success"
          },
      icon: Ship,
      href: `/${locale}/price-requests`,
      gradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
      accentColor: "text-blue-600 dark:text-blue-400",
      badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      hoverBorder: "hover:border-blue-500/30"
    },
    {
      id: "faq_items",
      title: isRtl ? "الأسئلة الشائعة" : "Knowledge & FAQ",
      value: (metrics?.faq_items?.total ?? 0).toLocaleString(locale),
      subValue: isRtl ? "إجمالي بنود الأسئلة المجابة" : "Active answered Q&As",
      secondaryPill: {
        text: isRtl ? "مركز المساعدة" : "Help Center",
        variant: "default"
      },
      icon: HelpCircle,
      href: `/${locale}/faq`,
      gradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
      accentColor: "text-teal-600 dark:text-teal-400",
      badgeBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
      hoverBorder: "hover:border-teal-500/30"
    },
    {
      id: "sent_emails",
      title: isRtl ? "الرسائل البريدية المرسلة" : "Dispatched Emails",
      value: (metrics?.sent_emails?.total ?? 0).toLocaleString(locale),
      subValue: isRtl ? "إجمالي الإشعارات والمراسلات" : "Total system notifications sent",
      secondaryPill: {
        text: isRtl ? "سجل الإرسال" : "Logged",
        variant: "info"
      },
      icon: Send,
      gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
      accentColor: "text-rose-600 dark:text-rose-400",
      badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      hoverBorder: "hover:border-rose-500/30"
    }
  ];

  const getPillClass = (variant: string) => {
    switch (variant) {
      case "success":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "warning":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 animate-pulse";
      case "purple":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "info":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-muted text-muted-foreground border-border/40";
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        const Content = (
          <div className="relative flex flex-col justify-between h-full space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted-foreground">
                  {card.title}
                </span>
                <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
                  {card.value}
                </div>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${card.badgeBg} shadow-xs transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`h-5 w-5 ${card.accentColor}`} />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground font-medium truncate">
                  {card.subValue}
                </p>

                {card.secondaryPill && (
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold shrink-0 ${getPillClass(
                      card.secondaryPill.variant
                    )}`}
                  >
                    {card.secondaryPill.text}
                  </span>
                )}
              </div>

              {card.href && (
                <div className="flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                  <span>{isRtl ? "عرض التفاصيل" : "View details"}</span>
                  <ArrowUpRight className={`h-3.5 w-3.5 ${isRtl ? "rotate-[-90deg]" : ""}`} />
                </div>
              )}
            </div>
          </div>
        );

        if (card.href) {
          return (
            <Link
              key={card.id}
              href={card.href}
              className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${card.hoverBorder}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-100`}
              />
              {Content}
            </Link>
          );
        }

        return (
          <div
            key={card.id}
            className={`group relative overflow-hidden rounded-3xl border border-border/50 bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${card.hoverBorder}`}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-40 transition-opacity duration-300 group-hover:opacity-100`}
            />
            {Content}
          </div>
        );
      })}
    </div>
  );
}
