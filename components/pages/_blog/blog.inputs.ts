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
      toolTip: t("BlogTooltips.category_id"),
      required: true,
      cardId: "general",
    },
    {
      name: "sub_category_id",
      type: "selectPaginated",
      apiUrl: ["adminSubCategories"],
      label: "Sub Category",
      toolTip: t("BlogTooltips.sub_category_id"),
      cardId: "general",
    },
    {
      name: "status",
      type: "select",
      label: "Status",
      toolTip: t("BlogTooltips.status"),
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" }
      ],
      required: true,
      cardId: "general",
    },
    {
      name: "is_featured",
      type: "radioGroup",
      label: "Featured Article",
      toolTip: t("BlogTooltips.is_featured"),
      options: booleanOptions(t),
      cardId: "general",
    },
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
      name: "title",
      type: "text",
      multiLang: true,
      label: "Article Title",
      toolTip: t("BlogTooltips.title"),
      cardId: "lang",
      required: true,
      width: 6
    },
    {
      name: "excerpt",
      type: "textarea",
      multiLang: true,
      label: "Short Excerpt",
      toolTip: t("BlogTooltips.excerpt"),
      cardId: "lang",
      width: 6
    },
    {
      name: "content",
      type: "textarea",
      multiLang: true,
      label: "Full Article Content",
      toolTip: t("BlogTooltips.content"),
      cardId: "lang",
      required: true,
      width: 6
    },
    // SEO Fields
    {
      name: "seo_meta_title",
      type: "text",
      multiLang: true,
      label: "Meta Title",
      toolTip: t("BlogTooltips.seo_meta_title"),
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_meta_description",
      type: "textarea",
      multiLang: true,
      label: "Meta Description",
      toolTip: t("BlogTooltips.seo_meta_description"),
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_focus_keyphrase",
      type: "text",
      label: "Focus Keyphrase",
      placeholder: "e.g. AI logistics agents",
      toolTip: t("BlogTooltips.seo_focus_keyphrase"),
      cardId: "seo",
    },
    {
      name: "seo_canonical_url",
      type: "text",
      label: "Canonical URL",
      placeholder: "https://globfreight.com/blog/...",
      toolTip: t("BlogTooltips.seo_canonical_url"),
      cardId: "seo",
    },
    {
      name: "tags",
      type: "tag-input",
      label: "Tags",
      placeholder: "e.g. AI, Logistics, Shipping",
      toolTip: t("BlogTooltips.tags"),
      cardId: "seo",
    },
    {
      name: "seo_schema_markup_type",
      type: "select",
      label: "Schema Markup Type",
      toolTip: t("BlogTooltips.seo_schema_markup_type"),
      options: [
        { label: "Article", value: "Article" },
        { label: "BlogPosting", value: "BlogPosting" },
        { label: "WebPage", value: "WebPage" },
      ],
      cardId: "seo",
    },
  ];

  return inputs;
};
