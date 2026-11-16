"use client";

import { useState } from "react";
import { Menu, ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandMark } from "@/components/brand-mark";

export interface MobileNavItem {
  key: string;
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface HeaderMobileMenuProps {
  navItems: MobileNavItem[];
  contactLabel: string;
}

export function HeaderMobileMenu({ navItems, contactLabel }: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpandedKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="md:hidden flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85vw] max-w-sm p-6 flex flex-col justify-between">
          <div className="overflow-y-auto pr-1">
            <SheetHeader className="text-left pb-6 border-b border-border/70">
              <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
              <Link
                href="/"
                aria-label="Globfreight home page"
                onClick={() => setOpen(false)}
                className="inline-block"
              >
                <BrandMark ariaHidden />
              </Link>
            </SheetHeader>

            <nav className="flex flex-col space-y-1.5 py-6" aria-label="Mobile primary navigation">
              {navItems.map(item => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = Boolean(expandedKeys[item.key]);

                return (
                  <div key={item.key} className="space-y-1">
                    <div className="flex items-center justify-between rounded-lg hover:bg-muted transition-colors">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex-1 px-3 py-2.5 text-sm font-semibold text-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.key)}
                          aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={isExpanded}
                          className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ChevronDown
                            size={16}
                            aria-hidden="true"
                            className={`transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasChildren && isExpanded && (
                      <div className="ps-4 pe-1 py-1 space-y-1 border-s-2 border-border/60 ms-3">
                        {item.children!.map(child => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/60 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-border/70 shrink-0">
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-xs hover:opacity-90 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span>{contactLabel}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
