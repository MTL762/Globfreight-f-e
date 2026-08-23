import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const BlogInputs = (): FormInput[] => {
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
      type: "checkbox",
      label: "Featured Article",
      cardId: "general"
    },
    {
      name: "image",
      type: "img",
      label: "Featured Image",
      cardId: "general"
    },
    {
      name: "tags",
      type: "text",
      label: "Tags (comma separated)",
      placeholder: "AI, Logistics, Shipping",
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
    }
  ];

  return inputs;
};
