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
      width: 6,
    },
    {
      name: "sub_category_id",
      type: "selectPaginated",
      apiUrl: ["adminSubCategories"],
      label: "Sub Category",
      toolTip: t("BlogTooltips.sub_category_id"),
      cardId: "general",
      width: 6,
    },
    {
      name: "is_featured",
      type: "radioGroup",
      label: "Featured Article",
      toolTip: t("BlogTooltips.is_featured"),
      options: booleanOptions(t),
      cardId: "general",
      defaultValue: "false",
      width: 6,
    },
    {
      name: "status",
      type: "select",
      label: "Lifecycle Status",
      toolTip: "Controls overall lifecycle: published, draft, or archived",
      defaultValue: "published",
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" },
        { label: "Archived", value: "archived" }
      ],
      required: true,
      cardId: "general",
      width: 6,
    },
    {
      name: "published_locales",
      type: "multiSelect",
      label: "Live Published Languages",
      placeholder: "Select live languages (e.g. en, ar)...",
      toolTip: "Controls which language versions are live for visitors. If omitted or empty on publish, auto-publishes all translated languages.",
      options: [
        { label: "English (en)", value: "en" },
        { label: "العربية (ar)", value: "ar" },
        { label: "Nederlands (nl)", value: "nl" },
        { label: "Français (fr)", value: "fr" },
        { label: "Deutsch (de)", value: "de" }
      ],
      cardId: "general",
      width: 6,
    },
    {
      name: "image",
      type: "img",
      multiLang: true,
      ratio: "1200:630",
      label: "Featured Image (1200×630)",
      toolTip: "Recommended resolution: 1200×630 (social sharing & rich snippets)",
      cardId: "lang",
      width: 6
    },
    {
      name: "image_alt",
      type: "text",
      multiLang: true,
      label: "Featured Image Alt Text",
      placeholder: "e.g. Cargo shipping airplane loading pallets",
      toolTip: "Descriptive alt text for the featured image (accessibility and image SEO)",
      cardId: "lang",
      width: 6
    },
    {
      name: "title",
      type: "text",
      multiLang: true,
      label: "Article Title (H1)",
      toolTip: t("BlogTooltips.title"),
      cardId: "lang",
      required: true,
      width: 6
    },
    {
      name: "slug",
      type: "text",
      multiLang: true,
      label: "Slug",
      placeholder: "e.g. logistics-trends-2026",
      toolTip: "Auto-generated from title per language (lowercase, hyphens, unique), editable",
      cardId: "lang",
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
      type: "html",
      multiLang: true,
      label: "Full Article Content",
      toolTip: "HTML code box with live preview, syntax formatting, and tag helpers",
      cardId: "lang",
      required: true,
      width: 12
    },
    // SEO Fields
    {
      name: "seo_meta_title",
      type: "text",
      multiLang: true,
      charLimit: 60,
      label: "Meta Title",
      toolTip: "Page title for search engines (<title>) - max 60 characters",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_meta_description",
      type: "textarea",
      multiLang: true,
      charLimit: 155,
      label: "Meta Description",
      toolTip: "Page meta description for search engine snippets - max 155 characters",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_focus_keyphrase",
      type: "text",
      multiLang: true,
      label: "Focus Keyphrase",
      placeholder: "e.g. air freight shipping",
      toolTip: "Primary targeted SEO focus keyword per language",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_canonical_url",
      type: "text",
      multiLang: false,
      label: "Canonical URL",
      placeholder: "https://globfreight.com/blog/...",
      toolTip: "Canonical URL to prevent duplicate content (max 500 characters)",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_meta_robots",
      type: "select",
      multiLang: false,
      label: "Meta Robots Directives",
      toolTip: "Search engine indexing and crawling directives",
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
    {
      name: "seo_keywords",
      type: "text",
      multiLang: false,
      label: "Keywords",
      placeholder: "air freight, cargo, shipping, logistics",
      toolTip: "Comma-separated list of keywords for search engines",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_schema_markup_type",
      type: "select",
      multiLang: false,
      label: "Schema Markup Type",
      toolTip: "Structured data schema type name (JSON-LD)",
      defaultValue: "Article",
      options: [
        { label: "Article", value: "Article" },
        { label: "BlogPosting", value: "BlogPosting" },
        { label: "Service", value: "Service" },
        { label: "FAQPage", value: "FAQPage" },
        { label: "WebPage", value: "WebPage" }
      ],
      cardId: "seo",
      width: 6
    },
    {
      name: "tags",
      type: "tag-input",
      multiLang: true,
      label: "Article Topic Tags",
      placeholder: "e.g. AI, Logistics, Shipping",
      toolTip: "Separate tags targeted per language",
      cardId: "seo",
      width: 6
    },
    // Open Graph (Social Sharing)
    {
      name: "seo_og_title",
      type: "text",
      multiLang: true,
      label: "Open Graph Title",
      placeholder: "Social media title (Facebook, LinkedIn, WhatsApp)",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_og_description",
      type: "textarea",
      multiLang: true,
      label: "Open Graph Description",
      placeholder: "Social media snippet preview description",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_og_image",
      type: "text",
      multiLang: false,
      ratio: "1200:630",
      label: "Open Graph Image (1200×630)",
      toolTip: "Dedicated social share banner URL (recommended: 1200×630)",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_og_image_alt",
      type: "text",
      multiLang: true,
      label: "Open Graph Image Alt Text",
      placeholder: "Descriptive alt text for Open Graph social image",
      cardId: "seo",
      width: 6
    },
    // Twitter / X Cards
    {
      name: "seo_twitter_card",
      type: "select",
      multiLang: false,
      label: "Twitter / X Card Type",
      defaultValue: "summary_large_image",
      options: [
        { label: "Summary Large Image (Default)", value: "summary_large_image" },
        { label: "Summary", value: "summary" }
      ],
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_twitter_image",
      type: "text",
      multiLang: false,
      ratio: "1200:630",
      label: "Twitter / X Image (1200×630)",
      toolTip: "Dedicated Twitter / X image URL",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_twitter_title",
      type: "text",
      multiLang: true,
      label: "Twitter / X Card Title",
      placeholder: "Title for Twitter card",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_twitter_description",
      type: "textarea",
      multiLang: true,
      label: "Twitter / X Card Description",
      placeholder: "Description for Twitter card",
      cardId: "seo",
      width: 6
    },
    // Custom JSON-LD & FAQ Schema
    {
      name: "seo_schema_markup",
      type: "textarea",
      multiLang: false,
      label: "Custom Schema Markup (JSON-LD)",
      placeholder: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"Article\"\n}",
      toolTip: "Custom JSON-LD structured data script",
      cardId: "seo",
      width: 12
    },
    {
      name: "seo_faqs",
      type: "faq-list",
      multiLang: false,
      label: "FAQ Items (Auto FAQPage Schema)",
      toolTip: "List of FAQs for generating Google FAQ rich snippet schema",
      cardId: "seo",
      width: 12
    }
  ];

  return inputs;
};
