"use client";

import CustomForm from "@/components/common/Form/CustomForm";
import type { ServicesType } from "./services.schema";
import useServicesLogic from "./useServicesForm.logic";

export default function ServicesFormPage({ data }: { data?: ServicesType }) {
  const { inputs, t, control, formSubmit } = useServicesLogic({ data });

  return (
    <CustomForm
      handleSubmit={formSubmit}
      control={control}
      cardConfig={[
        {
          id: "general",
          title: t("General"),
          width: 12
        },
        {
          id: "lang",
          title: t("Service Information"),
          multiLang: true,
          width: 12
        },
        {
          id: "media",
          title: t("Media & Visuals"),
          width: 12
        },
        {
          id: "seo",
          title: t("SEO Settings"),
          multiLang: true,
          width: 12
        },
        {
          id: "schema",
          title: t("Schema Markup"),
          width: 12
        }
      ]}
      inputs={inputs}
    />
  );
}

