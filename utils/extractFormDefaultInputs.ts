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
        const langDefaults: Record<string, any> = {};
        const rawDirect = dataObj[item.name] ?? (item.name === "image" ? dataObj["images"] : undefined);
        FORM_LANGUAGES.forEach(({ code, key }) => {
          if (item.name === "tags") {
            let tagsVal: string[] = [];
            if (rawDirect !== null && typeof rawDirect === "object" && !Array.isArray(rawDirect)) {
              const langTags = rawDirect[code];
              if (Array.isArray(langTags)) {
                tagsVal = langTags;
              } else if (typeof langTags === "string") {
                tagsVal = langTags.split(",").map((s: string) => s.trim()).filter(Boolean);
              }
            } else if (Array.isArray(rawDirect)) {
              if (code === "en" || code === "ar") {
                tagsVal = rawDirect;
              }
            } else if (typeof rawDirect === "string") {
              tagsVal = rawDirect.split(",").map((s: string) => s.trim()).filter(Boolean);
            }
            langDefaults[`${item.name}${key}`] = tagsVal;
            return;
          }

          let directVal: any;
          if (rawDirect !== null && typeof rawDirect === "object" && !Array.isArray(rawDirect)) {
            directVal = rawDirect[code] ?? rawDirect.en ?? rawDirect.ar ?? Object.values(rawDirect)[0];
          } else if (Array.isArray(rawDirect)) {
            directVal = code === "en" ? rawDirect : [];
          } else if (typeof rawDirect === "string") {
            directVal = rawDirect;
          }

          const seoKey = item.name.startsWith("seo_") ? item.name.replace("seo_", "") : null;
          let seoVal: any;
          if (seoKey && dataObj.seo) {
            const rawSeo = dataObj.seo[seoKey];
            if (rawSeo !== null && typeof rawSeo === "object" && !Array.isArray(rawSeo)) {
              seoVal = rawSeo[code] ?? rawSeo.en ?? rawSeo.ar ?? Object.values(rawSeo)[0];
            } else if (typeof rawSeo === "string") {
              seoVal = rawSeo;
            }
          }

          langDefaults[`${item.name}${key}`] = directVal ?? seoVal ?? "";
        });
        return langDefaults;
      }
      if (item?.name === "published_locales") {
        return {
          [item.name]: Array.isArray(dataObj.published_locales) ? dataObj.published_locales : []
        };
      }
      if (item?.name === "category_id") {
        return {
          [item.name]: dataObj.category_id ?? dataObj.category?.id ?? ""
        };
      }
      if (item?.name === "sub_category_id") {
        return {
          [item.name]: dataObj.sub_category_id ?? dataObj.sub_category?.id ?? ""
        };
      }
      if (item?.name == "phone") {
        return {
          [item?.name]: dataObj[item.name]
        };
      }
      if (item?.name.startsWith("seo_")) {
        const seoKey = item.name.replace(/^seo_/, "");
        const seoVal = dataObj[item.name] ?? dataObj.seo?.[seoKey];
        if (seoKey === "faqs" || seoKey === "faq_ids") {
          if (Array.isArray(dataObj.seo?.faq_ids) && dataObj.seo.faq_ids.length > 0) {
            return {
              [item.name]: dataObj.seo.faq_ids
            };
          }
          if (Array.isArray(dataObj.seo?.faqs)) {
            return {
              [item.name]: dataObj.seo.faqs
            };
          }
          return {
            [item.name]: Array.isArray(seoVal) ? seoVal : []
          };
        }
        if (seoKey === "keywords") {
          return {
            [item.name]: Array.isArray(seoVal) ? seoVal.join(", ") : (seoVal ?? "")
          };
        }
        if (seoKey === "schema_markup") {
          if (typeof seoVal === "object" && seoVal !== null) {
            return {
              [item.name]: JSON.stringify(seoVal, null, 2)
            };
          }
          return {
            [item.name]: seoVal ?? ""
          };
        }
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
