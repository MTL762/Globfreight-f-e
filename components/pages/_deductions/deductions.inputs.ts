import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const DeductionsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Deduction Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "amount",
        "type": "number",
        "label": "Amount",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "type",
        "type": "select",
        "label": "Deduction Type",
        "required": true,
        "cardId": "general",
        "options": [
            {
                "label": "Fixed Amount",
                "value": "fixed"
            },
            {
                "label": "Percentage",
                "value": "percentage"
            }
        ]
    },
    {
        "name": "date",
        "type": "date",
        "label": "Effective Date",
        "cardId": "general"
    },
    {
        "name": "reason",
        "type": "textarea",
        "label": "Reason & Justification",
        "cardId": "general"
    }
];
  return inputs;
};
