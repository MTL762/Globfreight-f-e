
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "pillar";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const PillarInputs = () => {
  const inputs: FormInput[] = [
    { name: "pid", type: "number" },
    { name: "pillar1", type: "text" },
    { name: "color", type: "text" },
    { name: "gradientColor", type: "text" },
    { name: "icon", type: "text" },
    { name: "pillarAr", type: "text" }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

