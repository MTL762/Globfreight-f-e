import { ShipWithUsPage } from "@/components/pages/home/ship-with-us-page";
import { getBreadcrumbJsonLd, getOpenGraphImages, getPageAlternates, getServiceJsonLd, SITE_URL } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ShipWithUs.meta" });
  const title = t("title") as string;
  const description = t("description") as string;
  const alternates = getPageAlternates("/quote", locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      type: "website",
      siteName: "GlobFreight",
      images: getOpenGraphImages(title)
    }
  };
}

export default async function QuoteRoute(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const pageUrl = `${SITE_URL}/${locale}/quote`;
  const t = await getTranslations({ locale, namespace: "ShipWithUs.meta" });

  const serviceJsonLd = getServiceJsonLd({
    name: t("title") as string,
    description: t("description") as string,
    serviceType: "FreightBooking",
    url: pageUrl
  });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Quote", url: pageUrl }
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
      <ShipWithUsPage locale={locale} />
    </>
  );
}


