import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const ExpensesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "title",
        "type": "text",
        "label": "Expense Title",
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
        "name": "category",
        "type": "text",
        "label": "Category",
        "cardId": "general"
    },
    {
        "name": "expense_date",
        "type": "date",
        "label": "Expense Date",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "receipt",
        "type": "img",
        "label": "Receipt / Attachment",
        "cardId": "general"
    },
    {
        "name": "description",
        "type": "textarea",
        "label": "Description",
        "cardId": "general"
    }
];
  return inputs;
};
