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
      cardId: "general"
    },
    { name: "name", type: "text", multiLang: true, cardId: "lang", required: true },
    { name: "description", type: "text", multiLang: true, cardId: "lang" },
    { name: "slug", type: "text", label: "Slug", placeholder: "e.g. artificial-intelligence", cardId: "general" },
    { name: "order", type: "number", cardId: "general" },
    { name: "is_active", options: booleanOptions(t), type: "checkbox", label: "Active", cardId: "general" },
    { name: "image", type: "img", cardId: "general" },
    // SEO Fields
    { name: "seo_meta_title", type: "text", multiLang: true, label: "Meta Title", cardId: "seo" },
    { name: "seo_meta_description", type: "textarea", multiLang: true, label: "Meta Description", cardId: "seo" },
  ];
};

