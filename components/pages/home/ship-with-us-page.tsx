import { ArrowRight, ShieldCheck, Clock3, Globe2, HeadphonesIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PublicShell } from "@/components/pages/home/public-shell";
import { ShipWithUsForm } from "@/components/pages/home/ship-with-us-form";

// ─── Page ─────────────────────────────────────────────────────────────────────

export async function ShipWithUsPage({ locale }: { locale?: string } = {}) {
  const t = locale
    ? await getTranslations({ locale, namespace: "ShipWithUs" })
    : await getTranslations("ShipWithUs");

  const uspCards = [
    {
      icon: <ShieldCheck className="text-primary" size={22} />,
      title: t("usp.aeo.title"),
      body: t("usp.aeo.body")
    },
    {
      icon: <Clock3 className="text-primary" size={22} />,
      title: t("usp.response.title"),
      body: t("usp.response.body")
    },
    {
      icon: <Globe2 className="text-primary" size={22} />,
      title: t("usp.network.title"),
      body: t("usp.network.body")
    },
    {
      icon: <HeadphonesIcon className="text-primary" size={22} />,
      title: t("usp.agent.title"),
      body: t("usp.agent.body")
    }
  ];

  const quickStats = [
    { value: "90+", label: t("stats.countries") },
    { value: "24/7", label: t("stats.coverage") },
    { value: "15K+", label: t("stats.shipments") },
    { value: "AEO-F", label: t("stats.certification") }
  ];

  const nextSteps = [
    { n: "01", text: t("sidebar.step1") },
    { n: "02", text: t("sidebar.step2") },
    { n: "03", text: t("sidebar.step3") }
  ];

  const coveredItems = [
    t("sidebar.items.item1"),
    t("sidebar.items.item2"),
    t("sidebar.items.item3"),
    t("sidebar.items.item4"),
    t("sidebar.items.item5"),
    t("sidebar.items.item6")
  ];

  return (
    <PublicShell>
      <div className="flex w-full flex-col">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative py-16 md:py-24 bg-muted/20 border-b border-border/60 overflow-hidden">
          {/* Background pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "28px 28px"
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {t("hero.eyebrow")}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                  {t.rich("hero.title", {
                    highlight: (chunks) => <span className="text-primary">{chunks}</span>
                  })}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                  {t("hero.description")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-xs group"
                  >
                    <span>{t("hero.cta")}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180" />
                  </Link>
                  <a
                    href="tel:+32496322467"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-background text-foreground font-semibold text-sm hover:bg-muted/40 active:scale-[0.98] transition-all"
                  >
                    +32 496 32 24 67
                  </a>
                </div>
              </div>

              {/* Right — quick stats */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {quickStats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm space-y-1"
                  >
                    <p className="text-3xl font-extrabold text-primary tracking-tight">{value}</p>
                    <p className="text-xs font-semibold text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── USP Strip ─────────────────────────────────────────────────────── */}
        <section className="border-b border-border/60 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {uspCards.map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground leading-snug">{title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main content: form + side info ────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-muted/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

              {/* Form */}
              <div className="lg:col-span-8">
                <div className="mb-6 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {t("section.eyebrow")}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                    {t("section.title")}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t("section.subtitle")}
                  </p>
                </div>
                <ShipWithUsForm />
              </div>

              {/* Sidebar info */}
              <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                {/* What happens next */}
                <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-foreground">{t("sidebar.nextTitle")}</h3>
                  <ol className="space-y-3">
                    {nextSteps.map(({ n, text }) => (
                      <li key={n} className="flex items-start gap-3">
                        <span className="text-[10px] font-extrabold text-primary bg-primary/10 border border-primary/20 rounded-md px-2 py-0.5 shrink-0 mt-0.5">
                          {n}
                        </span>
                        <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Services included */}
                <div className="rounded-2xl border bg-card p-5 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-foreground">{t("sidebar.coveredTitle")}</h3>
                  <ul className="space-y-2">
                    {coveredItems.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact card */}
                <div className="rounded-2xl border bg-primary/5 border-primary/20 p-5 shadow-sm space-y-2">
                  <p className="text-xs font-bold text-foreground">{t("sidebar.callTitle")}</p>
                  <a
                    href="tel:+32496322467"
                    className="block text-base font-extrabold text-primary hover:underline"
                  >
                    +32 496 32 24 67
                  </a>
                  <p className="text-[11px] text-muted-foreground">
                    {t("sidebar.callNote")}
                  </p>
                </div>
              </aside>

            </div>
          </div>
        </section>

      </div>
    </PublicShell>
  );
}
