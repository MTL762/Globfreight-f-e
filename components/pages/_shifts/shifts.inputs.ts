import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const ShiftsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "name",
        "type": "text",
        "label": "Shift Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "start_time",
        "type": "text",
        "label": "Start Time (HH:MM)",
        "required": true,
        "cardId": "general",
        "placeholder": "08:00"
    },
    {
        "name": "end_time",
        "type": "text",
        "label": "End Time (HH:MM)",
        "required": true,
        "cardId": "general",
        "placeholder": "17:00"
    },
    {
        "name": "break_duration",
        "type": "number",
        "label": "Break Duration (Minutes)",
        "cardId": "general"
    },
    {
        "name": "is_night_shift",
        "type": "checkbox",
        "label": "Night Shift",
        "cardId": "general"
    }
];
  return inputs;
};
