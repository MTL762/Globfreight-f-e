import FormInputGenerator from "@/app/[locale]/(dev)/formCardCLI/ui/FormInputGenerator";

export default async function page() {
	return (
		<div className="container mx-auto p-10">
			<h1 className="text-3xl font-bold mb-8">Form Input Generator</h1>
			<FormInputGenerator />
		</div>
	);
}
