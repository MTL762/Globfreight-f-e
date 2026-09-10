"use client";

import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export interface BlogAdvisoryCtaProps {
  className?: string;
}

export function BlogAdvisoryCta({ className = "" }: BlogAdvisoryCtaProps) {
  const locale = useLocale();
  const t = useTranslations("BlogPage.cta");
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className={`py-16 bg-muted/30 border-t border-border/60 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-r from-card via-card to-primary/5 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="space-y-2 max-w-xl text-center md:text-start">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {t("eyebrow")}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              {t("title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
            >
              <span>{t("specialistButton")}</span>
              <ArrowIcon size={16} />
            </Link>
            <Link
              href="/quote"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-muted active:scale-[0.98] transition-all shadow-xs"
            >
              <span>{t("quoteButton")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
