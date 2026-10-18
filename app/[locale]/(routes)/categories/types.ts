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

export interface categoriesSeo {
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
  faqs?: Array<{ question: string; answer: string }> | null;
  created_at?: string;
  updated_at?: string;
}

export interface categories {
  id: number;
  name: LocalizedString;
  slug: LocalizedString;
  description?: LocalizedString;
  is_active: boolean;
  order: number;
  parent_id?: number | null;
  image?: LocalizedString | null;
  image_alt?: LocalizedString | null;
  parent?: unknown;
  sub_categories?: unknown[];
  sub_categories_count?: number;
  seo?: categoriesSeo | null;
  created_at: string;
  updated_at: string;
}

