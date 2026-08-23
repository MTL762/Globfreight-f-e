import type { FormInput, inputTypes } from "@/components/common/Form/CustomFormTypes.types";
import SelectInput from "@/components/common/Inputs/select/SelectInputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { endpoints } from "@/utils/endpoints";
import { Plus, Save } from "lucide-react";
import type React from "react";
import { toast } from "sonner";
import { formInputsType } from "../../helpers/static";

interface FieldInputFormProps {
	currentInput: FormInput;
	setCurrentInput: React.Dispatch<React.SetStateAction<FormInput>>;
	editingIndex: number | null;
	setEditingIndex: React.Dispatch<React.SetStateAction<number | null>>;
	onAddInput: (input: FormInput) => void;
}

export function FieldInputForm({
	currentInput,
	setCurrentInput,
	editingIndex,
	setEditingIndex,
	onAddInput,
}: FieldInputFormProps) {
	const handleInputChange = (
		e:
			| React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
			| { target: { name: string; value: string } },
	) => {
		const { name, value } = e.target;
		setCurrentInput((prev) => ({ ...prev, [name]: value }) as FormInput);
	};

	const handleTypeChange = (value: string) => {
		setCurrentInput((prev) => {
			const type = value as inputTypes;
			const updated = { ...prev, type };

			// Initialize required fields for specific types if they don't exist
			if (
				["select", "multiSelect", "radioGroup", "checkbox"].includes(type) &&
				!("options" in updated)
			) {
				(updated as any).options = [];
			}

			if (type === "selectPaginated" && !("apiUrl" in updated)) {
				(updated as any).apiUrl = [] as any;
			}

			return updated as FormInput;
		});
	};

	const handleCheckboxChange = (name: keyof FormInput) => {
		setCurrentInput((prev) => ({ ...prev, [name]: !prev[name] }));
	};

	const validateInput = (input: FormInput) => {
		if (!input.name.trim()) {
			toast.error("Input name is required");
			return false;
		}
		if (!input.type) {
			toast.error("Input type is required");
			return false;
		}
		return true;
	};

	const handleAddInput = () => {
		if (validateInput(currentInput)) {
			onAddInput(currentInput);
		}
	};

	const handleCancelEdit = () => {
		setCurrentInput({
			name: "",
			type: "text",
		} as FormInput);
		setEditingIndex(null);
	};

	return (
		<Card className="mb-6 border-primary/20">
			<CardHeader className="bg-muted/30">
				<CardTitle>{editingIndex !== null ? "Edit Field" : "Add New Field"}</CardTitle>
			</CardHeader>
			<CardContent className="pt-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label
							htmlFor="name"
							className="text-sm font-medium"
						>
							Field Name
						</Label>
						<Input
							id="name"
							name="name"
							value={currentInput.name}
							onChange={handleInputChange}
							placeholder="e.g., firstName"
							className={`focus:ring-2 focus:ring-primary/20 `}
						/>
					</div>
					<div className="space-y-2">
						<Label
							htmlFor="type"
							className="text-sm font-medium"
						>
							Field Type
						</Label>
						<Select
							onValueChange={handleTypeChange}
							value={currentInput.type}
						>
							<SelectTrigger className={`focus:ring-2 focus:ring-primary/20 `}>
								<SelectValue placeholder="Select field type" />
							</SelectTrigger>
							<SelectContent>
								{formInputsType.map((type) => (
									<SelectItem
										key={type}
										value={type}
									>
										{type}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{currentInput.type === "selectPaginated" && (
						<>
							<div className="space-y-2">
								<Label
									htmlFor="apiUrl"
									className="text-sm font-medium"
								>
									API URL
								</Label>
								<SelectInput
									name="apiUrl"
									options={Object.entries(endpoints).map(([key, value]) => ({
										value: String(value),
										label: key,
									}))}
									value={String(currentInput.apiUrl || "")}
									onChange={(value) =>
										handleInputChange({
											target: { name: "apiUrl", value },
										})
									}
									className="focus:ring-2 focus:ring-primary/20"
								/>
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="labelKey"
									className="text-sm font-medium"
								>
									Label Key
								</Label>
								<Input
									id="labelKey"
									name="labelKey"
									value={currentInput.labelKey || ""}
									onChange={handleInputChange}
									placeholder="e.g., name"
									className="focus:ring-2 focus:ring-primary/20"
								/>
							</div>
						</>
					)}

					<div className="space-y-2">
						<Label
							htmlFor="width"
							className="text-sm font-medium"
						>
							Width (1 - 6)
						</Label>
						<Input
							id="width"
							name="width"
							type="number"
							min="1"
							max="6"
							value={currentInput.width || ""}
							onChange={handleInputChange}
							placeholder="Column width"
							className="focus:ring-2 focus:ring-primary/20"
						/>
					</div>
				</div>

				<div className="flex flex-wrap gap-2 items-center mt-6">
					<div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md">
						<Checkbox
							id="multiLang"
							checked={currentInput.multiLang || false}
							onCheckedChange={() => handleCheckboxChange("multiLang")}
						/>
						<Label
							htmlFor="multiLang"
							className="cursor-pointer"
						>
							Multi Language
						</Label>
					</div>
					<div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md">
						<Checkbox
							id="required"
							checked={currentInput.required || false}
							onCheckedChange={() => handleCheckboxChange("required")}
						/>
						<Label
							htmlFor="required"
							className="cursor-pointer"
						>
							Required
						</Label>
					</div>
					<div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md">
						<Checkbox
							id="isMulti"
							checked={currentInput.isMulti || false}
							onCheckedChange={() => handleCheckboxChange("isMulti")}
						/>
						<Label
							htmlFor="isMulti"
							className="cursor-pointer"
						>
							Multi Select
						</Label>
					</div>
				</div>

				<div className="flex justify-end space-x-3 mt-6">
					{editingIndex !== null && (
						<Button
							variant="outline"
							onClick={handleCancelEdit}
						>
							Cancel
						</Button>
					)}
					<Button
						onClick={handleAddInput}
						variant="default"
						className="gap-2"
					>
						{editingIndex !== null ? (
							<>
								<Save className="w-4 h-4" />
								Update Field
							</>
						) : (
							<>
								<Plus className="w-4 h-4" />
								Add Field
							</>
						)}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
