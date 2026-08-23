export interface VisitorLogItem {
  id: number | string;
  ip_address?: string | null;
  page_url?: string | null;
  referer?: string | null;
  device_type?: "desktop" | "mobile" | "tablet" | string | null;
  platform?: string | null;
  browser?: string | null;
  country?: string | null;
  city?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface VisitorAnalyticsStats {
  total_visitors?: number;
  today?: number;
  this_week?: number;
  this_month?: number;
  devices?: {
    device: string;
    count: number;
    percentage: number;
  }[];
  countries?: {
    country: string;
    country_code?: string;
    count: number;
    percentage: number;
  }[];
  top_pages?: {
    url: string;
    views: number;
  }[];
}
