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
    Object.keys(data).map((item: string) => {
      if (dirtyFields && !dirtyFields[item]) return;
      else if (data[item] == undefined) return;
      if (item.includes("phone") || item.includes("Phone")) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        data[item] && formdata.append(item, `${data[item]}`);
      } else if (inputs.find(input => input.name === item.slice(0, -2))?.multiLang) {
        const baseName = item.slice(0, -2);
        if (formdata.has(baseName)) return;
        const langObj: Record<string, string> = {};
        FORM_LANGUAGES.forEach(({ code, key }) => {
          langObj[code] = data[`${baseName}${key}`] ?? "";
        });
        formdata.append(baseName, JSON.stringify(langObj));
      } else if (
        data[item] &&
        (data[item][0] instanceof File ||
          data[item][0] instanceof Blob ||
          (typeof data[item][0] == "string" && data[item][0]?.includes("uploads/")))
      ) {
        data[item].forEach((file: File | Blob | string) => {
          if (file instanceof File || file instanceof Blob) {
            formdata.append(item, file);
          } else if (typeof file === "string" && file.includes("uploads/")) {
            // formdata.append(item, file);
          }
        });
      } else formdata.append(item, data[item]);
    });
    return formdata;
  } else {
    const formdata: Record<
      string,
      | Record<string, string>
      | string
      | boolean
    > = {};
    Object.keys(data).map((item: string) => {
      if (dirtyFields && !dirtyFields[item]) return;
      if (item.includes("phone") || item.includes("Phone")) {
        formdata[item] = `${data[item]}`;
      } else if (
        inputs.find(input => input.name === item.slice(0, -2))?.multiLang &&
        data[item] != undefined
      ) {
        const baseName = item.slice(0, -2);
        if (!formdata[baseName]) {
          const langObj: Record<string, string> = {};
          FORM_LANGUAGES.forEach(({ code, key }) => {
            langObj[code] = data[`${baseName}${key}`] ?? "";
          });
          formdata[baseName] = langObj;
        }
      } else if (typeof data[item] === "boolean") {
        formdata[item] = Boolean(data[item]);
      } else {
        if (data[item] === null || data[item] === undefined) {
          return;
        }
        formdata[item as keyof typeof formdata] = data[item];
      }
      // isNaN(Number(data[item]))
      //  ? data[item]
      //  : Number(data[item]);
    });
    return formdata;
  }
}
