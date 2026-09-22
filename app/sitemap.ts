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
        const slug = post.slug || post.id?.toString();
        if (!slug) continue;

        const path = `/blog/${slug}`;
        const languages: Record<string, string> = {};
        for (const loc of SYSTEM_LOCALES) {
          languages[loc] = `${SITE_URL}/${loc}${path}`;
        }
        languages["x-default"] = `${SITE_URL}/en${path}`;

        const lastModified = post.updated_at || post.updatedAt || post.created_at || post.createdAt
          ? new Date(post.updated_at || post.updatedAt || post.created_at || post.createdAt)
          : new Date();

        for (const locale of SYSTEM_LOCALES) {
          entries.push({
            url: `${SITE_URL}/${locale}${path}`,
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

