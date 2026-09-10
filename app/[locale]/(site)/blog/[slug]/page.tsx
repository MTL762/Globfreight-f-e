import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicBlogDetail } from "@/components/pages/blog/public-blog-detail";
import { BlogPost, getBlogText } from "@/types/blog";
import { getPageAlternates } from "@/utils/seo";
import { notFound } from "next/navigation";
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
    const res = await fetchHelper({
      endPoint: ["blogPostsSlug", slug],
      method: "GET"
    });

    const post: BlogPost | undefined =
      res?.success && res?.data && !Array.isArray(res.data) && res.data?.id
        ? res.data
        : undefined;

    if (!post) {
      return {
        title: t("notFoundTitle")
      };
    }

    const title =
      getBlogText(post.seo?.meta_title, locale) ||
      `${getBlogText(post.title, locale)} | Globfreight`;
    const description =
      getBlogText(post.seo?.meta_description, locale) ||
      getBlogText(post.excerpt, locale) ||
      "Globfreight supply chain and logistics intelligence article.";
    const alternates = getPageAlternates(`/blog/${post.slug || slug}`, locale);
    const ogImage = post.image || post.seo?.og_image;

    return {
      title,
      description,
      alternates,
      openGraph: {
        title,
        description,
        url: alternates.canonical,
        type: "article",
        publishedTime: post.published_at || post.created_at,
        siteName: "Globfreight",
        images: ogImage
          ? [
              {
                url: ogImage,
                alt: title
              }
            ]
          : undefined
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
    fetchHelper({
      endPoint: ["blogPostsSlug", slug],
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

  const post: BlogPost | undefined =
    postRes?.success && postRes?.data && !Array.isArray(postRes.data) && postRes.data?.id
      ? postRes.data
      : undefined;

  if (!post) {
    notFound();
  }

  // Filter out the current post from related publications
  const relatedPosts: BlogPost[] = (Array.isArray(relatedRes?.data) ? relatedRes.data : [])
    .filter((p: BlogPost) => p.id !== post.id && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <PublicShell>
      <PublicBlogDetail post={post} relatedPosts={relatedPosts} locale={locale} />
    </PublicShell>
  );
}
