import type { Metadata } from "next";
import { Service, getServiceText, getServiceFeatures } from "@/types/service";
import {
  getBreadcrumbJsonLd,
  getFaqJsonLd,
  getServiceJsonLd,
  SITE_URL
} from "./seo";

interface AlternatesMap {
  canonical: string;
  languages: Record<string, string>;
}

export function getServiceCoreSeo(
  service: Service,
  locale: string,
  alternates: AlternatesMap
) {
  const serviceName = getServiceText(service.name, locale);
  const metaTitleRaw = getServiceText(service.seo?.meta_title, locale);
  const title = metaTitleRaw || (serviceName ? `${serviceName} | GlobFreight` : "GlobFreight");

  const description =
    getServiceText(service.seo?.meta_description, locale) ||
    getServiceText(service.short_description, locale) ||
    "Professional freight forwarding, customs clearance, and global logistics solutions by GlobFreight.";

  const rawCanonical = service.seo?.canonical_url;
  const customCanonical =
    typeof rawCanonical === "object" && rawCanonical !== null
      ? getServiceText(rawCanonical, locale)
      : rawCanonical;

  const canonicalUrl =
    customCanonical && typeof customCanonical === "string" && customCanonical.trim() !== ""
      ? customCanonical.trim()
      : alternates.canonical;

  const image = getServiceText(service.image, locale) || "/hero.webp";
  const ogImage = service.seo?.og_image || image;
  const focusKeyphrase = getServiceText(service.seo?.focus_keyphrase, locale);
  const features = getServiceFeatures(service.features, locale);

  return {
    title,
    serviceName,
    description,
    canonicalUrl,
    image,
    ogImage,
    focusKeyphrase,
    features
  };
}

export function buildServiceMetadata(
  service: Service,
  locale: string,
  alternates: AlternatesMap
): Metadata {
  const {
    title,
    serviceName,
    description,
    canonicalUrl,
    ogImage,
    focusKeyphrase,
    features
  } = getServiceCoreSeo(service, locale, alternates);

  const ogTitle = getServiceText(service.seo?.og_title, locale) || title;
  const ogDescription = getServiceText(service.seo?.og_description, locale) || description;
  const ogImageAlt =
    getServiceText(service.seo?.og_image_alt, locale) ||
    getServiceText(service.image_alt, locale) ||
    serviceName;

  const twitterCard = (
    service.seo?.twitter_card === "summary" ? "summary" : "summary_large_image"
  ) as "summary" | "summary_large_image";
  const twitterTitle = getServiceText(service.seo?.twitter_title, locale) || ogTitle;
  const twitterDescription =
    getServiceText(service.seo?.twitter_description, locale) || ogDescription;
  const twitterImage = service.seo?.twitter_image || ogImage;

  const backendKeywords = Array.isArray(service.seo?.keywords)
    ? service.seo.keywords
    : typeof service.seo?.keywords === "string"
    ? service.seo.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  const keywords = [
    ...(focusKeyphrase ? [focusKeyphrase] : []),
    ...backendKeywords,
    ...features,
    "GlobFreight",
    "freight forwarding",
    "logistics",
    "cargo shipping"
  ];

  const metaRobotsRaw = service.seo?.meta_robots?.toLowerCase() || "";
  const isNoIndex = metaRobotsRaw.includes("noindex") || service.is_active === false;

  return {
    title,
    description,
    keywords,
    alternates: { ...alternates, canonical: canonicalUrl },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      type: "website",
      siteName: "GlobFreight",
      locale,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`,
          width: 1200,
          height: 630,
          alt: ogImageAlt
        }
      ]
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      images: [
        twitterImage.startsWith("http")
          ? twitterImage
          : `${SITE_URL}${twitterImage.startsWith("/") ? "" : "/"}${twitterImage}`
      ]
    },
    robots: isNoIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1
        }
  };
}

export function buildServiceSchemas(
  service: Service,
  locale: string,
  alternates: AlternatesMap
): Record<string, unknown>[] {
  const { title, serviceName, description, canonicalUrl } = getServiceCoreSeo(
    service,
    locale,
    alternates
  );

  const breadcrumbs = [
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
    { name: locale === "ar" ? "الخدمات" : "Services", url: `${SITE_URL}/${locale}/services` }
  ];

  if (service.parent) {
    const parentName = getServiceText(service.parent.name, locale);
    const parentSlug = getServiceText(service.parent.slug, locale);
    if (parentName && parentSlug) {
      breadcrumbs.push({
        name: parentName,
        url: `${SITE_URL}/${locale}/services/${encodeURIComponent(parentSlug)}`
      });
    }
  }

  breadcrumbs.push({ name: serviceName || title, url: canonicalUrl });

  const schemas: Record<string, unknown>[] = [
    getBreadcrumbJsonLd(breadcrumbs),
    getServiceJsonLd({
      name: serviceName || title,
      description,
      serviceType: service.seo?.schema_markup_type || "FreightForwarding",
      areaServed: ["European Union", "Benelux", "Belgium", "Netherlands", "Germany", "France"],
      url: canonicalUrl
    })
  ];

  if (Array.isArray(service.seo?.faqs) && service.seo.faqs.length > 0) {
    schemas.push(getFaqJsonLd(service.seo.faqs));
  }

  if (service.seo?.schema_markup) {
    if (typeof service.seo.schema_markup === "object") {
      schemas.push(service.seo.schema_markup as Record<string, unknown>);
    } else if (
      typeof service.seo.schema_markup === "string" &&
      service.seo.schema_markup.trim().startsWith("{")
    ) {
      try {
        schemas.push(JSON.parse(service.seo.schema_markup));
      } catch {}
    }
  }

  return schemas;
}
