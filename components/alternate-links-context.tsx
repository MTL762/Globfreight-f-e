"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export const SUPPORTED_LANGUAGE_ITEMS = [
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" }
] as const;

interface AlternateLinksContextValue {
  alternateLinks: Record<string, string> | null;
  setAlternateLinks: (links: Record<string, string> | null) => void;
  getLocalizedTargetHref: (targetLocale: string) => string | null;
}

const AlternateLinksContext = createContext<AlternateLinksContextValue>({
  alternateLinks: null,
  setAlternateLinks: () => {},
  getLocalizedTargetHref: () => null
});

export function toRelativePathname(urlOrPath: string): string {
  if (!urlOrPath.startsWith("http")) return urlOrPath;
  try {
    return new URL(urlOrPath).pathname;
  } catch {
    return urlOrPath;
  }
}

export function AlternateLinksProvider({ children }: { children: React.ReactNode }) {
  const [alternateLinks, setAlternateLinks] = useState<Record<string, string> | null>(null);

  /**
   * Resolves the target path when switching languages on a dynamic slug page:
   * - If `alternateLinks` is registered and has a slug for `targetLocale`, returns its path.
   * - If `alternateLinks` is registered but has NO slug/name for `targetLocale`, returns `/${targetLocale}` (Home).
   * - If `alternateLinks` is null (static page), returns `null` so the caller uses standard route switching.
   */
  const getLocalizedTargetHref = useCallback(
    (targetLocale: string): string | null => {
      if (alternateLinks === null) return null;
      const directUrl = alternateLinks[targetLocale];
      return directUrl ? toRelativePathname(directUrl) : `/${targetLocale}`;
    },
    [alternateLinks]
  );

  return (
    <AlternateLinksContext.Provider
      value={{ alternateLinks, setAlternateLinks, getLocalizedTargetHref }}
    >
      {children}
    </AlternateLinksContext.Provider>
  );
}

export function useAlternateLinks() {
  return useContext(AlternateLinksContext);
}

/**
 * Helper component for server or client pages to register per-locale alternate URLs
 * for the current resource (e.g. blog post or category).
 */
export function SetAlternateLinks({ links }: { links: Record<string, string> | null }) {
  const { setAlternateLinks } = useAlternateLinks();

  useEffect(() => {
    setAlternateLinks(links);
    return () => {
      setAlternateLinks(null);
    };
  }, [links, setAlternateLinks]);

  return null;
}

/**
 * Reusable component for dynamic slug pages:
 * 1. Registers localized alternate links so the language switcher navigates to the translated slug (or Home if unavailable).
 * 2. Renders JSON-LD structured data scripts cleanly.
 */
export function DynamicSlugPageSeo({
  links,
  schemas = []
}: {
  links: Record<string, string> | null;
  schemas?: Array<Record<string, any> | string | null | undefined>;
}) {
  return (
    <>
      <SetAlternateLinks links={links} />
      {schemas.map((schema, idx) => {
        if (!schema) return null;
        const jsonString = typeof schema === "string" ? schema : JSON.stringify(schema);
        return (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonString }}
          />
        );
      })}
    </>
  );
}
