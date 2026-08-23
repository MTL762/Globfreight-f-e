import MultiSelectInput from "@/components/common/Inputs/select/MultiSelectInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { endpoints } from "@/utils/endpoints";
import { Plus } from "lucide-react";
import type React from "react";
import { DEFAULT_FILTER, type Filter, type FormData } from "../types";
import { FilterItem } from "./FilterItem";

interface CrudFormProps {
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
	validationErrors: { [key: string]: string };
	setValidationErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export const CrudForm = ({
	formData,
	setFormData,
	validationErrors,
	setValidationErrors,
}: CrudFormProps) => {
	const handleChange = (field: keyof FormData, value: string | string[] | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (validationErrors[field]) {
			setValidationErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		}
	};

	const handleFilterChange = (index: number, field: keyof Filter, value: string) => {
		const newFilters = [...formData.filters];
		newFilters[index] = {
			...newFilters[index],
			[field]: field === "width" ? parseInt(value) : value,
		};

		if (field === "type" && (value === "selectMenu" || value === "infiniteMultiSelect")) {
			if (!newFilters[index].apiEndpoint) newFilters[index].apiEndpoint = "";
			if (!newFilters[index].labelField) newFilters[index].labelField = "";
		}

		setFormData((prev) => ({ ...prev, filters: newFilters }));

		const filterErrorKey = `filters[${index}].${field}`;
		if (validationErrors[filterErrorKey]) {
			setValidationErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[filterErrorKey];
				return newErrors;
			});
		}
	};

	const addFilter = () => {
		setFormData((prev) => ({
			...prev,
			filters: [...prev.filters, { ...DEFAULT_FILTER }],
		}));
	};

	const duplicateFilter = (index: number) => {
		const filterToDuplicate = {
			...formData.filters[index],
			key: `${formData.filters[index].key}_copy`,
		};
		const newFilters = [...formData.filters];
		newFilters.splice(index + 1, 0, filterToDuplicate);
		setFormData((prev) => ({
			...prev,
			filters: newFilters,
		}));
	};

	const removeFilter = (index: number) => {
		setFormData((prev) => ({
			...prev,
			filters: prev.filters.filter((_, i) => i !== index),
		}));
	};

	const moveFilter = (index: number, direction: "up" | "down") => {
		if (
			(direction === "up" && index === 0) ||
			(direction === "down" && index === formData.filters.length - 1)
		) {
			return;
		}

		const newIndex = direction === "up" ? index - 1 : index + 1;
		const newFilters = [...formData.filters];
		[newFilters[index], newFilters[newIndex]] = [newFilters[newIndex], newFilters[index]];

		setFormData((prev) => ({
			...prev,
			filters: newFilters,
		}));
	};

	const hasError = (field: string): boolean => {
		return Object.keys(validationErrors).some(
			(key) => key === field || key.startsWith(`${field}.`),
		);
	};

	// Build Option[] for the MultiSelect and compute the selected Option[] from formData.apiEndpoint
	const apiOptions = Object.entries(endpoints).map(([key, value]) => ({
		label: `${key} ==> ${value}`,
		value: key,
	}));

	return (
		<>
			<div className="space-y-4">
				<div className="flex items-center gap-2 mb-2">
					<h3 className="text-lg font-semibold">Basic Information</h3>
					<Separator className="flex-1" />
				</div>

				<div className="grid gap-6 sm:grid-cols-2">
					<div className="space-y-2">
						<Label
							htmlFor="rootFolderName"
							className="text-base font-medium"
						>
							Folder Path <span className="text-destructive">*</span>
						</Label>
						<div className="relative">
							<Input
								id="rootFolderName"
								value={formData.rootFolderName}
								onChange={(e) => handleChange("rootFolderName", e.target.value)}
								placeholder="e.g., users-management"
								className={`${validationErrors.rootFolderName ? "border-destructive" : ""} pr-10`}
							/>
						</div>
						{validationErrors.rootFolderName && (
							<p className="text-sm text-destructive mt-1">{validationErrors.rootFolderName}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="apiEndpoint"
							className="text-base font-medium"
						>
							API Endpoint <span className="text-destructive">*</span>
						</Label>
						<div className="relative">
							<MultiSelectInput
								options={apiOptions}
								value={(formData.apiEndpoint?.map((endpoint) => apiOptions.find((o) => o.value === endpoint)) as any || []) as any}
								name="apiEndpoint"
								onChange={(selectedOptions: (string | number | boolean)[]) =>
									handleChange("apiEndpoint", selectedOptions.map(String))
								}
							/>
						</div>
						{validationErrors.apiEndpoint && (
							<p className="text-sm text-destructive mt-1">{validationErrors.apiEndpoint}</p>
						)}
					</div>

					<div className="space-y-2 sm:col-span-2">
						<Label
							htmlFor="tableHeader"
							className="text-base font-medium"
						>
							Table Header <span className="text-destructive">*</span>
						</Label>
						<div className="relative">
							<Input
								id="tableHeader"
								value={formData.tableHeader}
								onChange={(e) => handleChange("tableHeader", e.target.value)}
								placeholder="e.g., User Management"
								className={validationErrors.tableHeader ? "border-destructive" : ""}
							/>
						</div>
						{validationErrors.tableHeader && (
							<p className="text-sm text-destructive mt-1">{validationErrors.tableHeader}</p>
						)}
					</div>

					<div className="flex items-center space-x-2 sm:col-span-2">
						<Checkbox
							id="includeIdPage"
							checked={formData.includeIdPage}
							onCheckedChange={(checked) => handleChange("includeIdPage", Boolean(checked))}
						/>
						<Label
							htmlFor="includeIdPage"
							className="text-base font-medium"
						>
							Generate /[id]/page.tsx (details page)
						</Label>
					</div>
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<h3 className="text-lg font-semibold">Filters</h3>
					<Badge
						variant="outline"
						className="ml-2"
					>
						{formData.filters.length} {formData.filters.length === 1 ? "filter" : "filters"}
					</Badge>
					<Separator className="flex-1" />
					<Button
						type="button"
						onClick={addFilter}
						variant="outline"
						size="sm"
					>
						<Plus className="w-4 h-4 mr-2" /> Add Filter
					</Button>
				</div>

				{formData.filters.map((filter, index) => (
					<FilterItem
						key={index}
						index={index}
						filter={filter}
						handleFilterChange={handleFilterChange}
						moveFilter={moveFilter}
						duplicateFilter={duplicateFilter}
						removeFilter={removeFilter}
						hasError={hasError}
						validationErrors={validationErrors}
					/>
				))}

				{formData.filters.length === 0 && (
					<div className="text-center p-8 border-2 border-dashed rounded-md border-muted bg-muted/30">
						<p className="text-muted-foreground">No filters added yet</p>
						<Button
							type="button"
							onClick={addFilter}
							variant="outline"
							className="mt-4"
						>
							<Plus className="w-4 h-4 mr-2" /> Add First Filter
						</Button>
					</div>
				)}
			</div>
		</>
	);
};
