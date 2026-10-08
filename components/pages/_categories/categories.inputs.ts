
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { booleanOptions } from "@/utils/options/booleanOptions";
import { useTranslations } from "next-intl";

export const CategoriesInputs = () => {
  const t = useTranslations()
  const inputs: FormInput[] = [
    { name: "name", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "description", type: "text", multiLang: true, cardId: 'lang', required: true },
    {
      name: "image",
      type: "img",
      multiLang: true,
      label: "Featured Image",
      toolTip: t("BlogTooltips.image"),
      cardId: "lang",
      width: 6
    },
    {
      name: "slug",
      type: "text",
      multiLang: true,
      label: "Slug",
      placeholder: "e.g. technology",
      cardId: "lang",
      width: 6
    },
    { name: "order", type: "number", cardId: 'general', min: 0 },
    { name: "is_active", options: booleanOptions(t), type: "radioGroup", label: "Active", cardId: 'general' },
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
