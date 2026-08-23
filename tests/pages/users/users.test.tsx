import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "users";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/" + pageName + "/create";
  const viewLink = "http://localhost:3000/ar/" + pageName;
  // export const UsersInputs = () => {
  const inputs: FormInput[] = [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "address", type: "textarea" },
    {
      name: "roleID",
      type: "selectPaginated",
      required: true,
      apiUrl: ["roles"],
      onLabelAction: (data: any) => {
        console.log(data, "213213");
        return data.roles;
      }
    }
  ];
  //   return inputs;
  // };

  await AutoCrudTest(page, addLink, viewLink, inputs, inputs[0].name);
});
