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
        const rawDirect = dataObj[item.name] ?? (item.name === "image" ? dataObj["images"] : undefined);
        FORM_LANGUAGES.forEach(({ code, key }) => {
          let directVal: any;
          if (typeof rawDirect === "object" && rawDirect !== null) {
            directVal = rawDirect[code];
          } else if (typeof rawDirect === "string") {
            directVal = rawDirect;
          }
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

