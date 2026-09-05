export type LocalizedString =
  | string
  | {
      ar?: string;
      en?: string;
      [key: string]: string | undefined;
    };

export interface MetricCount {
  total: number;
  [key: string]: number | undefined;
}

export interface CustomerMetrics {
  total: number;
  active: number;
}

export interface BlogPostMetrics {
  total: number;
  published: number;
  draft: number;
}

export interface CategoryMetrics {
  total: number;
  sub_categories_total: number;
}

export interface ContactMetrics {
  total: number;
  unread: number;
}

export interface VisitorMetrics {
  total: number;
  today: number;
  this_week: number;
  this_month: number;
}

export interface DashboardMetrics {
  users?: {
    total: number;
  };
  customers?: CustomerMetrics;
  blog_posts?: BlogPostMetrics;
  categories?: CategoryMetrics;
  faq_items?: {
    total: number;
  };
  contact_us?: ContactMetrics;
  sent_emails?: {
    total: number;
  };
  visitors?: VisitorMetrics;
  price_requests?: {
    total?: number;
    pending?: number;
    quoted?: number;
  };
  stats?: {
    total_price_requests?: number;
    pending_price_requests?: number;
    quoted_price_requests?: number;
    [key: string]: number | undefined;
  };
  // Fallbacks for optional custom metrics
  bounce_rate?: {
    rate?: number;
    change?: number;
  };
  page_views?: {
    today?: number;
    total?: number;
    change?: number;
  };
}

export interface RecentCustomer {
  id: number | string;
  user_id?: number | null;
  first_name: string;
  last_name: string;
  company_name?: string | null;
  email: string;
  phone?: string | null;
  alt_phone?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  postal_code?: string | null;
  tax_number?: string | null;
  status: "active" | "inactive" | string;
  notes?: string | null;
  deleted_at?: string | null;
  created_at: string;
  updated_at?: string;
  user?: {
    id: number | string;
    name: string;
    email: string;
  } | null;
}

export interface BlogPostAuthor {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  status?: string;
  type?: string;
  country?: string | null;
  city?: string | null;
}

export interface BlogPostCategory {
  id: number;
  name: LocalizedString;
  slug: string;
  description?: LocalizedString;
  is_active?: boolean;
  order?: number;
  parent_id?: number | null;
}

export interface RecentBlogPost {
  id: number | string;
  author_id?: number;
  category_id?: number;
  sub_category_id?: number | null;
  title: LocalizedString;
  slug: string;
  excerpt?: LocalizedString;
  content?: LocalizedString;
  status: "published" | "draft" | "archived" | string;
  is_featured?: boolean;
  published_at?: string;
  views_count?: number;
  tags?: string[];
  deleted_at?: string | null;
  created_at: string;
  updated_at?: string;
  author?: BlogPostAuthor;
  category?: BlogPostCategory;
}

export interface RecentContact {
  id: number | string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  is_read?: boolean;
  status?: string;
  created_at: string;
}

export interface ChartTrendPoint {
  date: string;
  label?: string;
  count?: number;
  visits?: number;
  inquiries?: number;
  [key: string]: string | number | undefined;
}

export interface DashboardCharts {
  visitor_trend?: ChartTrendPoint[];
  contact_trend?: ChartTrendPoint[];
  price_requests_chart?: { date: string; count: number }[];
}

export interface DashboardRecent {
  contacts?: RecentContact[];
  customers?: RecentCustomer[];
  blog_posts?: RecentBlogPost[];
  price_requests?: {
    id: number | string;
    from: string;
    to: string;
    name: string;
    status: string;
    created_at: string;
  }[];
}

export interface DashboardData {
  metrics: DashboardMetrics;
  recent: DashboardRecent;
  charts: DashboardCharts;
}

export interface DashboardApiResponse {
  data: DashboardData;
  message?: string;
  type?: string;
  code?: number;
  success?: boolean;
}

export interface CountryStat {
  country: string;
  country_code?: string;
  visits: number;
  percentage?: number;
}

export interface ActivityItem {
  id: string | number;
  type: "message" | "customer" | "user" | "post" | "other" | string;
  title: string;
  description: string;
  time: string;
  badge?: string;
}

export interface UserProfileData {
  id?: number | string;
  name?: string;
  email?: string;
  avatar?: string;
  role?: string;
  type?: string;
}

export function getLocalizedText(
  value: LocalizedString | undefined | null,
  locale: string,
  fallback = ""
): string {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if (locale in value && typeof value[locale] === "string" && value[locale]?.trim()) {
      return value[locale] as string;
    }
    // Fallback to en, then ar, then first available string
    if (value.en?.trim()) return value.en;
    if (value.ar?.trim()) return value.ar;
    const firstVal = Object.values(value).find((v) => typeof v === "string" && v.trim());
    if (firstVal) return firstVal;
  }
  return fallback;
}
