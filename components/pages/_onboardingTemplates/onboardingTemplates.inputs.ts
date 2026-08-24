import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const OnboardingTemplatesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Template Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "department_id",
        "type": "select",
        "label": "Section / Department",
        "cardId": "general",
        "apiUrl": "hrSections",
        "labelKey": "name"
    },
    {
        "name": "description",
        "type": "textarea",
        "label": "Description & Instructions",
        "cardId": "general"
    }
];
  return inputs;
};
