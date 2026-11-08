import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { booleanOptions } from "@/utils/options/booleanOptions";
import { useTranslations } from "next-intl";

export const ServicesInputs = (): FormInput[] => {
  const t = useTranslations();
  const inputs: FormInput[] = [
    // General Info Card
    {
      name: "parent_id",
      type: "selectPaginated",
      apiUrl: ["adminServices"],
      label: "Parent Service",
      placeholder: "Select parent service (leave empty if primary)",
      toolTip: "Optional hierarchy: select a parent service if this is a sub-service",
      cardId: "general",
      width: 6
    },
    {
      name: "icon",
      type: "text",
      label: "Icon Identifier",
      placeholder: "e.g. lucide-ship, lucide-plane, lucide-truck",
      toolTip: "Lucide icon key used to illustrate this service across public cards and menus",
      cardId: "general",
      width: 6
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
      toolTip: "Numeric priority (0 = first)",
      cardId: "general",
      min: 0,
      width: 4
    },
    {
      name: "is_active",
      options: booleanOptions(t),
      type: "radioGroup",
      label: "Active Status",
      toolTip: "Whether this service is visible to visitors",
      cardId: "general",
      width: 4
    },
    {
      name: "is_featured",
      options: booleanOptions(t),
      type: "radioGroup",
      label: "Featured on Homepage",
      toolTip: "Spotlight this service on the home page showcase",
      cardId: "general",
      width: 4
    },
    {
      name: "published_locales",
      type: "multiSelect",
      label: "Live Published Languages",
      placeholder: "Select live languages (e.g. en, ar)...",
      toolTip: "Controls which language versions are live for visitors. If empty, automatically publishes all translated languages.",
      options: [
        { label: "English (en)", value: "en" },
        { label: "العربية (ar)", value: "ar" },
        { label: "Nederlands (nl)", value: "nl" },
        { label: "Français (fr)", value: "fr" },
        { label: "Deutsch (de)", value: "de" }
      ],
      cardId: "general",
      width: 12
    },

    // Multilingual Service Content Card
    {
      name: "name",
      type: "text",
      multiLang: true,
      label: "Service Name",
      placeholder: "e.g. Ocean Freight Forwarding",
      toolTip: "Official service title per language",
      cardId: "lang",
      required: true,
      width: 6
    },
    {
      name: "slug",
      type: "text",
      multiLang: true,
      label: "URL Slug",
      placeholder: "e.g. ocean-freight-forwarding",
      toolTip: "Auto-generated from service name per language (lowercase, hyphens, unique), editable",
      cardId: "lang",
      width: 6
    },
    {
      name: "short_description",
      type: "textarea",
      multiLang: true,
      charLimit: 200,
      label: "Short Description / Summary",
      placeholder: "Brief summary used in cards, previews, and teaser banners...",
      toolTip: "Teaser overview of this service (max 200 characters recommended)",
      cardId: "lang",
      width: 12
    },
    {
      name: "description",
      type: "htmlEditor",
      multiLang: true,
      label: "Full Description & Details",
      placeholder: "Complete service presentation, specifications, logistics scope...",
      toolTip: "Rich HTML description with headers, lists, and deep service explanations",
      cardId: "lang",
      width: 12
    },
    {
      name: "features",
      type: "tag-input",
      multiLang: true,
      label: "Key Features & Highlights",
      placeholder: "Type a feature and press Enter (e.g. FCL & LCL shipping)",
      toolTip: "Key capability bullets displayed on the public service page and card lists",
      cardId: "lang",
      width: 12
    },

    // Media Card
    {
      name: "image",
      type: "img",
      multiLang: false,
      label: "Service Cover / Banner Image",
      ratio: "1200:630",
      toolTip: "High-resolution banner (JPEG, PNG, WebP max 10MB)",
      cardId: "media",
      width: 6
    },
    {
      name: "image_alt",
      type: "text",
      multiLang: true,
      label: "Image Alt Text",
      placeholder: "e.g. Ocean freight vessel carrying cargo containers",
      toolTip: "Descriptive alternative text for accessibility and search engine image ranking",
      cardId: "media",
      width: 6
    },

    // SEO Fields Card
    {
      name: "seo_meta_title",
      type: "text",
      multiLang: true,
      charLimit: 60,
      label: "Meta Title",
      placeholder: "e.g. Ocean Freight Services | GlobFreight",
      toolTip: "Search engine result title (recommended 50-60 chars)",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_meta_description",
      type: "textarea",
      multiLang: true,
      charLimit: 155,
      label: "Meta Description",
      placeholder: "e.g. Global ocean freight solutions with real-time tracking...",
      toolTip: "Search engine snippet description (recommended 140-155 chars)",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_focus_keyphrase",
      type: "text",
      multiLang: true,
      label: "Focus Keyphrase",
      placeholder: "e.g. ocean freight shipping",
      toolTip: "Targeted primary search keyword per language",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_canonical_url",
      type: "text",
      multiLang: true,
      label: "Canonical URL",
      placeholder: "https://globfreight.com/en/services/...",
      toolTip: "Self-referencing or custom canonical URL per language to prevent duplicate content penalties",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_meta_robots",
      type: "select",
      multiLang: false,
      label: "Meta Robots Directives",
      toolTip: "Search engine crawling and indexation directives",
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
      label: "Keywords (Comma-separated)",
      placeholder: "ocean freight, sea cargo, container shipping, logistics",
      toolTip: "Optional comma-separated keywords",
      cardId: "seo",
      width: 6
    },
    // Open Graph
    {
      name: "seo_og_title",
      type: "text",
      multiLang: true,
      label: "Open Graph Title",
      placeholder: "Title for social media shares (Facebook, LinkedIn)",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_og_description",
      type: "textarea",
      multiLang: true,
      label: "Open Graph Description",
      placeholder: "Description for social media shares",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_og_image",
      type: "img",
      multiLang: false,
      ratio: "1200:630",
      label: "Open Graph Image (1200×630)",
      toolTip: "Social sharing preview banner",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_og_image_alt",
      type: "text",
      multiLang: true,
      label: "Open Graph Image Alt Text",
      cardId: "seo",
      width: 6
    },
    // Twitter Card
    {
      name: "seo_twitter_card",
      type: "select",
      multiLang: false,
      label: "Twitter Card Type",
      defaultValue: "summary_large_image",
      options: [
        { label: "Summary with Large Image (Recommended)", value: "summary_large_image" },
        { label: "Summary Standard", value: "summary" }
      ],
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_twitter_image",
      type: "img",
      multiLang: false,
      ratio: "1200:630",
      label: "Twitter Image (1200×630)",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_twitter_title",
      type: "text",
      multiLang: true,
      label: "Twitter / X Title",
      cardId: "seo",
      width: 6
    },
    {
      name: "seo_twitter_description",
      type: "textarea",
      multiLang: true,
      label: "Twitter / X Description",
      cardId: "seo",
      width: 6
    },

    // Schema Markup & FAQ Structured Data Card
    {
      name: "seo_schema_markup_type",
      type: "select",
      multiLang: false,
      label: "Schema Markup Type",
      toolTip: "Structured data JSON-LD schema entity type",
      defaultValue: "Service",
      options: [
        { label: "Service", value: "Service" },
        { label: "WebPage", value: "WebPage" },
        { label: "FAQPage", value: "FAQPage" },
        { label: "Article", value: "Article" }
      ],
      cardId: "schema",
      width: 12
    },
    {
      name: "seo_schema_markup",
      type: "textarea",
      multiLang: false,
      label: "Custom Schema Markup (JSON-LD)",
      placeholder: '{\n  "@context": "https://schema.org",\n  "@type": "Service"\n}',
      toolTip: "Custom JSON-LD structured data script",
      cardId: "schema",
      width: 12
    },
    {
      name: "seo_faq_ids",
      type: "faq-select",
      multiLang: false,
      label: "Frequently Asked Questions (FAQ Selection)",
      toolTip: "Select existing FAQs from the FAQ module by ID (faq_ids). Questions & answers are automatically translated per language.",
      cardId: "schema",
      width: 12
    }
  ];

  return inputs;
};
