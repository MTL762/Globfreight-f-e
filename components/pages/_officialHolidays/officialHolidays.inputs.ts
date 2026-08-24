import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const OfficialHolidaysInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Holiday Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "start_date",
        "type": "date",
        "label": "Start Date",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "end_date",
        "type": "date",
        "label": "End Date",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "description",
        "type": "textarea",
        "label": "Description / Notes",
        "cardId": "general"
    }
];
  return inputs;
};
