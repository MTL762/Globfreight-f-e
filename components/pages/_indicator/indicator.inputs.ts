
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const IndicatorInputs = () => {
  const inputs: FormInput[] = [
    { name: "indicatorId", type: "number", required: true },
    { name: "indicatorName", type: "text", required: true },
    { name: "indicatorDef", type: "text", required: true },
    { name: "scientificMeaning", type: "text", required: true },
    { name: "calculationWay", type: "text", required: true },
    { name: "dataSources", type: "text", required: true },
    { name: "indicatorImp", type: "text", required: true },
    { name: "indicatorPolicy", type: "text", required: true },
    { name: "applicationLevel", type: "text", required: true },
    { name: "improvementWays", type: "text", required: true },
    { name: "sgid", type: "selectPaginated", apiUrl: ['goals'], required: true },
    { name: "pid", type: "text", required: true },
    { name: "oid", type: "text" },
    { name: "subTypeId", type: "text" },
    { name: "unit", type: "text" },
    { name: "topInd", type: "text" },
    { name: "indicatorNameAr", type: "text", required: true },
    { name: "indicatorDefAr", type: "text", required: true },
    { name: "calculationWayAr", type: "text", required: true },
    { name: "dataSourcesAr", type: "text", required: true },
    { name: "indicatorImpAr", type: "text", required: true }
  ];
  return inputs;
};
