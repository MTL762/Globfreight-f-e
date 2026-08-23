
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const GenderInputs = () => {
  const inputs: FormInput[] = [
    { name: "geId", type: "number", required: true },
    { name: "geName", type: "text", required: true },
    { name: "geNameAr", type: "text", required: true }
  ];
  return inputs;
};
