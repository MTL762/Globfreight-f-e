"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Building2, Globe, Bell, Shield, Sliders } from "lucide-react";
import { useTranslations } from "next-intl";

const domains = [
  { id: "BUSINESS", label: "Business Settings", icon: Building2 },
  { id: "GENERAL", label: "General Settings", icon: Sliders },
  { id: "LOCALIZATION", label: "Localization & Timezone", icon: Globe },
  { id: "NOTIFICATIONS", label: "Notifications", icon: Bell },
  { id: "SECURITY", label: "Security & Auth", icon: Shield }
];

export default function SettingsDomainNav() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentDomain = searchParams.get("domain") || "BUSINESS";

  const handleDomainChange = (domainId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("domain", domainId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto border-b border-border pb-3">
      {domains.map((d) => {
        const Icon = d.icon;
        const isActive = currentDomain === d.id;
        return (
          <button
            key={d.id}
            type="button"
            onClick={() => handleDomainChange(d.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{t(d.label)}</span>
          </button>
        );
      })}
    </div>
  );
}
