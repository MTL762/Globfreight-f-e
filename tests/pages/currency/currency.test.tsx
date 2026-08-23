
import { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "currency";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const CurrencyInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "countryName", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "image", type: "file" }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

