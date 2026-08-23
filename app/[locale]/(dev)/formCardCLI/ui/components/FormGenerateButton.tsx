import { FileDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormGenerateButtonProps {
	isGenerating: boolean;
	disabled: boolean;
	onGenerate: () => void;
}

export function FormGenerateButton({
	isGenerating,
	disabled,
	onGenerate,
}: FormGenerateButtonProps) {
	return (
		<div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-10 flex justify-center">
			<div className="container max-w-7xl flex justify-end">
				<Button
					onClick={onGenerate}
					disabled={disabled}
					size="lg"
					className="gap-2"
				>
					{isGenerating ? (
						<>
							<Loader2 className="w-4 h-4 animate-spin" />
							Generating...
						</>
					) : (
						<>
							<FileDown className="w-4 h-4" />
							Generate Form
						</>
					)}
				</Button>
			</div>
		</div>
	);
}
