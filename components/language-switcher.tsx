"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdLanguage } from "react-icons/md";
import { Check } from "lucide-react";
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

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = pathname.split("/")[1] || "en";

  const changeLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const path = url.split("/")[1];
    const newUrl = url.replace(path, newLocale);
    router.push(newUrl);
  };

  const activeLang = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/70 hover:bg-muted/60 transition-colors text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer outline-none"
          title="Change language"
          aria-label="Change language"
        >
          <MdLanguage className="text-base text-primary shrink-0" />
          <span className="uppercase tracking-wider">{activeLang.short}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1.5 z-50">
        {LOCALES.map((item) => {
          const isActive = item.code === currentLocale;
          return (
            <DropdownMenuItem
              key={item.code}
              onClick={() => changeLocale(item.code)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${isActive ? "bg-primary/10 text-primary font-bold" : "text-foreground hover:bg-muted"
                }`}
            >
              <span>{item.label}</span>
              {isActive && <Check size={14} className="text-primary ml-2" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
