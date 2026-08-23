import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateOutput } from "../../helpers/uihelpers";

interface GeneratedCodeSectionProps {
	inputs: FormInput[];
}

export function GeneratedCodeSection({ inputs }: GeneratedCodeSectionProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/30">
				<CardTitle>Generated Code</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<Textarea
					value={generateOutput(inputs)}
					readOnly
					className="!min-h-[400px] font-mono text-sm bg-muted/10"
				/>
			</CardContent>
		</Card>
	);
}
