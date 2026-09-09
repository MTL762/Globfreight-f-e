import { FormLangs } from "@/components/common/Form/CustomFormTypes.types";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";
import { toast } from "sonner";

export default function useFormErrorLang<T extends FieldValues>({
  errors,
  name
}: {
  errors: FieldErrors<T>;
  name: Readonly<string[]>;
}): { lang: FormLangs } {
  const locale = useLocale();
  const t = useTranslations();
  const getInitialLang = (loc: string): FormLangs => {
    const map: Record<string, FormLangs> = {
      ar: "Ar",
      en: "En",
      nl: "Nl",
      fr: "Fr",
      de: "De"
    };
    return map[loc] || "En";
  };
  const [lang, setLang] = useState<FormLangs>(getInitialLang(locale));
  useEffect(() => {
    name.forEach(element => {
      (["Ar", "En", "Nl", "Fr", "De"] as const).forEach(langKey => {
        const fieldKey = `${element}${langKey}`;
        if (Object.keys(errors).includes(fieldKey)) {
          setLang(`changeTo${langKey}` as FormLangs);
          window.scrollTo(0, 0);
          toast.error(`${t(element)} (${t(langKey)})`, {
            description: errors[fieldKey]?.message as string
          });
        }
      });
    });
  }, [errors]);
  return {
    lang
  };
}
