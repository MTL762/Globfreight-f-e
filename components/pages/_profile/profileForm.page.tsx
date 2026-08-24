"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useProfileLogic from "./useProfileForm.logic";

export default function ProfileFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useProfileLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Account Information"),
            width: 7
          },
          {
            id: "avatar",
            title: t("Profile Picture"),
            width: 5
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}
