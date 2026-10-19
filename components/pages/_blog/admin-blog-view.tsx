"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Edit3,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Globe2,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Calendar,
  Clock,
  Sparkles,
  Tag,
  Folder,
  Layers,
  Search,
  Code,
  FileText,
  BarChart3,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { BlogPost, formatBlogDate, getBlogText, estimateReadTime } from "@/types/blog";
import { BlogAuthorBio } from "@/components/pages/blog/blog-author-bio";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import type { blog } from "@/app/[locale]/(routes)/admin/blog/types";

const LOCALES = [
  { code: "ar", label: "العربية", flag: "🇸🇦", dir: "rtl" },
  { code: "en", label: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱", dir: "ltr" },
  { code: "fr", label: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", label: "Deutsch", flag: "🇩🇪", dir: "ltr" }
] as const;

type DeviceMode = "desktop" | "tablet" | "mobile";
type ActiveTab = "preview" | "seo" | "metadata";

interface AdminBlogViewProps {
  blogData: blog | BlogPost;
}

export default function AdminBlogView({ blogData }: AdminBlogViewProps) {
  const adminLocale = useLocale() || "en";
  const t = useTranslations("BlogPage");

  // Cast for uniform field access
  const post = blogData as unknown as BlogPost;

  const [activeTab, setActiveTab] = useState<ActiveTab>("preview");
  const [previewLocale, setPreviewLocale] = useState<string>(adminLocale);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [serpDevice, setSerpDevice] = useState<"desktop" | "mobile">("desktop");

  const currentLangConfig = LOCALES.find((l) => l.code === previewLocale) || LOCALES[1];
  const isRtl = currentLangConfig.dir === "rtl";
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  // Localized values based on the currently selected preview language
  const title = getBlogText(post.title, previewLocale, "Untitled Article");
  const excerpt = getBlogText(post.excerpt, previewLocale, "");
  const contentHtml = getBlogText(post.content, previewLocale, "");
  const postImage = getBlogText(post.image, previewLocale, "");
  const imageAlt = getBlogText(post.image_alt, previewLocale, title);

  const catSlugFallback = post.category ? getBlogText(post.category.slug, previewLocale, "") : "";
  const categoryName = post.category
    ? getBlogText(post.category.name, previewLocale, catSlugFallback)
    : "";

  const subCatSlugFallback = post.sub_category ? getBlogText(post.sub_category.slug, previewLocale, "") : "";
  const subCategoryName = post.sub_category
    ? getBlogText(post.sub_category.name, previewLocale, subCatSlugFallback)
    : "";

  const currentSlug = getBlogText(post.slug, previewLocale, "");
  const publicPath = currentSlug ? `/${previewLocale}/blog/${encodeURIComponent(decodeURIComponent(currentSlug))}` : "";

  const publishedDate = formatBlogDate(post.published_at || post.created_at, previewLocale);
  const updatedDate = post.updated_at ? formatBlogDate(post.updated_at, previewLocale) : "";
  const isUpdated = Boolean(
    post.updated_at &&
    updatedDate &&
    updatedDate !== publishedDate &&
    new Date(post.updated_at).getTime() > new Date(post.published_at || post.created_at || 0).getTime() + 86400000
  );

  const readTime = estimateReadTime(contentHtml);

  // SEO fields
  const metaTitle = getBlogText(post.seo?.meta_title || post.seo_meta_title, previewLocale) || `${title} | Globfreight`;
  const metaDescription =
    getBlogText(post.seo?.meta_description || post.seo_meta_description, previewLocale) ||
    excerpt ||
    "Globfreight supply chain and logistics intelligence article.";
  const focusKeyphrase = getBlogText(post.seo?.focus_keyphrase || post.seo_focus_keyphrase, previewLocale);
  const canonicalUrl = post.seo?.canonical_url || post.seo_canonical_url || (currentSlug ? `https://globfreight.com${publicPath}` : "");
  const ogTitle = getBlogText(post.seo?.og_title, previewLocale) || metaTitle;
  const ogDescription = getBlogText(post.seo?.og_description, previewLocale) || metaDescription;
  const ogImage = post.seo?.og_image || postImage;
  const twitterTitle = getBlogText(post.seo?.twitter_title, previewLocale) || ogTitle;
  const twitterDescription = getBlogText(post.seo?.twitter_description, previewLocale) || ogDescription;
  const twitterImage = post.seo?.twitter_image || ogImage;

  // Tags list
  const tagsList = (() => {
    if (Array.isArray(post.tags)) return post.tags;
    if (typeof post.tags === "object" && post.tags !== null) {
      return (post.tags as Record<string, string[]>)[previewLocale] || (post.tags as Record<string, string[]>).en || [];
    }
    return [];
  })();

  // Word & character counts
  const cleanBodyText = contentHtml ? contentHtml.replace(/<[^>]*>/g, " ").trim() : "";
  const wordCount = cleanBodyText ? cleanBodyText.split(/\s+/).filter(Boolean).length : 0;
  const charCount = cleanBodyText.length;

  const handleCopyPublicUrl = async () => {
    if (typeof window === "undefined") return;
    const origin = window.location.origin;
    const fullUrl = publicPath ? `${origin}${publicPath}` : window.location.href;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopiedLink(true);
      toast.success(adminLocale === "ar" ? "تم نسخ الرابط بنجاح" : "Public link copied to clipboard");
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      toast.error(adminLocale === "ar" ? "فشل نسخ الرابط" : "Failed to copy link");
    }
  };

  // Generate Article JSON-LD preview
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt || metaDescription,
    image: postImage ? [postImage] : [],
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      "@type": "Person",
      name: post.author?.name || "Globfreight Logistics Analysts",
      ...(post.author?.bio ? { description: post.author.bio } : {})
    },
    publisher: {
      "@type": "Organization",
      name: "Globfreight",
      logo: {
        "@type": "ImageObject",
        url: "https://globfreight.com/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonLdArticle, null, 2));
      setCopiedSchema(true);
      toast.success(adminLocale === "ar" ? "تم نسخ كود الـ Schema" : "Schema JSON-LD copied!");
      setTimeout(() => setCopiedSchema(false), 2500);
    } catch {
      toast.error("Failed to copy Schema");
    }
  };

  // Language coverage check
  const getLocaleCoverage = (code: string) => {
    const hasTitle = Boolean(getBlogText(post.title, code, ""));
    const hasExcerpt = Boolean(getBlogText(post.excerpt, code, ""));
    const hasContent = Boolean(getBlogText(post.content, code, ""));
    const hasSlug = Boolean(getBlogText(post.slug, code, ""));
    const isLive = post.published_locales ? post.published_locales.includes(code) : true;
    return { hasTitle, hasExcerpt, hasContent, hasSlug, isLive };
  };

  return (
    <div className="w-full space-y-6 pb-20">
      {/* 1. TOP ADMIN CONTROL BAR */}
      <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Back button & Title summary */}
          <div className="flex items-start sm:items-center gap-3">
            <Link
              href="/admin/blog"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-muted/40 text-foreground hover:bg-muted transition-colors"
              title={adminLocale === "ar" ? "العودة لقائمة المقالات" : "Back to Blog List"}
            >
              {adminLocale === "ar" ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            </Link>

            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/60">
                  #{post.id}
                </span>

                {/* Status Badge */}
                {post.status === "published" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {adminLocale === "ar" ? "منشور مباشر" : "Published"}
                  </span>
                ) : post.status === "draft" ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                    {adminLocale === "ar" ? "مسودة" : "Draft"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border border-zinc-500/25">
                    {post.status || "Archived"}
                  </span>
                )}

                {/* Featured Badge */}
                {post.is_featured ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Sparkles className="h-3 w-3" />
                    <span>{adminLocale === "ar" ? "مقالة مميزة" : "Featured"}</span>
                  </span>
                ) : null}

                {/* Views Count */}
                {post.views_count !== undefined && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium px-2 py-0.5 rounded-md bg-muted/40">
                    <Eye className="h-3 w-3" />
                    <span>{post.views_count.toLocaleString()}</span>
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-bold text-foreground truncate max-w-xl">
                {title}
              </h2>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Copy public link */}
            <button
              type="button"
              onClick={handleCopyPublicUrl}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-border/80 bg-background hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
              <span>{copiedLink ? (adminLocale === "ar" ? "تم النسخ" : "Copied!") : (adminLocale === "ar" ? "نسخ الرابط" : "Copy Link")}</span>
            </button>

            {/* View live public article in new tab */}
            {publicPath && (
              <a
                href={publicPath}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-xs font-semibold text-primary transition-colors cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>{adminLocale === "ar" ? "فتح في الموقع" : "View Live"}</span>
              </a>
            )}

            {/* Edit button */}
            <Link
              href={`/admin/blog/${post.id}/edit`}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{adminLocale === "ar" ? "تعديل المقال" : "Edit Post"}</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="mt-5 pt-4 border-t border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "preview"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Eye className="h-3.5 w-3.5 text-primary" />
              <span>{adminLocale === "ar" ? "معاينة كالموقع" : "Site Preview"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "seo"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Search className="h-3.5 w-3.5 text-blue-500" />
              <span>{adminLocale === "ar" ? "تحسين محركات البحث SEO" : "SEO & Social"}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("metadata")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === "metadata"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-500" />
              <span>{adminLocale === "ar" ? "البيانات والتحليلات" : "Metadata & Analytics"}</span>
            </button>
          </div>

          {/* Language Switcher Controls */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1 me-1">
              <Globe2 className="h-3.5 w-3.5 text-primary" />
              <span>{adminLocale === "ar" ? "لغة العرض:" : "Preview Lang:"}</span>
            </span>

            {LOCALES.map((lang) => {
              const coverage = getLocaleCoverage(lang.code);
              const isSelected = previewLocale === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setPreviewLocale(lang.code)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${isSelected
                      ? "bg-primary text-primary-foreground shadow-xs ring-2 ring-primary/30"
                      : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                    }`}
                  title={`${lang.label} - ${coverage.hasContent ? "Has Content" : "No Content"}`}
                >
                  <span>{lang.flag}</span>
                  <span className="uppercase text-[11px]">{lang.code}</span>
                  {coverage.hasContent ? (
                    <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-emerald-500"}`} />
                  ) : (
                    <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white/60" : "bg-muted-foreground/40"}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. TAB CONTENT: SITE PREVIEW */}
      {activeTab === "preview" && (
        <div className="space-y-4">
          {/* Device Viewport Bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 bg-muted/40 p-2.5 px-4 rounded-xl border border-border/60 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span className="font-semibold text-foreground">
                {adminLocale === "ar" ? "المعاينة كما يراها زوار الموقع" : "Interactive Public Viewport"}
              </span>
              <span>•</span>
              <span className="font-mono text-muted-foreground">
                {previewLocale.toUpperCase()} ({currentLangConfig.label})
              </span>
            </div>

            <div className="flex items-center gap-1 bg-background p-1 rounded-lg border border-border/60">
              <button
                type="button"
                onClick={() => setDeviceMode("desktop")}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceMode === "desktop" ? "bg-primary text-primary-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                title="Desktop View (Full Width)"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("tablet")}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceMode === "tablet" ? "bg-primary text-primary-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                title="Tablet View (768px)"
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode("mobile")}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${deviceMode === "mobile" ? "bg-primary text-primary-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                title="Mobile View (Phone Simulation)"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Viewport Render Container */}
          <div className="flex justify-center w-full transition-all duration-300">
            <div
              className={`transition-all duration-300 w-full ${deviceMode === "desktop"
                  ? "max-w-5xl"
                  : deviceMode === "tablet"
                    ? "max-w-2xl border-4 border-muted rounded-3xl shadow-xl overflow-hidden"
                    : "max-w-[400px] border-8 border-zinc-800 dark:border-zinc-700 rounded-[44px] shadow-2xl overflow-hidden bg-background"
                }`}
            >
              {/* Smartphone Bezel Header when in mobile mode */}
              {deviceMode === "mobile" && (
                <div className="bg-zinc-800 dark:border-zinc-700 text-zinc-300 text-[11px] py-2 px-6 flex items-center justify-between select-none">
                  <span className="font-semibold">9:41</span>
                  <div className="h-4 w-20 bg-zinc-950 rounded-full flex items-center justify-center">
                    <span className="h-1.5 w-1.5 bg-zinc-800 rounded-full" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px]">5G</span>
                    <span className="h-2 w-3.5 border border-zinc-400 rounded-xs flex items-center p-0.5">
                      <span className="h-full w-full bg-zinc-300 rounded-2xs" />
                    </span>
                  </div>
                </div>
              )}

              {/* The Actual Public Site Presentation */}
              <article
                dir={isRtl ? "rtl" : "ltr"}
                className="w-full bg-background rounded-2xl border border-border/80 overflow-hidden shadow-xs"
              >
                {/* 1. Breadcrumb Bar */}
                <div className="border-b border-border/60 bg-muted/20 py-3.5">
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center flex-wrap gap-1.5 text-xs text-muted-foreground">
                      <span>{t("detail.home") || "Home"}</span>
                      <ChevronIcon className="h-3 w-3 shrink-0 opacity-50" />
                      <span>{t("detail.blog") || "Blog"}</span>
                      {categoryName && (
                        <>
                          <ChevronIcon className="h-3 w-3 shrink-0 opacity-50" />
                          <span className="text-primary font-medium">{categoryName}</span>
                        </>
                      )}
                      <ChevronIcon className="h-3 w-3 shrink-0 opacity-50" />
                      <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">
                        {title}
                      </span>
                    </nav>
                  </div>
                </div>

                {/* 2. Article Header */}
                <header className="pt-8 pb-8 sm:pt-12 sm:pb-10 border-b border-border/60 bg-gradient-to-b from-muted/30 via-background to-background">
                  <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Badges & Meta */}
                    <div className="flex flex-wrap items-center gap-3">
                      {categoryName && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                          <Layers className="h-3.5 w-3.5" />
                          <span>{categoryName}</span>
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
                          <span>{t("detail.featured") || "Featured"}</span>
                        </span>
                      ) : null}
                    </div>

                    {/* Main Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.25]">
                      {title}
                    </h1>

                    {/* Subtitle / Excerpt Lead */}
                    {excerpt && (
                      <p className="text-sm sm:text-base md:text-xl text-muted-foreground leading-relaxed font-normal">
                        {excerpt}
                      </p>
                    )}

                    {/* Author, Dates, Reading Time, Share */}
                    <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60">
                      {/* Author & Published/Updated Dates */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 shrink-0">
                          {post.author?.name?.charAt(0).toUpperCase() || "G"}
                        </div>
                        <div className="text-xs space-y-1">
                          <p className="font-bold text-foreground text-sm">
                            {post.author?.name || t("detail.authorTitle") || "Globfreight Logistics Analysts"}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
                            {publishedDate && (
                              <span className="inline-flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground/70" />
                                <span>
                                  {t("detail.published") || "Published"}:{" "}
                                  <time className="font-medium text-foreground">{publishedDate}</time>
                                </span>
                              </span>
                            )}
                            {isUpdated && (
                              <span className="inline-flex items-center gap-1 text-primary">
                                <Clock className="h-3 w-3 text-primary" />
                                <span>
                                  {t("detail.updated") || "Updated"}:{" "}
                                  <time className="font-semibold">{updatedDate}</time>
                                </span>
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground/70" />
                              <span>{readTime} {t("detail.minRead") || "min read"}</span>
                            </span>
                            {post.views_count !== undefined && post.views_count > 0 && (
                              <span className="inline-flex items-center gap-1">
                                <Eye className="h-3 w-3 text-muted-foreground/70" />
                                <span>{post.views_count.toLocaleString(previewLocale)}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Social Share Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleCopyPublicUrl}
                          className="h-9 px-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-xs font-semibold text-primary transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                          <span>{copiedLink ? (t("detail.copied") || "Copied!") : (t("detail.copyLink") || "Copy Link")}</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </header>

                {/* 3. Hero Image Banner */}
                {postImage ? (
                  <div className="py-6 sm:py-8 bg-background">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                      <div className="relative w-full h-[240px] sm:h-[380px] md:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden bg-muted border border-border/70 shadow-xs">
                        <Image
                          src={postImage}
                          alt={imageAlt}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 896px"
                          className="object-cover"
                        />
                      </div>
                      {imageAlt && imageAlt !== title && (
                        <p className="mt-2 text-center text-xs text-muted-foreground italic">
                          {imageAlt}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="py-4 px-4 sm:px-8 text-center text-xs text-muted-foreground">
                    <div className="mx-auto max-w-4xl p-6 rounded-2xl border border-dashed border-border/80 bg-muted/20">
                      {adminLocale === "ar" ? "لم يتم إرفاق صورة غلاف رئيسية لهذا المقال" : "No hero cover image uploaded for this post."}
                    </div>
                  </div>
                )}

                {/* 4. Article Content Body */}
                <section className="py-6 sm:py-10 bg-background">
                  <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-card rounded-2xl sm:rounded-3xl border border-border/60 p-5 sm:p-10 md:p-12 shadow-2xs">
                      {/* HTML Article Content */}
                      {contentHtml ? (
                        <div
                          dir={isRtl ? "rtl" : "ltr"}
                          className={`prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none text-start
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                            prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                            prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                            prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:my-4
                            prose-strong:text-foreground prose-strong:font-bold
                            prose-ul:my-5 prose-ul:list-disc prose-ul:ps-6 prose-li:my-1.5 prose-li:text-muted-foreground
                            prose-ol:my-5 prose-ol:list-decimal prose-ol:ps-6
                            prose-table:w-full prose-table:my-6 prose-table:border-collapse prose-table:border prose-table:border-border/70 prose-table:rounded-xl prose-table:overflow-hidden
                            prose-th:bg-muted/60 prose-th:p-3 prose-th:text-start prose-th:font-bold prose-th:text-foreground prose-th:border prose-th:border-border/60
                            prose-td:p-3 prose-td:border prose-td:border-border/60 prose-td:text-muted-foreground prose-tr:even:bg-muted/15
                            prose-blockquote:border-s-4 prose-blockquote:border-s-primary prose-blockquote:bg-muted/30 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-e-xl prose-blockquote:italic prose-blockquote:text-foreground/90 prose-blockquote:my-6
                            prose-img:rounded-2xl prose-img:border prose-img:border-border/60 prose-img:my-6 prose-img:shadow-sm prose-img:max-w-full prose-img:h-auto
                            prose-a:text-primary prose-a:font-medium prose-a:underline hover:prose-a:opacity-80 transition-opacity
                            prose-code:font-mono prose-code:text-xs prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-foreground ${isRtl ? "rtl:prose-blockquote:border-r-primary rtl:prose-blockquote:border-l-0 rtl:prose-blockquote:rounded-l-xl rtl:prose-blockquote:rounded-r-none leading-[1.85]" : ""
                            }`}
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(contentHtml)
                          }}
                        />
                      ) : (
                        <div className="py-12 text-center text-muted-foreground space-y-2">
                          <FileText className="h-10 w-10 mx-auto text-muted-foreground/40" />
                          <p className="font-semibold text-sm">
                            {adminLocale === "ar"
                              ? `لا يوجد محتوى باللغة (${currentLangConfig.label}) حتى الآن`
                              : `No body content entered for language (${currentLangConfig.label}) yet.`}
                          </p>
                          <p className="text-xs">
                            {adminLocale === "ar"
                              ? "اضغط على زر التعديل لإضافة محتوى هذا المقال."
                              : "Click the Edit button above to write or translate this article."}
                          </p>
                        </div>
                      )}

                      {/* Tags & Keywords */}
                      {tagsList.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-border/60 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5" />
                            <span>{adminLocale === "ar" ? "وسوم المقال:" : "Topic Tags:"}</span>
                          </h4>
                          <div className="flex flex-wrap items-center gap-2">
                            {tagsList.map((tag: string, idx: number) => (
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
                    </div>

                    {/* FAQ Accordion Section (if available) */}
                    {Array.isArray(post.seo?.faqs) && post.seo.faqs.length > 0 && (
                      <div className="mt-6 bg-card rounded-2xl sm:rounded-3xl border border-border/60 p-5 sm:p-8 shadow-2xs space-y-4">
                        <div className="flex items-center gap-2.5 pb-2 border-b border-border/50">
                          <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            ?
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-foreground">
                            {isRtl ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                          </h3>
                        </div>
                        <div className="space-y-2.5 pt-1">
                          {post.seo.faqs.map((faq, idx) => (
                            <details
                              key={idx}
                              className="group rounded-xl border border-border/60 bg-muted/20 open:bg-muted/40 transition-colors p-4"
                            >
                              <summary className="font-semibold text-sm sm:text-base text-foreground cursor-pointer list-none flex items-center justify-between gap-3 select-none">
                                <span>{faq.question}</span>
                                <span className="text-primary font-bold transition-transform group-open:rotate-180 text-xs">
                                  ▼
                                </span>
                              </summary>
                              <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed ps-1">
                                {faq.answer}
                              </p>
                            </details>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Author Box */}
                    <div className="mt-6">
                      <BlogAuthorBio author={post.author} />
                    </div>

                    {/* Bottom CTA Simulation */}
                    <div className="mt-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-muted/20 border border-primary/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-foreground">
                          {isRtl ? "هل تبحث عن استشارات جمركية وشحن دولي؟" : "Looking for Customs Consultation & Global Freight?"}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {isRtl ? "تواصل مع خبراء جلوبفرايت للحصول على عروض أسعار فورية." : "Speak with Globfreight logistics specialists for instant routing advisories."}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs">
                        <span>{t("detail.consultationCta") || "Request Consultation"}</span>
                        <ArrowIcon className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT: SEO & SOCIAL INTELLIGENCE */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          {/* SERP Simulator (Google Search Result) */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Search className="h-4 w-4 text-blue-500" />
                  <span>{adminLocale === "ar" ? "معاينة نتائج بحث جوجل (Google SERP)" : "Google Search Engine Preview"}</span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {adminLocale === "ar"
                    ? "كيف يظهر هذا المقال في صفحات نتائج محرك البحث للزوار"
                    : "Simulated preview of how this publication appears on Google search results"}
                </p>
              </div>

              {/* SERP device toggle */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setSerpDevice("desktop")}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${serpDevice === "desktop" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setSerpDevice("mobile")}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${serpDevice === "mobile" ? "bg-background text-foreground shadow-2xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {/* Google Result Card Simulation */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-xs max-w-2xl">
              <div className="flex items-center gap-3 mb-1.5">
                <div className="h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                  G
                </div>
                <div className="text-xs text-zinc-700 dark:text-zinc-300 leading-tight">
                  <p className="font-medium">Globfreight Logistics</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate">
                    https://globfreight.com › {previewLocale} › blog › {currentSlug || "article-slug"}
                  </p>
                </div>
              </div>

              <h4 className="text-blue-700 dark:text-blue-400 font-medium text-base sm:text-lg hover:underline cursor-pointer leading-snug line-clamp-2">
                {metaTitle}
              </h4>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-3 leading-relaxed">
                <span className="text-zinc-500 dark:text-zinc-500 font-medium me-1.5">{publishedDate || "Recently published"} —</span>
                {metaDescription}
              </p>
            </div>

            {/* Character meters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{adminLocale === "ar" ? "طول عنوان SEO (Meta Title)" : "Meta Title Length"}</span>
                  <span className={metaTitle.length > 60 ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>
                    {metaTitle.length} / 60 chars
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${metaTitle.length > 60 ? "bg-amber-500" : metaTitle.length < 30 ? "bg-blue-400" : "bg-emerald-500"
                      }`}
                    style={{ width: `${Math.min(100, (metaTitle.length / 60) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {metaTitle.length > 60
                    ? "Warning: Title may get truncated on search engine result pages."
                    : "Optimal length is between 45 and 60 characters."}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>{adminLocale === "ar" ? "طول وصف SEO (Meta Description)" : "Meta Description Length"}</span>
                  <span className={metaDescription.length > 160 ? "text-amber-500 font-bold" : "text-emerald-500 font-bold"}>
                    {metaDescription.length} / 160 chars
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${metaDescription.length > 160 ? "bg-amber-500" : metaDescription.length < 80 ? "bg-blue-400" : "bg-emerald-500"
                      }`}
                    style={{ width: `${Math.min(100, (metaDescription.length / 160) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {metaDescription.length > 160
                    ? "Warning: Description may exceed the typical Google display limit."
                    : "Recommended length is between 120 and 160 characters."}
                </p>
              </div>
            </div>
          </div>

          {/* Social Cards (Open Graph & Twitter Preview) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Open Graph Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Share2 className="h-3.5 w-3.5 text-primary" />
                <span>Open Graph Card (LinkedIn / Facebook)</span>
              </h4>

              <div className="rounded-xl border border-border/70 overflow-hidden bg-muted/20">
                {ogImage ? (
                  <div className="relative w-full h-44 bg-muted">
                    <Image src={ogImage} alt="OG Card" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-36 bg-muted/60 flex items-center justify-center text-xs text-muted-foreground">
                    No Social Image Provided
                  </div>
                )}
                <div className="p-3.5 space-y-1 bg-card">
                  <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">
                    GLOBFREIGHT.COM
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-foreground line-clamp-1">{ogTitle}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{ogDescription}</p>
                </div>
              </div>
            </div>

            {/* Twitter Card */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5 text-blue-400" />
                <span>
                  X / Twitter {post.seo?.twitter_card === "summary" ? "Summary Card" : "Summary Large Image"}
                </span>
              </h4>

              <div className="rounded-xl border border-border/70 overflow-hidden bg-muted/20">
                {twitterImage ? (
                  <div className="relative w-full h-44 bg-muted">
                    <Image src={twitterImage} alt="Twitter Card" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="h-36 bg-muted/60 flex items-center justify-center text-xs text-muted-foreground">
                    No Twitter Image Provided
                  </div>
                )}
                <div className="p-3.5 space-y-1 bg-card">
                  <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">
                    globfreight.com
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-foreground line-clamp-1">{twitterTitle}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{twitterDescription}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Keyphrase, Canonical & Directives */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>{adminLocale === "ar" ? "بيانات الفهرسة ومحددات البحث" : "Indexing & Search Directives"}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                <span className="text-muted-foreground font-medium">Focus Keyphrase:</span>
                <p className="font-semibold text-foreground truncate">
                  {focusKeyphrase || <span className="italic text-muted-foreground">Not specified</span>}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                <span className="text-muted-foreground font-medium">Canonical URL:</span>
                <p className="font-semibold text-foreground truncate" title={canonicalUrl}>
                  {canonicalUrl || <span className="italic text-muted-foreground">Auto-generated</span>}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                <span className="text-muted-foreground font-medium">Meta Robots:</span>
                <p className="font-semibold text-foreground">
                  {post.seo?.meta_robots || "index, follow, max-image-preview:large"}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-muted/30 border border-border/60 space-y-1">
                <span className="text-muted-foreground font-medium">Schema Markup:</span>
                <p className="font-semibold text-foreground">
                  {post.seo?.schema_markup_type || "Article + FAQPage"}
                </p>
              </div>
            </div>
          </div>

          {/* Structured Data JSON-LD Code Viewer */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <span>JSON-LD Schema Markup (Structured Data)</span>
              </h3>
              <button
                type="button"
                onClick={handleCopySchema}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border/80 bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-colors cursor-pointer"
              >
                {copiedSchema ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                <span>{copiedSchema ? "Copied" : "Copy Schema"}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto max-h-60 border border-border/60">
              <code>{JSON.stringify(jsonLdArticle, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: METADATA & ANALYTICS */}
      {activeTab === "metadata" && (
        <div className="space-y-6">
          {/* KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Eye className="h-3.5 w-3.5 text-primary" />
                <span>Total Views</span>
              </span>
              <p className="text-xl sm:text-2xl font-black text-foreground">
                {(post.views_count || 0).toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-blue-500" />
                <span>Read Time</span>
              </span>
              <p className="text-xl sm:text-2xl font-black text-foreground">
                {readTime} min
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-emerald-500" />
                <span>Words</span>
              </span>
              <p className="text-xl sm:text-2xl font-black text-foreground">
                {wordCount.toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <BarChart3 className="h-3.5 w-3.5 text-purple-500" />
                <span>Characters</span>
              </span>
              <p className="text-xl sm:text-2xl font-black text-foreground">
                {charCount.toLocaleString()}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-amber-500" />
                <span>Created</span>
              </span>
              <p className="text-xs font-bold text-foreground mt-1">
                {formatBlogDate(post.created_at, adminLocale) || "-"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs space-y-1">
              <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-indigo-500" />
                <span>Updated</span>
              </span>
              <p className="text-xs font-bold text-foreground mt-1">
                {formatBlogDate(post.updated_at, adminLocale) || "-"}
              </p>
            </div>
          </div>

          {/* Multilingual Completeness Matrix */}
          <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-primary" />
                <span>{adminLocale === "ar" ? "مصفوفة تغطية اللغات والترجمة" : "Multilingual Translation Completeness"}</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {adminLocale === "ar"
                  ? "مراجعة اكتمال الحقول الأساسية لكل لغة مدعومة"
                  : "Field completeness overview across all 5 supported system locales"}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-start border-collapse">
                <thead>
                  <tr className="border-b border-border/70 bg-muted/40">
                    <th className="p-3 text-start font-bold text-foreground">Language</th>
                    <th className="p-3 text-center font-bold text-foreground">Title</th>
                    <th className="p-3 text-center font-bold text-foreground">Slug</th>
                    <th className="p-3 text-center font-bold text-foreground">Excerpt</th>
                    <th className="p-3 text-center font-bold text-foreground">Content</th>
                    <th className="p-3 text-center font-bold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {LOCALES.map((lang) => {
                    const coverage = getLocaleCoverage(lang.code);
                    const langSlug = getBlogText(post.slug, lang.code, "");
                    return (
                      <tr key={lang.code} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-semibold text-foreground flex items-center gap-2">
                          <span className="text-base">{lang.flag}</span>
                          <span>{lang.label}</span>
                          <span className="text-[10px] text-muted-foreground font-mono uppercase">
                            ({lang.code})
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {coverage.hasTitle ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {coverage.hasSlug ? (
                            <span className="font-mono text-[11px] text-primary">{langSlug}</span>
                          ) : (
                            <span className="text-muted-foreground italic text-[11px]">missing</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {coverage.hasExcerpt ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {coverage.hasContent ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                          ) : (
                            <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewLocale(lang.code);
                              setActiveTab("preview");
                            }}
                            className="px-2.5 py-1 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Taxonomy & Author Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Information */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Folder className="h-3.5 w-3.5 text-purple-500" />
                <span>Category & Taxonomy</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Category:</span>
                  <span className="font-bold text-foreground">
                    {categoryName || "Uncategorized"}
                  </span>
                </div>
                {subCategoryName && (
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Subcategory:</span>
                    <span className="font-bold text-foreground">{subCategoryName}</span>
                  </div>
                )}
                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Category Slug:</span>
                  <span className="font-mono text-primary font-semibold">
                    {catSlugFallback || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Author Information */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>Author Profile</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">Name:</span>
                  <span className="font-bold text-foreground">
                    {post.author?.name || "Globfreight Logistics Analysts"}
                  </span>
                </div>
                {post.author?.email && (
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Email:</span>
                    <span className="font-mono text-muted-foreground">{post.author.email}</span>
                  </div>
                )}
                {post.author?.type && (
                  <div className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-between">
                    <span className="text-muted-foreground font-medium">Role:</span>
                    <span className="font-medium text-foreground capitalize">{post.author.type}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
