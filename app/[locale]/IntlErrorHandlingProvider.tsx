
"use client";

import { Locale, NextIntlClientProvider, useMessages } from "next-intl";
import { useCallback } from "react";
// const devMode = process.env.NODE_ENV;
export default function IntlErrorHandlingProvider({
  children,
  locale
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const handleError = useCallback(async (error: { message: string }) => {
    // if (devMode !== "development") {
    //   return null; // Ignore errors in production
    // }
    // Extract missing key and locale from error message
    console.log(error.message, 'das2dsa');
    const match = error.message.match(/Could not resolve `(.+?)` in messages for locale `(.+?)`/);
    if (!match) return null;

    const missingKey = match[1];
    const locale = match[2];

    try {
      // Call API route to handle the translation and file update
      if (missingKey.includes(".")) {
        return null; // Ignore nested keys
      }
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const response = await fetch(`${baseUrl}/api/handle-missing-translation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          key: missingKey,
          locale
        })
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to handle missing translation");
      }

      const result = await response.json();
      console.log("Translation handled:", result);
    } catch (apiError) {
      console.error("Error handling missing translation:", apiError);
    }

    return null;
  }, []);

  return (
    <NextIntlClientProvider messages={useMessages()} locale={locale} onError={handleError}>
      {children}
    </NextIntlClientProvider>
  );
}
