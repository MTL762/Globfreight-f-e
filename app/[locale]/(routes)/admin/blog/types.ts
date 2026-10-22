export type LocalizedString =
  | string
  | {
      ar?: string;
      en?: string;
      nl?: string;
      fr?: string;
      de?: string;
      [key: string]: string | undefined;
    };

export interface blogAuthor {
  id: number;
  name: string;
  bio?: string | null;
  email?: string;
  phone?: string | null;
  type?: string;
  avatar?: string | null;
  email_verified_at?: string | null;
  phone_verified_at?: string | null;
}

export interface blogCategory {
  id: number;
  name: LocalizedString;
  slug: LocalizedString;
  description?: LocalizedString;
  is_active: boolean;
  order: number;
  parent_id?: number | null;
  image?: LocalizedString | null;
  image_alt?: LocalizedString | null;
  created_at: string;
  updated_at: string;
}

export interface blogSub_category {
  id: number;
  category_id: number;
  name: LocalizedString;
  slug: LocalizedString;
  description?: LocalizedString;
  is_active: boolean;
  order: number;
  image?: LocalizedString | null;
  image_alt?: LocalizedString | null;
  created_at: string;
  updated_at: string;
}

export interface blogSeo {
  id?: number;
  meta_title?: LocalizedString;
  meta_description?: LocalizedString;
  focus_keyphrase?: LocalizedString;
  canonical_url?: string | null;
  schema_markup_type?: string | null;
  schema_markup?: string | object | null;
  og_title?: LocalizedString;
  og_description?: LocalizedString;
  og_image?: string | null;
  og_image_alt?: LocalizedString;
  twitter_card?: string | null;
  twitter_title?: LocalizedString;
  twitter_description?: LocalizedString;
  twitter_image?: string | null;
  meta_robots?: string | null;
  keywords?: string | string[] | null;
  faq_ids?: number[] | null;
  faqs?: Array<{ id?: number; question: string; answer?: string }> | null;
  created_at?: string;
  updated_at?: string;
}

export interface blog {
  id: number;
  title: LocalizedString;
  slug: LocalizedString;
  excerpt?: LocalizedString;
  content: LocalizedString;
  status: "draft" | "published" | "archived" | string;
  published_locales?: string[];
  is_featured: boolean;
  published_at?: string;
  views_count?: number;
  tags?: string[] | Record<string, string[]>;
  image?: LocalizedString | null;
  image_alt?: LocalizedString | null;
  author?: blogAuthor;
  category?: blogCategory;
  sub_category?: blogSub_category;
  seo?: blogSeo;
  created_at: string;
  updated_at: string;
}
