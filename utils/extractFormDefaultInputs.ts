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
      if (item?.name.startsWith("seo_")) {
        const seoKey = item.name.replace(/^seo_/, "");
        const seoVal = dataObj[item.name] ?? dataObj.seo?.[seoKey];
        const val =
          typeof seoVal === "object" && seoVal !== null && !Array.isArray(seoVal)
            ? seoVal.en ?? Object.values(seoVal)[0] ?? ""
            : seoVal;
        return {
          [item.name]: val ?? ""
        };
      }
      return {
        [item.name]: dataObj[item.name]
      };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

