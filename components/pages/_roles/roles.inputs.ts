import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const RolesInputs = (): FormInput[] => {
  const inputs: FormInput[] = [
    {
      name: "name",
      type: "text",
      label: "Role Name",
      placeholder: "e.g. Editor",
      required: true,
      cardId: "general"
    },
    {
      name: "permission_ids",
      type: "selectPaginated",
      apiUrl: ["rolesPermissions"],
      label: "Permissions",
      placeholder: "Select permissions",
      isMulti: true,
      idKey: "id",
      labelKey: "name",
      required: true,
      cardId: "general"
    }
  ];
  return inputs;
};

