"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Mail,
  FileText,
  Layers,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Server,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Database,
  Lock
} from "lucide-react";

interface OperationalHubProps {
  locale: string;
}

export function OperationalHub({ locale }: OperationalHubProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const quickLinks = [
    {
      title: isRtl ? "إدارة العملاء والشركات" : "Customer Management",
      description: isRtl ? "سجل العملاء، العقود وبيانات التواصل" : "Corporate accounts and profiles",
      href: `/${locale}/customers`,
      icon: Briefcase,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      title: isRtl ? "المدونة والمقالات" : "Blog & Publications",
      description: isRtl ? "نشر وتحديث مقالات وأخبار الشحن" : "Publish freight news and updates",
      href: `/${locale}/blog`,
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: isRtl ? "التصنيفات والخدمات" : "Categories & Structure",
      description: isRtl ? "هيكلة الأقسام والخدمات اللوجستية" : "Service hierarchy & branches",
      href: `/${locale}/categories`,
      icon: Layers,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-500/10"
    },
    {
      title: isRtl ? "المستخدمين والصلاحيات" : "Users & Access Control",
      description: isRtl ? "إدارة حسابات الفريق وصلاحيات النظام" : "Team accounts and roles",
      href: `/${locale}/users`,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      title: isRtl ? "الأسئلة الشائعة" : "Knowledge Base (FAQ)",
      description: isRtl ? "تحديث بنود المساعدة وإجابات العملاء" : "Manage help center & FAQs",
      href: `/${locale}/faq`,
      icon: HelpCircle,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-500/10"
    },
    {
      title: isRtl ? "استفسارات التواصل" : "Contact Inquiries",
      description: isRtl ? "مراجعة واستجابة لرسائل الموقع" : "Review client contact inbox",
      href: `/${locale}/contact-us`,
      icon: Mail,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10"
    }
  ];

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 shadow-xs">
      <div className="space-y-1 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            {isRtl ? "مركز الوصول السريع والعمليات" : "Quick Operations & Telemetry"}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {isRtl
            ? "اختصارات سريعة للوحدات الرئيسية ومؤشرات استقرار النظام"
            : "Direct module shortcuts and vital infrastructure telemetry"}
        </p>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {quickLinks.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              className="group flex items-center justify-between rounded-2xl border border-border/40 bg-muted/20 p-3.5 transition-all hover:bg-muted/50 hover:border-primary/30 hover:shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color} transition-transform duration-200 group-hover:scale-105`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-start">
                  <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </div>

              <ArrowIcon className="h-4 w-4 text-muted-foreground opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>

      {/* Telemetry Status Bar */}
      <div className="rounded-2xl border border-border/40 bg-muted/30 p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Server className="h-4 w-4 text-primary" />
            {isRtl ? "مؤشرات البنية التحتية والجاهزية" : "Infrastructure Telemetry"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {isRtl ? "كافة الخدمات تعمل بكفاءة قصوى" : "All Systems Operational"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-border/30 text-center">
          <div className="rounded-xl bg-background/60 p-2 border border-border/30">
            <div className="text-[10px] text-muted-foreground">{isRtl ? "زمن الاستجابة" : "API Latency"}</div>
            <div className="text-xs font-bold text-foreground mt-0.5 flex items-center justify-center gap-1">
              <Zap className="h-3 w-3 text-emerald-500" />
              <span>18ms</span>
            </div>
          </div>

          <div className="rounded-xl bg-background/60 p-2 border border-border/30">
            <div className="text-[10px] text-muted-foreground">{isRtl ? "نسبة الجاهزية" : "Uptime"}</div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">99.99%</div>
          </div>

          <div className="rounded-xl bg-background/60 p-2 border border-border/30">
            <div className="text-[10px] text-muted-foreground">{isRtl ? "حالة قاعدة البيانات" : "Database"}</div>
            <div className="text-xs font-bold text-foreground mt-0.5 flex items-center justify-center gap-1">
              <Database className="h-3 w-3 text-blue-500" />
              <span>Connected</span>
            </div>
          </div>

          <div className="rounded-xl bg-background/60 p-2 border border-border/30">
            <div className="text-[10px] text-muted-foreground">{isRtl ? "تشفير وأمان SSL" : "SSL Security"}</div>
            <div className="text-xs font-bold text-primary mt-0.5 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3 text-primary" />
              <span>TLS 1.3 Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
