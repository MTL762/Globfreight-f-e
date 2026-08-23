
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const HomeHighlightInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number", required: true },
    { name: "indId", type: "selectPaginated", apiUrl: ['indicators'], required: true },
    { name: "title", type: "text", required: true },
    { name: "category", type: "text", required: true },
    { name: "value", type: "text", required: true },
    { name: "valueLabel", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "photo", type: "img", required: true },
    { name: "chartType", type: "checkbox", required: true, options: [] },
    { name: "chartData", type: "text", required: true },
    { name: "highlight", type: "number", required: true },
    { name: "titleAr", type: "text", required: true },
    { name: "categoryAr", type: "text", required: true },
    { name: "descriptionAr", type: "textarea", required: true },
    { name: "chartDataAr", type: "textarea", required: true }
  ];
  return inputs;
};
