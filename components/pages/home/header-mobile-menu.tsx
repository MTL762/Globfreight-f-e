"use client";

import { useState } from "react";
import { Menu, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { BrandMark } from "@/components/brand-mark";

interface HeaderMobileMenuProps {
  navItems: { key: string; label: string; href: string }[];
  contactLabel: string;
}

export function HeaderMobileMenu({ navItems, contactLabel }: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);

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
          <div>
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
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-semibold text-foreground hover:bg-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="pt-6 border-t border-border/70">
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
