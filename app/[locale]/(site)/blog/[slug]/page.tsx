import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicBlogDetail } from "@/components/pages/blog/public-blog-detail";
import { SetAlternateLinks } from "@/components/alternate-links-context";
import { BlogPost, BlogPostFetchResult, getBlogText } from "@/types/blog";
import { getArticleJsonLd, getBreadcrumbJsonLd, getFaqJsonLd, getOpenGraphImages, SITE_URL } from "@/utils/seo";
import { getBlogPostAlternates, resolveAllPostSlugs } from "@/utils/multilingual-slugs";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

async function getBlogPostBySlug(slug: string, locale: string): Promise<BlogPostFetchResult> {
  const safeSlug = encodeURIComponent(decodeURIComponent(slug));
  return fetchHelper({
    endPoint: ["blogPostsSlug", safeSlug],
    method: "GET",
    locale: locale as any
  });
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage.meta" });

  try {
    const res = await getBlogPostBySlug(slug, locale);

    if (res.status === 301 || res.isRedirect) {
      const newSlug = res.data?.new_slug || res.newSlug;
      if (newSlug) {
        redirect(`/${locale}/blog/${encodeURIComponent(decodeURIComponent(newSlug))}`);
      }
    }

    const post = res.success && res.data && "id" in res.data ? res.data : undefined;
    if (!post) {
      return {
        title: t("notFoundTitle")
      };
    }

    // Resolve per-language translated slugs for hreflang alternates
    const slugsByLocale = await resolveAllPostSlugs(slug, post);
    const alternates = getBlogPostAlternates(slugsByLocale, locale, post.published_locales);

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

    if (customCanonical && typeof customCanonical === "string" && customCanonical.trim() !== "") {
      alternates.canonical = customCanonical.trim();
    }

    const postImage = getBlogText(post.image, locale);
    const ogImage = post.seo?.og_image || postImage;
    const ogTitle = getBlogText(post.seo?.og_title, locale) || title;
    const ogDescription = getBlogText(post.seo?.og_description, locale) || description;
    const ogImageAlt =
      getBlogText(post.seo?.og_image_alt, locale) ||
      getBlogText(post.image_alt, locale) ||
      title;

    const twitterCard =
      (post.seo?.twitter_card === "summary" ? "summary" : "summary_large_image") as "summary" | "summary_large_image";
    const twitterTitle = getBlogText(post.seo?.twitter_title, locale) || ogTitle;
    const twitterDescription = getBlogText(post.seo?.twitter_description, locale) || ogDescription;
    const twitterImage = post.seo?.twitter_image || ogImage;

    const focusKeyphrase = getBlogText(post.seo?.focus_keyphrase || post.seo_focus_keyphrase, locale);
    const tags = Array.isArray(post.tags)
      ? post.tags
      : typeof post.tags === "object" && post.tags !== null
      ? ((post.tags as any)[locale] || (post.tags as any).en || [])
      : [];

    const backendKeywords = Array.isArray(post.seo?.keywords)
      ? post.seo.keywords
      : typeof post.seo?.keywords === "string"
      ? post.seo.keywords.split(",").map(k => k.trim()).filter(Boolean)
      : [];

    const keywords = [
      ...(focusKeyphrase ? [focusKeyphrase] : []),
      ...backendKeywords,
      ...tags,
      "Globfreight",
      "logistics",
      "supply chain"
    ];

    const categoryName = post.category
      ? (typeof post.category.name === "string" ? post.category.name : getBlogText(post.category.name, locale))
      : undefined;

    const langStatus =
      typeof post.status === "object" && post.status !== null
        ? (post.status as any)[locale] || (post.status as any).en || "published"
        : post.status;
    const hasTranslationContent = Boolean(postTitle);
    const isLocalePublished =
      !post.published_locales ||
      post.published_locales.length === 0 ||
      post.published_locales.includes(locale);
    const isLive =
      langStatus === "published" &&
      hasTranslationContent &&
      isLocalePublished &&
      post.status !== "draft" &&
      post.status !== "archived";

    const metaRobotsRaw = post.seo?.meta_robots?.toLowerCase() || "";
    const shouldIndex = metaRobotsRaw.includes("noindex") ? false : isLive;
    const shouldFollow = metaRobotsRaw.includes("nofollow") ? false : true;

    return {
      title,
      description,
      keywords,
      alternates,
      openGraph: {
        title: ogTitle,
        description: ogDescription,
        url: alternates.canonical,
        type: "article",
        publishedTime: post.published_at || post.created_at,
        modifiedTime: post.updated_at || post.published_at || post.created_at,
        siteName: "Globfreight",
        tags,
        ...(categoryName ? { section: categoryName } : {}),
        images: ogImage
          ? [
            {
              url: ogImage,
              alt: ogImageAlt
            }
          ]
          : getOpenGraphImages(title)
      },
      twitter: {
        card: twitterCard,
        title: twitterTitle,
        description: twitterDescription,
        images: twitterImage ? [twitterImage] : ogImage ? [ogImage] : [`${SITE_URL}/og-image.jpg`]
      },
      robots: {
        index: shouldIndex,
        follow: shouldFollow
      }
    };
  } catch {
    return {
      title: t("defaultTitle")
    };
  }
}

