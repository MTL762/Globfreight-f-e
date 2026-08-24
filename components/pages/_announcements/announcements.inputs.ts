import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const AnnouncementsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "title",
        "type": "text",
        "label": "Title",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "priority",
        "type": "select",
        "label": "Priority",
        "required": true,
        "cardId": "general",
        "options": [
            {
                "label": "Low",
                "value": "low"
            },
            {
                "label": "Medium",
                "value": "medium"
            },
            {
                "label": "High",
                "value": "high"
            },
            {
                "label": "Urgent",
                "value": "urgent"
            }
        ]
    },
    {
        "name": "is_published",
        "type": "checkbox",
        "label": "Is Published",
        "cardId": "general"
    },
    {
        "name": "published_at",
        "type": "date",
        "label": "Published Date",
        "cardId": "general"
    },
    {
        "name": "expires_at",
        "type": "date",
        "label": "Expires Date",
        "cardId": "general"
    },
    {
        "name": "content",
        "type": "textarea",
        "label": "Content",
        "required": true,
        "cardId": "general"
    }
];
  return inputs;
};
