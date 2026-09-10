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
      image: `${SITE_URL}/logo.png`,
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
    },
  ],
};
