import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface HeaderNavItem {
  label: string;
  href: string;
}

export function HeaderNavSubmenu({
  label,
  mainHref,
  allLabel,
  items
}: {
  label: string;
  mainHref?: string;
  allLabel?: string;
  items: HeaderNavItem[];
}) {
  return (
    <div className="relative group">
      {mainHref ? (
        <div className="inline-flex items-center">
          <Link
            href={mainHref}
            className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {label}
          </Link>
          <button
            type="button"
            aria-label={`${label} submenu`}
            aria-haspopup="true"
            className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronDown
              size={14}
              aria-hidden="true"
              className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
            />
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-haspopup="true"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors rounded-md py-1 px-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {label}
          <ChevronDown
            size={14}
            aria-hidden="true"
            className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
          />
        </button>
      )}

      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all absolute start-0 top-full pt-2 z-50">
        <ul className="min-w-60 max-h-80 overflow-y-auto rounded-xl border border-border bg-background p-1.5 shadow-lg">
          {mainHref && allLabel && (
            <li className="border-b border-border/60 pb-1 mb-1">
              <Link
                href={mainHref}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold text-primary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span>{allLabel}</span>
                <ArrowRight size={14} aria-hidden="true" className="rtl:rotate-180" />
              </Link>
            </li>
          )}
          {items.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
