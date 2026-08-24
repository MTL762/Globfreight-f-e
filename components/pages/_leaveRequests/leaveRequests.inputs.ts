import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const LeaveRequestsInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "leave_type_id",
        "type": "select",
        "label": "Leave Type",
        "required": true,
        "cardId": "general",
        "apiUrl": "hrLeaveTypes",
        "labelKey": "name"
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
        "name": "attachment",
        "type": "img",
        "label": "Medical / Supporting Document",
        "cardId": "general"
    },
    {
        "name": "reason",
        "type": "textarea",
        "label": "Reason for Leave",
        "required": true,
        "cardId": "general"
    }
];
  return inputs;
};
