import { SITE_URL, SYSTEM_LOCALES } from "@/utils/seo";
import type { MetadataRoute } from "next";

export const revalidate = 3600;

interface StaticPageDef {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: StaticPageDef[] = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/ship-with-us", changeFrequency: "monthly", priority: 0.9 },
    { path: "/quote", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    const languages: Record<string, string> = {};
    for (const loc of SYSTEM_LOCALES) {
      languages[loc] = `${SITE_URL}/${loc}${page.path}`;
    }
    languages["x-default"] = `${SITE_URL}/en${page.path}`;

    for (const locale of SYSTEM_LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: locale === "en" ? page.priority : Math.max(0.2, Number((page.priority - 0.05).toFixed(2))),
        alternates: {
          languages,
        },
      });
    }
  }

  // Include published blog posts dynamically if API is reachable
  try {
    const apiBase = process.env.API_BASE_URL || process.env.baseUrl || "https://api.globfreight.com";
    const res = await fetch(`${apiBase}/blog-posts?per_page=100`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      const rawPosts = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];

      for (const post of rawPosts) {
        if (!post?.slug && !post?.id) continue;

        const languages: Record<string, string> = {};
        for (const loc of SYSTEM_LOCALES) {
          const locSlug =
            typeof post.slug === "object" && post.slug !== null
              ? post.slug[loc] || post.slug.en || post.slug.ar || Object.values(post.slug)[0]
              : post.slug || post.id?.toString();
          if (locSlug) {
            languages[loc] = `${SITE_URL}/${loc}/blog/${encodeURIComponent(decodeURIComponent(locSlug))}`;
          }
        }
        const defaultSlug =
          typeof post.slug === "object" && post.slug !== null
            ? post.slug.en || Object.values(post.slug)[0]
            : post.slug || post.id?.toString();
        languages["x-default"] = `${SITE_URL}/en/blog/${encodeURIComponent(decodeURIComponent(defaultSlug))}`;

        const lastModified = post.updated_at || post.updatedAt || post.created_at || post.createdAt
          ? new Date(post.updated_at || post.updatedAt || post.created_at || post.createdAt)
          : new Date();

        for (const locale of SYSTEM_LOCALES) {
          const locSlug =
            typeof post.slug === "object" && post.slug !== null
              ? post.slug[locale] || post.slug.en || post.slug.ar || Object.values(post.slug)[0]
              : post.slug || post.id?.toString();
          if (!locSlug) continue;

          entries.push({
            url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(decodeURIComponent(locSlug))}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
            alternates: {
              languages,
            },
          });
        }
      }
    }
  } catch (err) {
    console.error("Failed to include blog posts in sitemap:", err);
  }

  return entries;
}

