import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const ContractInputs = (): FormInput[] => {
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
        "name": "contract_type_id",
        "type": "select",
        "label": "Contract Type",
        "required": true,
        "cardId": "general",
        "apiUrl": "hrContractTypes",
        "labelKey": "name"
    },
    {
        "name": "section_id",
        "type": "select",
        "label": "Section / Department",
        "required": true,
        "cardId": "general",
        "apiUrl": "hrSections",
        "labelKey": "name"
    },
    {
        "name": "phone",
        "type": "text",
        "label": "Contact Phone",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "start_at",
        "type": "date",
        "label": "Start Date",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "end_at",
        "type": "date",
        "label": "End Date",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "birth_date",
        "type": "date",
        "label": "Birth Date",
        "cardId": "details"
    },
    {
        "name": "academic_qualification",
        "type": "text",
        "label": "Academic Qualification",
        "cardId": "details"
    },
    {
        "name": "qualifications",
        "type": "text",
        "label": "Qualifications",
        "cardId": "details"
    },
    {
        "name": "experience",
        "type": "textarea",
        "label": "Work Experience",
        "cardId": "details"
    }
];
  return inputs;
};
