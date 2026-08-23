import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";

export const generateOutput = (inputs: FormInput[]) => {
	return `const inputs: FormInput[] = ${JSON.stringify(inputs, null, 2)};`;
};

export const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatInputName = (name: string) => {
	return name
		.split(/[-_\s]+/)
		.map(capitalizeFirstLetter)
		.join("");
};

export const generateFormCode = async (
	pageInfo: { name: string; apiUrl: string },
	inputs: FormInput[],
) => {
	try {
		const response = await fetch("/api/generate-form", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pageInfo,
				inputs,
			}),
		});
		if (!response.ok) {
			throw new Error(`Failed 213to generate form ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("Error generating form:", error);
		throw error;
	}
};
