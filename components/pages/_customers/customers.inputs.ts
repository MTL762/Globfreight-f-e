import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const CustomersInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
        "name": "first_name",
        "type": "text",
        "label": "First Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "last_name",
        "type": "text",
        "label": "Last Name",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "email",
        "type": "email",
        "label": "Email",
        "required": true,
        "cardId": "general"
    },
    {
        "name": "phone",
        "type": "text",
        "label": "Phone",
        "cardId": "general"
    },
    {
        "name": "alt_phone",
        "type": "text",
        "label": "Alternative Phone",
        "cardId": "general"
    },
    {
        "name": "company_name",
        "type": "text",
        "label": "Company Name",
        "cardId": "business"
    },
    {
        "name": "tax_number",
        "type": "text",
        "label": "Tax Registration Number",
        "cardId": "business"
    },
    {
        "name": "country",
        "type": "text",
        "label": "Country",
        "cardId": "location"
    },
    {
        "name": "city",
        "type": "text",
        "label": "City",
        "cardId": "location"
    },
    {
        "name": "address",
        "type": "text",
        "label": "Address",
        "cardId": "location"
    },
    {
        "name": "notes",
        "type": "textarea",
        "label": "Notes",
        "cardId": "notes"
    }
];
  return inputs;
};
