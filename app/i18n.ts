import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is a string by providing a default value
  const safeLocale = locale || "en";

  return {
    // Make sure to return the locale
    locale: safeLocale,
    // Include any other configuration you might have
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});
