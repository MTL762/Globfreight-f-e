"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Loading() {
  const t = useTranslations("loading");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <section className="relative w-full max-w-2xl rounded-3xl border border-slate-700/70 bg-slate-900/80 p-8 shadow-2xl backdrop-blur sm:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
              {t("badge")}
            </span>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">{t("title")}</h1>
            <p className="text-sm text-slate-300 sm:text-base">{t("description")}</p>
          </div>

          <div className="relative hidden sm:block">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-blue-400/20 border-t-blue-300" />
            <div className="relative m-2 rounded-full bg-slate-800 p-3">
              <Image
                src="/logo.png"
                alt={t("logoAlt")}
                width={50}
                height={50}
                className="h-12 w-12"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-700/80 bg-slate-800/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  {t("dropoffLabel")}
                </p>
                <p className="text-sm font-medium text-slate-100">{t("dropoffValue")}</p>
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400" />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-16 animate-pulse rounded-xl border border-slate-700/70 bg-slate-800/70"
              />
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-slate-300">{t("footer")}</p>
      </section>
    </main>
  );
}
