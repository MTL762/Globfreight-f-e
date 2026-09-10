"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, FileText, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BlogPost, formatBlogDate, getBlogText, estimateReadTime } from "@/types/blog";

export interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact" | "home";
  showAuthor?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export function BlogCard({
  post,
  variant = "default",
  showAuthor = true,
  showExcerpt = true,
  className = ""
}: BlogCardProps) {
  const locale = useLocale();
  const t = useTranslations("BlogPage");
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const title = getBlogText(post.title, locale, "Untitled Article");
  const excerpt = getBlogText(post.excerpt, locale, "");
  const catName = post.category ? getBlogText(post.category.name, locale, "") : "";
  const tag = catName || post.tags?.[0] || t("card.defaultTag");
  const readTime = estimateReadTime(getBlogText(post.content, locale));
  const date = formatBlogDate(post.published_at || post.created_at, locale);
  const href = post.slug ? `/blog/${post.slug}` : "/blog";

  const isHome = variant === "home";
  const isCompact = variant === "compact";

  return (
    <article
      className={`group rounded-2xl border border-border/80 bg-card overflow-hidden flex flex-col justify-between shadow-xs hover:border-primary/50 hover:shadow-md transition-all duration-300 ${className}`}
    >
      <div>
        {/* Thumbnail Image */}
        <div
          className={`relative w-full overflow-hidden bg-muted ${
            isHome ? "h-48 sm:h-52" : isCompact ? "h-44" : "h-48 sm:h-52"
          }`}
        >
          {post.image ? (
            <Image
              src={post.image}
              alt={title}
              fill
              sizes={
                isHome
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              }
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted via-muted/50 to-background">
              <FileText className="h-10 w-10 text-muted-foreground/30" />
            </div>
          )}

          {/* Gradient Overlay for Home Variant */}
          {isHome && (
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          )}

          {/* Category Tag or Featured Pill */}
          <div className="absolute top-3 start-3">
            {post.is_featured && isHome ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/95 text-white px-3 py-0.5 text-[11px] font-bold backdrop-blur-md shadow-xs">
                <Sparkles className="h-3 w-3" />
                <span>{t("featured.badge")}</span>
              </span>
            ) : (
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-background/90 text-primary backdrop-blur-md px-2.5 py-1 rounded-full border border-border/40 shadow-xs">
                {tag}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className={`space-y-3 ${isHome ? "p-6 sm:p-7" : isCompact ? "p-4 sm:p-5" : "p-5 sm:p-6"}`}>
          {/* Metadata: Date & Reading Time */}
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            {isHome ? (
              <span className="inline-block text-[11px] font-bold text-primary uppercase tracking-wider">
                {tag}
              </span>
            ) : null}

            <div className="flex items-center gap-3 ms-auto">
              {date && (
                <span className="inline-flex items-center gap-1 text-[11px]">
                  <Calendar className="h-3 w-3" />
                  {date}
                </span>
              )}
              {!isHome && (
                <span className="inline-flex items-center gap-1 text-[11px]">
                  <Clock className="h-3 w-3" />
                  {readTime} {t("card.min")}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 ${
              isHome ? "text-lg sm:text-xl" : isCompact ? "text-sm sm:text-base" : "text-base sm:text-lg"
            }`}
          >
            <Link href={href}>{title}</Link>
          </h3>

          {/* Excerpt */}
          {showExcerpt && excerpt && (
            <p
              className={`text-muted-foreground leading-relaxed ${
                isCompact ? "text-xs line-clamp-2" : "text-xs sm:text-sm line-clamp-3"
              }`}
            >
              {excerpt}
            </p>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div
        className={`pt-0 border-t border-border/40 flex items-center justify-between ${
          isHome ? "p-6 sm:p-7 border-t-border/50" : isCompact ? "p-4 sm:p-5" : "p-5 sm:p-6"
        }`}
      >
        {showAuthor && post.author ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-foreground">
              {post.author.name?.charAt(0).toUpperCase() || "G"}
            </div>
            <span className="text-[11px] font-medium line-clamp-1">{post.author.name}</span>
          </div>
        ) : (
          <span />
        )}

        <Link
          href={href}
          className={`font-semibold text-primary inline-flex items-center gap-1 group/btn ${
            isHome ? "text-xs sm:text-sm gap-1.5" : "text-xs"
          }`}
        >
          <span>{isHome ? t("card.readAnalysis") : t("card.readMore")}</span>
          <ArrowIcon
            size={isHome ? 14 : 12}
            className="transition-transform group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
