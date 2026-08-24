import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const EmployeeDocumentsInputs = (): FormInput[] => {
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
        "name": "title",
        "type": "text",
        "label": "Document Title",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "type",
        "type": "select",
        "label": "Document Type",
        "cardId": "general",
        "options": [
            {
                "label": "National ID / Passport",
                "value": "id"
            },
            {
                "label": "Contract Copy",
                "value": "contract"
            },
            {
                "label": "Certificate",
                "value": "certificate"
            },
            {
                "label": "Other",
                "value": "other"
            }
        ]
    },
    {
        "name": "expiry_date",
        "type": "date",
        "label": "Expiry Date",
        "cardId": "general"
    },
    {
        "name": "file",
        "type": "img",
        "label": "Document File / Scan",
        "cardId": "general"
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
