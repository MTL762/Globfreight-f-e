"use client";

import { fetchHelper } from "@/api/fetch";
import { ExpandableButton } from "@/components/ui/ExpandableButton";
import { ClipboardCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckAttendanceButton() {
    const [loading, setLoading] = useState(false);
    const t = useTranslations();

    const handleCheckAttendance = async () => {
        setLoading(true);
        try {
            const res = await fetchHelper({
                endPoint: ["hrAttendances"],
                method: "POST",
                body: {}
            });

            if (res?.success === false) {
                toast.error(res?.message ?? t("Something went wrong"));
            } else {
                toast.success(t("Attendance checked successfully"));
            }
        } catch {
            toast.error(t("Something went wrong"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <ExpandableButton
            type="button"
            icon={
                loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <ClipboardCheck className="h-5 w-5" />
                )
            }
            label={loading ? t("Checking") : t("Check Attendance")}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-primary"
            aria-label={t("Check Attendance")}
            disabled={loading}
            onClick={handleCheckAttendance}
        />
    );
}
