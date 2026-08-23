const createFormDevTest = (name) => {
	// Initializing the useState for language

	return `
 "use client";


import { ${name}Inputs } from "./${name.charAt(0).toLowerCase() + name.slice(1)}.inputs";
import { ${name}Schema } from "./${name.charAt(0).toLowerCase() + name.slice(1)}.schema";

	export function test${name}Form() {
    if (process.env.NODE_ENV === "development") {
  const inputs = ${name}Inputs();
  const schema = ${name}Schema((key: string) => key);
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

  `;
};

module.exports = { createFormDevTest };
