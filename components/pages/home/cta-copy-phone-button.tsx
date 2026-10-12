"use client";

import { useState } from "react";
import { Phone, Check } from "lucide-react";
import { toast } from "sonner";

interface CtaCopyPhoneButtonProps {
  label: string;
  phoneNumber?: string;
  copiedLabel?: string;
  successToast?: string;
}

export function CtaCopyPhoneButton({
  label,
  phoneNumber = "+32 496 32 24 67",
  copiedLabel = "Copied!",
  successToast,
}: CtaCopyPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(phoneNumber);
      } else if (typeof document !== "undefined") {
        const textArea = document.createElement("textarea");
        textArea.value = phoneNumber;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success(successToast || `${phoneNumber} copied to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy phone number");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`${label} - ${phoneNumber}`}
      title="Click to copy phone number"
      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-800 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer"
    >
      {copied ? (
        <>
          <Check size={16} className="text-emerald-400 transition-transform" aria-hidden="true" />
          <span className="text-emerald-400">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Phone size={16} className="text-primary" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
