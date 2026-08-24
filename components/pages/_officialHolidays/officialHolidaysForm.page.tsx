"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useOfficialHolidaysLogic from "./useOfficialHolidaysForm.logic";

export default function OfficialHolidaysFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useOfficialHolidaysLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Official Holiday Info"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}
