
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const ResidenceInputs = () => {
  const inputs: FormInput[] = [
    { name: "resName", type: "text", required: true },
    { name: "rid", type: "number", required: true },
    { name: "resNameAr", type: "text", required: true }
  ];
  return inputs;
};
