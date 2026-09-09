
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const CategoriesInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "description", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "slug", type: "text", label: "Slug", placeholder: "e.g. technology", cardId: 'general' },
    { name: "order", type: "number", cardId: 'general' },
    { name: "is_active", type: "checkbox", label: "Active", cardId: 'general' },
    { name: "image", type: "img", required: true, cardId: 'general' },
    // SEO Fields
    { name: "seo_meta_title", type: "text", multiLang: true, label: "Meta Title", cardId: 'seo' },
    { name: "seo_meta_description", type: "textarea", multiLang: true, label: "Meta Description", cardId: 'seo' },
    { name: "seo_focus_keyphrase", type: "text", label: "Focus Keyphrase", placeholder: "e.g. freight tech", cardId: 'seo' },
    { name: "seo_canonical_url", type: "text", label: "Canonical URL", placeholder: "https://globfreight.com/categories/...", cardId: 'seo' },
    {
      name: "seo_schema_markup_type",
      type: "select",
      label: "Schema Markup Type",
      options: [
        { label: "Category", value: "Category" },
        { label: "Article", value: "Article" },
        { label: "WebPage", value: "WebPage" },
      ],
      cardId: 'seo'
    },
  ];
  return inputs;
};
