import { fetchHelper } from "@/api/fetch";
import { PublicShell } from "@/components/pages/home/public-shell";
import { PublicServicesList } from "@/components/pages/services/public-services-list";
import { Service, getServiceText } from "@/types/service";
import {
  getBreadcrumbJsonLd,
  getOpenGraphImages,
  getPageAlternates,
  getServiceJsonLd,
  SITE_URL
} from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.services" });
  const title = t("title") as string;
  const description = t("body") as string;
  const desc = description.length > 155 ? description.slice(0, 152) + "…" : description;
  const alternates = getPageAlternates("/services", locale);

  return {
    title,
    description: desc,
    alternates,
    openGraph: {
      title,
      description: desc,
      url: alternates.canonical,
      type: "website",
      siteName: "GlobFreight",
      images: getOpenGraphImages(title)
    }
  };
}

export default async function ServicesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [t, servicesRes] = await Promise.all([
    getTranslations({ locale, namespace: "Pages.services" }),
    fetchHelper({
      endPoint: ["services"],
      locale: locale as any,
      method: "GET"
    }).catch(() => null)
  ]);

  const services: Service[] = Array.isArray(servicesRes?.data) ? servicesRes.data : [];
  const title = t("title") as string;
  const description = t("body") as string;
  const pageUrl = `${SITE_URL}/${locale}/services`;

  const serviceJsonLd = getServiceJsonLd({
    name: title,
    description,
    serviceType: "FreightForwarding",
    areaServed: ["Belgium", "Netherlands", "Germany", "France", "European Union"],
    url: pageUrl
  });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: locale === "ar" ? "الرئيسية" : "Home", url: `${SITE_URL}/${locale}` },
    { name: locale === "ar" ? "الخدمات" : "Services", url: pageUrl }
  ]);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: getServiceText(s.name, locale),
      url: `${SITE_URL}/${locale}/services/${encodeURIComponent(getServiceText(s.slug, locale))}`
    }))
  };

  const alternates = getPageAlternates("/services", locale);

  return (
    <PublicShell alternateLinks={alternates.languages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [serviceJsonLd, itemListJsonLd]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PublicServicesList services={services} locale={locale} />
    </PublicShell>
  );
}
