"use client";
import { useLocale } from "next-intl";

export interface LocalizedValue {
  en?: string;
  ar?: string;
  [key: string]: string | undefined;
}

export default function LocaleViewColumn({
  value,
  showBoth = true
}: {
  value?: string | LocalizedValue | null;
  showBoth?: boolean;
}) {
  const currentLocale = useLocale();

  if (!value) return <span className="text-muted-foreground">-</span>;

  if (typeof value === "string") {
    return <span className="font-medium text-foreground">{value}</span>;
  }

  const enText = value.en?.trim();
  const arText = value.ar?.trim();

  if (!enText && !arText) return <span className="text-muted-foreground">-</span>;

  if (!showBoth) {
    const primary = currentLocale === "ar" ? arText || enText : enText || arText;
    return <span className="font-medium text-foreground">{primary}</span>;
  }

  return (
    <div className="flex flex-col gap-1 text-xs">
      {enText && (
        <div className="flex items-center gap-1.5 font-medium text-foreground">
          <span className="rounded bg-blue-500/10 px-1 py-0.2 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
            EN
          </span>
          <span className="truncate max-w-[240px]" title={enText}>
            {enText}
          </span>
        </div>
      )}
      {arText && (
        <div className="flex items-center gap-1.5 font-medium text-foreground" dir="rtl">
          <span className="rounded bg-emerald-500/10 px-1 py-0.2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            ع
          </span>
          <span className="truncate max-w-[240px]" title={arText}>
            {arText}
          </span>
        </div>
      )}
    </div>
  );
}
