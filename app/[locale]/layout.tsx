import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { PROJECT_NAME } from "@/utils/config";
import { organizationJsonLd, SITE_URL } from "@/utils/seo";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    "7J7zaXa4pMRFVD1HGsvVbLSd3KsITxdkhjQrKzlM4ho";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${PROJECT_NAME} – Ocean & Air Freight Solutions`,
      template: `%s | ${PROJECT_NAME}`,
    },
    description:
      "Compare instant ocean and air freight quotations across 150+ shipping lines. Track live multimodal containers via AIS radar and manage customs declarations — all in one platform.",
    applicationName: PROJECT_NAME,
    keywords: [
      "freight forwarding",
      "ocean freight",
      "air freight",
      "shipping rates",
      "container tracking",
      "logistics",
      "freight quote",
      "FCL",
      "LCL",
      "customs clearance",
      "supply chain",
      "AIS tracking",
      "GlobFreight",
    ],
    authors: [{ name: PROJECT_NAME, url: SITE_URL }],
    creator: PROJECT_NAME,
    icons: [
      { rel: "icon", url: "/logo.png" },
      { rel: "apple-touch-icon", url: "/logo.png" },
    ],
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: PROJECT_NAME,
    },
    manifest: "/manifest.json",
    openGraph: {
      type: "website",
      siteName: PROJECT_NAME,
      title: `${PROJECT_NAME} – Ocean & Air Freight Solutions`,
      description:
        "Compare instant ocean and air freight quotations across 150+ shipping lines. Track containers in real time and manage customs declarations in one unified platform.",
      url: `${SITE_URL}/${locale}`,
      locale: locale,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${PROJECT_NAME} – Ocean & Air Freight Solutions`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${PROJECT_NAME} – Ocean & Air Freight Solutions`,
      description:
        "Compare instant ocean and air freight quotations across 150+ shipping lines. Track containers in real time.",
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: googleVerification
      ? {
          google: googleVerification,
        }
      : undefined,
  };
}

export default async function AppLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const params = await props.params;

  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const { children } = props;

  // Providing all messages to the client
  // side is the easiest way to get started
  // const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning={true}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={await getMessages({ locale })}>
            {/* <IntlErrorHandlingProvider locale={locale}> */}
            {children}
            <Toaster duration={8000} richColors={true} />
            {/* </IntlErrorHandlingProvider> */}

            <NextTopLoader
              crawl
              shadow={`#FE6F00`}
              easing="easing"
              color="#FE6F00"
              showSpinner={false}
            />
            {/* Add a modal root div for portal-based components */}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
