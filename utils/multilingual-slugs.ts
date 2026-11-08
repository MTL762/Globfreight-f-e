import { cache } from "react";
import { fetchHelper } from "@/api/fetch";
import { redirect } from "next/navigation";
import { SITE_URL, SYSTEM_LOCALES, SystemLocale } from "./seo";

const API_BASE = (
  process.env.API_BASE_URL ||
  process.env.baseUrl ||
  "https://api.globfreight.com"
).replace(/\/$/, "");

export function safeDecodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export function encodeSlug(slug: string): string {
  return encodeURIComponent(safeDecodeSlug(slug.trim()));
}

export function isValidSlugValue(val: unknown): val is string {
  if (typeof val !== "string") return false;
  const trimmed = val.trim();
  return (
    trimmed.length > 0 &&
    trimmed.toLowerCase() !== "object-object" &&
    trimmed.toLowerCase() !== "[object object]" &&
    trimmed !== "undefined" &&
    trimmed !== "null"
  );
}

export function getStrictLocalizedValue(val: unknown, locale: string): string {
  if (!val) return "";
  if (typeof val === "string") return isValidSlugValue(val) ? val.trim() : "";
  if (typeof val === "object" && val !== null) {
    const localized = (val as Record<string, unknown>)[locale];
    return isValidSlugValue(localized) ? localized.trim() : "";
  }
  return "";
}

/**
 * Resolves translated slugs across all supported locales for a given resource.
 */
async function fetchTranslatedSlugs({
  slug,
  entity,
  titleKey,
  endpointPath,
  currentLocale
}: {
  slug: string;
  entity: any;
  titleKey: "title" | "name";
  endpointPath: "blog-posts/slug" | "categories/slug" | "services/slug";
  currentLocale: string;
}): Promise<Partial<Record<SystemLocale, string>>> {
  const result: Partial<Record<SystemLocale, string>> = {};
  const publishedLocales: string[] | null =
    Array.isArray(entity?.published_locales) && entity.published_locales.length > 0
      ? entity.published_locales
      : null;

  // If entity.slug is already a localized object
  if (entity && typeof entity.slug === "object" && entity.slug !== null) {
    for (const loc of SYSTEM_LOCALES) {
      if (publishedLocales && !publishedLocales.includes(loc)) continue;
      const s = getStrictLocalizedValue(entity.slug, loc);
      const label = getStrictLocalizedValue(entity[titleKey], loc);
      if (s && label) result[loc] = s;
    }
    return result;
  }

  // Set current locale from the already-fetched entity
  const currentSlug = getStrictLocalizedValue(entity?.slug, currentLocale);
  const currentLabel = getStrictLocalizedValue(entity?.[titleKey], currentLocale);
  if (currentSlug && currentLabel && SYSTEM_LOCALES.includes(currentLocale as SystemLocale)) {
    result[currentLocale as SystemLocale] = currentSlug;
  }

  const cleanSlug = encodeSlug(slug);

  await Promise.all(
    SYSTEM_LOCALES.map(async (loc) => {
      if (result[loc]) return;
      if (publishedLocales && !publishedLocales.includes(loc)) return;

      try {
        const res = await fetch(`${API_BASE}/${endpointPath}/${cleanSlug}?locale=${loc}`, {
          headers: { Accept: "application/json", "Accept-Language": loc, Locale: loc },
          cache: "no-store"
        });
        const json = await res.json().catch(() => null);

        if (res.status === 301 || json?.status === 301 || json?.data?.is_redirect) {
          const redirected = json?.data?.new_slug || json?.data?.current_slug;
          if (isValidSlugValue(redirected)) result[loc] = redirected.trim();
          return;
        }

        if (res.ok && json?.data) {
          const data = json.data;
          if (
            Array.isArray(data.published_locales) &&
            data.published_locales.length > 0 &&
            !data.published_locales.includes(loc)
          ) {
            return;
          }
          const s = getStrictLocalizedValue(data.slug, loc);
          const label = getStrictLocalizedValue(data[titleKey], loc);
          if (s && label) result[loc] = s;
        }
      } catch { }
    })
  );

  return result;
}

