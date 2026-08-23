"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type InputsJsonEditorProps = {
	value: string;
	error?: string;
	onChange: (value: string) => void;
	onApply: () => void;
	onReset: () => void;
};

export function InputsJsonEditor({
	value,
	error,
	onChange,
	onApply,
	onReset,
}: InputsJsonEditorProps) {
	return (
		<div className="space-y-2">
			<Label>Inputs JSON</Label>
			<Textarea
				value={value}
				onChange={(event) => onChange(event.target.value)}
				rows={8}
				className="font-mono text-xs"
			/>
			{error ? <p className="text-sm text-destructive">{error}</p> : null}
			<div className="flex items-center gap-2">
				<Button size="sm" onClick={onApply}>
					Apply Inputs
				</Button>
				<Button variant="outline" size="sm" onClick={onReset}>
					Reset JSON
				</Button>
			</div>
		</div>
	);
}
