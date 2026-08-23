import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const UsersInputs = (isEdit = false): FormInput[] => {
  const inputs: FormInput[] = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "e.g. John Doe",
      required: true,
      cardId: "general"
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "user@globfreight.com",
      required: true,
      cardId: "general"
    },
    {
      name: "role_id",
      type: "selectPaginated",
      apiUrl: ["roles"],
      label: "Role & Permission Level",
      required: true,
      cardId: "general"
    },
    {
      name: "password",
      type: "password",
      label: isEdit ? "New Password (leave empty to keep current)" : "Password",
      placeholder: "••••••••",
      required: !isEdit,
      cardId: "security"
    },
    {
      name: "password_confirmation",
      type: "password",
      label: isEdit ? "Confirm New Password" : "Confirm Password",
      placeholder: "••••••••",
      required: !isEdit,
      cardId: "security"
    },
    {
      name: "avatar",
      type: "img",
      label: "Profile Avatar",
      cardId: "security"
    }
  ];

  return inputs;
};
