import { Link } from "@/i18n/navigation";
import { PROJECT_NAME } from "@/utils/config";
import {
  ArrowRight,
  Building2,
  Calendar,
  CalendarOff,
  Clock,
  Coins,
  FileText,
  Languages,
  UserCheck
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "HR Dashboard" + PROJECT_NAME,
    description: "Human Resources management dashboard – manage all HR modules from one place."
  };
}

// ─── Module card data ──────────────────────────────────────────────────────────
const hrModules = [
  {
    key: "Contract",
    href: "/hr/contract",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    ring: "ring-blue-200 dark:ring-blue-800",
    descriptionKey: "Contract"
  },
  {
    key: "ContractTypes",
    href: "/hr/contract-types",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    ring: "ring-blue-200 dark:ring-blue-800",
    descriptionKey: "HR.ModuleDescription.ContractTypes"
  },
  {
    key: "Languages",
    href: "/hr/languages",
    icon: Languages,
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-500/20",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    ring: "ring-violet-200 dark:ring-violet-800",
    descriptionKey: "HR.ModuleDescription.Languages"
  },
  {
    key: "LeaveTypes",
    href: "/hr/leave-types",
    icon: CalendarOff,
    gradient: "from-rose-500 to-pink-600",
    shadow: "shadow-rose-500/20",
    bg: "bg-rose-50 dark:bg-rose-950/40",
    ring: "ring-rose-200 dark:ring-rose-800",
    descriptionKey: "HR.ModuleDescription.LeaveTypes"
  },
  {
    key: "Salaries",
    href: "/hr/salaries",
    icon: Coins,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    ring: "ring-emerald-200 dark:ring-emerald-800",
    descriptionKey: "HR.ModuleDescription.Salaries"
  },
  {
    key: "Sections",
    href: "/hr/sections",
    icon: Building2,
    gradient: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    ring: "ring-amber-200 dark:ring-amber-800",
    descriptionKey: "HR.ModuleDescription.Sections"
  },
  {
    key: "Deductions",
    href: "/hr/deductions",
    icon: Coins,
    gradient: "from-fuchsia-500 to-pink-600",
    shadow: "shadow-fuchsia-500/20",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/40",
    ring: "ring-fuchsia-200 dark:ring-fuchsia-800",
    descriptionKey: "HR.ModuleDescription.Deductions"
  },
  {
    key: "OfficialHolidays",
    href: "/hr/official-holidays",
    icon: Calendar,
    gradient: "from-red-500 to-rose-600",
    shadow: "shadow-red-500/20",
    bg: "bg-red-50 dark:bg-red-950/40",
    ring: "ring-red-200 dark:ring-red-800",
    descriptionKey: "HR.ModuleDescription.OfficialHolidays"
  },
  {
    key: "Shifts",
    href: "/hr/shifts",
    icon: Clock,
    gradient: "from-cyan-500 to-sky-600",
    shadow: "shadow-cyan-500/20",
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    ring: "ring-cyan-200 dark:ring-cyan-800",
    descriptionKey: "HR.ModuleDescription.Shifts"
  },
  {
    key: "Attendances",
    href: "/hr/attendances",
    icon: UserCheck,
    gradient: "from-sky-500 to-indigo-600",
    shadow: "shadow-sky-500/20",
    bg: "bg-sky-50 dark:bg-sky-950/40",
    ring: "ring-sky-200 dark:ring-sky-800",
    descriptionKey: "HR.ModuleDescription.Attendances"
  }
];

export default async function DashboardPage() {
  const t = await getTranslations();

  return (
    <div className="min-h-[80vh] space-y-10">
      {/* ── Hero header ───────────────────────────────────────────────────── */}

      {/* ── Module grid ───────────────────────────────────────────────────── */}
      <section>
        <h2 className="mb-6 text-lg font-semibold text-foreground/80 tracking-wide uppercase text-xs">
          {t("HR Overview")}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {hrModules.map(
            ({ key, href, icon: Icon, gradient, shadow, bg, ring, descriptionKey }) => (
              <Link
                key={key}
                href={href}
                className={`
                group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border/60 p-6
                ${bg} ${ring} ring-1
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl ${shadow}
              `}
              >
                {/* top row */}
                <div className="flex items-start justify-between">
                  {/* icon badge */}
                  <div
                    className={`
                    flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}
                    shadow-lg transition-transform duration-300 group-hover:scale-110
                  `}
                  >
                    <Icon size={22} className="text-white" />
                  </div>

                  {/* arrow */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground/40 transition-all duration-300 group-hover:bg-foreground/10 group-hover:text-foreground/70 group-hover:translate-x-0.5">
                    <ArrowRight size={16} />
                  </span>
                </div>

                {/* text */}
                <div>
                  <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-foreground">
                    {t(key)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {t(descriptionKey)}
                  </p>
                </div>

                {/* subtle bottom accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${gradient} transition-all duration-500 group-hover:w-full`}
                />
              </Link>
            )
          )}
        </div>
      </section>
    </div>
  );
}
