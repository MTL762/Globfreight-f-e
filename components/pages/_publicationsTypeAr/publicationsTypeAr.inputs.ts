
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const PublicationsTypeArInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number", required: true },
    { name: "pubType", type: "text", required: true },
    { name: "pubTypeAr", type: "text", required: true }
  ];
  return inputs;
};
