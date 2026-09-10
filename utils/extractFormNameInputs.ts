import { FORM_LANGUAGES, type FormInput } from "@/components/common/Form/CustomFormTypes.types";

export function extractFormNameInputs({
  inputs,
  data,
  dirtyFields
}: {
  inputs: FormInput[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  dirtyFields?: Record<string, boolean | boolean[]> | undefined;
}): FormData | Record<string, unknown> {
  const formdata = new FormData();
  const isFormData = inputs.some(
    input =>
      input.type == "file" ||
      input.type == "img" ||
      input.type == "filesUpload" ||
      input.type == "video"
  );

  if (isFormData) {
    const processedMultiLang = new Set<string>();

    Object.keys(data).forEach((item: string) => {
      if (dirtyFields && !dirtyFields[item]) return;
      if (data[item] == undefined) return;

      if (item.includes("phone") || item.includes("Phone")) {
        if (data[item]) formdata.append(item, `${data[item]}`);
        return;
      }

      const baseName = item.slice(0, -2);
      const isMulti = inputs.find(input => input.name === baseName)?.multiLang;

      if (isMulti) {
        if (processedMultiLang.has(baseName)) return;
        processedMultiLang.add(baseName);

        FORM_LANGUAGES.forEach(({ code, key }) => {
          const langKey = `${baseName}${key}`;
          const isDirty = dirtyFields ? Boolean(dirtyFields[langKey]) : false;
          const val = data[langKey];
          const hasValue = val !== undefined && val !== null && val !== "";

          if (hasValue || (isDirty && val === "")) {
            if (baseName.startsWith("seo_")) {
              const seoKey = baseName.replace(/^seo_/, "");
              formdata.append(`seo[${seoKey}][${code}]`, `${val ?? ""}`);
            } else {
              formdata.append(`${baseName}[${code}]`, `${val ?? ""}`);
            }
          }
        });
        return;
      }

      if (item.startsWith("seo_")) {
        const seoKey = item.replace(/^seo_/, "");
        if (data[item] !== "" && data[item] !== undefined && data[item] !== null) {
          if (seoKey === "focus_keyphrase") {
            formdata.append(`seo[${seoKey}][en]`, `${data[item]}`);
          } else {
            formdata.append(`seo[${seoKey}]`, `${data[item]}`);
          }
        }
        return;
      }

      if (data[item] instanceof File || data[item] instanceof Blob) {
        formdata.append(item, data[item]);
        return;
      }

      if (
        data[item] &&
        (data[item][0] instanceof File ||
          data[item][0] instanceof Blob ||
          (typeof data[item][0] == "string" && data[item][0]?.includes("uploads/")))
      ) {
        data[item].forEach((file: File | Blob | string) => {
          if (file instanceof File || file instanceof Blob) {
            formdata.append(item, file);
          }
        });
        return;
      }

      if (Array.isArray(data[item])) {
        data[item].forEach((val: any) => {
          if (val !== undefined && val !== null && val !== "") {
            formdata.append(`${item}[]`, typeof val === "object" ? JSON.stringify(val) : `${val}`);
          }
        });
        return;
      }

      if (typeof data[item] === "string" && data[item].includes("uploads/")) {
        return;
      }

      if (typeof data[item] === "boolean") {
        formdata.append(item, data[item] ? "1" : "0");
        return;
      }

      formdata.append(item, data[item]);
    });

    return formdata;
  } else {
    const formdata: Record<string, any> = {};
    const processedMultiLang = new Set<string>();

    Object.keys(data).forEach((item: string) => {
      if (dirtyFields && !dirtyFields[item]) return;
      if (data[item] === undefined || data[item] === null) return;

      if (item.includes("phone") || item.includes("Phone")) {
        formdata[item] = `${data[item]}`;
        return;
      }

      const baseName = item.slice(0, -2);
      const isMulti = inputs.find(input => input.name === baseName)?.multiLang;

      if (isMulti) {
        if (processedMultiLang.has(baseName)) return;
        processedMultiLang.add(baseName);

        const langObj: Record<string, string> = {};
        FORM_LANGUAGES.forEach(({ code, key }) => {
          const langKey = `${baseName}${key}`;
          const isDirty = dirtyFields ? Boolean(dirtyFields[langKey]) : false;
          const val = data[langKey];
          const hasValue = val !== undefined && val !== null && val !== "";
          if (hasValue || (isDirty && val === "")) {
            langObj[code] = `${val ?? ""}`;
          }
        });

        if (Object.keys(langObj).length > 0) {
          if (baseName.startsWith("seo_")) {
            const seoKey = baseName.replace(/^seo_/, "");
            if (!formdata.seo) formdata.seo = {};
            formdata.seo[seoKey] = langObj;
          } else {
            formdata[baseName] = langObj;
          }
        }
        return;
      }

      if (item.startsWith("seo_")) {
        const seoKey = item.replace(/^seo_/, "");
        if (data[item] !== "") {
          if (!formdata.seo) formdata.seo = {};
          if (seoKey === "focus_keyphrase") {
            formdata.seo[seoKey] = typeof data[item] === "object" ? data[item] : { en: `${data[item]}` };
          } else {
            formdata.seo[seoKey] = data[item];
          }
        }
        return;
      }

      if (typeof data[item] === "boolean") {
        formdata[item] = Boolean(data[item]);
      } else {
        formdata[item] = data[item];
      }
    });

    return formdata;
  }
}
