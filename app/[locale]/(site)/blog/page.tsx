import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicBlogList } from "@/components/pages/blog/public-blog-list";
import { BlogPost } from "@/types/blog";
import { getPageAlternates } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage.meta" });

  const title = t("title");
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Globfreight"
    },
    alternates: getPageAlternates("/blog", locale)
  };
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  // Fetch blogs & categories in parallel
  const [blogsRes, categoriesRes] = await Promise.all([
    fetchHelper({
      endPoint: ["blogPosts"],
      params: { per_page: 30 },
      method: "GET"
    }).catch(err => {
      console.error("Failed to fetch blog posts:", err);
      return { data: [] };
    }),
    fetchHelper({
      endPoint: ["categories"],
      method: "GET"
    }).catch(err => {
      console.error("Failed to fetch categories:", err);
      return { data: [] };
    })
  ]);

  const posts: BlogPost[] = Array.isArray(blogsRes?.data) ? blogsRes.data : [];
  const categories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];

  return (
    <PublicShell>
      <PublicBlogList posts={posts} locale={locale} categories={categories} />
    </PublicShell>
  );
}
