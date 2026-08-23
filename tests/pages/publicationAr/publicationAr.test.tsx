
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { AutoCrudTest } from "@/tests/helpers/AutoCrudTest";

import { test } from "@playwright/test";
const pageName = "publicationAr";
test(pageName, async ({ page }) => {
  const addLink = "http://localhost:3000/ar/"+pageName+"/create";
  const viewLink = "http://localhost:3000/ar/"+pageName;
// export const PublicationArInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "text" },
    { name: "pubName", type: "text" },
    { name: "pubContent", type: "text" },
    { name: "pubWriter", type: "text" },
    { name: "pubPhoto", type: "img" },
    { name: "pubThum", type: "text" },
    { name: "pubDate", type: "date" },
    { name: "pubYear", type: "year" },
    { name: "pubFile", type: "file" },
    { name: "pubPublisher", type: "text" },
    { name: "pubType", type: "checkbox", options: [] }
  ];
//   return inputs;
// };


await AutoCrudTest(page, addLink, viewLink, inputs,inputs[0].name);
});

