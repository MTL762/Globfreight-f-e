
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "deductions";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const DeductionsInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", required: true },
    { name: "is_basic", type: "checkbox", required: true, options: [] },
    { name: "is_paid", type: "checkbox", required: true, options: [] }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

