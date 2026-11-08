"use client";

import Link from "next/link";
import Image from "next/image";
import { Service, getServiceText, getServiceFeatures } from "@/types/service";
import {
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  MapPin,
  HelpCircle,
  Ship,
  Plane,
  Truck,
  Warehouse,
  FileCheck,
  ShieldCheck,
  Package,
  Layers,
  Sparkles,
  ArrowUpRight
} from "lucide-react";

interface PublicServiceDetailProps {
  service: Service;
  relatedServices?: Service[];
  locale: string;
}

// Icon mapper for service icons
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

export function PublicServiceDetail({
  service,
  relatedServices = [],
  locale
}: PublicServiceDetailProps) {
  const isRtl = locale === "ar";
  const name = getServiceText(service.name, locale);
  const shortDesc = getServiceText(service.short_description, locale);
  const description = getServiceText(service.description, locale);
  const image = getServiceText(service.image, locale) || "/hero.webp";
  const imageAlt = getServiceText(service.image_alt, locale) || name;
  const features = getServiceFeatures(service.features, locale);
  const faqs = Array.isArray(service.seo?.faqs) ? service.seo!.faqs! : [];
  const children = Array.isArray(service.children) ? service.children : [];

  return (
    <div className="w-full flex flex-col bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      {/* 1. HERO SECTION */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-muted/40 via-background to-background border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href={`/${locale}`} className="hover:text-primary transition-colors">
              {isRtl ? "الرئيسية" : "Home"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/services`} className="hover:text-primary transition-colors">
              {isRtl ? "الخدمات" : "Services"}
            </Link>
            {service.parent && (
              <>
                <span>/</span>
                <Link
                  href={`/${locale}/services/${getServiceText(service.parent.slug, locale)}`}
                  className="hover:text-primary transition-colors"
                >
                  {getServiceText(service.parent.name, locale)}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              {name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {renderServiceIcon(service.icon)}
                <span>{service.parent ? (isRtl ? "خدمة فرعية" : "Specialized Solution") : (isRtl ? "خدمة رئيسية" : "Core Logistics Service")}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                {name}
              </h1>

              {shortDesc && (
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {shortDesc}
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href={`/${locale}/quote`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:bg-primary/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{isRtl ? "طلب تسعيرة شحن" : "Request Instant Quote"}</span>
                  <ArrowRight size={16} className={isRtl ? "rotate-180" : ""} />
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-muted/40 transition-all"
                >
                  <span>{isRtl ? "تواصل مع فريق العمليات" : "Speak to Dispatcher"}</span>
                </Link>
              </div>
            </div>

            {/* Hero Cover Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/70 shadow-lg bg-muted">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT & SIDEBAR */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main content body */}
          <div className="lg:col-span-8 space-y-12">
            {/* Features Checklist */}
            {features.length > 0 && (
              <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <Sparkles size={16} />
                  <span>{isRtl ? "المزايا والقدرات التشغيلية" : "Key Operational Capabilities"}</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm font-medium text-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description HTML */}
            {description && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {isRtl ? "نظرة تفصيلية عن الخدمة" : "Service Overview & Logistics Scope"}
                </h2>
                <div
                  className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed prose-headings:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}

            {/* Child Sub-Services (Hierarchy) */}
            {children.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-foreground font-bold text-xl">
                  <Layers className="h-5 w-5 text-primary" />
                  <span>{isRtl ? "الخدمات الفرعية المتخصصة" : "Specialized Sub-Services"}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {children.map((child) => {
                    const cName = getServiceText(child.name, locale);
                    const cSlug = getServiceText(child.slug, locale);
                    const cShort = getServiceText(child.short_description, locale);
                    return (
                      <Link
                        key={child.id}
                        href={`/${locale}/services/${encodeURIComponent(cSlug)}`}
                        className="group p-5 rounded-xl bg-card border border-border/80 shadow-xs hover:border-primary/50 hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">
                              Sub-service
                            </span>
                            <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                            {cName}
                          </h3>
                          {cShort && (
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {cShort}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            {faqs.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-border/60">
                <div className="flex items-center gap-2 text-foreground font-bold text-xl">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <span>{isRtl ? "الأسئلة الشائعة حول الخدمة" : "Frequently Asked Questions"}</span>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group p-4 rounded-xl bg-card border border-border/70 shadow-xs transition-colors open:border-primary/40"
                    >
                      <summary className="font-semibold text-sm sm:text-base text-foreground cursor-pointer list-none flex items-center justify-between gap-4">
                        <span>{faq.question}</span>
                        <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/40">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Dispatch Contact Card */}
            <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck size={13} />
                  <span>{isRtl ? "عمليات نشطة 24/7" : "24/7 Port Dispatch"}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  {isRtl ? "بحاجة لمساعدة فورية؟" : "Need Freight Assistance?"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isRtl
                    ? "تواصل مباشرة مع فريق العمليات في ميناء أنتويرب."
                    : "Direct contact with our logistics declarants and port haulage team."}
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <a
                  href="tel:+32496322467"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <Phone size={18} className="text-primary shrink-0" />
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {isRtl ? "هاتف مباشر" : "Direct Phone"}
                    </span>
                    <span className="font-bold text-foreground">+32 496 32 24 67</span>
                  </div>
                </a>

                <a
                  href="mailto:info@globfreight.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <Mail size={18} className="text-primary shrink-0" />
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {isRtl ? "البريد الإلكتروني" : "Email Dispatch"}
                    </span>
                    <span className="font-bold text-foreground">info@globfreight.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                  <MapPin size={18} className="text-primary shrink-0" />
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {isRtl ? "المقر التشغيلي" : "Operations Hub"}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      Port of Antwerp, Belgium
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/50">
                  <Clock size={18} className="text-primary shrink-0" />
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {isRtl ? "أوقات الاستجابة" : "Avg. Response Time"}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      Under 15 minutes
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href={`/${locale}/quote`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow hover:bg-primary/90 transition-all"
              >
                <span>{isRtl ? "طلب عرض سعر" : "Get Custom Rate"}</span>
                <ArrowRight size={15} className={isRtl ? "rotate-180" : ""} />
              </Link>
            </div>

            {/* Other Related Services */}
            {relatedServices.length > 0 && (
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-xs space-y-4">
                <h4 className="font-bold text-sm uppercase tracking-wider text-foreground">
                  {isRtl ? "خدمات لوجستية ذات صلة" : "Other Logistics Services"}
                </h4>
                <div className="space-y-2">
                  {relatedServices.map((rel) => {
                    const rName = getServiceText(rel.name, locale);
                    const rSlug = getServiceText(rel.slug, locale);
                    return (
                      <Link
                        key={rel.id}
                        href={`/${locale}/services/${encodeURIComponent(rSlug)}`}
                        className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Package size={15} className="text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                            {rName}
                          </span>
                        </div>
                        <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

