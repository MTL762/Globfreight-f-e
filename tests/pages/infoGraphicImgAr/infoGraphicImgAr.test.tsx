
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "infoGraphicImgAr";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const InfoGraphicImgArInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number" },
    { name: "imgName", type: "text", required: true },
    { name: "infoCode", type: "text", required: true },
    { name: "imgNameAr", type: "img", required: true }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

