import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const SalariesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "user_id",
        "type": "select",
        "label": "Employee",
        "required": true,
        "cardId": "general",
        "apiUrl": ["adminUsers"],
        "labelKey": "name"
    },
    {
        "name": "basic_salary",
        "type": "number",
        "label": "Basic Salary",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "allowances",
        "type": "number",
        "label": "Allowances / Benefits",
        "cardId": "general"
    },
    {
        "name": "deductions",
        "type": "number",
        "label": "Monthly Deductions",
        "cardId": "general"
    },
    {
        "name": "effective_date",
        "type": "date",
        "label": "Effective Date",
        "cardId": "general"
    },
    {
        "name": "payment_method",
        "type": "select",
        "label": "Payment Method",
        "cardId": "general",
        "options": [
            {
                "label": "Bank Transfer",
                "value": "bank"
            },
            {
                "label": "Cash",
                "value": "cash"
            },
            {
                "label": "Cheque",
                "value": "cheque"
            }
        ]
    },
    {
        "name": "notes",
        "type": "textarea",
        "label": "Notes",
        "cardId": "general"
    }
];
  return inputs;
};
