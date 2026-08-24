"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, FileSpreadsheet, CheckCircle2, Calculator, Download, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export default function AttendanceCalculatorView() {
  const t = useTranslations();
  const [isProcessing, setIsProcessing] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCalculated(true);
        toast.success(t("Attendance sheet processed successfully"));
      }, 1000);
    }
  };

  const handleExport = () => {
    toast.success(t("Exporting calculated payroll & hours report..."));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span>{t("Attendance & Payroll Calculator")}</span>
          </CardTitle>
          <CardDescription>
            {t("Upload raw biometric or CSV attendance logs to parse hours, late minutes, and overtime.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-border hover:border-primary/50 transition-colors rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 bg-muted/20">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">
                {fileName ? fileName : t("Click to browse or drag and drop attendance sheet")}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("Supported formats: .xlsx, .csv, .dat")}
              </p>
            </div>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <span>
                  <FileSpreadsheet className="h-4 w-4 mr-1.5" />
                  {t("Select File")}
                </span>
              </Button>
              <input
                type="file"
                accept=".xlsx,.xls,.csv,.dat"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 animate-spin text-primary" />
              <span>{t("Analyzing time logs and computing shifts...")}</span>
            </div>
          )}

          {calculated && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs font-semibold">{t("Processed Logs")}</span>
                  </div>
                  <p className="text-2xl font-bold mt-2 text-foreground">1,248 {t("Records")}</p>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-xs font-semibold">{t("Late Arrivals")}</span>
                  </div>
                  <p className="text-2xl font-bold mt-2 text-foreground">18 {t("Instances")}</p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs font-semibold">{t("Total Regular Hours")}</span>
                  </div>
                  <p className="text-2xl font-bold mt-2 text-foreground">2,496 {t("Hrs")}</p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="default" onClick={handleExport} className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>{t("Export Processed Report")}</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
