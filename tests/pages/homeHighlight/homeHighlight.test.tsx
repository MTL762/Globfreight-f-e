
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "homeHighlight";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const HomeHighlightInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number", required: true },
    { name: "indId", type: "selectPaginated", required: true },
    { name: "title", type: "text", required: true },
    { name: "category", type: "text", required: true },
    { name: "value", type: "text", required: true },
    { name: "valueLabel", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "photo", type: "img", required: true },
    { name: "chartType", type: "checkbox", required: true, options: [] },
    { name: "chartData", type: "text", required: true },
    { name: "highlight", type: "number", required: true },
    { name: "titleAr", type: "text", required: true },
    { name: "categoryAr", type: "text", required: true },
    { name: "descriptionAr", type: "textarea", required: true },
    { name: "chartDataAr", type: "textarea", required: true }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

