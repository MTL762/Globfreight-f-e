"use client";

import { Button } from "@/components/ui/button";
import { useGlobalLoading } from "global-loading-state";
import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

function SubmitSection({
  id,
  disabled,
  btnName
}: {
  btnName?: string;
  id?: string | number;
  disabled?: boolean;
}) {
  const router = useRouter();
  const t = useTranslations();
  const loading = useGlobalLoading();
  const isPending = Boolean(disabled ?? loading);

  return (
    <div className="sticky bottom-4 z-20 mt-6 sm:mt-8 p-3 sm:p-4 rounded-2xl border border-border/80 bg-background/90 backdrop-blur-md shadow-lg flex items-center justify-between gap-3 transition-all duration-200">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-block w-2 h-2 rounded-full bg-primary/80" aria-hidden="true" />
        <span className="font-medium hidden sm:inline">
          {id ? t("update") : t("create")}
        </span>
      </div>

      <div className="flex items-center gap-2.5 ms-auto">
        <Button
          data-testid="cancel-edit"
          variant="outline"
          type="button"
          onClick={() => router.back()}
          className="border-border/80 hover:bg-muted/60 hover:text-foreground text-xs sm:text-sm h-9 sm:h-10 px-3.5 sm:px-4"
        >
          <X className="w-4 h-4 me-1.5 opacity-70" aria-hidden="true" />
          {t("cancel")}
        </Button>

        <Button
          variant="default"
          type="submit"
          data-testid="submit-form"
          disabled={isPending}
          isLoading={isPending}
          className="shadow-xs hover:shadow transition-all text-xs sm:text-sm h-9 sm:h-10 px-4 sm:px-5 font-semibold"
        >
          {!isPending && <Check className="w-4 h-4 me-1.5" aria-hidden="true" />}
          {btnName ? t(`${btnName}`) : t(!id ? "create" : "update")}
        </Button>
      </div>
    </div>
  );
}

export default SubmitSection;
