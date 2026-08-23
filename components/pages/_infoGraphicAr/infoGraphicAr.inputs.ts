
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const InfoGraphicArInputs = () => {
  const inputs: FormInput[] = [
    { name: "id", type: "number", required: true },
    { name: "infoTitle", type: "text", required: true },
    { name: "infoDesc", type: "textarea", required: true },
    { name: "infoDate", type: "date", required: true },
    { name: "infoImg", type: "img", required: true },
    { name: "infoProCode", type: "number" },
    { name: "infoOwner", type: "text", required: true },
    { name: "infoTitleAr", type: "text", required: true },
    { name: "infoImgAr", type: "img" },
    { name: "infoOwnerAr", type: "text", required: true }
  ];
  return inputs;
};
