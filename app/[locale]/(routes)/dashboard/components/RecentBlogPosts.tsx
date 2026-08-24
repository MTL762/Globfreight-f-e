"use client";

import Link from "next/link";
import {
  FileText,
  Tag,
  Eye,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Layers
} from "lucide-react";
import { RecentBlogPost, getLocalizedText } from "../types";

interface RecentBlogPostsProps {
  posts?: RecentBlogPost[];
  locale: string;
}

export function RecentBlogPosts({ posts = [], locale }: RecentBlogPostsProps) {
  const isRtl = locale === "ar";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
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
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <FileText className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {isRtl ? "أحدث مقالات ومنشورات المدونة" : "Recent Published Articles"}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {isRtl
              ? "مستجدات المحتوى الإخباري والتقارير المنشورة"
              : "Latest logistics thought leadership and content releases"}
          </p>
        </div>

        <Link
          href={`/${locale}/blog`}
          className="group inline-flex items-center gap-1.5 rounded-xl border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:bg-muted/70 hover:border-border"
        >
          <span>{isRtl ? "عرض الكل" : "View All"}</span>
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
          <FileText className="h-10 w-10 stroke-1 mb-2 opacity-40" />
          <p className="text-sm font-medium">
            {isRtl ? "لا توجد منشورات حتى الآن" : "No recent articles found"}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {posts.map((post) => {
            const title = getLocalizedText(post.title, locale, "Untitled Post");
            const excerpt = getLocalizedText(post.excerpt, locale, "");
            const categoryName = post.category?.name
              ? getLocalizedText(post.category.name, locale, post.category.slug || "")
              : null;

            return (
              <div
                key={post.id}
                className="group relative overflow-hidden rounded-2xl border border-border/40 bg-muted/20 p-4 transition-all duration-200 hover:bg-muted/40 hover:border-purple-500/30 hover:shadow-xs"
              >
                <div className="flex flex-col gap-3">
                  {/* Top metadata row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {categoryName && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                          <Layers className="h-3 w-3" />
                          {categoryName}
                        </span>
                      )}

                      {post.is_featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          <Sparkles className="h-2.5 w-2.5" />
                          {isRtl ? "مميز" : "Featured"}
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                          post.status === "published"
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {post.status === "published"
                          ? isRtl
                            ? "منشور"
                            : "Published"
                          : post.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{(post.views_count ?? 0).toLocaleString(locale)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {title}
                    </h3>
                    {excerpt && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {excerpt}
                      </p>
                    )}
                  </div>

                  {/* Bottom tags & Author */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/30 text-xs">
                    {post.author && (
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                          {post.author.name?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <span className="text-[11px] font-medium">{post.author.name}</span>
                      </div>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        {post.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-md bg-background border border-border/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
                          >
                            <Tag className="h-2.5 w-2.5 opacity-60" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
