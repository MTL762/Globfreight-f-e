import Image from "next/image";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function HeroSection() {
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-hidden border-b border-border/80 bg-background pt-12 sm:pt-16 lg:pt-20 pb-0">
      {/* Subtle Background Glows */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-32 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pb-12 sm:pb-16 lg:pb-20">
          
          {/* Left Column: Clear Value Proposition & Actions */}
          <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 w-fit px-3.5 py-1.5 rounded-full bg-muted/60 border border-border text-xs font-semibold text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{t("heroBadge")}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-foreground leading-[1.12]">
              {t("title")}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t("body")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-xs hover:opacity-95 active:scale-[0.98] transition-all"
              >
                <span>{t("quote")}</span>
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:bg-muted/50 active:scale-[0.98] transition-all"
              >
                <span>{t("services")}</span>
                <ArrowUpRight size={16} className="text-muted-foreground" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-border/60">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground">
                <ShieldCheck size={15} className="text-primary shrink-0" />
                <span>AEO-F Accredited</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground">
                <Zap size={15} className="text-primary shrink-0" />
                <span>Direct EDI Ingress</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground">
                <Clock size={15} className="text-primary shrink-0" />
                <span>&lt; 4h Port Release</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/80 text-xs font-medium text-foreground">
                <CheckCircle2 size={15} className="text-primary shrink-0" />
                <span>Zero Demurrage SLA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl sm:rounded-3xl border border-border/80 bg-card overflow-hidden shadow-xs">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-muted/40">
                <Image
                  src="/manus-storage/winz-hero-port_b04a3a45.jpg"
                  alt="European deepsea port terminal operations in Antwerp and Rotterdam"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>Terminal Ingress Active</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white text-xs font-bold mb-1">
                    <Anchor size={14} className="text-primary shrink-0" />
                    <span>Port of Antwerp-Bruges & Rotterdam</span>
                  </div>
                  <p className="text-[11px] text-white/80 line-clamp-1">
                    Direct customs clearance & container drayage across Benelux & European hinterland
                  </p>
                </div>
              </div>

              {/* Bottom Specs Strip */}
              <div className="grid grid-cols-3 divide-x divide-border/60 bg-card p-3 sm:p-4 text-center">
                <div className="px-2">
                  <div className="text-xs sm:text-sm font-bold text-foreground">&lt; 4h</div>
                  <div className="text-[10px] text-muted-foreground font-medium">Avg Release</div>
                </div>
                <div className="px-2">
                  <div className="text-xs sm:text-sm font-bold text-foreground">AEO-F</div>
                  <div className="text-[10px] text-muted-foreground font-medium">Status</div>
                </div>
                <div className="px-2">
                  <div className="text-xs sm:text-sm font-bold text-foreground">24/7</div>
                  <div className="text-[10px] text-muted-foreground font-medium">Dispatch</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Facts & Metrics Bar */}
      <div className="w-full bg-slate-950 text-white border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="py-5 sm:py-6 px-4 flex flex-col justify-center gap-1">
            <strong className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              14+
            </strong>
            <span className="text-xs text-slate-400 font-medium">
              {t("facts.yearsLabel")}
            </span>
          </div>

          <div className="py-5 sm:py-6 px-4 flex flex-col justify-center gap-1">
            <strong className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-400">
              100%
            </strong>
            <span className="text-xs text-slate-400 font-medium">
              {t("facts.complianceLabel")}
            </span>
          </div>

          <div className="py-5 sm:py-6 px-4 flex flex-col justify-center gap-1">
            <strong className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              28
            </strong>
            <span className="text-xs text-slate-400 font-medium">
              {t("facts.portsLabel")}
            </span>
          </div>

          <div className="py-5 sm:py-6 px-4 flex flex-col justify-center gap-1">
            <strong className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary">
              &lt; 4h
            </strong>
            <span className="text-xs text-slate-400 font-medium">
              {t("facts.clearanceLabel")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
