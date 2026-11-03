import type { Metadata } from "next";
import { BlogPost, getBlogText } from "@/types/blog";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getOpenGraphImages,
  SITE_URL
} from "./seo";
import { encodeSlug } from "./multilingual-slugs";

interface AlternatesMap {
  canonical: string;
  languages: Record<string, string>;
}

function getPostCoreSeo(post: BlogPost, locale: string, alternates: AlternatesMap) {
  const metaTitleRaw = getBlogText(post.seo?.meta_title || post.seo_meta_title, locale);
  const postTitle = getBlogText(post.title, locale);
  const title = metaTitleRaw || (postTitle ? `${postTitle} | Globfreight` : "Globfreight");

  const description =
    getBlogText(post.seo?.meta_description || post.seo_meta_description, locale) ||
    getBlogText(post.excerpt, locale) ||
    "Globfreight supply chain and logistics intelligence article.";

  const rawCanonical = post.seo?.canonical_url || post.seo_canonical_url;
  const customCanonical =
    typeof rawCanonical === "object" && rawCanonical !== null
      ? getBlogText(rawCanonical, locale)
      : rawCanonical;

  const canonicalUrl =
    customCanonical && typeof customCanonical === "string" && customCanonical.trim() !== ""
      ? customCanonical.trim()
      : alternates.canonical;

  const postImage = getBlogText(post.image, locale);
  const ogImage = post.seo?.og_image || postImage;
  const focusKeyphrase = getBlogText(
    post.seo?.focus_keyphrase || post.seo_focus_keyphrase,
    locale
  );

  const tags: string[] = Array.isArray(post.tags)
    ? post.tags
    : typeof post.tags === "object" && post.tags !== null
    ? (post.tags as any)[locale] || (post.tags as any).en || []
    : [];

  const categoryName = post.category
    ? typeof post.category.name === "string"
      ? post.category.name
      : getBlogText(post.category.name, locale)
    : undefined;

  const categorySlug = post.category
    ? typeof post.category.slug === "string"
      ? post.category.slug
      : getBlogText(post.category.slug, locale)
    : undefined;

  return {
    title,
    postTitle,
    description,
    canonicalUrl,
    postImage,
    ogImage,
    focusKeyphrase,
    tags,
    categoryName,
    categorySlug
  };
}

export function buildBlogPostMetadata(
  post: BlogPost,
  locale: string,
  alternates: AlternatesMap
): Metadata {
  const {
    title,
    postTitle,
    description,
    canonicalUrl,
    ogImage,
    focusKeyphrase,
    tags,
    categoryName
  } = getPostCoreSeo(post, locale, alternates);

  const ogTitle = getBlogText(post.seo?.og_title, locale) || title;
  const ogDescription = getBlogText(post.seo?.og_description, locale) || description;
  const ogImageAlt =
    getBlogText(post.seo?.og_image_alt, locale) ||
    getBlogText(post.image_alt, locale) ||
    title;

  const twitterCard = (
    post.seo?.twitter_card === "summary" ? "summary" : "summary_large_image"
  ) as "summary" | "summary_large_image";
  const twitterTitle = getBlogText(post.seo?.twitter_title, locale) || ogTitle;
  const twitterDescription =
    getBlogText(post.seo?.twitter_description, locale) || ogDescription;
  const twitterImage = post.seo?.twitter_image || ogImage;

  const backendKeywords = Array.isArray(post.seo?.keywords)
    ? post.seo.keywords
    : typeof post.seo?.keywords === "string"
    ? post.seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  const keywords = [
    ...(focusKeyphrase ? [focusKeyphrase] : []),
    ...backendKeywords,
    ...tags,
    "Globfreight",
    "logistics",
    "supply chain"
  ];

  const langStatus =
    typeof post.status === "object" && post.status !== null
      ? (post.status as any)[locale] || (post.status as any).en || "published"
      : post.status;
  const isLocalePublished =
    !post.published_locales ||
    post.published_locales.length === 0 ||
    post.published_locales.includes(locale);
  const isLive =
    langStatus === "published" &&
    Boolean(postTitle) &&
    isLocalePublished &&
    post.status !== "draft" &&
    post.status !== "archived";

  const metaRobotsRaw = post.seo?.meta_robots?.toLowerCase() || "";

  return {
    title,
    description,
    keywords,
    alternates: { ...alternates, canonical: canonicalUrl },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at || post.published_at || post.created_at,
      siteName: "Globfreight",
      tags,
      ...(categoryName ? { section: categoryName } : {}),
      images: ogImage
        ? [{ url: ogImage, alt: ogImageAlt }]
        : getOpenGraphImages(title)
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage
        ? [twitterImage]
        : ogImage
        ? [ogImage]
        : [`${SITE_URL}/og-image.jpg`]
    },
    robots: {
      index: metaRobotsRaw.includes("noindex") ? false : isLive,
      follow: !metaRobotsRaw.includes("nofollow")
    }
  };
}

export function buildBlogPostSchemas(
  post: BlogPost,
  locale: string,
  alternates: AlternatesMap
) {
  const {
    title,
    description,
    canonicalUrl,
    postImage,
    ogImage,
    focusKeyphrase,
    tags,
    categoryName,
    categorySlug
  } = getPostCoreSeo(post, locale, alternates);

  const rawSchema = post.seo?.schema_markup_type || post.seo_schema_markup_type;
  const schemaType =
    (typeof rawSchema === "object" && rawSchema !== null
      ? getBlogText(rawSchema, locale)
      : rawSchema) || "BlogPosting";

  const publishedDateIso =
    post.published_at || post.created_at || new Date().toISOString();
  const modifiedDateIso =
    post.updated_at || post.published_at || post.created_at || new Date().toISOString();

  const articleJsonLd = getArticleJsonLd({
    title,
    description,
    url: canonicalUrl,
    image: postImage || ogImage,
    datePublished: publishedDateIso,
    dateModified: modifiedDateIso,
    authorName: post.author?.name || "Globfreight Logistics Expert",
    authorBio: post.author?.bio || undefined,
    schemaType,
    keywords: [...(focusKeyphrase ? [focusKeyphrase] : []), ...tags],
    articleSection: categoryName
  });

  const categoryUrl = categorySlug
    ? `${SITE_URL}/${locale}/blog/category/${encodeSlug(categorySlug)}`
    : `${SITE_URL}/${locale}/blog`;

  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
    ...(categoryName ? [{ name: categoryName, url: categoryUrl }] : []),
    { name: title, url: canonicalUrl }
  ]);

  const faqJsonLd =
    Array.isArray(post.seo?.faqs) && post.seo.faqs.length > 0
      ? getFaqJsonLd(post.seo.faqs)
      : null;

  return [articleJsonLd, breadcrumbsJsonLd, faqJsonLd, post.seo?.schema_markup];
}

export function buildCategoryMetadata(
  category: any,
  locale: string,
  alternates: AlternatesMap
): Metadata {
  const categoryName = getBlogText(category.name, locale, "Logistics Category");
  const categoryDesc = getBlogText(category.description, locale, "");
  const title = `${categoryName} – Logistics Intelligence & Insights | Globfreight`;
  const description =
    categoryDesc ||
    `Explore industry insights, regulatory developments, and expert analysis in ${categoryName} from Globfreight.`;

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "website",
      siteName: "Globfreight",
      images: getOpenGraphImages(title)
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`]
    }
  };
}

