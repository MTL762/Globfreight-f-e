
 "use client";


import { AreasInputs } from "./areas.inputs";
import { AreasSchema } from "./areas.schema";

	export function testAreasForm() {
    if (process.env.NODE_ENV === "development") {
  const inputs = AreasInputs();
  const schema = AreasSchema((key: string) => key);
   const inputCount = inputs.reduce((count, input) => {
      if (input.multiLang) {
        return count + 2; // Assuming each multiLang input has two fields (e.g
        // nameAr and nameEn)
      }
      return count + 1; // Single input
    }, 0);
  if (inputCount !== Object.keys(schema.shape).length) {
    throw new Error("Inputs and schema do not match");
  }
  }
}

  