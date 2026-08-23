
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "faq";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const FaqInputs = () => {
  const inputs: FormInput[] = [
    { name: "category_id", type: "selectPaginated" },
    { name: "question", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "answer", type: "textarea", multiLang: true, cardId: 'lang', required: true },
    { name: "is_active", type: "checkbox", options: [] },
    { name: "order", type: "number" }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

