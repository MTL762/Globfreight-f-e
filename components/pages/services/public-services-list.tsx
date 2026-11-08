"use client";

import Link from "next/link";
import Image from "next/image";
import { Service, getServiceText, getServiceFeatures } from "@/types/service";
import {
  Ship,
  Plane,
  Truck,
  Warehouse,
  FileCheck,
  Package,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Phone,
  Mail,
  Clock,
  Layers
} from "lucide-react";

interface PublicServicesListProps {
  services: Service[];
  locale: string;
}

function renderServiceIcon(iconKey?: string | null) {
  const key = iconKey?.toLowerCase() || "";
  if (key.includes("ship") || key.includes("ocean") || key.includes("sea")) {
    return <Ship className="h-6 w-6 text-primary" />;
  }
  if (key.includes("plane") || key.includes("air")) {
    return <Plane className="h-6 w-6 text-primary" />;
  }
  if (key.includes("truck") || key.includes("road") || key.includes("haulage")) {
    return <Truck className="h-6 w-6 text-primary" />;
  }
  if (key.includes("warehouse") || key.includes("storage")) {
    return <Warehouse className="h-6 w-6 text-primary" />;
  }
  if (key.includes("customs") || key.includes("file") || key.includes("t1")) {
    return <FileCheck className="h-6 w-6 text-primary" />;
  }
  return <Package className="h-6 w-6 text-primary" />;
}

export function PublicServicesList({ services, locale }: PublicServicesListProps) {
  const isRtl = locale === "ar";

  return (
    <div className="w-full flex flex-col bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      {/* 1. HERO SECTION */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/40 via-background to-background border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
            <Sparkles size={14} />
            <span>{isRtl ? "حلول لوجستية متكاملة" : "Comprehensive Freight Solutions"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl leading-tight">
            {isRtl
              ? "خدمات الشحن الدولي والتخليص الجمركي في أوروبا"
              : "Global Freight Forwarding & European Customs Services"}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {isRtl
              ? "نربط الموانئ الأوروبية الرئيسية بالشبكات العالمية من خلال التخليص الجمركي المباشر، النقل بالحاويات، والخدمات اللوجستية المتقدمة."
              : "Connecting major European sea & air ports to global supply chains with direct EDI customs clearance, container haulage, and bonded logistics."}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <a
              href="tel:+32496322467"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors font-semibold"
            >
              <Phone size={15} className="text-primary" />
              <span>+32 496 32 24 67</span>
            </a>
            <span className="hidden sm:inline text-border">•</span>
            <a
              href="mailto:info@globfreight.com"
              className="inline-flex items-center gap-2 hover:text-foreground transition-colors font-semibold"
            >
              <Mail size={15} className="text-primary" />
              <span>info@globfreight.com</span>
            </a>
            <span className="hidden sm:inline text-border">•</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <Clock size={14} />
              <span>Port Dispatch 24/7</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {services.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <Package className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-bold text-foreground">
                {isRtl ? "جاري تحديث الخدمات" : "Services are being updated"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {isRtl
                  ? "يرجى التواصل مباشرة مع فريق العمليات للاستفسار عن أي خدمة شحن."
                  : "Please contact our dispatch team directly for customized freight forwarding requests."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const name = getServiceText(service.name, locale);
                const slug = getServiceText(service.slug, locale);
                const shortDesc = getServiceText(service.short_description, locale);
                const image = getServiceText(service.image, locale) || "/hero.webp";
                const imageAlt = getServiceText(service.image_alt, locale) || name;
                const features = getServiceFeatures(service.features, locale).slice(0, 3);
                const childrenCount = Array.isArray(service.children) ? service.children.length : 0;

                return (
                  <article
                    key={service.id}
                    className="group flex flex-col justify-between rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-lg transition-all overflow-hidden"
                  >
                    <div>
                      {/* Image cover */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                        <Image
                          src={image}
                          alt={imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {service.is_featured && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[11px] font-bold shadow flex items-center gap-1 backdrop-blur-xs">
                            <Sparkles size={12} />
                            <span>Featured</span>
                          </div>
                        )}
                        {childrenCount > 0 && (
                          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-background/90 text-foreground text-[11px] font-bold shadow flex items-center gap-1 backdrop-blur-xs border border-border/50">
                            <Layers size={12} className="text-primary" />
                            <span>{childrenCount} Sub-services</span>
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                            {renderServiceIcon(service.icon)}
                          </div>
                          <h2 className="font-extrabold text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                            <Link href={`/${locale}/services/${encodeURIComponent(slug)}`}>
                              {name}
                            </Link>
                          </h2>
                        </div>

                        {shortDesc && (
                          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                            {shortDesc}
                          </p>
                        )}

                        {/* Top Features */}
                        {features.length > 0 && (
                          <ul className="space-y-2 pt-2 border-t border-border/50">
                            {features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs font-medium text-foreground">
                                <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Footer Card Actions */}
                    <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                      <Link
                        href={`/${locale}/services/${encodeURIComponent(slug)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-primary/80 transition-colors"
                      >
                        <span>{isRtl ? "تفاصيل الخدمة" : "Explore Service"}</span>
                        <ArrowRight size={14} className={isRtl ? "rotate-180" : ""} />
                      </Link>

                      <Link
                        href={`/${locale}/quote`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        {isRtl ? "تسعيرة سريعة" : "Quote"}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Trust Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-muted/40 border border-border/70 grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-start">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                <ShieldCheck size={18} />
                <span>AEO-F Certified</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Authorized Economic Operator certification ensuring priority border clearance across the EU.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                <Ship size={18} />
                <span>Port EDI Connected</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Direct customs electronic data interchange in Antwerp, Rotterdam, Zeebrugge, and Hamburg.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                <Clock size={18} />
                <span>24/7 Fast Response</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Round-the-clock container haulage coordination and urgent declaration processing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

