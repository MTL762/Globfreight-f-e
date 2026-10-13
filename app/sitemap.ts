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

  // 1. Static Pages with hreflang alternates across all languages + x-default
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

  const apiBase = (process.env.API_BASE_URL || process.env.baseUrl || "https://api.globfreight.com").replace(/\/$/, "");

  // 2. Dynamic Categories with localized slugs and hreflang alternates
  try {
    const catResponses = await Promise.all(
      SYSTEM_LOCALES.map(async (loc) => {
        try {
          const res = await fetch(`${apiBase}/categories`, {
            headers: { Accept: "application/json", "Accept-Language": loc, Locale: loc },
            next: { revalidate: 3600 }
          });
          if (res.ok) {
            const json = await res.json();
            return { loc, items: Array.isArray(json?.data) ? json.data : [] };
          }
        } catch {}
        return { loc, items: [] };
      })
    );

    const categoryMap = new Map<number, { slugs: Record<string, string>; lastModified: Date }>();

    for (const { loc, items } of catResponses) {
      for (const cat of items) {
        if (!cat?.id) continue;
        const existing = categoryMap.get(cat.id) || {
          slugs: {},
          lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date()
        };
        const catSlug = typeof cat.slug === "object" && cat.slug !== null
          ? cat.slug[loc] || cat.slug.en || cat.slug.ar || Object.values(cat.slug)[0]
          : cat.slug || String(cat.id);

        if (catSlug) {
          existing.slugs[loc] = catSlug;
        }
        if (cat.updated_at) {
          existing.lastModified = new Date(cat.updated_at);
        }
        categoryMap.set(cat.id, existing);
      }
    }

    for (const [, { slugs, lastModified }] of categoryMap.entries()) {
      const languages: Record<string, string> = {};
      const defaultSlug = slugs.en || Object.values(slugs)[0];
      if (!defaultSlug) continue;

      for (const loc of SYSTEM_LOCALES) {
        const s = slugs[loc] || defaultSlug;
        languages[loc] = `${SITE_URL}/${loc}/blog/category/${encodeURIComponent(decodeURIComponent(s))}`;
      }
      languages["x-default"] = `${SITE_URL}/en/blog/category/${encodeURIComponent(decodeURIComponent(defaultSlug))}`;

      for (const locale of SYSTEM_LOCALES) {
        const s = slugs[locale] || defaultSlug;
        entries.push({
          url: `${SITE_URL}/${locale}/blog/category/${encodeURIComponent(decodeURIComponent(s))}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: {
            languages,
          },
        });
      }
    }
  } catch (err) {
    console.error("Failed to include categories in sitemap:", err);
  }

  // 3. Dynamic Blog Posts with localized slugs and hreflang alternates
  try {
    const postResponses = await Promise.all(
      SYSTEM_LOCALES.map(async (loc) => {
        try {
          const res = await fetch(`${apiBase}/blog-posts?per_page=100`, {
            headers: { Accept: "application/json", "Accept-Language": loc, Locale: loc },
            next: { revalidate: 3600 }
          });
          if (res.ok) {
            const json = await res.json();
            return { loc, items: Array.isArray(json?.data) ? json.data : [] };
          }
        } catch {}
        return { loc, items: [] };
      })
    );

    const postMap = new Map<number, { slugs: Record<string, string>; lastModified: Date }>();

    for (const { loc, items } of postResponses) {
      for (const post of items) {
        if (!post?.id) continue;
        const existing = postMap.get(post.id) || {
          slugs: {},
          lastModified: post.updated_at || post.published_at || post.created_at
            ? new Date(post.updated_at || post.published_at || post.created_at)
            : new Date()
        };
        const postSlug = typeof post.slug === "object" && post.slug !== null
          ? post.slug[loc] || post.slug.en || post.slug.ar || Object.values(post.slug)[0]
          : post.slug || String(post.id);

        if (postSlug) {
          existing.slugs[loc] = postSlug;
        }
        if (post.updated_at || post.published_at) {
          existing.lastModified = new Date(post.updated_at || post.published_at);
        }
        postMap.set(post.id, existing);
      }
    }

    for (const [, { slugs, lastModified }] of postMap.entries()) {
      const languages: Record<string, string> = {};
      const defaultSlug = slugs.en || Object.values(slugs)[0];
      if (!defaultSlug) continue;

      for (const loc of SYSTEM_LOCALES) {
        const s = slugs[loc] || defaultSlug;
        languages[loc] = `${SITE_URL}/${loc}/blog/${encodeURIComponent(decodeURIComponent(s))}`;
      }
      languages["x-default"] = `${SITE_URL}/en/blog/${encodeURIComponent(decodeURIComponent(defaultSlug))}`;

      for (const locale of SYSTEM_LOCALES) {
        const s = slugs[locale] || defaultSlug;
        entries.push({
          url: `${SITE_URL}/${locale}/blog/${encodeURIComponent(decodeURIComponent(s))}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
          alternates: {
            languages,
          },
        });
      }
    }
  } catch (err) {
    console.error("Failed to include blog posts in sitemap:", err);
  }

  return entries;
}
