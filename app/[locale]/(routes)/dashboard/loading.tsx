import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";

const skeletonCards = (count: number) =>
  Array.from({ length: count }).map((_, index) => (
    <div
      key={`skeleton-card-${count}-${index}`}
      className="rounded-2xl border border-slate-200/70 bg-white/90 p-5 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/80"
    >
      <div className="space-y-3 animate-pulse">
        <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-6 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  ));

export default async function DashboardLoading() {
  const t = await getTranslations();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6">
      <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/70">
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="h-8 w-72 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.statistics")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skeletonCards(6)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.transactionsStatistics")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skeletonCards(6)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.ordersStatistics")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skeletonCards(9)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