export default async function BlogDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  // Fetch article and related posts concurrently
  const [postRes, relatedRes] = await Promise.all([
    getBlogPostBySlug(slug, locale).catch(err => {
      console.error("Failed to fetch blog post by slug:", err);
      return { success: false, status: 500 } as BlogPostFetchResult;
    }),
    fetchHelper({
      endPoint: ["blogPosts"],
      params: { per_page: 4 },
      method: "GET"
    }).catch(() => ({ data: [] }))
  ]);

  // 1. في حالة التحويل الدائم 301
  if (postRes.status === 301 || postRes.isRedirect) {
    const newSlug = postRes.data?.new_slug || postRes.newSlug;
    if (newSlug) {
      redirect(`/${locale}/blog/${encodeURIComponent(decodeURIComponent(newSlug))}`);
    }
  }

  const post = postRes.success && postRes.data && "id" in postRes.data ? postRes.data : undefined;

  // 2. في حالة عدم وجود المقال نهائياً أو عدم نشره باللغة الحالية
  const isLocalePublished =
    !post?.published_locales ||
    post.published_locales.length === 0 ||
    post.published_locales.includes(locale);

  if (!post || !isLocalePublished) {
    notFound();
  }

  // 3. Resolve translated slugs for all supported languages
  const slugsByLocale = await resolveAllPostSlugs(slug, post);
  const currentCanonicalSlug = slugsByLocale[locale] || slug;

  // If the user arrived with a mismatched slug (e.g. accessed with English slug on an Arabic locale)
  // permanently redirect to the correct localized canonical slug
  if (decodeURIComponent(slug) !== decodeURIComponent(currentCanonicalSlug)) {
    redirect(`/${locale}/blog/${encodeURIComponent(decodeURIComponent(currentCanonicalSlug))}`);
  }

  const alternates = getBlogPostAlternates(slugsByLocale, locale, post.published_locales);

  // Filter out the current post from related publications
  const relatedPosts: BlogPost[] = (Array.isArray(relatedRes?.data) ? relatedRes.data : [])
    .filter((p: BlogPost) => {
      const pSlug = typeof p.slug === "object" ? getBlogText(p.slug, locale) : p.slug;
      return p.id !== post.id && pSlug !== currentCanonicalSlug;
    })
    .slice(0, 3);

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

  const postUrl =
    customCanonical && typeof customCanonical === "string" && customCanonical.trim() !== ""
      ? customCanonical.trim()
      : alternates.canonical;

  const postImage = getBlogText(post.image, locale);
  const ogImage = postImage || post.seo?.og_image;

  const focusKeyphrase = getBlogText(post.seo?.focus_keyphrase || post.seo_focus_keyphrase, locale);
  const tags = Array.isArray(post.tags)
    ? post.tags
    : typeof post.tags === "object" && post.tags !== null
    ? ((post.tags as any)[locale] || (post.tags as any).en || [])
    : [];
  const allKeywords = [...(focusKeyphrase ? [focusKeyphrase] : []), ...tags];

  const rawSchema = post.seo?.schema_markup_type || post.seo_schema_markup_type;
  const schemaType =
    (typeof rawSchema === "object" && rawSchema !== null
      ? getBlogText(rawSchema, locale)
      : rawSchema) || "BlogPosting";

  const categoryName = post.category
    ? (typeof post.category.name === "string" ? post.category.name : getBlogText(post.category.name, locale))
    : undefined;
  const categorySlug = post.category
    ? (typeof post.category.slug === "string" ? post.category.slug : getBlogText(post.category.slug, locale))
    : undefined;

  const publishedDateIso = post.published_at || post.created_at || new Date().toISOString();
  const modifiedDateIso = post.updated_at || post.published_at || post.created_at || new Date().toISOString();

  const articleJsonLd = getArticleJsonLd({
    title,
    description,
    url: postUrl,
    image: ogImage,
    datePublished: publishedDateIso,
    dateModified: modifiedDateIso,
    authorName: post.author?.name || "Globfreight Logistics Expert",
    authorBio: post.author?.bio || undefined,
    schemaType,
    keywords: allKeywords,
    articleSection: categoryName
  });

  const categoryUrl = categorySlug
    ? `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(decodeURIComponent(categorySlug))}`
    : `${SITE_URL}/${locale}/blog`;

  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
    ...(categoryName ? [{ name: categoryName, url: categoryUrl }] : []),
    { name: title, url: postUrl }
  ]);

  const hasFaqs = Array.isArray(post.seo?.faqs) && post.seo.faqs.length > 0;
  const faqJsonLd = hasFaqs ? getFaqJsonLd(post.seo!.faqs!) : null;
  const customSchemaMarkup = post.seo?.schema_markup;

  return (
    <PublicShell>
      {/* Set alternate links in context so the Header language switcher navigates to the exact translated article */}
      <SetAlternateLinks links={alternates.languages} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {customSchemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof customSchemaMarkup === "object"
              ? JSON.stringify(customSchemaMarkup)
              : customSchemaMarkup
          }}
        />
      )}
      <PublicBlogDetail
        post={post}
        relatedPosts={relatedPosts}
        locale={locale}
        slugsByLocale={slugsByLocale}
        alternatesLanguages={alternates.languages}
      />
    </PublicShell>
  );
}
