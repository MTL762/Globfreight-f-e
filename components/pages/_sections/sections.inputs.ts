import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const SectionsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Section / Department Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "manager_id",
        "type": "select",
        "label": "Department Manager",
        "cardId": "general",
        "apiUrl": ["adminUsers"],
        "labelKey": "name"
    },
    {
        "name": "parent_id",
        "type": "select",
        "label": "Parent Department (Optional)",
        "cardId": "general",
        "apiUrl": ["hrSections"],
        "labelKey": "name"
    }
];
  return inputs;
};
