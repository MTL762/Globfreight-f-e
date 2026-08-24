import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PublicShell } from "./public-shell";

export async function StandardPage({
  kind
}: {
  kind: "about" | "services" | "contact";
}) {
  const t = await getTranslations("Pages");
  const copy = t.raw(kind) as { eyebrow: string; title: string; body: string };

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
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-xs group"
              >
                <span>Speak with Globfreight</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Standard Detail */}
        <section className="py-16 md:py-24 bg-background border-b border-border/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                OPERATIONS CONNECTED
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                Built for reliability across European supply chains.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
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
          </div>
        </section>
      </div>
    </PublicShell>
  );
}
