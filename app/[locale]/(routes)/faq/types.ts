// Auto-generated type definitions

export interface faqCategory {
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

export interface faq {
  id: number;
  category_id: number;
  sub_category_id?: null;
  question: string;
  answer: string;
  is_active: boolean;
  order: number;
  category: faqCategory;
  sub_category?: null;
  created_at: string;
  updated_at: string;
}