function buildAlternates(
  slugsByLocale: Partial<Record<string, string>>,
  currentLocale: string,
  basePath: "blog" | "blog/category" | "services",
  publishedLocales?: string[]
) {
  const languages: Record<string, string> = {};
  const allowedLocales =
    Array.isArray(publishedLocales) && publishedLocales.length > 0
      ? SYSTEM_LOCALES.filter((loc) => publishedLocales.includes(loc))
      : SYSTEM_LOCALES;

  for (const loc of allowedLocales) {
    const s = slugsByLocale[loc];
    if (isValidSlugValue(s)) {
      languages[loc] = `${SITE_URL}/${loc}/${basePath}/${encodeSlug(s)}`;
    }
  }

  const defaultLoc =
    (allowedLocales.includes("en" as any) && isValidSlugValue(slugsByLocale.en)
      ? "en"
      : undefined) || allowedLocales.find((loc) => isValidSlugValue(slugsByLocale[loc]));

  if (defaultLoc && isValidSlugValue(slugsByLocale[defaultLoc])) {
    languages["x-default"] = `${SITE_URL}/${defaultLoc}/${basePath}/${encodeSlug(
      slugsByLocale[defaultLoc]!
    )}`;
  }

  const currentSlug =
    slugsByLocale[currentLocale] || (defaultLoc ? slugsByLocale[defaultLoc] : "") || "";

  return {
    canonical: currentSlug
      ? `${SITE_URL}/${currentLocale}/${basePath}/${encodeSlug(currentSlug)}`
      : `${SITE_URL}/${currentLocale}/${basePath === "services" ? "services" : "blog"}`,
    languages
  };
}

/**
 * Memoized per-request resolver for Blog Post dynamic route (shared between generateMetadata & Page).
 */
const fetchAndResolvePost = cache(async (slug: string, locale: string) => {
  const res = await fetchHelper({
    endPoint: ["blogPostsSlug", encodeSlug(slug)],
    method: "GET",
    locale: locale as any
  }).catch(() => ({ success: false, status: 500 }));

  const post = res?.success && res?.data && "id" in res.data ? res.data : null;
  const slugsByLocale = post
    ? await fetchTranslatedSlugs({
      slug,
      entity: post,
      titleKey: "title",
      endpointPath: "blog-posts/slug",
      currentLocale: locale
    })
    : {};
  const alternates = buildAlternates(slugsByLocale, locale, "blog", post?.published_locales);

  return { res, post, slugsByLocale, alternates };
});

/**
 * Memoized per-request resolver for Category dynamic route (shared between generateMetadata & Page).
 */
const fetchAndResolveCategory = cache(async (slug: string, locale: string) => {
  const res = await fetchHelper({
    endPoint: ["categoriesSlug", encodeSlug(slug)],
    method: "GET",
    locale: locale as any
  }).catch(() => null);

  let category = res?.data && (res.data.id || res.data.name) ? res.data : null;

  if (!category && res?.status !== 301 && !res?.isRedirect) {
    const listRes = await fetchHelper({
      endPoint: ["categories"],
      method: "GET",
      locale: locale as any
    }).catch(() => null);
    const decoded = safeDecodeSlug(slug).toLowerCase();
    category =
      (Array.isArray(listRes?.data) ? listRes.data : []).find((cat: any) => {
        const cSlug = getStrictLocalizedValue(cat.slug, locale);
        return (cSlug && cSlug.toLowerCase() === decoded) || String(cat.id) === decoded;
      }) || null;
  }

  const slugsByLocale = category
    ? await fetchTranslatedSlugs({
      slug,
      entity: category,
      titleKey: "name",
      endpointPath: "categories/slug",
      currentLocale: locale
    })
    : {};
  const alternates = buildAlternates(slugsByLocale, locale, "blog/category");

  return { res, category, slugsByLocale, alternates };
});

