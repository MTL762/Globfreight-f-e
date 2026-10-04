import { PublicHome } from "@/components/pages/home/public-home";
import { DEFAULT_OG_IMAGE, getOpenGraphImages, getPageAlternates, SITE_URL } from "@/utils/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  const title = t("title");
  // Keep description under 160 chars for Google snippet
  const fullDesc = t("body") as string;
  const description =
    fullDesc.length > 155 ? fullDesc.slice(0, 152) + "…" : fullDesc;
  const alternates = getPageAlternates("", locale);
  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "GlobFreight",
      images: getOpenGraphImages(title)
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE]
    }
  };
}

export default async function HomePage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return <PublicHome />;
}


