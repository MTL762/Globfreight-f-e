// Auto-generated type definitions

export interface sub-categoriesCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  order: number;
  parent_id?: null;
  image?: null;
  created_at: string;
  updated_at: string;
}

export interface sub-categoriesSeo {
  id: number;
  meta_title: string;
  meta_description?: null;
  focus_keyphrase?: null;
  canonical_url?: null;
  schema_markup_type?: null;
  schema_markup?: null;
  og_title?: null;
  og_description?: null;
  og_image?: null;
  meta_robots: string;
  keywords?: null;
  created_at: string;
  updated_at: string;
}

export interface sub-categories {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  order: number;
  image: string;
  category: sub-categoriesCategory;
  seo: sub-categoriesSeo;
  created_at: string;
  updated_at: string;
}
