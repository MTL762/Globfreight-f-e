
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "stores";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/" + pageName + "/create";
  const viewLink = "http://localhost:3000/ar/" + pageName;
  // export const StoresInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "moduleId", type: "selectPaginated", },
    { name: "logo", type: "img", required: true },
    { name: "cover", type: "img", required: true },
    { name: "lat", type: "text" },
    { name: "lng", type: "text" },
    { name: "address", type: "text", required: true },
    { name: "UserName", type: "text", required: true },
    { name: "userEmail", type: "email", required: true },
    { name: "userPhone", type: "tel", required: true },
    { name: "userPass", type: "password" }
  ];
  //   return inputs;
  // };


  await AutoCrudTest(page, addLink, viewLink, inputs, inputs[0].name);
});

