import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const ContractTypesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Contract Type Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "bonus_day_off",
        "type": "checkbox",
        "label": "Includes Bonus Day Off",
        "cardId": "general"
    },
    {
        "name": "has_attendance",
        "type": "checkbox",
        "label": "Attendance Tracking Enabled",
        "cardId": "general"
    },
    {
        "name": "has_annual_leave",
        "type": "checkbox",
        "label": "Annual Leave Entitlement",
        "cardId": "general"
    }
];
  return inputs;
};
