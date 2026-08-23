
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "colorRange";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const ColorRangeInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "text" },
    { name: "from", type: "number", required: true },
    { name: "to", type: "number", required: true },
    { name: "color", type: "color", required: true, options: [] }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

