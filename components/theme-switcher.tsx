"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor }
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative inline-flex items-center justify-center h-8 w-8 rounded-lg border border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer outline-none"
          title="Toggle theme"
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-36 rounded-xl bg-popover p-1.5 shadow-lg border border-border z-50"
      >
        <div className="flex flex-col space-y-0.5">
          {themes.map((t) => {
            const isActive = mounted && theme === t.value;
            const Icon = t.icon;
            return (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted/80"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{t.label}</span>
                </div>
                {isActive && <Check className="h-3.5 w-3.5 text-primary" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
