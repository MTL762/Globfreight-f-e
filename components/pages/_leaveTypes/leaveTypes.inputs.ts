import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const LeaveTypesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Leave Type Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "days_per_year",
        "type": "number",
        "label": "Allowed Days Per Year",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "is_paid",
        "type": "checkbox",
        "label": "Paid Leave",
        "cardId": "general"
    },
    {
        "name": "requires_approval",
        "type": "checkbox",
        "label": "Requires Manager Approval",
        "cardId": "general"
    },
    {
        "name": "description",
        "type": "textarea",
        "label": "Description & Policy",
        "cardId": "general"
    }
];
  return inputs;
};
