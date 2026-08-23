
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "coupons";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/" + pageName + "/create";
  const viewLink = "http://localhost:3000/ar/" + pageName;
  // export const CouponsInputs = () => {
  const inputs: FormInput[] = [
    { name: "title", type: "text", multiLang: true, cardId: 'lang', required: true },
    { name: "code", type: "text", required: true },
    { name: "type", type: "radioGroup", required: true, options: [] },
    { name: "discountType", type: "radioGroup", required: true, options: [] },
    { name: "discountValue", type: "number", required: true },
    { name: "maxUsage", type: "number", required: true },
    { name: "startDate", type: "date", required: true },
    { name: "endDate", type: "date", required: true },
    { name: "minDiscountValue", type: "number", required: true },
    { name: "maxDiscountValue", type: "number", required: true },
    { name: "userIds", type: "selectPaginated", isMulti: true },
    { name: "storeIds", type: "selectPaginated", isMulti: true },
    { name: "moduleIds", type: "selectPaginated", isMulti: true }
  ];
  //   return inputs;
  // };


  await AutoCrudTest(page, addLink, viewLink, inputs, inputs[0].name);
});

