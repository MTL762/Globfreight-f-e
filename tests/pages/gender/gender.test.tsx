
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "gender";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const GenderInputs = () => {
  const inputs: FormInput[] = [
    { name: "geId", type: "number", required: true },
    { name: "geName", type: "text", required: true },
    { name: "geNameAr", type: "text", required: true }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

