"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useAssetsLogic from "./useAssetsForm.logic";

export default function AssetsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useAssetsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Asset Information"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}
