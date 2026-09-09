import { FORM_LANGUAGES, type FormInput } from "@/components/common/Form/CustomFormTypes.types";

export function extractFormDefaultInputs(inputs: FormInput[], data?: unknown): object | undefined {
  if (!data) return {};
  const dataObj = data as Record<string, any>;
  return inputs
    ?.map(item => {
      if (item == undefined) {
        return;
      }
      if (item.multiLang) {
        const langDefaults: Record<string, string> = {};
        FORM_LANGUAGES.forEach(({ code, key }) => {
          const directVal = dataObj[item.name]?.[code];
          const seoKey = item.name.startsWith("seo_") ? item.name.replace("seo_", "") : null;
          const seoVal = seoKey ? dataObj.seo?.[seoKey]?.[code] : undefined;
          langDefaults[`${item.name}${key}`] = directVal ?? seoVal ?? "";
        });
        return langDefaults;
      }
      if (item?.name == "phone") {
        return {
          [item?.name]: dataObj[item.name]
        };
      }
      return {
        [item.name]: dataObj[item.name]
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

