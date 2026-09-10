"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Calendar,
  Clock,
  Eye,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Tag,
  ChevronRight,
  ChevronLeft,
  Layers,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { BlogPost, formatBlogDate, getBlogText, estimateReadTime } from "@/types/blog";
import { BlogCard } from "./blog-card";
import { BlogAuthorBio } from "./blog-author-bio";

interface PublicBlogDetailProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
}

export function PublicBlogDetail({ post, relatedPosts, locale }: PublicBlogDetailProps) {
  const currentLocale = useLocale() || locale;
  const t = useTranslations("BlogPage");
  const isRtl = currentLocale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const [copied, setCopied] = useState(false);

  const title = getBlogText(post.title, currentLocale, "Untitled Article");
  const excerpt = getBlogText(post.excerpt, currentLocale, "");
  const contentHtml = getBlogText(post.content, currentLocale, "");
  const categoryName = post.category
    ? getBlogText(post.category.name, currentLocale, post.category.slug || "")
    : "";
  const subCategoryName = post.sub_category
    ? getBlogText(post.sub_category.name, currentLocale, post.sub_category.slug || "")
    : "";
  const date = formatBlogDate(post.published_at || post.created_at, currentLocale);
  const readTime = estimateReadTime(contentHtml);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success(t("detail.copySuccess"));
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      toast.error(t("detail.copyError"));
    }
  };

  const handleShare = (platform: "twitter" | "linkedin") => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(title);

    const shareUrl =
      platform === "twitter"
        ? `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="w-full bg-background min-h-screen">
      {/* 1. Breadcrumb Bar */}
      <div className="border-b border-border/60 bg-muted/20 py-3.5">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              {t("detail.home")}
            </Link>
            <ChevronIcon className="h-3 w-3 shrink-0 opacity-50" />
            <Link href="/blog" className="hover:text-foreground transition-colors">
              {t("detail.blog")}
            </Link>
            {categoryName && (
              <>
                <ChevronIcon className="h-3 w-3 shrink-0 opacity-50" />
                <span className="text-muted-foreground">{categoryName}</span>
              </>
            )}
            <ChevronIcon className="h-3 w-3 shrink-0 opacity-50" />
            <span className="text-foreground font-medium line-clamp-1 max-w-[220px] sm:max-w-xs">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Article Header */}
      <header className="pt-10 pb-8 sm:pt-14 sm:pb-10 border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3">
            {categoryName && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                <Layers className="h-3.5 w-3.5" />
                {categoryName}
              </span>
            )}
            {subCategoryName && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60">
                {subCategoryName}
              </span>
            )}
            {post.is_featured ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Sparkles className="h-3 w-3" />
                {t("detail.featured")}
              </span>
            ) : null}
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.2]">
            {title}
          </h1>

          {/* Subtitle / Excerpt Lead */}
          {excerpt && (
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
              {excerpt}
            </p>
          )}

          {/* Author, Date, Reading Time, Share */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                {post.author?.name?.charAt(0).toUpperCase() || "G"}
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-foreground text-sm">
                  {post.author?.name || t("detail.authorTitle")}
                </p>
                <div className="flex items-center gap-3 text-muted-foreground">
                  {date && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {date}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {readTime} {t("detail.minRead")}
                  </span>
                  {post.views_count !== undefined && post.views_count > 0 && (
                    <span className="inline-flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views_count.toLocaleString(currentLocale)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
                className="h-9 px-3 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                LinkedIn
              </button>
              <button
                type="button"
                onClick={() => handleShare("twitter")}
                aria-label="Share on X"
                className="h-9 px-3 rounded-xl border border-border/70 bg-card hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                X (Twitter)
              </button>
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy link"
                className="h-9 px-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-xs font-semibold text-primary transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copied ? t("detail.copied") : t("detail.copyLink")}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Image Banner */}
      {post.image && (
        <div className="py-8 sm:py-10 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden bg-muted border border-border/70 shadow-sm">
              <Image
                src={post.image}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Article Content Body */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-3xl border border-border/60 p-6 sm:p-10 md:p-14 shadow-xs">
            {/* HTML Article Content */}
            <div
              className="prose prose-base sm:prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:leading-relaxed prose-p:text-muted-foreground sm:prose-p:text-base
                prose-strong:text-foreground prose-strong:font-bold
                prose-ul:my-6 prose-li:text-muted-foreground
                prose-blockquote:border-s-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:italic
                prose-img:rounded-2xl prose-img:border prose-img:border-border/60
                prose-a:text-primary prose-a:underline hover:prose-a:opacity-80 transition-opacity"
              dangerouslySetInnerHTML={{ __html: contentHtml || `<p>${excerpt}</p>` }}
            />

            {/* Tags & Keywords */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border/60 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Topic Tags:</span>
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-muted text-xs font-medium text-foreground border border-border/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Share & Action Bar */}
            <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                {t("detail.sharePrompt")}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                  <span>{copied ? t("detail.copied") : t("detail.shareArticle")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Author Box Component */}
          <BlogAuthorBio author={post.author} className="mt-8" />
        </div>
      </section>

      {/* 5. Related Publications */}
      {relatedPosts.length > 0 && (
        <section className="py-14 sm:py-16 bg-muted/20 border-t border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {t("detail.relatedEyebrow")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  {t("detail.relatedTitle")}
                </h3>
              </div>
              <Link
                href="/blog"
                className="text-xs sm:text-sm font-semibold text-primary inline-flex items-center gap-1.5 hover:gap-2.5 transition-all w-fit"
              >
                <span>{t("detail.browseAll")}</span>
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(item => (
                <BlogCard key={item.id} post={item} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Bottom Navigation CTA */}
      <section className="py-12 bg-background border-t border-border/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            {isRtl ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            <span>{t("detail.backToAll")}</span>
          </Link>

          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-xs"
          >
            <span>{t("detail.consultationCta")}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
