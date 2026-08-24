"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  RefreshCw,
  Sparkles,
  Activity,
  Users,
  Briefcase,
  FileText,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardMetrics } from "../types";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  locale: string;
  metrics?: DashboardMetrics;
}

export function DashboardHeader({
  userName,
  userRole,
  locale,
  metrics
}: DashboardHeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const isRtl = locale === "ar";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (isRtl) {
      if (hour < 12) return "صباح الخير";
      if (hour < 18) return "مساء الخير";
      return "أهلاً بك مجدداً";
    }
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Welcome back";
  };

  const todayFormatted = new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date());

  const totalUsers = metrics?.users?.total ?? 0;
  const activeCustomers = metrics?.customers?.active ?? metrics?.customers?.total ?? 0;
  const publishedPosts = metrics?.blog_posts?.published ?? metrics?.blog_posts?.total ?? 0;
  const unreadContacts = metrics?.contact_us?.unread ?? 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card/95 to-primary/5 p-6 md:p-8 shadow-sm backdrop-blur-md transition-all">
      {/* Dynamic ambient gradients */}
      <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -start-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/5 blur-2xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Column: Greeting and Context */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              {isRtl ? "لوحة التحكم والإدارة المركزية" : "Command & Intelligence Hub"}
            </span>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <Activity className="h-3 w-3" />
              {isRtl ? "النظام نشط ومتصل" : "Live Operational"}
            </span>

            {userRole && (
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {userRole}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            {getGreeting()}
            {userName ? (
              <span className="text-primary mx-2 underline decoration-primary/30 decoration-wavy decoration-1 underline-offset-4">
                {userName}
              </span>
            ) : null}
            👋
          </h1>

          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {isRtl
              ? "متابعة شاملة لجميع مؤشرات الأداء، العملاء، حركة الزيارات، ومنشورات المدونة في الوقت الفعلي."
              : "Real-time telemetry and overview of active clients, site traffic, publications, and communications."}
          </p>

          {/* Quick Snapshot Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-xs">
              <Users className="h-3.5 w-3.5 text-blue-500" />
              <span>
                <strong className="text-foreground">{totalUsers}</strong> {isRtl ? "مستخدمين" : "Users"}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-xs">
              <Briefcase className="h-3.5 w-3.5 text-emerald-500" />
              <span>
                <strong className="text-foreground">{activeCustomers}</strong>{" "}
                {isRtl ? "عملاء نشطين" : "Active Clients"}
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background/60 px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-xs">
              <FileText className="h-3.5 w-3.5 text-purple-500" />
              <span>
                <strong className="text-foreground">{publishedPosts}</strong>{" "}
                {isRtl ? "مقالات منشورة" : "Published Articles"}
              </span>
            </div>

            {unreadContacts > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 shadow-xs">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>
                  <strong>{unreadContacts}</strong> {isRtl ? "رسائل جديدة" : "New Inquiries"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Actions and Date pill */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
          <div className="flex items-center gap-2 rounded-2xl border border-border/50 bg-background/80 px-4 py-2.5 text-xs font-medium text-muted-foreground shadow-xs">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <span className="font-semibold text-foreground">{todayFormatted}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isPending}
            className="rounded-2xl border-border/60 bg-background/80 hover:bg-muted/80 shadow-xs transition-all active:scale-95 px-4 py-2.5 h-auto font-medium"
          >
            <RefreshCw
              className={`h-4 w-4 text-muted-foreground ${
                isPending ? "animate-spin text-primary" : ""
              } ${isRtl ? "ml-2" : "mr-2"}`}
            />
            <span>{isPending ? (isRtl ? "جاري التحديث..." : "Refreshing...") : (isRtl ? "تحديث البيانات" : "Refresh")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
