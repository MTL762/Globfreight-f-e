
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const ColorRangeInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "text" },
    { name: "from", type: "number", required: true },
    { name: "to", type: "number", required: true },
    { name: "color", type: "color", required: true, options: [] }
  ];
  return inputs;
};
