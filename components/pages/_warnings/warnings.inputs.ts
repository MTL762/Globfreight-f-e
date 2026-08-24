import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const WarningsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "user_id",
        "type": "select",
        "label": "Employee",
        "required": true,
        "cardId": "general",
        "apiUrl": "adminUsers",
        "labelKey": "name"
    },
    {
        "name": "type",
        "type": "select",
        "label": "Warning Severity",
        "required": true,
        "cardId": "general",
        "options": [
            {
                "label": "Verbal Warning",
                "value": "verbal"
            },
            {
                "label": "First Written Warning",
                "value": "first_written"
            },
            {
                "label": "Second Written Warning",
                "value": "second_written"
            },
            {
                "label": "Final Warning",
                "value": "final"
            }
        ]
    },
    {
        "name": "warning_date",
        "type": "date",
        "label": "Date Issued",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "reason",
        "type": "textarea",
        "label": "Violation Reason",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "action_taken",
        "type": "textarea",
        "label": "Corrective Action Taken",
        "cardId": "general"
    }
];
  return inputs;
};
