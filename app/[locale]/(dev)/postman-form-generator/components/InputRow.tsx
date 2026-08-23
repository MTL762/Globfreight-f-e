"use client";

import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputRowProps = {
	input: FormInput;
	index: number;
	itemId: string;
	inputTypeOptions: FormInput["type"][];
	onChange: (index: number, updates: Partial<FormInput>) => void;
	onRemove: (index: number) => void;
};

export function InputRow({
	input,
	index,
	itemId,
	inputTypeOptions,
	onChange,
	onRemove,
}: InputRowProps) {
	return (
		<div className="grid gap-3 rounded-md border border-border p-3 md:grid-cols-[1.5fr,1fr,1fr,auto]">
			<div className="space-y-1">
				<Label>Name</Label>
				<Input
					value={input.name}
					onChange={(event) =>
						onChange(index, {
							name: event.target.value,
							placeholder: input.placeholder ?? event.target.value,
						})
					}
					placeholder="fieldName"
				/>
			</div>
			<div className="space-y-1">
				<Label>Type</Label>
				<select
					value={input.type}
					onChange={(event) =>
						onChange(index, { type: event.target.value as FormInput["type"] })
					}
					className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
				>
					{inputTypeOptions.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
			<div className="space-y-1">
				<Label>Placeholder</Label>
				<Input
					value={input.placeholder ?? ""}
					onChange={(event) => onChange(index, { placeholder: event.target.value })}
					placeholder="Placeholder"
				/>
			</div>
			<div className="flex items-end justify-between gap-3">
				<div className="flex items-center gap-2">
					<Checkbox
						id={`${itemId}-input-required-${index}`}
						checked={Boolean(input.required)}
						onCheckedChange={(checked) => onChange(index, { required: Boolean(checked) })}
					/>
					<Label htmlFor={`${itemId}-input-required-${index}`}>Required</Label>
				</div>
				<Button variant="outline" size="sm" onClick={() => onRemove(index)}>
					Remove
				</Button>
			</div>
		</div>
	);
}
