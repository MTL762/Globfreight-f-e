/** Operational Bluework: public pages share the same compact navigation, generous canvas, and logistical footer. */
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
export async function PublicShell({ children }: { children: ReactNode }) { return <><SiteHeader /><main>{children}</main><SiteFooter /></>; }
