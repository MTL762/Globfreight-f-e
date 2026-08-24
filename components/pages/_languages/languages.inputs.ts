import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const LanguagesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Language Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "code",
        "type": "text",
        "label": "Locale Code (e.g. en, ar, fr)",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "direction",
        "type": "select",
        "label": "Direction",
        "cardId": "general",
        "options": [
            {
                "label": "Left to Right (LTR)",
                "value": "ltr"
            },
            {
                "label": "Right to Left (RTL)",
                "value": "rtl"
            }
        ]
    },
    {
        "name": "is_default",
        "type": "checkbox",
        "label": "Is Default Language",
        "cardId": "general"
    }
];
  return inputs;
};
