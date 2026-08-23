
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const FaqInputs = () => {
  const inputs: FormInput[] = [
    { name: "category_id", type: "selectPaginated", apiUrl: ['/admin/categories'] },
    { name: "question", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "answer", type: "textarea", multiLang: true, cardId: 'lang', required: true },
    { name: "is_active", type: "checkbox", options: [] },
    { name: "order", type: "number" }
  ];
  return inputs;
};
