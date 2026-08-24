import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const AssetsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Asset Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "code",
        "type": "text",
        "label": "Asset Code",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "type",
        "type": "text",
        "label": "Asset Type",
        "cardId": "general"
    },
    {
        "name": "serial_number",
        "type": "text",
        "label": "Serial Number",
        "cardId": "general"
    },
    {
        "name": "purchase_date",
        "type": "date",
        "label": "Purchase Date",
        "cardId": "general"
    },
    {
        "name": "purchase_cost",
        "type": "number",
        "label": "Purchase Cost",
        "cardId": "general"
    },
    {
        "name": "status",
        "type": "select",
        "label": "Status",
        "cardId": "general",
        "options": [
            {
                "label": "Available",
                "value": "available"
            },
            {
                "label": "In Use",
                "value": "in_use"
            },
            {
                "label": "Under Maintenance",
                "value": "maintenance"
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
