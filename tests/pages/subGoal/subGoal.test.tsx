
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "subGoal";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const SubGoalInputs = () => {
  const inputs: FormInput[] = [
    { name: "sgid", type: "number", required: true },
    { name: "goId", type: "number", required: true },
    { name: "subGoal1", type: "text", required: true },
    { name: "subGoalAr", type: "text", required: true }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

