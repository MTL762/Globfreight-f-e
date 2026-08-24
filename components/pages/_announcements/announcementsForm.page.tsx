"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useAnnouncementsLogic from "./useAnnouncementsForm.logic";

export default function AnnouncementsFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useAnnouncementsLogic({ data });

  return (
    <div className="p-6 md:p-8">
      <CustomForm
        handleSubmit={formSubmit}
        control={control}
        cardConfig={[
          {
            id: "general",
            title: t("Announcement Details"),
            width: 12
          }
        ]}
        inputs={inputs}
      />
    </div>
  );
}
