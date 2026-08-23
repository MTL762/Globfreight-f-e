
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "partnersAr";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const PartnersArInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number" },
    { name: "date", type: "date" },
    { name: "title", type: "text", required: true },
    { name: "num", type: "text", required: true },
    { name: "description", type: "text" },
    { name: "source", type: "text" },
    { name: "image", type: "img" },
    { name: "highlight", type: "number" },
    { name: "titleAr", type: "text" },
    { name: "descriptionAr", type: "text" },
    { name: "numAr", type: "text" },
    { name: "sourceAr", type: "text" },
    { name: "imageAr", type: "text" },
    { name: "id", type: "number" },
    { name: "title", type: "text", required: true },
    { name: "pic", type: "text", required: true },
    { name: "link", type: "text", required: true },
    { name: "titleAr", type: "text", required: true }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

