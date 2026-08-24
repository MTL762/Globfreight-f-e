import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const ProfileInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "e.g. Super Admin",
      required: true,
      cardId: "general"
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "admin@globfreight.com",
      required: true,
      cardId: "general"
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
      placeholder: "+971 50 123 4567",
      cardId: "general"
    },
    {
      name: "avatar",
      type: "img",
      label: "Profile Picture",
      cardId: "avatar"
    }
  ];

  return inputs;
};
