"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaCompass } from "react-icons/fa";

export default function NotFound(): JSX.Element {
  const t = useTranslations();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(20,184,166,0.2),transparent_35%),radial-gradient(circle_at_75%_80%,rgba(59,130,246,0.2),transparent_40%)]" />

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-xl rounded-3xl border border-slate-700/70 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur sm:p-10"
      >
        <motion.div
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-300/30 bg-teal-400/10 text-teal-300"
        >
          <FaCompass className="text-2xl" />
        </motion.div>

        <p className="mb-1 text-sm uppercase tracking-[0.22em] text-teal-300">404</p>
        <h1 className="mb-3 text-3xl font-semibold text-white sm:text-4xl">{t("Oops! A peaceful detour")}</h1>
        <p className="mb-8 text-slate-300">{t("Not Found Description")}</p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 px-6 py-3 font-medium text-white transition hover:brightness-110"
        >
          {t("Return to serenity")}
        </Link>

        <p className="mt-6 text-sm italic text-slate-400">{t("Breathe In And Breathe Out")}</p>
      </motion.section>
    </main>
  );
}
