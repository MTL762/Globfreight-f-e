"use client";

import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { defaultFormState } from "@/app/[locale]/(dev)/formCardCLI/helpers/static";
import { FieldInputForm } from "@/app/[locale]/(dev)/formCardCLI/ui/components/FieldInputForm";
import { FieldsList } from "@/app/[locale]/(dev)/formCardCLI/ui/components/FieldsList";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { InputsJsonEditor } from "./InputsJsonEditor";

type InputsEditorProps = {
	inputs: FormInput[];
	inputsJson: string;
	inputsError?: string;
	showInputsJson: boolean;
	onReplaceInputs: (inputs: FormInput[]) => void;
	onRemoveInput: (index: number) => void;
	onToggleJson: () => void;
	onInputsJsonChange: (value: string) => void;
	onApplyJson: () => void;
	onResetJson: () => void;
};

export function InputsEditor({
	inputs,
	inputsJson,
	inputsError,
	showInputsJson,
	onReplaceInputs,
	onRemoveInput,
	onToggleJson,
	onInputsJsonChange,
	onApplyJson,
	onResetJson,
}: InputsEditorProps) {
	const [currentInput, setCurrentInput] = useState<FormInput>(defaultFormState);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	useEffect(() => {
		if (editingIndex !== null && !inputs[editingIndex]) {
			setEditingIndex(null);
			setCurrentInput(defaultFormState);
		}
	}, [editingIndex, inputs]);

	const handleAddInput = (input: FormInput) => {
		if (editingIndex !== null) {
			const nextInputs = inputs.map((item, index) =>
				index === editingIndex ? input : item,
			);
			onReplaceInputs(nextInputs);
		} else {
			onReplaceInputs([...inputs, input]);
		}
		setEditingIndex(null);
		setCurrentInput(defaultFormState);
	};

	const handleEditInput = (index: number) => {
		setEditingIndex(index);
		setCurrentInput({ ...inputs[index] });
	};

	const handleSortInputs = () => {
		onReplaceInputs([...inputs].sort((a, b) => a.name.localeCompare(b.name)));
	};

	return (
		<div className="space-y-3">
			<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
				<span>{inputs.length} inputs detected</span>
				<Button variant="ghost" size="sm" onClick={onToggleJson}>
					{showInputsJson ? "Hide JSON" : "Edit JSON"}
				</Button>
			</div>
			<div className="space-y-4">
				<FieldInputForm
					currentInput={currentInput}
					setCurrentInput={setCurrentInput}
					editingIndex={editingIndex}
					setEditingIndex={setEditingIndex}
					onAddInput={handleAddInput}
				/>
				<FieldsList
					inputs={inputs}
					handleEditInput={handleEditInput}
					handleDeleteInput={onRemoveInput}
					handleSortInputs={handleSortInputs}
				/>
			</div>
			{showInputsJson ? (
				<InputsJsonEditor
					value={inputsJson}
					error={inputsError}
					onChange={onInputsJsonChange}
					onApply={onApplyJson}
					onReset={onResetJson}
				/>
			) : null}
		</div>
	);
}
