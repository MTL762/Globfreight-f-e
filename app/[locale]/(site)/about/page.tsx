import { StandardPage } from "@/components/pages/home/standard-page";
import { getBreadcrumbJsonLd, getOpenGraphImages, getPageAlternates, SITE_URL } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.about" });
  const title = t("title") as string;
  const description = t("body") as string;
  const desc = description.length > 155 ? description.slice(0, 152) + "…" : description;
  const alternates = getPageAlternates("/about", locale);
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

export default async function AboutPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const pageUrl = `${SITE_URL}/${locale}/about`;
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/${locale}` },
    { name: "About", url: pageUrl }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <StandardPage kind="about" />
    </>
  );
}


