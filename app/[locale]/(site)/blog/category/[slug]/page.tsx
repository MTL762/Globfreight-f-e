import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicBlogList } from "@/components/pages/blog/public-blog-list";
import { SetAlternateLinks } from "@/components/alternate-links-context";
import { BlogPost, getBlogText } from "@/types/blog";
import { getBreadcrumbJsonLd, getOpenGraphImages, SITE_URL } from "@/utils/seo";
import { getCategoryAlternates, resolveAllCategorySlugs } from "@/utils/multilingual-slugs";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

async function getCategoryBySlug(slug: string, locale: string) {
  const safeSlug = encodeURIComponent(decodeURIComponent(slug));
  try {
    const res = await fetchHelper({
      endPoint: ["categoriesSlug", safeSlug],
      method: "GET",
      locale: locale as any
    });
    if (res?.data && (res?.data?.id || res?.data?.name)) {
      return res.data;
    }
  } catch (err) {
    console.error("Failed to fetch category by slug:", err);
  }

  // Fallback: search in categories list
  try {
    const listRes = await fetchHelper({
      endPoint: ["categories"],
      method: "GET",
      locale: locale as any
    });
    const list = Array.isArray(listRes?.data) ? listRes.data : [];
    const decodedSlug = decodeURIComponent(slug).toLowerCase();
    const match = list.find((cat: any) => {
      const cSlug = typeof cat.slug === "object" ? getBlogText(cat.slug, locale) : (cat.slug || String(cat.id));
      return cSlug.toLowerCase() === decodedSlug || String(cat.id) === decodedSlug;
    });
    if (match) return match;
  } catch {}

  return null;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage.meta" });

  try {
    const category = await getCategoryBySlug(slug, locale);
    if (!category) {
      return {
        title: t("notFoundTitle")
      };
    }

    const slugsByLocale = await resolveAllCategorySlugs(slug, category);
    const alternates = getCategoryAlternates(slugsByLocale, locale);

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
  } catch {
    return {
      title: t("defaultTitle")
    };
  }
}

export default async function BlogCategoryPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const [category, blogsRes, categoriesRes] = await Promise.all([
    getCategoryBySlug(slug, locale),
    fetchHelper({
      endPoint: ["blogPosts"],
      params: { per_page: 50 },
      method: "GET"
    }).catch(() => ({ data: [] })),
    fetchHelper({
      endPoint: ["categories"],
      method: "GET"
    }).catch(() => ({ data: [] }))
  ]);

  if (!category) {
    notFound();
  }

  const slugsByLocale = await resolveAllCategorySlugs(slug, category);
  const currentCanonicalSlug = slugsByLocale[locale] || slug;

  // Canonical redirect if requested slug doesn't match canonical slug for this locale
  if (decodeURIComponent(slug) !== decodeURIComponent(currentCanonicalSlug)) {
    redirect(`/${locale}/blog/category/${encodeURIComponent(decodeURIComponent(currentCanonicalSlug))}`);
  }

  const alternates = getCategoryAlternates(slugsByLocale, locale);

  const posts: BlogPost[] = Array.isArray(blogsRes?.data) ? blogsRes.data : [];
  const categories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];

  const categoryName = getBlogText(category.name, locale, "Category");
  const categoryPageUrl = alternates.canonical;

  const breadcrumbsJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Blog", url: `${SITE_URL}/${locale}/blog` },
    { name: categoryName, url: categoryPageUrl }
  ]);

  return (
    <PublicShell>
      {/* Set alternate links in context so the Header language switcher navigates to the translated category URL */}
      <SetAlternateLinks links={alternates.languages} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <PublicBlogList
        posts={posts}
        locale={locale}
        categories={categories}
        initialCategory={currentCanonicalSlug}
        categoryTitle={categoryName}
      />
    </PublicShell>
  );
}
