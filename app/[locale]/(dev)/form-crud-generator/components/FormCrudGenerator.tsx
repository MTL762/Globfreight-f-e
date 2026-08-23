/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowDown, ArrowUp, Edit, Plus, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { type CombinedFormData, DEFAULT_FORM_INPUT, FORM_INPUT_TYPES } from "../types";

interface FormCrudGeneratorProps {
	formData: CombinedFormData;
	setFormData: React.Dispatch<React.SetStateAction<CombinedFormData>>;
}

export function FormCrudGenerator({ formData, setFormData }: FormCrudGeneratorProps) {
	const [currentField, setCurrentField] = useState<FormInput>(DEFAULT_FORM_INPUT);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const handleAddField = () => {
		if (!currentField.name.trim()) {
			toast.error("Field name is required");
			return;
		}

		if (editingIndex !== null) {
			const updatedFields = [...formData.formFields];
			updatedFields[editingIndex] = currentField;
			setFormData((prev) => ({ ...prev, formFields: updatedFields }));
			setEditingIndex(null);
			toast.success("Field updated successfully");
		} else {
			setFormData((prev) => ({
				...prev,
				formFields: [...prev.formFields, currentField],
			}));
			toast.success("Field added successfully");
		}

		setCurrentField(DEFAULT_FORM_INPUT);
	};

	const handleEditField = (index: number) => {
		setCurrentField(formData.formFields[index]);
		setEditingIndex(index);
	};

	const handleDeleteField = (index: number) => {
		setFormData((prev) => ({
			...prev,
			formFields: prev.formFields.filter((_, i) => i !== index),
		}));
		toast.success("Field deleted successfully");
	};

	const handleMoveField = (index: number, direction: "up" | "down") => {
		const newFields = [...formData.formFields];
		const targetIndex = direction === "up" ? index - 1 : index + 1;

		if (targetIndex >= 0 && targetIndex < newFields.length) {
			[newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
			setFormData((prev) => ({ ...prev, formFields: newFields }));
		}
	};

	const resetCurrentField = () => {
		setCurrentField(DEFAULT_FORM_INPUT);
		setEditingIndex(null);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold">Form Field Builder</h3>
				<span className="text-sm text-muted-foreground">
					{formData.formFields.length} field
					{formData.formFields.length !== 1 ? "s" : ""} defined
				</span>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Field Creation Form */}
				<div className="lg:col-span-1">
					<div className="sticky top-4">
						<div className="p-4 border rounded-lg bg-background">
							<h4 className="font-medium mb-4">
								{editingIndex !== null ? "Edit Field" : "Add New Field"}
							</h4>

							<div className="space-y-4">
								<div>
									<Label htmlFor="fieldName">Field Name *</Label>
									<Input
										id="fieldName"
										value={currentField.name}
										onChange={(e) =>
											setCurrentField((prev) => ({
												...prev,
												name: e.target.value,
											}))
										}
										placeholder="e.g., firstName"
										className="mt-1"
									/>
								</div>
								<div>
									<Label htmlFor="fieldType">Field Type *</Label>
									<Select
										value={currentField.type}
										onValueChange={(value) =>
											setCurrentField((prev) => ({
												...prev,
												type: value as any,
											}))
										}
									>
										<SelectTrigger className="mt-1">
											<SelectValue placeholder="Select field type" />
										</SelectTrigger>
										<SelectContent>
											{FORM_INPUT_TYPES.map((type) => (
												<SelectItem
													key={type.value}
													value={type.value}
												>
													{type.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>{" "}
								{/* Additional field properties based on type */}
								{(currentField.type === "select" || currentField.type === "multiSelect") && (
									<div>
										<Label htmlFor="fieldOptions">Options (comma-separated)</Label>
										<Input
											id="fieldOptions"
											value={currentField.options?.join(", ") || ""}
											onChange={(e) =>
												setCurrentField((prev: any) => ({
													...prev,
													options: e.target.value
														.split(",")
														.map((opt) => opt.trim())
														.filter(Boolean),
												}))
											}
											placeholder="Option 1, Option 2, Option 3"
											className="mt-1"
										/>
									</div>
								)}
								<div className="flex flex-col space-y-4">
									<div className="flex items-center gap-2">
										<input
											type="checkbox"
											id="isRequired"
											checked={currentField.required === true}
											onChange={(e) =>
												setCurrentField((prev) => ({
													...prev,
													required: e.target.checked,
												}))
											}
											className="h-4 w-4 rounded border-gray-300"
										/>
										<Label
											htmlFor="isRequired"
											className="text-sm font-normal"
										>
											Required field
										</Label>
									</div>

									<div className="flex items-center gap-2">
										<input
											type="checkbox"
											id="isMultiLang"
											checked={currentField.multiLang === true}
											onChange={(e) =>
												setCurrentField((prev) => ({
													...prev,
													multiLang: e.target.checked,
												}))
											}
											className="h-4 w-4 rounded border-gray-300"
										/>
										<Label
											htmlFor="isMultiLang"
											className="text-sm font-normal"
										>
											Multi-language support
										</Label>
									</div>
								</div>
								<div className="flex gap-2 pt-2">
									<Button
										onClick={handleAddField}
										className="flex-1"
									>
										{editingIndex !== null ? "Update Field" : "Add Field"}
									</Button>

									{editingIndex !== null && (
										<Button
											variant="outline"
											onClick={resetCurrentField}
										>
											Cancel
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Fields List */}
				<div className="lg:col-span-2">
					<div className="space-y-3">
						<h4 className="font-medium">Form Fields</h4>

						{formData.formFields.length === 0 ? (
							<div className="p-8 text-center border border-dashed rounded-lg">
								<Plus className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
								<p className="text-muted-foreground">No fields added yet</p>
								<p className="text-sm text-muted-foreground">
									Add your first field using the form on the left
								</p>
							</div>
						) : (
							<div className="space-y-2">
								{formData.formFields.map((field, index) => (
									<div
										key={index}
										className={`p-3 border rounded-lg flex items-center justify-between ${
											editingIndex === index ? "border-primary bg-primary/5" : "bg-background"
										}`}
									>
										{" "}
										<div className="flex-1">
											<div className="flex items-center gap-3">
												<span className="font-medium">{field.name}</span>
												<span className="px-2 py-1 text-xs bg-muted rounded-md">
													{FORM_INPUT_TYPES.find((t) => t.value === field.type)?.label ||
														field.type}
												</span>
												{field.required && (
													<span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-md">
														Required
													</span>
												)}
												{field.multiLang && (
													<span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
														Multi-lang
													</span>
												)}
											</div>

											{field.options && field.options.length > 0 && (
												<div className="text-xs text-muted-foreground mt-1">
													Options: {field.options.join(", ")}
												</div>
											)}
										</div>
										<div className="flex items-center gap-1">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleMoveField(index, "up")}
												disabled={index === 0}
											>
												<ArrowUp className="h-4 w-4" />
											</Button>

											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleMoveField(index, "down")}
												disabled={index === formData.formFields.length - 1}
											>
												<ArrowDown className="h-4 w-4" />
											</Button>

											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleEditField(index)}
											>
												<Edit className="h-4 w-4" />
											</Button>

											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleDeleteField(index)}
												className="text-destructive hover:text-destructive"
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
