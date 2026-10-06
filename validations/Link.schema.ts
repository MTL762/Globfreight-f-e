import { useTranslations } from "next-intl";
import { z } from "zod";

export function LinkSchema() {
  const t = useTranslations();
  return z
    .string()
    .min(1, { message: t("Validations.required") }) // Ensure the link is not empty (required)
    .refine(
      link => link.startsWith("http://") || link.startsWith("https://"), // Validate URL starts with http:// or https://
      { message: t("Validations.invalidUrl") }
    )
    .refine(
      link => {
        try {
          // Validate URL structure using URL constructor
          new URL(link);
          return true;
        } catch {
          return false;
        }
      },
      { message: t("Validations.invalidUrlStructure") }
    )
    .refine(
      link => link.length <= 2048, // Ensure the link length is within a reasonable limit
      { message: t("Validations.urlTooLong") }
    );
}
export function OptionalLinkSchema(t?: TFunction) {
  const getMsg = (key: string, fallback: string) => (t ? t(key) : fallback);

  return z
    .string()
    .trim()
    .refine(
      link => {
        if (!link || link === "") return true;
        try {
          const parsed = new URL(link);
          return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
          return false;
        }
      },
      { message: getMsg("Validations.invalidUrl", "URL is invalid") }
    )
    .refine(
      link => !link || link.length <= 2048,
      { message: getMsg("Validations.urlTooLong", "URL is too long") }
    )
    .optional()
    .nullable();
}
