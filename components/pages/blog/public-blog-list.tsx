"use client";

import { useState, useMemo } from "react";
import { Search, FileText, Layers, SlidersHorizontal } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BlogPost, getBlogText } from "@/types/blog";
import { BlogCard } from "./blog-card";
import { BlogFeaturedCard } from "./blog-featured-card";
import { BlogAdvisoryCta } from "./blog-advisory-cta";

interface PublicBlogListProps {
  posts: BlogPost[];
  locale: string;
  categories: Array<{ id: number; name: string | Record<string, string>; slug?: string }>;
}

export function PublicBlogList({ posts, locale, categories }: PublicBlogListProps) {
  const currentLocale = useLocale() || locale;
  const t = useTranslations("BlogPage");

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Category filter options
  const categoryOptions = useMemo(() => {
    const list = [{ id: "all", label: t("hero.allArticles") }];
    categories.forEach(cat => {
      const name = getBlogText(cat.name, currentLocale, cat.slug || "");
      if (name) {
        list.push({ id: cat.slug || String(cat.id), label: name });
      }
    });
    return list;
  }, [categories, currentLocale, t]);

  // Filtered posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const title = getBlogText(post.title, currentLocale, "").toLowerCase();
      const excerpt = getBlogText(post.excerpt, currentLocale, "").toLowerCase();
      const catSlug = post.category?.slug || String(post.category?.id || "");
      const tags = (post.tags || []).join(" ").toLowerCase();

      const matchesSearch =
        !searchQuery ||
        title.includes(searchQuery.toLowerCase()) ||
        excerpt.includes(searchQuery.toLowerCase()) ||
        tags.includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        catSlug === selectedCategory ||
        (post.category && getBlogText(post.category.name, currentLocale, "") === selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [posts, currentLocale, searchQuery, selectedCategory]);

  // Featured publication (shown on initial unfiltered state)
  const featuredPost = useMemo(() => {
    if (selectedCategory !== "all" || searchQuery) return null;
    return posts.find(p => Boolean(p.is_featured)) || posts[0] || null;
  }, [posts, selectedCategory, searchQuery]);

  // Regular grid posts (excluding featured post when featured banner is displayed)
  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter(p => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  return (
    <div className="w-full bg-background">
      {/* 1. Hero Header */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-muted/40 via-muted/10 to-background border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 text-center sm:text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <Layers className="h-3.5 w-3.5" />
            <span>{t("hero.eyebrow")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-4xl leading-[1.15]">
            {t("hero.title")}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t("hero.description")}
          </p>

          {/* Search Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t("hero.searchPlaceholder")}
                className="w-full h-12 ps-10 pe-4 rounded-xl border border-border/70 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute end-3.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground font-semibold px-1.5 py-0.5 rounded cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          {categoryOptions.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-medium text-muted-foreground me-1 hidden sm:inline-flex items-center gap-1">
                <SlidersHorizontal className="h-3 w-3" />
                {t("hero.filterLabel")}
              </span>
              {categoryOptions.map(cat => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 2. Featured Publication Banner */}
      {featuredPost && (
        <section className="py-12 bg-background border-b border-border/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlogFeaturedCard post={featuredPost} />
          </div>
        </section>
      )}

      {/* 3. Articles Grid */}
      <section className="py-14 sm:py-16 md:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              {searchQuery
                ? `${t("list.searchResults")} (${filteredPosts.length})`
                : selectedCategory !== "all"
                ? `${categoryOptions.find(c => c.id === selectedCategory)?.label || ""} (${filteredPosts.length})`
                : t("list.allPublications")}
            </h2>
            <span className="text-xs text-muted-foreground">
              {filteredPosts.length} {t("list.articlesCount")}
            </span>
          </div>

          {gridPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border/80 bg-muted/20 py-16 px-6 text-center space-y-4">
              <FileText className="h-12 w-12 text-muted-foreground/40 mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  {t("list.emptyTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                  {t("list.emptyDesc")}
                </p>
              </div>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {t("list.resetFilters")}
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {gridPosts.map(post => (
                <BlogCard key={post.id} post={post} variant="default" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Advisory Newsletter CTA */}
      <BlogAdvisoryCta />
    </div>
  );
}
