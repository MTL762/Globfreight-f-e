import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const SubCategoriesInputs = (): FormInput[] => {
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
    { name: "order", type: "number", cardId: "general" },
    { name: "is_active", type: "checkbox", cardId: "general" },
    { name: "image", type: "img", cardId: "general" }
  ];
};
