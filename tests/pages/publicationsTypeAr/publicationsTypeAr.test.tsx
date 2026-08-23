
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "publicationsTypeAr";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const PublicationsTypeArInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number", required: true },
    { name: "pubType", type: "text", required: true },
    { name: "pubTypeAr", type: "text", required: true }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

