import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { booleanOptions } from "@/utils/options/booleanOptions";
import { useTranslations } from "next-intl";

export const ContractTypesInputs = (): FormInput[] => {
  const t = useTranslations();
  const inputs: FormInput[] = [
    {
      name: "name",
      type: "text",
      label: "Contract Type Name",
      required: true,
      cardId: "general"
    },
    {
      name: "bonus_day_off",
      type: "checkbox",
      label: "Includes Bonus Day Off",
      options: booleanOptions(t),
      cardId: "general"
    },
    {
      name: "has_attendance",
      type: "checkbox",
      label: "Attendance Tracking Enabled",
      options: booleanOptions(t),
      cardId: "general"
    },
    {
      name: "has_annual_leave",
      type: "checkbox",
      label: "Annual Leave Entitlement",
      options: booleanOptions(t),
      cardId: "general"
    }
  ];
  return inputs;
};
