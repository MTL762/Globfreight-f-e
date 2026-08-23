import Image from "next/image";
import {
  Anchor,
  ArrowRight,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeroTelemetryBoard } from "./hero-telemetry-board";

export async function HeroSection() {
  const t = await getTranslations("Home");

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 via-slate-50/80 to-slate-100/60 pt-14 md:pt-18 pb-0">
      {/* Background Decorative Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-28 -right-16 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-20 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[85px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#0080ff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-6 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] gap-10 lg:gap-14 items-center pb-14 md:pb-16">
        {/* Left Column: Command & Authority Copy with Visual Gateway Image */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/70 text-blue-700 text-xs font-bold tracking-wide backdrop-blur-sm mb-5 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Sparkles size={13} className="text-blue-600" />
            <span>{t("heroBadge")}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-slate-950 leading-[1.12] mb-5">
            {t("title")}
          </h1>

          <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-7 max-w-xl">
            {t("body")}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>{t("quote")}</span>
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-sm shadow-xs hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>{t("services")}</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Left Column Visual Corridor Preview Card */}
          <div className="group my-6 rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
            <div className="relative w-full h-[140px] sm:h-[155px] overflow-hidden">
              <Image
                src="/manus-storage/winz-hero-port_b04a3a45.jpg"
                alt="European deepsea port terminal operations"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent" />
              <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-2 text-white text-xs font-bold drop-shadow-sm">
                <Anchor size={13} className="text-blue-400 flex-shrink-0" />
                <span className="truncate">Port of Antwerp-Bruges & Rotterdam Direct Gateways</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-50/90 border-t border-slate-100 text-xs font-semibold text-slate-700">
              <div className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                <span>Direct Seaport EDI Ingress</span>
              </div>
              <div className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>AEO-F Priority Clearance</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-5 border-t border-slate-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all">
              <ShieldCheck size={15} className="text-emerald-600" />
              <span>AEO-F Certified</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all">
              <Zap size={15} className="text-blue-600" />
              <span>NCTS Direct EDI</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all">
              <Clock size={15} className="text-indigo-600" />
              <span>&lt; 4h Port Clearance</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs hover:border-blue-300 hover:shadow-xs transition-all">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Zero-Demurrage SLA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Corridor & Telemetry Board */}
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-3 rounded-3xl bg-blue-500/10 blur-xl"
            aria-hidden="true"
          />
          <HeroTelemetryBoard />
        </div>
      </div>

      {/* Modern Redesigned Metrics & Facts Bar */}
      <div className="relative z-10 bg-slate-950 text-white border-t border-slate-800/90">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-8 lg:px-12 grid grid-cols-2 md:grid-cols-4">
          <div className="p-5 sm:p-6 border-r border-slate-800/80 flex flex-col justify-center gap-1.5 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">
                14+
              </strong>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                Years
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400 leading-snug">
              {t("facts.yearsLabel")}
            </span>
          </div>

          <div className="p-5 sm:p-6 md:border-r border-slate-800/80 flex flex-col justify-center gap-1.5 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">
                100%
              </strong>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/50">
                Verified
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400 leading-snug">
              {t("facts.complianceLabel")}
            </span>
          </div>

          <div className="p-5 sm:p-6 border-r border-t md:border-t-0 border-slate-800/80 flex flex-col justify-center gap-1.5 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">
                28
              </strong>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950/70 text-blue-400 border border-blue-800/50">
                Gateways
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400 leading-snug">
              {t("facts.portsLabel")}
            </span>
          </div>

          <div className="p-5 sm:p-6 border-t md:border-t-0 border-slate-800/80 flex flex-col justify-center gap-1.5 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-baseline gap-2">
              <strong className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">
                &lt; 4h
              </strong>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-400 border border-amber-800/50">
                Express
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-400 leading-snug">
              {t("facts.clearanceLabel")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
