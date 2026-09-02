import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const RolesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
      name: "name",
      type: "text",
      label: "Role Name",
      placeholder: "e.g. Senior Editor, Branch Manager, Finance Officer",
      required: true,
      cardId: "general",
      width: 12
    }
  ];
  return inputs;
};
