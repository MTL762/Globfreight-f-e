export interface SettingsItem {
  id?: string | number;
  key: string;
  value: string | number | boolean | null;
  domain?: string;
  label?: string;
  description?: string;
  type?: "text" | "number" | "boolean" | "select" | "textarea";
  options?: { label: string; value: string | number }[];
}

export type SettingsDomain = "BUSINESS" | "GENERAL" | "NOTIFICATIONS" | "SECURITY" | "LOCALIZATION";
