"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Globe2, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const LOCALES = [
  { code: "en", label: "English", short: "EN" },
  { code: "nl", label: "Nederlands", short: "NL" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  // { code: "ar", label: "العربية", short: "AR" }
] as const;

export function HeaderLanguageMenu() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const activeLang = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-border/70 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Select language (current: ${activeLang.label})`}
        >
          <Globe2 size={14} className="text-primary shrink-0" aria-hidden="true" />
          <span className="uppercase font-bold tracking-wider sm:ml-0.5 text-[10px] px-1.5 py-0.5 rounded bg-muted text-foreground border border-border/60">
            {activeLang.short}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 p-1.5 z-50">
        {LOCALES.map((item) => {
          const isActive = item.code === currentLocale;
          return (
            <DropdownMenuItem key={item.code} asChild>
              <Link
                href={pathname}
                locale={item.code}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${item.label} (${item.short})${isActive ? " - selected" : ""}`}
                className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors focus-visible:ring-1 focus-visible:ring-primary ${isActive ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 uppercase font-bold text-[10px] text-muted-foreground" aria-hidden="true">
                    {item.short}
                  </span>
                  <span>{item.label}</span>
                </div>
                {isActive && <Check size={14} className="text-primary" aria-hidden="true" />}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
