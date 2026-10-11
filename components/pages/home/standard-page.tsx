import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { PublicShell } from "./public-shell";
import { PublicContactForm } from "./contact-form";

export async function StandardPage({
  kind
}: {
  kind: "about" | "services" | "contact";
}) {
  const t = await getTranslations("Pages");
  const tFooter = await getTranslations("Footer");
  const copy = t.raw(kind) as { eyebrow: string; title: string; body: string };

  const isContact = kind === "contact";

  return (
    <PublicShell>
      <div className="flex w-full flex-col">
        {/* Standard Hero */}
        <section className="py-16 md:py-24 bg-muted/20 border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {copy.eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl leading-tight">
              {copy.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {copy.body}
            </p>

            {/* Contact Data */}
            {isContact ? (
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-card border border-border/70 shadow-xs space-y-1.5 transition-all hover:border-primary/40">
                  <div className="flex items-center gap-2 text-primary">
                    <Phone size={18} aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Direct Line</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    <a href="tel:+32496322467" className="hover:text-primary transition-colors">
                      +32 496 32 24 67
                    </a>
                  </p>
                  <p className="text-xs text-muted-foreground">24/7 Operations & Dispatch</p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 shadow-xs space-y-1.5 transition-all hover:border-primary/40">
                  <div className="flex items-center gap-2 text-primary">
                    <Mail size={18} aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Inquiries</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    <a href="mailto:info@globfreight.com" className="hover:text-primary transition-colors">
                      info@globfreight.com
                    </a>
                  </p>
                  <p className="text-xs text-muted-foreground">Response under 15 minutes</p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 shadow-xs space-y-1.5 transition-all hover:border-primary/40">
                  <div className="flex items-center gap-2 text-primary">
                    <MapPin size={18} aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Headquarters</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {tFooter("address")}
                  </p>
                  <p className="text-xs text-muted-foreground">Port of Antwerp, Belgium</p>
                </div>

                <div className="p-4 rounded-xl bg-card border border-border/70 shadow-xs space-y-1.5 transition-all hover:border-primary/40">
                  <div className="flex items-center gap-2 text-primary">
                    <Clock size={18} aria-hidden="true" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Office Hours</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Mon – Fri: 08:00 – 18:00
                  </p>
                  <p className="text-xs text-muted-foreground">CET (Port Dispatch 24/7)</p>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                <a href="tel:+32496322467" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Phone size={15} className="text-primary" aria-hidden="true" />
                  <span>+32 496 32 24 67</span>
                </a>
                <span className="hidden sm:inline text-border" aria-hidden="true">•</span>
                <a href="mailto:info@globfreight.com" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
                  <Mail size={15} className="text-primary" aria-hidden="true" />
                  <span>info@globfreight.com</span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Standard Detail */}
        <section className="py-16 md:py-24 bg-background border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  OPERATIONS CONNECTED
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  Built for reliability across European supply chains.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Globfreight connects direct seaport customs clearance, fast-track container transport, and bonded warehousing under a unified operational standard. Every shipment is backed by proactive dispatchers and certified customs declarants.
              </p>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    Full AEO-F certified customs compliance
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    Direct EDI port clearance in Antwerp & Rotterdam
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    Dedicated customer contact & transparent status updates
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              {isContact ? (
                <PublicContactForm />
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </PublicShell>
  );
}

