"use client";

import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsApp() {
  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed bottom-6 end-6 z-50 flex items-center group select-none"
    >
      {/* Tooltip on hover (desktop) */}
      <div className="hidden sm:block absolute end-full me-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none">
        <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg border border-slate-800 whitespace-nowrap flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat with us on WhatsApp</span>
        </div>
      </div>

      {/* Floating Button */}
      <a
        href="https://wa.me/32496322467"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Globfreight (+32 496 32 24 67)"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 group-focus-visible:ring-4 group-focus-visible:ring-[#25D366]/40"
      >
        {/* Radar ping animation effect */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="relative z-10 text-3xl" />
      </a>
    </aside>
  );
}

export default FloatingWhatsApp;
