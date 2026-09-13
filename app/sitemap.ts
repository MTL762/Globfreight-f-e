import { SITE_URL, SYSTEM_LOCALES } from "@/utils/seo";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/ship-with-us", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/quote", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  return staticPages.map((page) => {
    const languages: Record<string, string> = {};
    for (const locale of SYSTEM_LOCALES) {
      languages[locale] = `${SITE_URL}/${locale}${page.path}`;
    }

    return {
      url: `${SITE_URL}/en${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages,
      },
    };
  });
}
