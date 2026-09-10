import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { booleanOptions } from "@/utils/options/booleanOptions";
import { useTranslations } from "next-intl";

export const BlogInputs = (): FormInput[] => {
  const t = useTranslations();
  const inputs: FormInput[] = [
    {
      name: "category_id",
      type: "selectPaginated",
      apiUrl: ["adminCategories"],
      label: "Category",
      required: true,
      cardId: "general"
    },
    {
      name: "sub_category_id",
      type: "selectPaginated",
      apiUrl: ["adminSubCategories"],
      label: "Sub Category",
      cardId: "general"
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" }
      ],
      required: true,
      cardId: "general"
    },
    {
      name: "is_featured",
      type: "radioGroup",
      label: "Featured Article",
      options: booleanOptions(t),
      cardId: "general"
    },
    {
      name: "image",
      type: "img",
      label: "Featured Image",
      cardId: "general"
    },
    {
      name: "title",
      type: "text",
      multiLang: true,
      label: "Article Title",
      cardId: "lang",
      required: true
    },
    {
      name: "excerpt",
      type: "textarea",
      multiLang: true,
      label: "Short Excerpt",
      cardId: "lang"
    },
    {
      name: "content",
      type: "textEditor",
      multiLang: true,
      label: "Full Article Content",
      cardId: "lang",
      required: true
    },
    // SEO Fields
    { name: "seo_meta_title", type: "text", multiLang: true, label: "Meta Title", cardId: "seo" },
    { name: "seo_meta_description", type: "textarea", multiLang: true, label: "Meta Description", cardId: "seo" },
    { name: "seo_focus_keyphrase", type: "text", label: "Focus Keyphrase", placeholder: "e.g. AI logistics agents", cardId: "seo" },
    { name: "seo_canonical_url", type: "text", label: "Canonical URL", placeholder: "https://globfreight.com/blog/...", cardId: "seo" },
    {
      name: "tags",
      type: "tag-input",
      label: "Tags",
      placeholder: "e.g. AI, Logistics, Shipping",
      cardId: "seo"
    },
    {
      name: "seo_schema_markup_type",
      type: "select",
      label: "Schema Markup Type",
      options: [
        { label: "Article", value: "Article" },
        { label: "BlogPosting", value: "BlogPosting" },
        { label: "WebPage", value: "WebPage" },
      ],
      cardId: "seo"
    },
  ];

  return inputs;
};

// Tag input definition for CustomGeneratedInputs
export const BlogTagInputs = (): FormInput[] => [
  {
    name: "value",
    type: "text",
    label: "Tag",
    placeholder: "e.g. AI, Logistics, Shipping",
    required: true
  }
];
