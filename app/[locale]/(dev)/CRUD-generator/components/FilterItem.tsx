import { Copy, MoveDown, MoveUp, Trash2 } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { FILTER_TYPES, type Filter } from "../types";

interface FilterItemProps {
	index: number;
	filter: Filter;
	handleFilterChange: (index: number, field: keyof Filter, value: string) => void;
	moveFilter: (index: number, direction: "up" | "down") => void;
	duplicateFilter: (index: number) => void;
	removeFilter: (index: number) => void;
	hasError: (field: string) => boolean;
	validationErrors: { [key: string]: string };
}

export const FilterItem = ({
	index,
	filter,
	handleFilterChange,
	moveFilter,
	duplicateFilter,
	removeFilter,
	hasError,
	validationErrors,
}: FilterItemProps) => {
	return (
		<Accordion
			type="multiple"
			className="w-full space-y-4"
			defaultValue={[`filter-${index}`]}
		>
			<AccordionItem
				value={`filter-${index}`}
				className="border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow transition-shadow"
			>
				<AccordionTrigger className="px-4 py-3 hover:bg-muted/50 data-[state=open]:bg-muted/30">
					<div className="flex items-center gap-2 text-left">
						<Badge
							variant="outline"
							className="h-6 w-6 rounded-full p-0 flex items-center justify-center"
						>
							{index + 1}
						</Badge>
						<span className="font-medium">{filter.key ? filter.key : `Filter ${index + 1}`}</span>
						<Badge
							className="ml-2"
							variant="secondary"
						>
							{filter.type || "No type"}
						</Badge>
						{filter.width && (
							<Badge
								variant="outline"
								className="ml-1"
							>
								Width: {filter.width}
							</Badge>
						)}
					</div>
				</AccordionTrigger>

				<AccordionContent className="pb-4 pt-2">
					<div className="space-y-4 px-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label
									htmlFor={`filter-key-${index}`}
									className="font-medium"
								>
									Key <span className="text-destructive">*</span>
								</Label>
								<Input
									id={`filter-key-${index}`}
									value={filter.key}
									onChange={(e) => handleFilterChange(index, "key", e.target.value)}
									placeholder="e.g., name"
									className={hasError(`filters[${index}].key`) ? "border-destructive" : ""}
								/>
								{validationErrors[`filters[${index}].key`] && (
									<p className="text-sm text-destructive mt-1">
										{validationErrors[`filters[${index}].key`]}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor={`filter-width-${index}`}
									className="font-medium"
								>
									Width (1-6)
								</Label>
								<Input
									id={`filter-width-${index}`}
									type="number"
									min={1}
									max={6}
									value={filter.width !== undefined ? filter.width : 3}
									onChange={(e) => handleFilterChange(index, "width", e.target.value)}
									placeholder="3"
									className={hasError(`filters[${index}].width`) ? "border-destructive" : ""}
								/>
								{validationErrors[`filters[${index}].width`] && (
									<p className="text-sm text-destructive mt-1">
										{validationErrors[`filters[${index}].width`]}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor={`filter-type-${index}`}
									className="font-medium"
								>
									Type <span className="text-destructive">*</span>
								</Label>
								<Select
									value={filter.type}
									onValueChange={(value) => handleFilterChange(index, "type", value)}
								>
									<SelectTrigger
										id={`filter-type-${index}`}
										className={hasError(`filters[${index}].type`) ? "border-destructive" : ""}
									>
										<SelectValue placeholder="Select filter type" />
									</SelectTrigger>
									<SelectContent>
										{FILTER_TYPES.map((type) => (
											<SelectItem
												key={type.value}
												value={type.value}
											>
												{type.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{validationErrors[`filters[${index}].type`] && (
									<p className="text-sm text-destructive mt-1">
										{validationErrors[`filters[${index}].type`]}
									</p>
								)}
							</div>

							{(filter.type === "selectMenu" || filter.type === "infiniteMultiSelect") && (
								<>
									<div className="space-y-2">
										<Label
											htmlFor={`filter-apiEndpoint-${index}`}
											className="font-medium"
										>
											API Endpoint <span className="text-destructive">*</span>
										</Label>
										<Input
											id={`filter-apiEndpoint-${index}`}
											value={filter.apiEndpoint || ""}
											onChange={(e) => handleFilterChange(index, "apiEndpoint", e.target.value)}
											placeholder="e.g., /api/options"
											className={
												hasError(`filters[${index}].apiEndpoint`) ? "border-destructive" : ""
											}
										/>
										{validationErrors[`filters[${index}].apiEndpoint`] && (
											<p className="text-sm text-destructive mt-1">
												{validationErrors[`filters[${index}].apiEndpoint`]}
											</p>
										)}
									</div>

									<div className="space-y-2">
										<Label
											htmlFor={`filter-labelField-${index}`}
											className="font-medium"
										>
											Label Field <span className="text-destructive">*</span>
										</Label>
										<Input
											id={`filter-labelField-${index}`}
											value={filter.labelField || ""}
											onChange={(e) => handleFilterChange(index, "labelField", e.target.value)}
											placeholder="e.g., title"
											className={
												hasError(`filters[${index}].labelField`) ? "border-destructive" : ""
											}
										/>
										{validationErrors[`filters[${index}].labelField`] && (
											<p className="text-sm text-destructive mt-1">
												{validationErrors[`filters[${index}].labelField`]}
											</p>
										)}
									</div>
								</>
							)}
						</div>

						<Separator className="my-4" />
						<div className="flex flex-wrap items-center gap-2 pt-2">
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => moveFilter(index, "up")}
								disabled={index === 0}
								className="bg-transparent"
							>
								<MoveUp className="w-4 h-4 mr-1" /> Move Up
							</Button>

							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => moveFilter(index, "down")}
								// disabled={index === false} // This will be determined by parent
								className="bg-transparent"
							>
								<MoveDown className="w-4 h-4 mr-1" /> Move Down
							</Button>

							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => duplicateFilter(index)}
								className="bg-transparent"
							>
								<Copy className="w-4 h-4 mr-1" /> Duplicate
							</Button>

							<Button
								type="button"
								variant="outline"
								size="sm"
								className="text-destructive hover:bg-destructive/10 hover:border-destructive/50 ml-auto"
								onClick={() => removeFilter(index)}
							>
								<Trash2 className="w-4 h-4 mr-1" /> Remove
							</Button>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};
