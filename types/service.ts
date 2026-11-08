import { MultilingualString } from "./blog";

export interface ServiceSeo {
  id?: number;
  meta_title?: string | MultilingualString | null;
  meta_description?: string | MultilingualString | null;
  focus_keyphrase?: string | MultilingualString | null;
  canonical_url?: string | MultilingualString | null;
  schema_markup_type?: string | null;
  schema_markup?: string | object | null;
  og_title?: string | MultilingualString | null;
  og_description?: string | MultilingualString | null;
  og_image?: string | null;
  og_image_alt?: string | MultilingualString | null;
  twitter_card?: "summary_large_image" | "summary" | string | null;
  twitter_title?: string | MultilingualString | null;
  twitter_description?: string | MultilingualString | null;
  twitter_image?: string | null;
  meta_robots?: string | null;
  keywords?: string[] | string | null;
  faq_ids?: number[] | null;
  faqs?: Array<{ question: string; answer: string; id?: number }> | null;
}

export interface Service {
  id: number;
  name: string | MultilingualString;
  slug: string | MultilingualString;
  short_description?: string | MultilingualString | null;
  description?: string | MultilingualString | null;
  icon?: string | null;
  features?: string[] | MultilingualString | Record<string, string[]> | null;
  is_active?: boolean;
  is_featured?: boolean;
  order?: number;
  published_locales?: string[] | null;
  parent_id?: number | null;
  image?: string | MultilingualString | null;
  image_alt?: string | MultilingualString | null;
  parent?: Service | null;
  children?: Service[];
  seo?: ServiceSeo | null;
  created_at?: string;
  updated_at?: string;
}

export function getServiceText(
  val: string | MultilingualString | Record<string, any> | undefined | null,
  locale: string = "en",
  fallback: string = ""
): string {
  if (!val) return fallback;
  if (typeof val === "string") return val.trim() || fallback;
  const result =
    val[locale] ||
    val.en ||
    val.ar ||
    Object.values(val).find(v => Boolean(typeof v === "string" ? v.trim() : v));
  return (typeof result === "string" ? result.trim() : result) || fallback;
}

export function getServiceFeatures(
  features: Service["features"],
  locale: string = "en"
): string[] {
  if (!features) return [];
  if (Array.isArray(features)) {
    return features
      .map((f: any) => (typeof f === "string" ? f : String(f?.value || f)))
      .filter(Boolean);
  }
  if (typeof features === "object" && features !== null) {
    const raw =
      (features as any)[locale] ||
      (features as any).en ||
      (features as any).ar ||
      Object.values(features)[0];
    if (Array.isArray(raw)) {
      return raw
        .map((f: any) => (typeof f === "string" ? f : String(f?.value || f)))
        .filter(Boolean);
    }
    if (typeof raw === "string") {
      return raw.split(",").map((s: string) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

