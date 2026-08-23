
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "contractTypes";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const ContractTypesInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", required: true },
    { name: "bonus_day_off", type: "checkbox", required: true, options: [] },
    { name: "has_attendance", type: "checkbox", required: true, options: [] }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

