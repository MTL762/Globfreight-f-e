
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const PillarInputs = () => {
  const inputs: FormInput[] = [
    { name: "pid", type: "number" },
    { name: "pillar1", type: "text" },
    { name: "color", type: "text" },
    { name: "gradientColor", type: "text" },
    { name: "icon", type: "text" },
    { name: "pillarAr", type: "text" }
  ];
  return inputs;
};
