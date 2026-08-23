
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const SubGoalInputs = () => {
  const inputs: FormInput[] = [
    { name: "sgid", type: "number", required: true },
    { name: "goId", type: "number", required: true },
    { name: "subGoal1", type: "text", required: true },
    { name: "subGoalAr", type: "text", required: true }
  ];
  return inputs;
};
