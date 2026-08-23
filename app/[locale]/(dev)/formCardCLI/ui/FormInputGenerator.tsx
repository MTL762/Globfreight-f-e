"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { defaultFormState, type FormPageInfo } from "../helpers/static";
import { generateFormCode } from "../helpers/uihelpers";
import { FieldInputForm } from "./components/FieldInputForm";
import { FieldsList } from "./components/FieldsList";
import { FormGenerateButton } from "./components/FormGenerateButton";
import { GeneratedCodeSection } from "./components/GeneratedCodeSection";
import { PageInfoSection } from "./components/PageInfoSection";

export default function FormInputGenerator() {
	const [inputs, setInputs] = useState<FormInput[]>([]);
	const [currentInput, setCurrentInput] = useState<FormInput>(defaultFormState);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);
	const [isGenerating, setIsGenerating] = useState(false);
	const [pageInfo, setPageInfo] = useState<FormPageInfo>({
		name: "",
		apiUrl: "",
	});

	const handleAddInput = (input: FormInput) => {
		if (editingIndex !== null) {
			setInputs((prev) => prev.map((item, index) => (index === editingIndex ? input : item)));
			setEditingIndex(null);
		} else {
			setInputs((prev) => [...prev, input]);
		}
		setCurrentInput(defaultFormState);
	};

	const handleDeleteInput = (index: number) => {
		setInputs((prev) => prev.filter((_, i) => i !== index));
	};

	const handleEditInput = (index: number) => {
		setCurrentInput(inputs[index]);
		setEditingIndex(index);
	};

	const handleSortInputs = () => {
		setInputs((prev) => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
	};

	const handleGenerateForm = async () => {
		if (!pageInfo.name) {
			toast.error("Error", {
				description: "Please enter a page name",
			});
			return;
		}

		if (inputs.length === 0) {
			toast.error("Error", {
				description: "Please add at least one input field",
			});
			return;
		}

		try {
			setIsGenerating(true);
			await generateFormCode(pageInfo, inputs);
			toast.success("Success", {
				description: "Form generated successfully",
			});
			setInputs([]);
			setPageInfo({
				name: "",
				apiUrl: "",
			});
		} catch (err) {
			toast.error("Error", {
				description: String(err) + " Failed to generate form",
			});
		} finally {
			setIsGenerating(false);
		}
	};

	const handleClearAll = () => {
		if (confirm("Are you sure you want to clear all fields?")) {
			setInputs([]);
			setCurrentInput(defaultFormState);
			setEditingIndex(null);
			setPageInfo({
				name: "",
				apiUrl: "",
			});
		}
	};

	return (
		<div className="container mx-auto p-6 max-w-7xl pb-24">
			<PageInfoSection
				pageInfo={pageInfo}
				setPageInfo={setPageInfo}
				handleClearAll={handleClearAll}
			/>

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
				handleDeleteInput={handleDeleteInput}
				handleSortInputs={handleSortInputs}
			/>

			<GeneratedCodeSection inputs={inputs} />

			<FormGenerateButton
				isGenerating={isGenerating}
				disabled={isGenerating || inputs.length === 0 || !pageInfo.name}
				onGenerate={handleGenerateForm}
			/>
		</div>
	);
}
