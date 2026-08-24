import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const PerformanceReviewsInputs = (): FormInput[] => {
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
        "name": "reviewer_id",
        "type": "select",
        "label": "Reviewer / Manager",
        "required": true,
        "cardId": "general",
        "apiUrl": "adminUsers",
        "labelKey": "name"
    },
    {
        "name": "review_period",
        "type": "text",
        "label": "Review Period (e.g. Q1 2026, Annual)",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "rating",
        "type": "number",
        "label": "Overall Rating (1 - 5)",
        "cardId": "general"
    },
    {
        "name": "feedback",
        "type": "textarea",
        "label": "Manager Feedback",
        "cardId": "evaluation"
    },
    {
        "name": "goals",
        "type": "textarea",
        "label": "Key Goals & Objectives",
        "cardId": "evaluation"
    }
];
  return inputs;
};
