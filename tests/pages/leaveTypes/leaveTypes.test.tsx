
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "leaveTypes";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const LeaveTypesInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", required: true },
    { name: "contract_type_id", type: "selectPaginated", required: true },
    { name: "description", type: "textarea", width: 6 }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

