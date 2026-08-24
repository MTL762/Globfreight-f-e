import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const RolesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Role Name",
        "required": true,
        "cardId": "general"
    }
];
  return inputs;
};
