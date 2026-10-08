import { useEffect } from "react";
import { FORM_LANGUAGES, type FormLangs } from "./CustomFormTypes.types";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

export default function InputLangSwitcher({
  selectedLang,
  setSelectedLang,
  changeLang
}: {
  selectedLang: FormLangs;
  changeLang?: FormLangs;
  hideDefault?: boolean;
  setSelectedLang: (lang: FormLangs) => void;
}) {
  const handleLangChange = (lang: FormLangs) => {
    setSelectedLang(lang);
  };

  useEffect(() => {
    if (changeLang === "changeToAr") {
      handleLangChange("Ar");
    } else if (changeLang === "changeToEn") {
      handleLangChange("En");
    } else if (changeLang === "changeToNl") {
      handleLangChange("Nl");
    } else if (changeLang === "changeToFr") {
      handleLangChange("Fr");
    } else if (changeLang === "changeToDe") {
      handleLangChange("De");
    } else if (changeLang === "changeToDefault") {
      handleLangChange("default");
    }
  }, [changeLang]);

  return (
    <div className="col-span-12 -mt-1 mb-2">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-border/40">
        <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Globe className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span>Language Translation</span>
        </div>
        <div className="inline-flex items-center p-1 rounded-xl bg-muted/60 dark:bg-muted/30 border border-border/60 gap-1 overflow-x-auto max-w-full">
          {FORM_LANGUAGES.map(lang => {
            const isActive = selectedLang === lang.key;
            return (
              <button
                type="button"
                key={lang.key}
                data-testid={`lang-${lang.key}`}
                onClick={() => handleLangChange(lang.key as FormLangs)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 select-none whitespace-nowrap",
                  isActive
                    ? "bg-background text-foreground font-semibold shadow-xs border border-border/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                )}
              >
                <span className="text-sm leading-none" aria-hidden="true">
                  {lang.flag}
                </span>
                <span>{lang.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

