
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const InfoGraphicImgArInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number" },
    { name: "imgName", type: "text", required: true },
    { name: "infoCode", type: "text", required: true },
    { name: "imgNameAr", type: "img", required: true }
  ];
  return inputs;
};
