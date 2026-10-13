"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AlternateLinksContextValue {
  alternateLinks: Record<string, string> | null;
  setAlternateLinks: (links: Record<string, string> | null) => void;
}

const AlternateLinksContext = createContext<AlternateLinksContextValue>({
  alternateLinks: null,
  setAlternateLinks: () => {}
});

export function AlternateLinksProvider({ children }: { children: React.ReactNode }) {
  const [alternateLinks, setAlternateLinks] = useState<Record<string, string> | null>(null);

  return (
    <AlternateLinksContext.Provider value={{ alternateLinks, setAlternateLinks }}>
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
