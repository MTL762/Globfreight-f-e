
 "use client";


import { HomeHighlightInputs } from "./homeHighlight.inputs";
import { HomeHighlightSchema } from "./homeHighlight.schema";

	export function testHomeHighlightForm() {
    if (process.env.NODE_ENV === "development") {
  const inputs = HomeHighlightInputs();
  const schema = HomeHighlightSchema((key: string) => key);
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

  