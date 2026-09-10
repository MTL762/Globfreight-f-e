"use client";

import { useTranslations } from "next-intl";
import { BlogPost } from "@/types/blog";

export interface BlogAuthorBioProps {
  author?: BlogPost["author"];
  className?: string;
}

export function BlogAuthorBio({ author, className = "" }: BlogAuthorBioProps) {
  const t = useTranslations("BlogPage.detail");

  const name = author?.name || t("authorTitle");
  const initial = (name ? name.charAt(0) : "G").toUpperCase();

  return (
    <div
      className={`rounded-3xl border border-border/60 bg-muted/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 ${className}`}
    >
      <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl border border-primary/20 shrink-0">
        {initial}
      </div>
      <div className="space-y-2 text-center sm:text-start">
        <div className="space-y-0.5">
          <h4 className="text-base font-bold text-foreground">{name}</h4>
          <p className="text-xs text-primary font-semibold">{t("authorSubtitle")}</p>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t("authorBio")}
        </p>
      </div>
    </div>
  );
}
