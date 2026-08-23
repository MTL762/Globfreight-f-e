
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const AreasInputs = () => {
  const inputs: FormInput[] = [
    { name: "aid", type: "text" },
    { name: "areaName", type: "text", required: true },
    { name: "areaNameAr", type: "text", required: true }
  ];
  return inputs;
};
