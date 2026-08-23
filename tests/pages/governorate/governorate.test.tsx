
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "governorate";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const GovernorateInputs = () => {
  const inputs: FormInput[] = [
    { name: "goId", type: "number", required: true },
    { name: "goal1", type: "text", required: true },
    { name: "goalAr", type: "text", required: true },
    { name: "gid", type: "number", required: true },
    { name: "governorate1", type: "text", required: true },
    { name: "governorateAr", type: "text", required: true }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

