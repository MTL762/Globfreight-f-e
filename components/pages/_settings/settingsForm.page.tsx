"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import type { SettingsItem } from "./settings.types";

interface Props {
  settings?: SettingsItem[];
  domain: string;
}

export default function SettingsFormPage({ settings = [], domain }: Props) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {
      timezone: "Asia/Riyadh",
      company_name: "Globfreight Logistics",
      support_email: "support@globfreight.com",
      enable_notifications: true,
      auto_approve_leaves: false,
      currency: "USD"
    };
    settings.forEach((s) => {
      if (s.key) initial[s.key] = s.value;
    });
    return initial;
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // simulate/send update
      await new Promise((r) => setTimeout(r, 600));
      toast.success(t("Settings updated successfully"));
    } catch {
      toast.error(t("Failed to update settings"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-base font-bold text-foreground mb-1 capitalize">
          {domain.toLowerCase()} {t("Configuration")}
        </h3>
        <p className="text-xs text-muted-foreground mb-6">
          {t("Manage and adjust settings for this system domain.")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {domain === "LOCALIZATION" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="timezone">{t("System Timezone")}</Label>
                <Input
                  id="timezone"
                  value={formData.timezone || ""}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  placeholder="Asia/Riyadh"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">{t("Base Currency")}</Label>
                <Input
                  id="currency"
                  value={formData.currency || ""}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  placeholder="USD"
                />
              </div>
            </>
          ) : domain === "NOTIFICATIONS" ? (
            <div className="flex items-center justify-between col-span-full rounded-xl border border-border p-4">
              <div className="space-y-0.5">
                <Label>{t("Enable Push & Email Notifications")}</Label>
                <p className="text-xs text-muted-foreground">
                  {t("Send automatic alerts for attendance, leaves, and approvals")}
                </p>
              </div>
              <Switch
                checked={Boolean(formData.enable_notifications)}
                onCheckedChange={(val) => handleChange("enable_notifications", val)}
              />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="company_name">{t("Company Name")}</Label>
                <Input
                  id="company_name"
                  value={formData.company_name || ""}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support_email">{t("Support Email")}</Label>
                <Input
                  id="support_email"
                  type="email"
                  value={formData.support_email || ""}
                  onChange={(e) => handleChange("support_email", e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="gap-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>{t("Save Changes")}</span>
        </Button>
      </div>
    </form>
  );
}
