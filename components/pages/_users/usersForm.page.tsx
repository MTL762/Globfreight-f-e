"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import useUsersLogic from "./useUsersForm.logic";

export default function UsersFormPage({ data }: { data?: any }) {
  const { inputs, t, control, formSubmit } = useUsersLogic({ data });

  return (
    <CustomForm
      handleSubmit={formSubmit}
      control={control}
      cardConfig={[
        {
          id: "general",
          title: t("Account Information"),
          width: 6
        },
        {
          id: "security",
          title: t("Security & Avatar"),
          width: 6
        }
      ]}
      inputs={inputs}
    />
  );
}
