"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useTranslations } from "next-intl";

export function FloatingWhatsApp() {
  const t = useTranslations("LandingPage");

  return (
    <aside
      aria-label="WhatsApp quick contact"
      className="fixed bottom-6 end-6 z-50 flex items-center group select-none"
    >
      {/* Tooltip on hover (desktop) */}
      <div
        id="whatsapp-tooltip"
        role="tooltip"
        aria-hidden="true"
        className="hidden sm:block absolute end-full me-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none"
      >
        <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg border border-slate-800 whitespace-nowrap flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
          <span>{t("whatsappTooltip")}</span>
        </div>
      </div>

      {/* Floating Button */}
      <a
        href="https://wa.me/32496322467"
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="whatsapp-tooltip"
        aria-label="Chat on WhatsApp with Globfreight at +32 496 32 24 67 (opens in a new window)"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2"
      >
        {/* Radar ping animation effect */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative z-10 text-3xl" aria-hidden="true" />
      </a>
    </aside>
  );
}

export default FloatingWhatsApp;
