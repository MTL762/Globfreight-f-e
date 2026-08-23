"use client";

import { Plus, Table, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
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
import { type CombinedFormData, type CrudFilter, DEFAULT_CRUD_FILTER } from "../types";

interface CrudSettingsProps {
	formData: CombinedFormData;
	setFormData: React.Dispatch<React.SetStateAction<CombinedFormData>>;
}

const CRUD_FILTER_TYPES = [
	{ value: "string", label: "Text" },
	{ value: "number", label: "Number" },
	{ value: "date", label: "Date" },
	{ value: "select", label: "Select" },
	{ value: "boolean", label: "Boolean" },
];

export function CrudSettings({ formData, setFormData }: CrudSettingsProps) {
	const [currentFilter, setCurrentFilter] = useState<CrudFilter>(DEFAULT_CRUD_FILTER);

	const updateFormData = (field: keyof CombinedFormData, value: string | CrudFilter[]) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const addFilter = () => {
		if (!currentFilter.key.trim()) {
			toast.error("Filter key is required");
			return;
		}

		setFormData((prev) => ({
			...prev,
			crudFilters: [...prev.crudFilters, currentFilter],
		}));

		setCurrentFilter(DEFAULT_CRUD_FILTER);
		toast.success("Filter added successfully");
	};

	const removeFilter = (index: number) => {
		setFormData((prev) => ({
			...prev,
			crudFilters: prev.crudFilters.filter((_, i) => i !== index),
		}));
		toast.success("Filter removed successfully");
	};

	const generateFiltersFromFormFields = () => {
		const filters = formData.formFields.map((field) => ({
			key: field.name,
			type:
				field.type === "number"
					? "number"
					: field.type === "date"
						? "date"
						: field.type === "select"
							? "select"
							: "string",
			width: 3,
		}));

		setFormData((prev) => ({ ...prev, crudFilters: filters }));
		toast.success("Filters generated from form fields");
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2 mb-4">
				<Table className="h-5 w-5 text-primary" />
				<h3 className="text-lg font-semibold">CRUD Configuration</h3>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Configuration Form */}
				<div className="space-y-4">
					<div>
						<Label htmlFor="tableHeader">Table Header</Label>
						<Input
							id="tableHeader"
							value={formData.tableHeader}
							onChange={(e) => updateFormData("tableHeader", e.target.value)}
							placeholder="e.g., User Management"
							className="mt-1"
						/>
					</div>

					<div className="p-4 border rounded-lg bg-background">
						<h4 className="font-medium mb-4">Add Table Filter</h4>

						<div className="space-y-3">
							<div>
								<Label htmlFor="filterKey">Filter Key</Label>
								<Input
									id="filterKey"
									value={currentFilter.key}
									onChange={(e) =>
										setCurrentFilter((prev) => ({
											...prev,
											key: e.target.value,
										}))
									}
									placeholder="e.g., name, email, status"
									className="mt-1"
								/>
							</div>

							<div>
								<Label htmlFor="filterType">Filter Type</Label>
								<Select
									value={currentFilter.type}
									onValueChange={(value) => setCurrentFilter((prev) => ({ ...prev, type: value }))}
								>
									<SelectTrigger className="mt-1">
										<SelectValue placeholder="Select filter type" />
									</SelectTrigger>
									<SelectContent>
										{CRUD_FILTER_TYPES.map((type) => (
											<SelectItem
												key={type.value}
												value={type.value}
											>
												{type.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div>
								<Label htmlFor="filterWidth">Column Width (1-12)</Label>
								<Input
									id="filterWidth"
									type="number"
									min="1"
									max="12"
									value={currentFilter.width || 3}
									onChange={(e) =>
										setCurrentFilter((prev) => ({
											...prev,
											width: parseInt(e.target.value) || 3,
										}))
									}
									className="mt-1"
								/>
							</div>

							<Button
								onClick={addFilter}
								className="w-full"
							>
								<Plus className="mr-2 h-4 w-4" />
								Add Filter
							</Button>
						</div>
					</div>

					{formData.formFields.length > 0 && (
						<Button
							variant="outline"
							onClick={generateFiltersFromFormFields}
							className="w-full"
						>
							Generate Filters from Form Fields
						</Button>
					)}
				</div>

				{/* Filters List */}
				<div className="space-y-4">
					<h4 className="font-medium">Table Filters ({formData.crudFilters.length})</h4>

					{formData.crudFilters.length === 0 ? (
						<div className="p-6 text-center border border-dashed rounded-lg">
							<Table className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
							<p className="text-muted-foreground">No filters configured</p>
							<p className="text-sm text-muted-foreground">
								Add filters to enable table search and filtering
							</p>
						</div>
					) : (
						<div className="space-y-2">
							{formData.crudFilters.map((filter, index) => (
								<div
									key={index}
									className="p-3 border rounded-lg flex items-center justify-between bg-background"
								>
									<div className="flex-1">
										<div className="flex items-center gap-3">
											<span className="font-medium">{filter.key}</span>
											<span className="px-2 py-1 text-xs bg-muted rounded-md">
												{CRUD_FILTER_TYPES.find((t) => t.value === filter.type)?.label ||
													filter.type}
											</span>
											<span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">
												Width: {filter.width}
											</span>
										</div>
									</div>

									<Button
										variant="ghost"
										size="sm"
										onClick={() => removeFilter(index)}
										className="text-destructive hover:text-destructive"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							))}
						</div>
					)}

					{formData.crudFilters.length > 0 && (
						<div className="p-4 bg-green-50 rounded-lg border border-green-200">
							<h4 className="font-medium mb-2 text-green-900">CRUD Features</h4>
							<ul className="text-sm text-green-700 space-y-1">
								<li>&bull; Searchable data table</li>
								<li>&bull; Advanced filtering options</li>
								<li>&bull; Pagination support</li>
								<li>&bull; CRUD operations (Create, Read, Update, Delete)</li>
								<li>&bull; Export functionality</li>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
