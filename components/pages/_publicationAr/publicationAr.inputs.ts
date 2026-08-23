
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const PublicationArInputs = () => {
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
  return inputs;
};
