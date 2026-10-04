import { PublicHome } from "@/components/pages/home/public-home";
import { getPageAlternates, SITE_URL } from "@/utils/seo";
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
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "GlobFreight – Ocean & Air Freight Solutions"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`]
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


