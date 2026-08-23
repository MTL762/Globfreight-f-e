
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "contract";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const ContractInputs = () => {
  const inputs: FormInput[] = [
    { name: "user_id", type: "selectPaginated", required: true },
    { name: "contract_type_id", type: "selectPaginated", required: true, options: [] },
    { name: "section_id", type: "selectPaginated", required: true },
    { name: "branch_id", type: "selectPaginated", required: true },
    { name: "currency_id", type: "selectPaginated", required: true, options: [] },
    { name: "phone", type: "tel" },
    { name: "start_at", type: "date" },
    { name: "end_at", type: "text", required: true },
    { name: "birth_date", type: "date", required: true },
    { name: "academic_qualification", type: "textarea" },
    { name: "qualifications", type: "text" },
    { name: "experience", type: "text" },
    { name: "id_number", type: "text" },
    { name: "marital_status", type: "text" },
    { name: "military_status", type: "text" },
    { name: "file", type: "file" }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

