
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "shifts";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const ShiftsInputs = () => {
  const inputs: FormInput[] = [
    { name: "contract_type_id", type: "selectPaginated", required: true },
    { name: "day", type: "checkbox", required: true, options: [] },
    { name: "from", type: "time", required: true },
    { name: "to", type: "time", required: true },
    { name: "rest", type: "checkbox", required: true, options: [] },
    { name: "is_week_end", type: "checkbox", required: true, options: [] }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

