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

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo-preview.png`;

/**
 * Returns WhatsApp and social-media optimized OpenGraph images.
 * Priority 1: 600x600 square logo (<100KB, perfect for WhatsApp chat link previews).
 * Priority 2: 1200x630 banner for Twitter/LinkedIn rich cards.
 */
export function getOpenGraphImages(title?: string) {
  return [
    {
      url: `${SITE_URL}/logo-preview.png`,
      width: 600,
      height: 600,
      type: "image/png",
      alt: title ? `${title} – GlobFreight` : "GlobFreight Logo",
    },
    {
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: title ? `${title} – GlobFreight` : "GlobFreight – Ocean & Air Freight Solutions",
    },
  ];
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

/**
 * Generates Service structured data for European logistics & customs clearance.
 */
export function getServiceJsonLd({
  name,
  description,
  serviceType = "FreightForwarding",
  areaServed = ["Belgium", "Netherlands", "Germany", "France", "European Union"],
  url = SITE_URL,
}: {
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string | string[];
  url?: string;
}) {
  return {
    "@type": "Service",
    "@id": `${url}/#service`,
    name,
    description,
    serviceType,
    provider: {
      "@type": "Organization",
      name: "Globfreight",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    areaServed: Array.isArray(areaServed)
      ? areaServed.map(area => ({ "@type": "AdministrativeArea", name: area }))
      : [{ "@type": "AdministrativeArea", name: areaServed }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Maritime Seaport Clearance & Bonded Haulage",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Direct Seaport EDI Customs Clearance (Antwerp & Rotterdam)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Type II Bonded Storage & EU VAT Deferment (Article 23)",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Intermodal Container Inland Haulage & Fast-Track Dispatch",
          },
        },
      ],
    },
  };
}

/**
 * Generates LocalBusiness structured data for Globfreight seaport branch offices.
 */
export function getLocalBusinessJsonLd({
  name = "Globfreight European Seaport Logistics & Customs",
  url = SITE_URL,
  image = `${SITE_URL}/og-image.jpg`,
}: {
  name?: string;
  url?: string;
  image?: string;
} = {}) {
  return {
    "@type": "LocalBusiness",
    "@id": `${url}/#localbusiness`,
    name,
    url,
    image,
    telephone: "+32 3 205 90 00",
    email: "operations@globfreight.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Haven 1025, Scheldelaan",
      addressLocality: "Antwerp",
      postalCode: "2030",
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.2980",
      longitude: "4.3310",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "19:00",
      },
    ],
  };
}

/**
 * Generates a unified JSON-LD graph combining Service + LocalBusiness + FAQPage + Breadcrumbs.
 */
export function getPageCompleteJsonLd({
  title,
  description,
  url,
  breadcrumbs = [],
  faqs = [],
  serviceType,
  areaServed,
}: {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  serviceType?: string;
  areaServed?: string | string[];
}) {
  const graph: any[] = [
    {
      "@type": "WebPage",
      "@id": `${url}/#webpage`,
      url,
      name: title,
      description,
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
      },
    },
    getServiceJsonLd({ name: title, description, serviceType, areaServed, url }),
    getLocalBusinessJsonLd({ url }),
  ];

  if (breadcrumbs.length > 0) {
    graph.push({
      ...getBreadcrumbJsonLd(breadcrumbs),
      "@id": `${url}/#breadcrumb`,
    });
  }

  if (faqs.length > 0) {
    graph.push({
      ...getFaqJsonLd(faqs),
      "@id": `${url}/#faq`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Generates BlogPosting structured data for articles to enhance Google indexing and SERP appearance.
 */
export function getArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = "Globfreight Logistics",
}: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    image: image ? [image] : [`${SITE_URL}/og-image.jpg`],
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || datePublished || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "GlobFreight",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

