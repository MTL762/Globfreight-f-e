import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const TrainingProgramsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "title",
        "type": "text",
        "label": "Program Title",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "trainer",
        "type": "text",
        "label": "Trainer / Instructor",
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
        "name": "location",
        "type": "text",
        "label": "Location / Platform",
        "cardId": "general"
    },
    {
        "name": "capacity",
        "type": "number",
        "label": "Max Seats / Capacity",
        "cardId": "general"
    },
    {
        "name": "description",
        "type": "textarea",
        "label": "Program Outline & Description",
        "cardId": "general"
    }
];
  return inputs;
};
