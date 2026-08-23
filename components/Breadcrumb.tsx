import { Link } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";
import { mainIcons } from "../utils/icons";

interface BreadcrumbProps {
  items: (
    | undefined
    | {
        label: string;
        href?: string;
      }
  )[];
  children?: React.ReactNode;
}

export async function Breadcrumb({ items, children }: BreadcrumbProps) {
  const t = await getTranslations();
  return (
    <nav
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 px-3 rounded-2xl bg-white/40 dark:bg-slate-950/40 backdrop-blur-sm  transition-all duration-300"
      aria-label="Breadcrumb"
    >
      <div className="flex items-center overflow-x-auto no-scrollbar">
        <ol className="flex items-center space-x-1 md:space-x-2 whitespace-nowrap">
          <li className="flex items-center">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
              <span className="hidden min-[450px]:inline-block">{t("Home")}</span>
            </Link>
          </li>
          {items?.map((item, index) => {
            if (!item) return null;
            if (!isNaN(Number(item.label))) return null;
            const icon = mainIcons[item.label];

            return (
              <li key={`${item.label}-${index}`} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1 md:mx-2 flex-shrink-0" />
                <div className="flex items-center">
                  {icon && (
                    <span className="mx-1.5 flex gap-2 text-gray-500 dark:text-gray-400">
                      {React.createElement(icon, {
                        size: 16,
                        className: "md:w-[18px] md:h-[18px]"
                      })}
                    </span>
                  )}
                  {item.href ? (
                    <Link
                      href={item.href || "#"}
                      className="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <span className="text-nowrap">{t(item.label)}</span>
                    </Link>
                  ) : (
                    <span className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[120px] md:max-w-none">
                      {t(item.label)}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-center">{children}</div>
    </nav>
  );
}
