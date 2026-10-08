// كائن اللغات المدعومة
export interface MultilingualString {
  ar?: string;
  nl?: string;
  fr?: string;
  de?: string;
  en?: string;
  [key: string]: string | undefined;
}

// كائن استجابة الـ 301 Redirect
export interface SlugRedirectResponse {
  status: 301;
  message: string;
  data: {
    new_slug: string;
    current_slug: string;
    is_redirect: true;
  };
}

// نموذج المقال
export interface BlogPost {
  id: number;
  title: string | MultilingualString;
  slug: string | MultilingualString;
  excerpt?: string | MultilingualString;
  content?: string | MultilingualString;
  category_id?: number;
  status?: "draft" | "published" | "archived" | string;
  is_featured?: boolean | number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  views_count?: number;
  tags?: string[] | null;
  image?: string | MultilingualString | null;
  author?: {
    id: number;
    name: string;
    email?: string;
    phone?: string | null;
    type?: string;
    avatar?: string | null;
    email_verified_at?: string | null;
    phone_verified_at?: string | null;
  };
  category?: {
    id: number;
    name: string | MultilingualString;
    slug?: string | MultilingualString;
    description?: string | MultilingualString;
    is_active?: boolean;
    order?: number;
    parent_id?: number | null;
    image?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  sub_category?: {
    id: number;
    category_id?: number;
    name: string | MultilingualString;
    slug?: string | MultilingualString;
    description?: string | MultilingualString;
    is_active?: boolean;
    order?: number;
    image?: string | null;
    created_at?: string;
    updated_at?: string;
  };
  seo_meta_title?: string | MultilingualString;
  seo_meta_description?: string | MultilingualString;
  seo_focus_keyphrase?: string | MultilingualString;
  seo_canonical_url?: string;
  seo_schema_markup_type?: string;
  seo?: {
    id?: number;
    meta_title?: string | MultilingualString | null;
    meta_description?: string | MultilingualString | null;
    focus_keyphrase?: string | MultilingualString | null;
    canonical_url?: string | null;
    schema_markup_type?: string | null;
    schema_markup?: string | null;
    og_title?: string | null;
    og_description?: string | null;
    og_image?: string | null;
    meta_robots?: string | null;
    keywords?: string[] | string | null;
    created_at?: string;
    updated_at?: string;
  };
}

// استجابة API المقال
export interface BlogPostResponse {
  data: BlogPost;
  message?: string;
  code?: number;
  type?: string;
  success: boolean;
  status: number;
}

// نتيجة جلب المقال الشاملة (تشمل النجاح والتحويل 301 والأخطاء)
export interface BlogPostFetchResult {
  success: boolean;
  status: number;
  data?: BlogPost & {
    new_slug?: string;
    current_slug?: string;
    is_redirect?: boolean;
  };
  message?: string;
  code?: number;
  type?: string;
  isRedirect?: boolean;
  newSlug?: string;
}

// نموذج القسم
export interface Category {
  id: number;
  name: string | MultilingualString;
  slug: string | MultilingualString;
  description?: string | MultilingualString;
  is_active: boolean;
  order: number;
  sub_categories?: Category[];
}

export function getBlogText(
  val: string | MultilingualString | Record<string, string> | undefined | null,
  locale: string = "en",
  fallback: string = ""
): string {
  if (!val) return fallback;
  if (typeof val === "string") return val.trim() || fallback;
  const result = val[locale] || val.en || val.ar || Object.values(val).find(v => Boolean(v?.trim?.() ?? v));
  return (typeof result === "string" ? result.trim() : result) || fallback;
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
