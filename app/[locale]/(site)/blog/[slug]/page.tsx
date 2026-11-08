import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicBlogDetail } from "@/components/pages/blog/public-blog-detail";
import { DynamicSlugPageSeo } from "@/components/alternate-links-context";
import { BlogPost, getBlogText } from "@/types/blog";
import { resolveBlogPostPage } from "@/utils/multilingual-slugs";
import { buildBlogPostMetadata, buildBlogPostSchemas } from "@/utils/blog-seo";
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
    const { post, alternates } = await resolveBlogPostPage(slug, locale, false);
    if (!post) return { title: t("notFoundTitle") };
    return buildBlogPostMetadata(post, locale, alternates);
  } catch {
    return { title: t("defaultTitle") };
  }
}

export default async function BlogDetailPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const [{ post, currentCanonicalSlug, slugsByLocale, alternates }, relatedRes] =
    await Promise.all([
      resolveBlogPostPage(slug, locale, true),
      fetchHelper({
        endPoint: ["blogPosts"],
        params: { per_page: 4 },
        method: "GET",
        locale: locale as any
      }).catch(() => ({ data: [] }))
    ]);

  const relatedPosts: BlogPost[] = (
    Array.isArray(relatedRes?.data) ? relatedRes.data : []
  )
    .filter((p: BlogPost) => {
      const pSlug = typeof p.slug === "object" ? getBlogText(p.slug, locale) : p.slug;
      return p.id !== post.id && pSlug !== currentCanonicalSlug;
    })
    .slice(0, 3);

  return (
    <PublicShell alternateLinks={alternates.languages}>
      <DynamicSlugPageSeo
        links={alternates.languages}
        schemas={buildBlogPostSchemas(post, locale, alternates)}
      />
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
