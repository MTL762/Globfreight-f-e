
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { booleanOptions } from "@/utils/options/booleanOptions";
import { useTranslations } from "next-intl";

export const FaqInputs = () => {
  const t = useTranslations();
  const inputs: FormInput[] = [
    { name: "category_id", type: "selectPaginated", apiUrl: ["adminCategories"] },
    { name: "question", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "answer", type: "textarea", multiLang: true, cardId: 'lang', required: true },
    { name: "is_active", options: booleanOptions(t), type: "checkbox", label: "Active" },
    { name: "order", type: "number" }
  ];
  return inputs;
};

