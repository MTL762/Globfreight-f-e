// Auto-generated type definitions

export interface blogAuthor {
  id: number;
  name: string;
  email: string;
  phone?: null;
  type: string;
  email_verified_at: string;
  phone_verified_at?: null;
  avatar?: null;
}

export interface blogCategory {
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

export interface blogSub_category {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  order: number;
  image?: null;
  created_at: string;
  updated_at: string;
}

export interface blogSeo {
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

export interface blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  is_featured: boolean;
  published_at: string;
  views_count: number;
  tags: string[];
  image: string;
  author: blogAuthor;
  category: blogCategory;
  sub_category: blogSub_category;
  seo: blogSeo;
  created_at: string;
  updated_at: string;
}
