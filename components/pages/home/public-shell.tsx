import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { FloatingWhatsApp } from "@/components/common/floating-whatsapp";

export async function PublicShell({
  children,
  alternateLinks
}: {
  children: ReactNode;
  alternateLinks?: Record<string, string> | null;
}) {
  return (
    <>
      <SiteHeader alternateLinks={alternateLinks} />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
