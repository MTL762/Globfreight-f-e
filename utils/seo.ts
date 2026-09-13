export const SITE_URL = "https://globfreight.com";
export const SYSTEM_LOCALES = ["en", "nl", "fr", "de", "ar"] as const;

export type SystemLocale = (typeof SYSTEM_LOCALES)[number];

/**
 * Generates accurate self-referencing canonical and hreflang alternate URLs
 * for multilingual pages to prevent canonical conflicts and redirect loops in search engines.
 */
export function getPageAlternates(path: string = "", currentLocale: string = "en") {
  const cleanPath = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";

  const languages: Record<string, string> = {};
  for (const loc of SYSTEM_LOCALES) {
    languages[loc] = `${SITE_URL}/${loc}${cleanPath}`;
  }
  languages["x-default"] = `${SITE_URL}/en${cleanPath}`;

  return {
    canonical: `${SITE_URL}/${currentLocale}${cleanPath}`,
    languages,
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "GlobFreight",
      alternateName: ["GlobFreight Logistics", "Glob Freight"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.png`,
        caption: "GlobFreight",
      },
      image: `${SITE_URL}/og-image.jpg`,
      description:
        "Bonded freight forwarding, direct seaport customs declarations, and rapid inland haulage across Antwerp, Rotterdam, and European trade corridors.",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English", "Dutch", "French", "German", "Arabic"],
        },
      ],
      areaServed: [
        { "@type": "Continent", name: "Europe" },
        { "@type": "Continent", name: "Asia" },
        { "@type": "Continent", name: "Africa" },
      ],
      knowsAbout: [
        "Ocean Freight",
        "Air Freight",
        "Customs Clearance",
        "FCL Shipping",
        "LCL Shipping",
        "Container Tracking",
        "Freight Forwarding",
        "Supply Chain Management",
        "Inland Haulage",
        "Bonded Warehousing",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "GlobFreight",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/en/blog?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["en", "nl", "fr", "de", "ar"],
    },
  ],
};

/**
 * Generates BreadcrumbList structured data for a page.
 */
export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates FAQPage structured data from a list of Q&A pairs.
 */
export function getFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
