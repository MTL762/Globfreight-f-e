import { StandardPage } from "@/components/pages/home/standard-page";
import { getPageAlternates, getBreadcrumbJsonLd, getServiceJsonLd, SITE_URL } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
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
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: title }]
    }
  };
}

export default async function ServicesPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Pages.services" });
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
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Services", url: pageUrl }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [serviceJsonLd] }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StandardPage kind="services" />
    </>
  );
}


