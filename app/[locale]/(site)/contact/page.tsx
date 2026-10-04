import { StandardPage } from "@/components/pages/home/standard-page";
import { getBreadcrumbJsonLd, getLocalBusinessJsonLd, getOpenGraphImages, getPageAlternates, SITE_URL } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.contact" });
  const title = t("title") as string;
  const description = t("body") as string;
  const desc = description.length > 155 ? description.slice(0, 152) + "…" : description;
  const alternates = getPageAlternates("/contact", locale);
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

export default async function ContactPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const pageUrl = `${SITE_URL}/${locale}/contact`;
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "Contact", url: pageUrl }
  ]);
  const localBusinessJsonLd = getLocalBusinessJsonLd({ url: pageUrl });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <StandardPage kind="contact" />
    </>
  );
}


