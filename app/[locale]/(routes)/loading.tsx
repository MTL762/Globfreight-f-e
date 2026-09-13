"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Loading() {
  const t = useTranslations();

  return (
    <div className="flex min-h-[70vh] w-full flex-1 flex-col items-center justify-center gap-5 p-6 bg-background">
      <div className="relative flex items-center justify-center">
        {/* Subtle pulsating outer glow with brand primary color */}
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-primary/15 duration-1000" />
        <div className="absolute h-24 w-24 animate-pulse rounded-full bg-primary/10" />

        {/* Dual ring spinner with brand accent */}
        <div className="h-16 w-16 rounded-full border-2 border-primary/20" />
        <div className="absolute h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary/60" />

        {/* Center logo */}
        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-background p-1 shadow-sm">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
        </div>
      </div>

      {/* Loading text */}
      <div className="flex items-center gap-1.5">
        <p className="animate-pulse text-sm font-semibold tracking-wider text-primary">
          {t("Loading")}
        </p>
      </div>
    </div>
  );
}


