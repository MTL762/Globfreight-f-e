// Auto-generated type definitions

export interface categoriesSeo {
  id: number;
  meta_title: string;
  meta_description: string;
  focus_keyphrase: string;
  canonical_url: string;
  schema_markup_type: string;
  schema_markup?: null;
  og_title?: null;
  og_description?: null;
  og_image?: null;
  meta_robots: string;
  keywords?: null;
  created_at: string;
  updated_at: string;
}

export interface categories {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  order: number;
  parent_id?: null;
  image: string;
  parent?: null;
  sub_categories: unknown[];
  sub_categories_count: number;
  seo: categoriesSeo;
  created_at: string;
  updated_at: string;
}
