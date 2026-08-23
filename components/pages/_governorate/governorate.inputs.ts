
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const GovernorateInputs = () => {
  const inputs: FormInput[] = [
    { name: "goId", type: "number", required: true },
    { name: "goal1", type: "text", required: true },
    { name: "goalAr", type: "text", required: true },
    { name: "gid", type: "number", required: true },
    { name: "governorate1", type: "text", required: true },
    { name: "governorateAr", type: "text", required: true }
  ];
  return inputs;
};
