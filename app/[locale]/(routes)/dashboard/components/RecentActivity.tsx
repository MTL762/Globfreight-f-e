import React from "react";
import {
  MessageSquare,
  UserPlus,
  FileText,
  Clock,
  CheckCircle2,
  Inbox
} from "lucide-react";
import { ActivityItem } from "../types";

interface RecentActivityProps {
  activities: ActivityItem[];
  locale: string;
}

export function RecentActivity({ activities, locale }: RecentActivityProps) {
  const isRtl = locale === "ar";

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "customer":
      case "user":
        return <UserPlus className="h-4 w-4 text-emerald-500" />;
      case "post":
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
    }
  };

  const getBadgeStyle = (type: ActivityItem["type"]) => {
    switch (type) {
      case "message":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "customer":
      case "user":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "post":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border/50 bg-card p-6 shadow-sm">
      <div className="space-y-1 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Clock className="h-4 w-4" />
          </div>
          <h2 className="text-lg font-bold text-foreground">
            {isRtl ? "سجل الأنشطة الحديثة" : "Recent Activity Feed"}
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {isRtl
            ? "أحدث التفاعلات، الرسائل، والمستجدات على النظام"
            : "Latest interactions, contact submissions, and module updates"}
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <Inbox className="h-10 w-10 stroke-1 mb-2 opacity-50" />
          <p className="text-sm font-medium">
            {isRtl ? "لا توجد أنشطة حديثة حالياً" : "No recent activity recorded"}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isRtl ? "ستظهر الإشعارات والتفاعلات الجديدة هنا" : "New updates and inquiries will stream in here"}
          </p>
        </div>
      ) : (
        <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
          {activities.map((item) => (
            <div
              key={item.id}
              className="group flex items-start gap-3.5 rounded-2xl border border-border/40 bg-muted/20 p-3.5 transition-all hover:bg-muted/40 hover:border-border/80"
            >
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background border border-border/60 shadow-xs">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-medium text-muted-foreground shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                {item.badge ? (
                  <span
                    className={`inline-block rounded-md border px-1.5 py-0.2 text-[10px] font-semibold mt-1 ${getBadgeStyle(
                      item.type
                    )}`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
