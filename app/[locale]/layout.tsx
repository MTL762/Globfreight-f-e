import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://globfreight.com"),
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
  authors: [{ name: PROJECT_NAME, url: "https://globfreight.com" }],
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
    url: "https://globfreight.com",
    locale: "en",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: `${PROJECT_NAME} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROJECT_NAME} – Ocean & Air Freight Solutions`,
    description:
      "Compare instant ocean and air freight quotations across 150+ shipping lines. Track containers in real time.",
    images: ["/logo.png"],
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
  alternates: {
    canonical: "https://globfreight.com",
    languages: {
      en: "https://globfreight.com/en",
      nl: "https://globfreight.com/nl",
      fr: "https://globfreight.com/fr",
      de: "https://globfreight.com/de",
      ar: "https://globfreight.com/ar",
    },
  },
};
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
