"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaRedo, FaShieldAlt } from "react-icons/fa";

export default function Error({
  error
}: {
  error: Error & {
    digest?: string;
    columnNumber?: number;
    lineNumber?: number;
  };
}): JSX.Element {
  const t = useTranslations();
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,63,94,0.20),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.15),transparent_35%)]" />

      <section className="relative w-full max-w-xl rounded-3xl border border-slate-700/70 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-500/10 text-rose-300">
          <FaShieldAlt className="text-2xl" />
        </div>

        <h1 className="mb-3 text-3xl font-semibold text-white sm:text-4xl">{t("Error")}</h1>
        <p className="mb-6 text-slate-300">{t("Something went wrong")}</p>

        {error.message && (
          <div className="mb-6 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-left">
            <p className="break-words font-mono text-sm text-rose-100">{error.message}</p>
            {(error.lineNumber || error.columnNumber) && (
              <p className="mt-2 text-xs text-rose-200/80">
                Line: {error.lineNumber || "N/A"} · Column: {error.columnNumber || "N/A"}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => router.refresh()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-100"
          >
            <FaRedo className="text-sm" />
            {t("Retry")}
          </button>

          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 bg-slate-800 px-6 py-3 font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-700"
          >
            <FaArrowLeft className="text-sm" />
            {t("Go to Home")}
          </button>
        </div>
      </section>
    </main>
  );
}
