import { SITE_URL, SYSTEM_LOCALES, SystemLocale } from "./seo";

/**
 * Resolves translated blog post slugs across all supported system locales.
 * Handles multilingual slug objects and cross-locale API queries with caching.
 */
export async function resolveAllPostSlugs(
  slug: string,
  post?: any
): Promise<Record<SystemLocale, string>> {
  const result: Partial<Record<SystemLocale, string>> = {};
  const apiBase = (process.env.API_BASE_URL || process.env.baseUrl || "https://api.globfreight.com").replace(/\/$/, "");

  // 1. If post.slug is already an object with translated values
  if (post && typeof post.slug === "object" && post.slug !== null) {
    let hasAll = true;
    for (const loc of SYSTEM_LOCALES) {
      const s = post.slug[loc] || post.slug.en || post.slug.ar;
      if (s) {
        result[loc] = s;
      } else {
        hasAll = false;
      }
    }
    if (hasAll) return result as Record<SystemLocale, string>;
  }

  const cleanSlug = encodeURIComponent(decodeURIComponent(slug));

  // 2. Query API in parallel for each locale with caching
  await Promise.all(
    SYSTEM_LOCALES.map(async (loc) => {
      if (result[loc]) return;
      try {
        const res = await fetch(`${apiBase}/blog-posts/slug/${cleanSlug}`, {
          headers: { Accept: "application/json", "Accept-Language": loc, Locale: loc },
          next: { revalidate: 3600 }
        });
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.slug) {
            result[loc] = json.data.slug;
            return;
          }
        }
      } catch {}

      // Fallback
      result[loc] = typeof post?.slug === "string" ? post.slug : slug;
    })
  );

  return result as Record<SystemLocale, string>;
}

/**
 * Resolves translated category slugs across all supported system locales.
 */
export async function resolveAllCategorySlugs(
  slug: string,
  category?: any
): Promise<Record<SystemLocale, string>> {
  const result: Partial<Record<SystemLocale, string>> = {};
  const apiBase = (process.env.API_BASE_URL || process.env.baseUrl || "https://api.globfreight.com").replace(/\/$/, "");

  // 1. If category.slug is already an object
  if (category && typeof category.slug === "object" && category.slug !== null) {
    let hasAll = true;
    for (const loc of SYSTEM_LOCALES) {
      const s = category.slug[loc] || category.slug.en || category.slug.ar;
      if (s) {
        result[loc] = s;
      } else {
        hasAll = false;
      }
    }
    if (hasAll) return result as Record<SystemLocale, string>;
  }

  const cleanSlug = encodeURIComponent(decodeURIComponent(slug));

  await Promise.all(
    SYSTEM_LOCALES.map(async (loc) => {
      if (result[loc]) return;
      try {
        const res = await fetch(`${apiBase}/categories/slug/${cleanSlug}`, {
          headers: { Accept: "application/json", "Accept-Language": loc, Locale: loc },
          next: { revalidate: 3600 }
        });
        if (res.ok) {
          const json = await res.json();
          if (json?.data?.slug) {
            result[loc] = json.data.slug;
            return;
          }
        }
      } catch {}

      // Fallback
      result[loc] = typeof category?.slug === "string" ? category.slug : slug;
    })
  );

  return result as Record<SystemLocale, string>;
}

/**
 * Builds alternating hreflang link objects for a blog post
 */
export function getBlogPostAlternates(
  slugsByLocale: Record<string, string>,
  currentLocale: string,
  publishedLocales?: string[]
) {
  const languages: Record<string, string> = {};
  const allowedLocales =
    Array.isArray(publishedLocales) && publishedLocales.length > 0
      ? SYSTEM_LOCALES.filter(loc => publishedLocales.includes(loc))
      : SYSTEM_LOCALES;

  for (const loc of allowedLocales) {
    const s = slugsByLocale[loc] || slugsByLocale.en || Object.values(slugsByLocale)[0];
    if (s) {
      languages[loc] = `${SITE_URL}/${loc}/blog/${encodeURIComponent(decodeURIComponent(s))}`;
    }
  }
  const defaultSlug =
    (allowedLocales.includes("en" as any) ? slugsByLocale.en : undefined) ||
    slugsByLocale[allowedLocales[0]] ||
    Object.values(slugsByLocale)[0];
  if (defaultSlug) {
    const defaultLoc = allowedLocales.includes("en" as any) ? "en" : allowedLocales[0] || "en";
    languages["x-default"] = `${SITE_URL}/${defaultLoc}/blog/${encodeURIComponent(decodeURIComponent(defaultSlug))}`;
  }

  const currentSlug = slugsByLocale[currentLocale] || defaultSlug;

  return {
    canonical: `${SITE_URL}/${currentLocale}/blog/${encodeURIComponent(decodeURIComponent(currentSlug))}`,
    languages
  };
}

/**
 * Builds alternating hreflang link objects for a category
 */
export function getCategoryAlternates(
  slugsByLocale: Record<string, string>,
  currentLocale: string
) {
  const languages: Record<string, string> = {};
  for (const loc of SYSTEM_LOCALES) {
    const s = slugsByLocale[loc] || slugsByLocale.en || Object.values(slugsByLocale)[0];
    languages[loc] = `${SITE_URL}/${loc}/blog/category/${encodeURIComponent(decodeURIComponent(s))}`;
  }
  const defaultSlug = slugsByLocale.en || Object.values(slugsByLocale)[0];
  languages["x-default"] = `${SITE_URL}/en/blog/category/${encodeURIComponent(decodeURIComponent(defaultSlug))}`;

  const currentSlug = slugsByLocale[currentLocale] || defaultSlug;

  return {
    canonical: `${SITE_URL}/${currentLocale}/blog/category/${encodeURIComponent(decodeURIComponent(currentSlug))}`,
    languages
  };
}