function guardDynamicEntity({
  slug,
  locale,
  basePath,
  titleKey,
  res,
  entity,
  slugsByLocale,
  enforceRedirects
}: {
  slug: string;
  locale: string;
  basePath: "blog" | "blog/category" | "services";
  titleKey: "title" | "name";
  res: any;
  entity: any;
  slugsByLocale: Partial<Record<SystemLocale, string>>;
  enforceRedirects: boolean;
}) {
  if (res?.status === 301 || res?.isRedirect || res?.is_redirect || res?.data?.is_redirect) {
    const newSlug = res?.data?.new_slug || res?.new_slug || res?.newSlug;
    if (isValidSlugValue(newSlug)) {
      redirect(`/${locale}/${basePath}/${encodeSlug(newSlug)}`);
    }
    if (enforceRedirects) redirect(`/${locale}`);
  }

  if (!enforceRedirects) {
    return entity ? slugsByLocale[locale as SystemLocale] || "" : "";
  }

  const publishedLocales: string[] | undefined = Array.isArray(entity?.published_locales)
    ? entity.published_locales
    : undefined;
  const isPublished =
    !publishedLocales || publishedLocales.length === 0 || publishedLocales.includes(locale);

  const strictLabel = getStrictLocalizedValue(entity?.[titleKey], locale);
  const strictSlug = getStrictLocalizedValue(entity?.slug, locale);
  const canonicalSlug = strictSlug || slugsByLocale[locale as SystemLocale];

  if (!entity || !isPublished || !strictLabel || !canonicalSlug) {
    redirect(`/${locale}`);
  }

  if (safeDecodeSlug(slug) !== safeDecodeSlug(canonicalSlug)) {
    redirect(`/${locale}/${basePath}/${encodeSlug(canonicalSlug)}`);
  }

  return canonicalSlug;
}

/**
 * Memoized per-request resolver for Service dynamic route.
 */
const fetchAndResolveService = cache(async (slug: string, locale: string) => {
  const res = await fetchHelper({
    endPoint: ["servicesSlug", encodeSlug(slug)],
    method: "GET",
    locale: locale as any
  }).catch(() => null);

  let service = res?.data && (res.data.id || res.data.name) ? res.data : null;

  if (!service && res?.status !== 301 && !res?.isRedirect && !res?.is_redirect && !res?.data?.is_redirect) {
    const listRes = await fetchHelper({
      endPoint: ["services"],
      method: "GET",
      locale: locale as any
    }).catch(() => null);
    const decoded = safeDecodeSlug(slug).toLowerCase();
    service =
      (Array.isArray(listRes?.data) ? listRes.data : []).find((srv: any) => {
        const sSlug = getStrictLocalizedValue(srv.slug, locale);
        return (sSlug && sSlug.toLowerCase() === decoded) || String(srv.id) === decoded;
      }) || null;
  }

  const slugsByLocale = service
    ? await fetchTranslatedSlugs({
      slug,
      entity: service,
      titleKey: "name",
      endpointPath: "services/slug",
      currentLocale: locale
    })
    : {};
  const alternates = buildAlternates(slugsByLocale, locale, "services", service?.published_locales);

  return { res, service, slugsByLocale, alternates };
});

export async function resolveServicePage(
  slug: string,
  locale: string,
  enforceRedirects = true
) {
  const { res, service, slugsByLocale, alternates } = await fetchAndResolveService(
    slug,
    locale
  );
  const currentCanonicalSlug = guardDynamicEntity({
    slug,
    locale,
    basePath: "services",
    titleKey: "name",
    res,
    entity: service,
    slugsByLocale,
    enforceRedirects
  });

  return { service, currentCanonicalSlug, slugsByLocale, alternates };
}

export async function resolveBlogPostPage(
  slug: string,
  locale: string,
  enforceRedirects = true
) {
  const { res, post, slugsByLocale, alternates } = await fetchAndResolvePost(slug, locale);
  const currentCanonicalSlug = guardDynamicEntity({
    slug,
    locale,
    basePath: "blog",
    titleKey: "title",
    res,
    entity: post,
    slugsByLocale,
    enforceRedirects
  });

  return { post, currentCanonicalSlug, slugsByLocale, alternates };
}

export async function resolveCategoryPage(
  slug: string,
  locale: string,
  enforceRedirects = true
) {
  const { res, category, slugsByLocale, alternates } = await fetchAndResolveCategory(
    slug,
    locale
  );
  const currentCanonicalSlug = guardDynamicEntity({
    slug,
    locale,
    basePath: "blog/category",
    titleKey: "name",
    res,
    entity: category,
    slugsByLocale,
    enforceRedirects
  });

  return { category, currentCanonicalSlug, slugsByLocale, alternates };
}
