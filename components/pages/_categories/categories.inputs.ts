
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const CategoriesInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "description", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "order", type: "number" },
    { name: "image", type: "img", required: true }
  ];
  return inputs;
};
