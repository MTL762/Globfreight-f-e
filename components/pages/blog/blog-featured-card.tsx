"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, Sparkles, FileText, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BlogPost, formatBlogDate, getBlogText, estimateReadTime } from "@/types/blog";

export interface BlogFeaturedCardProps {
  post: BlogPost;
  priority?: boolean;
  className?: string;
}

export function BlogFeaturedCard({
  post,
  priority = true,
  className = ""
}: BlogFeaturedCardProps) {
  const locale = useLocale();
  const t = useTranslations("BlogPage");
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const title = getBlogText(post.title, locale, "Featured Publication");
  const excerpt = getBlogText(post.excerpt, locale, "");
  const content = getBlogText(post.content, locale, "");
  const categoryName = post.category
    ? getBlogText(post.category.name, locale, post.category.slug || "")
    : "";
  const date = formatBlogDate(post.published_at || post.created_at, locale);
  const readTime = estimateReadTime(content);
  const href = post.slug ? `/blog/${post.slug}` : "/blog";

  return (
    <div
      className={`group relative rounded-3xl border border-border/70 bg-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 ${className}`}
    >
      {/* Media Column */}
      <div className="relative lg:col-span-6 h-64 sm:h-80 lg:h-auto min-h-[280px] bg-muted overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-muted">
            <FileText className="h-16 w-16 text-primary/30" />
          </div>
        )}

        <div className="absolute top-4 start-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500 text-white px-3 py-1 text-xs font-bold shadow-md backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{t("featured.badge")}</span>
        </div>
      </div>

      {/* Content Column */}
      <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {categoryName && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 font-bold uppercase tracking-wider text-[11px]">
                {categoryName}
              </span>
            )}
            {date && (
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {readTime} {t("featured.minRead", { defaultValue: t("card.minRead") })}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
            <Link href={href}>{title}</Link>
          </h2>

          {excerpt && (
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-[11px] font-medium bg-muted/70 text-muted-foreground px-2.5 py-0.5 rounded-md"
                >
                  <Tag className="h-2.5 w-2.5 opacity-60" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          {post.author && (
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                {post.author.name?.charAt(0).toUpperCase() || "G"}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-muted-foreground">{t("featured.authorRole")}</p>
              </div>
            </div>
          )}

          <Link
            href={href}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-xs ms-auto"
          >
            <span>{t("featured.readAnalysis")}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
