import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicBlogDetail } from "@/components/pages/blog/public-blog-detail";
import { BlogPost, getBlogText } from "@/types/blog";
import { getArticleJsonLd, getBreadcrumbJsonLd, getOpenGraphImages, SITE_URL, SYSTEM_LOCALES } from "@/utils/seo";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage.meta" });

  try {
    const safeSlug = encodeURIComponent(decodeURIComponent(slug));
    const res = await fetchHelper({
      endPoint: ["blogPostsSlug", safeSlug],
      method: "GET"
    });

    if (res?.status === 301 || res?.data?.is_redirect || res?.isRedirect) {
      const newSlug = res?.data?.new_slug || res?.newSlug;
      if (newSlug) {
        redirect(`/${locale}/blog/${encodeURIComponent(newSlug)}`);
      }
    }

    const post: BlogPost | undefined =
      res?.success && res?.data && !Array.isArray(res.data) && res.data?.id
        ? res.data
        : undefined;

    if (!post) {
      return {
        title: t("notFoundTitle")
      };
    }

    const currentSlug = typeof post.slug === "object" ? getBlogText(post.slug, locale) : (post.slug || slug);
    const metaTitleRaw = getBlogText(post.seo?.meta_title || post.seo_meta_title, locale);
    const postTitle = getBlogText(post.title, locale);
    const title = metaTitleRaw || (postTitle ? `${postTitle} | Globfreight` : "Globfreight");

    const description =
      getBlogText(post.seo?.meta_description || post.seo_meta_description, locale) ||
      getBlogText(post.excerpt, locale) ||
      "Globfreight supply chain and logistics intelligence article.";

    const customCanonical = post.seo?.canonical_url || post.seo_canonical_url;
    const alternatesLanguages: Record<string, string> = {};
    for (const loc of SYSTEM_LOCALES) {
      const locSlug = typeof post.slug === "object" ? (post.slug[loc] || getBlogText(post.slug, loc)) : post.slug;
      alternatesLanguages[loc] = `${SITE_URL}/${loc}/blog/${encodeURIComponent(locSlug || currentSlug)}`;
    }
    const defaultSlug = typeof post.slug === "object" ? (post.slug.en || getBlogText(post.slug, "en")) : post.slug;
    alternatesLanguages["x-default"] = `${SITE_URL}/en/blog/${encodeURIComponent(defaultSlug || currentSlug)}`;

    const alternates = {
      canonical:
        customCanonical && typeof customCanonical === "string" && customCanonical.trim() !== ""
          ? customCanonical.trim()
          : `${SITE_URL}/${locale}/blog/${encodeURIComponent(currentSlug)}`,
      languages: alternatesLanguages
    };

    const postImage = getBlogText(post.image, locale);
    const ogImage = postImage || post.seo?.og_image;

    const focusKeyphrase = getBlogText(post.seo?.focus_keyphrase || post.seo_focus_keyphrase, locale);
    const tags = Array.isArray(post.tags) ? post.tags : [];
    const keywords = [
      ...(focusKeyphrase ? [focusKeyphrase] : []),
      ...tags,
      "Globfreight",
      "logistics",
      "supply chain"
    ];

    const categoryName = post.category
      ? (typeof post.category.name === "string" ? post.category.name : getBlogText(post.category.name, locale))
      : undefined;

    return {
      title,
      description,
      keywords,
      alternates,
      openGraph: {
        title,
        description,
        url: alternates.canonical,
        type: "article",
        publishedTime: post.published_at || post.created_at,
        modifiedTime: post.published_at || post.created_at,
        siteName: "Globfreight",
        tags,
        ...(categoryName ? { section: categoryName } : {}),
        images: ogImage
          ? [
              {
                url: ogImage,
                alt: title
              }
            ]
          : getOpenGraphImages(title)
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ogImage ? [ogImage] : [`${SITE_URL}/og-image.jpg`]
      },
      robots: {
        index: post.status !== "draft" && post.status !== "archived",
        follow: true
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

  const safeSlug = encodeURIComponent(decodeURIComponent(slug));

  // Fetch article and related posts concurrently
  const [postRes, relatedRes] = await Promise.all([
    fetchHelper({
      endPoint: ["blogPostsSlug", safeSlug],
      method: "GET"
    }).catch(err => {
      console.error("Failed to fetch blog post by slug:", err);
      return { data: null };
    }),
    fetchHelper({
      endPoint: ["blogPosts"],
      params: { per_page: 4 },
      method: "GET"
    }).catch(() => ({ data: [] }))
  ]);

  // 1. في حالة التحويل الدائم 301
  if (postRes?.status === 301 || postRes?.data?.is_redirect || postRes?.isRedirect) {
    const newSlug = postRes?.data?.new_slug || postRes?.newSlug;
    if (newSlug) {
      redirect(`/${locale}/blog/${encodeURIComponent(newSlug)}`);
    }
  }

  const post: BlogPost | undefined =
    postRes?.success && postRes?.data && !Array.isArray(postRes.data) && postRes.data?.id
      ? postRes.data
      : undefined;

  // 2. في حالة عدم وجود المقال نهائياً
  if (!post) {
    notFound();
  }

  const currentSlug = typeof post.slug === "object" ? getBlogText(post.slug, locale) : (post.slug || slug);

  // Filter out the current post from related publications
  const relatedPosts: BlogPost[] = (Array.isArray(relatedRes?.data) ? relatedRes.data : [])
    .filter((p: BlogPost) => {
      const pSlug = typeof p.slug === "object" ? getBlogText(p.slug, locale) : p.slug;
      return p.id !== post.id && pSlug !== currentSlug;
    })
    .slice(0, 3);

  const metaTitleRaw = getBlogText(post.seo?.meta_title || post.seo_meta_title, locale);
  const postTitle = getBlogText(post.title, locale);
  const title = metaTitleRaw || (postTitle ? `${postTitle} | Globfreight` : "Globfreight");

  const description =
    getBlogText(post.seo?.meta_description || post.seo_meta_description, locale) ||
    getBlogText(post.excerpt, locale) ||
    "Globfreight supply chain and logistics intelligence article.";

  const customCanonical = post.seo?.canonical_url || post.seo_canonical_url;
  const postUrl =
    customCanonical && typeof customCanonical === "string" && customCanonical.trim() !== ""
      ? customCanonical.trim()
      : `${SITE_URL}/${locale}/blog/${encodeURIComponent(currentSlug)}`;

  const postImage = getBlogText(post.image, locale);
  const ogImage = postImage || post.seo?.og_image;

  const focusKeyphrase = getBlogText(post.seo?.focus_keyphrase || post.seo_focus_keyphrase, locale);
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const allKeywords = [...(focusKeyphrase ? [focusKeyphrase] : []), ...tags];

  const schemaType = post.seo?.schema_markup_type || post.seo_schema_markup_type || "BlogPosting";
  const categoryName = post.category
    ? (typeof post.category.name === "string" ? post.category.name : getBlogText(post.category.name, locale))
    : undefined;

  const articleJsonLd = getArticleJsonLd({
    title,
    description,
    url: postUrl,
    image: ogImage,
    datePublished: post.published_at || post.created_at,
    dateModified: post.published_at || post.created_at,
    authorName: post.author?.name || "Globfreight Logistics Expert",
    schemaType,
    keywords: allKeywords,
    articleSection: categoryName
  });

  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
    ...(categoryName ? [{ name: categoryName, url: `${SITE_URL}/${locale}/blog` }] : []),
    { name: title, url: postUrl }
  ]);

  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <PublicBlogDetail post={post} relatedPosts={relatedPosts} locale={locale} />
    </PublicShell>
  );
}

