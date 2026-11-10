import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicBlogList } from "@/components/pages/blog/public-blog-list";
import { DynamicSlugPageSeo } from "@/components/alternate-links-context";
import { BlogPost, getBlogText } from "@/types/blog";
import { resolveCategoryPage } from "@/utils/multilingual-slugs";
import { buildCategoryMetadata, buildCategorySchemas } from "@/utils/blog-seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage.meta" });

  try {
    const { category, alternates } = await resolveCategoryPage(slug, locale, false);
    if (!category) return { title: t("notFoundTitle") };
    return buildCategoryMetadata(category, locale, alternates);
  } catch {
    return { title: t("defaultTitle") };
  }
}

export default async function BlogCategoryPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const [{ category, currentCanonicalSlug, slugsByLocale, alternates }, blogsRes, categoriesRes] =
    await Promise.all([
      resolveCategoryPage(slug, locale, true),
      fetchHelper({
        endPoint: ["blogPosts"],
        params: { per_page: 50 },
        method: "GET",
        locale: locale as any
      }).catch(() => ({ data: [] })),
      fetchHelper({
        endPoint: ["categories"],
        method: "GET",
        locale: locale as any
      }).catch(() => ({ data: [] }))
    ]);

  const posts: BlogPost[] = Array.isArray(blogsRes?.data) ? blogsRes.data : [];
  const categories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];
  const categoryName = getBlogText(category.name, locale, "Category");

  return (
    <PublicShell alternateLinks={alternates.languages}>
      <DynamicSlugPageSeo
        links={alternates.languages}
        schemas={buildCategorySchemas(category, locale, alternates)}
      />
      <PublicBlogList
        posts={posts}
        locale={locale}
        categories={categories}
        initialCategory={currentCanonicalSlug}
        categoryTitle={categoryName}
        slugsByLocale={slugsByLocale}
        alternatesLanguages={alternates.languages}
      />
    </PublicShell>
  );
}
