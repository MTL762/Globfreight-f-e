"use client";

import LanguageSwitcher from "@/components/language-switcher";

export function HeaderLanguageMenu({
  alternateLinks
}: {
  alternateLinks?: Record<string, string> | null;
} = {}) {
  return <LanguageSwitcher initialAlternateLinks={alternateLinks} />;
}
