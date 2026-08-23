export interface SubCategoryCategory {
  id: number;
  name: string | { ar?: string; en?: string };
  slug: string;
  description?: string | { ar?: string; en?: string };
  is_active: boolean;
  order: number;
  parent_id?: number | null;
  image?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubCategorySeo {
  id: number;
  meta_title?: string | { ar?: string; en?: string } | null;
  meta_description?: string | { ar?: string; en?: string } | null;
  focus_keyphrase?: string | null;
  canonical_url?: string | null;
  schema_markup_type?: string | null;
  schema_markup?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  meta_robots?: string;
  keywords?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubCategoryItem {
  id: number;
  category_id: number;
  name: string | { ar?: string; en?: string };
  slug: string;
  description?: string | { ar?: string; en?: string };
  is_active: boolean;
  order: number;
  image?: string | null;
  category?: SubCategoryCategory;
  seo?: SubCategorySeo;
  created_at: string;
  updated_at: string;
}
