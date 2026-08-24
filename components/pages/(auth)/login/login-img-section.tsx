import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function LoginImgSection(): Promise<JSX.Element> {
  const t = await getTranslations();
  return (
    <div className="w-full md:w-1/2 lg:w-3/5 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 z-0" />
      <div className="absolute w-96 h-96 bg-green-200/30 dark:bg-green-600/10 rounded-full -top-20 -left-20 blur-3xl animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-emerald-200/30 dark:bg-emerald-600/10 rounded-full -bottom-10 -right-10 blur-2xl"></div>
      <div className="absolute w-72 h-72 bg-green-200/20 dark:bg-green-600/10 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

      <div className="relative z-10 text-center max-w-2xl">
        <div className="mb-8 flex items-center justify-center gap-4">
          <Image src="/logo.png" alt="Logo" width={160} height={100} className="mx-auto object-contain" />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {t("People Operations")}
            </span>
            <span className="text-lg font-semibold text-foreground">{t("HR Workspace")}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          <span className="block mb-3 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
            {t("HR Operations Dashboard")}
          </span>
          <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
            {t("People-first workflows for every team")}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
          {t("Monitor attendance, performance, and employee updates in real time")}
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center p-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-lg border border-green-200/50 dark:border-green-600/20">
            <div className="w-3 h-3 bg-green-600 rounded-full mb-2"></div>
            <span className="text-sm font-medium text-center">{t("Attendance Tracking")}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-lg border border-emerald-200/50 dark:border-emerald-600/20">
            <div className="w-3 h-3 bg-emerald-600 rounded-full mb-2"></div>
            <span className="text-sm font-medium text-center">{t("Performance Insights")}</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-lg border border-green-300/50 dark:border-green-700/20">
            <div className="w-3 h-3 bg-green-700 rounded-full mb-2"></div>
            <span className="text-sm font-medium text-center">{t("Smart Workforce Planning")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
