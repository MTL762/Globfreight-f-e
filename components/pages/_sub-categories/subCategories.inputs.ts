import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { booleanOptions } from "@/utils/options/booleanOptions";
import { useTranslations } from "next-intl";

export const SubCategoriesInputs = (): FormInput[] => {
  const t = useTranslations();
  return [
    {
      name: "category_id",
      type: "selectPaginated",
      apiUrl: ["adminCategories"],
      label: "Category",
      required: true,
      cardId: "general",
      width: 6,
    },
    { name: "order", type: "number", cardId: "general", min: 0, width: 6 },
    { name: "is_active", options: booleanOptions(t), type: "radioGroup", label: "Active", cardId: "general", width: 6 },
    {
      name: "name",
      type: "text",
      multiLang: true,
      label: "Name",
      cardId: "lang",
      required: true,
      width: 6,
    },
    {
      name: "slug",
      type: "text",
      multiLang: true,
      label: "Slug",
      placeholder: "e.g. artificial-intelligence",
      toolTip: "Auto-generated from name per language (lowercase, hyphens, unique), editable",
      cardId: "lang",
      width: 6
    },
    {
      name: "description",
      type: "textarea",
      multiLang: true,
      label: "Description",
      cardId: "lang",
      width: 12,
    },
    {
      name: "image",
      type: "img",
      multiLang: true,
      ratio: "1200:630",
      label: "Featured Image",
      cardId: "lang",
      width: 6
    },
    {
      name: "image_alt",
      type: "text",
      multiLang: true,
      label: "Featured Image Alt Text",
      placeholder: "e.g. Subcategory logistics illustration",
      toolTip: "Descriptive alt text for subcategory image (accessibility & image SEO)",
      cardId: "lang",
      width: 6
    },
    // SEO Fields
    { name: "seo_meta_title", type: "text", multiLang: true, charLimit: 60, label: "Meta Title", cardId: "seo", width: 6 },
    { name: "seo_meta_description", type: "textarea", multiLang: true, charLimit: 155, label: "Meta Description", cardId: "seo", width: 6 },
    { name: "seo_focus_keyphrase", type: "text", multiLang: true, label: "Focus Keyphrase", placeholder: "e.g. AI logistics", cardId: "seo", width: 6 },
    { name: "seo_canonical_url", type: "text", multiLang: false, label: "Canonical URL", placeholder: "https://globfreight.com/sub-categories/...", cardId: "seo", width: 6 },
    {
      name: "seo_meta_robots",
      type: "select",
      multiLang: false,
      label: "Meta Robots",
      defaultValue: "index, follow",
      options: [
        { label: "index, follow (Recommended)", value: "index, follow" },
        { label: "noindex, nofollow", value: "noindex, nofollow" },
        { label: "index, nofollow", value: "index, nofollow" },
        { label: "noindex, follow", value: "noindex, follow" }
      ],
      cardId: "seo",
      width: 6
    },
    { name: "seo_keywords", type: "text", multiLang: false, label: "Keywords", placeholder: "air freight, cargo, tracking", cardId: "seo", width: 6 },
    {
      name: "seo_schema_markup_type",
      type: "select",
      multiLang: false,
      label: "Schema Markup Type",
      defaultValue: "Service",
      options: [
        { label: "Service", value: "Service" },
        { label: "Category", value: "Category" },
        { label: "Article", value: "Article" },
        { label: "FAQPage", value: "FAQPage" },
        { label: "WebPage", value: "WebPage" },
      ],
      cardId: "seo",
      width: 6
    },
    // Open Graph
    { name: "seo_og_title", type: "text", multiLang: true, label: "Open Graph Title", cardId: "seo", width: 6 },
    { name: "seo_og_description", type: "textarea", multiLang: true, label: "Open Graph Description", cardId: "seo", width: 6 },
    { name: "seo_og_image", type: "img", multiLang: false, ratio: "1200:630", label: "Open Graph Image (1200×630)", toolTip: "Image file upload (jpeg, png, webp, jpg, max 10MB) for social sharing banner", cardId: "seo", width: 6 },
    { name: "seo_og_image_alt", type: "text", multiLang: true, label: "Open Graph Image Alt Text", cardId: "seo", width: 6 },
    // Twitter
    {
      name: "seo_twitter_card",
      type: "select",
      multiLang: false,
      label: "Twitter / X Card",
      defaultValue: "summary_large_image",
      options: [
        { label: "Summary Large Image (Default)", value: "summary_large_image" },
        { label: "Summary", value: "summary" }
      ],
      cardId: "seo",
      width: 6
    },
    { name: "seo_twitter_image", type: "img", multiLang: false, ratio: "1200:630", label: "Twitter Image (1200×630)", toolTip: "Image file upload (jpeg, png, webp, jpg, max 10MB) for Twitter card", cardId: "seo", width: 6 },
    { name: "seo_twitter_title", type: "text", multiLang: true, label: "Twitter / X Title", cardId: "seo", width: 6 },
    { name: "seo_twitter_description", type: "textarea", multiLang: true, label: "Twitter / X Description", cardId: "seo", width: 6 },
    // Schema & FAQs
    { name: "seo_schema_markup", type: "textarea", multiLang: false, label: "Custom Schema Markup (JSON-LD)", cardId: "seo", width: 12 },
    { name: "seo_faqs", type: "faq-list", multiLang: false, label: "FAQ Items (FAQPage Schema)", cardId: "seo", width: 12 },
  ];
};
