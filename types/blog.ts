export interface BlogPost {
  id: number;
  title: string | Record<string, string>;
  slug: string;
  excerpt?: string | Record<string, string>;
  content?: string | Record<string, string>;
  status?: "published" | "draft" | "archived" | string;
  is_featured?: boolean | number;
  published_at?: string;
  created_at?: string;
  views_count?: number;
  tags?: string[];
  image?: string | null;
  author?: {
    id: number;
    name: string;
    email?: string;
    avatar?: string | null;
  };
  category?: {
    id: number;
    name: string | Record<string, string>;
    slug?: string;
    description?: string | Record<string, string>;
  };
  sub_category?: {
    id: number;
    name: string | Record<string, string>;
    slug?: string;
  };
  seo?: {
    id?: number;
    meta_title?: string | Record<string, string>;
    meta_description?: string | Record<string, string>;
    focus_keyphrase?: string | Record<string, string>;
    canonical_url?: string;
    schema_markup_type?: string;
    og_title?: string | null;
    og_description?: string | null;
    og_image?: string | null;
  };
}

export function getBlogText(
  val: string | Record<string, string> | undefined | null,
  locale: string = "en",
  fallback: string = ""
): string {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  return val[locale] || val.en || val.ar || Object.values(val)[0] || fallback;
}

export function formatBlogDate(dateStr?: string, locale: string = "en"): string {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export function estimateReadTime(content?: string): number {
  if (!content) return 3;
  const clean = content.replace(/<[^>]*>/g, " ").trim();
  const words = clean ? clean.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 180));
}
