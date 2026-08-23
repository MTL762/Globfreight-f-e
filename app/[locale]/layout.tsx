import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { PROJECT_NAME } from "@/utils/config";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import "../globals.css";

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: "Enow HR System",
  applicationName: PROJECT_NAME,
  icons: [
    { rel: "icon", url: "/logo.svg" },
    { rel: "apple-touch-icon", url: "/logo.svg" }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: PROJECT_NAME
  },
  manifest: "/manifest.json"
};

export const dynamic = "force-dynamic"; // Force dynamic rendering for this layout
export default async function AppLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const params = await props.params;

  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
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
              shadow={`#16a34a`}
              easing="easing"
              color="#16a34a"
              showSpinner={false}
            />
            {/* Add a modal root div for portal-based components */}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
