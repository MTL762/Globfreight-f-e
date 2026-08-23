import { ArrowUpDown, Edit, Trash2 } from "lucide-react";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FieldsListProps {
	inputs: FormInput[];
	handleEditInput: (index: number) => void;
	handleDeleteInput: (index: number) => void;
	handleSortInputs: () => void;
}

export function FieldsList({
	inputs,
	handleEditInput,
	handleDeleteInput,
	handleSortInputs,
}: FieldsListProps) {
	return (
		<Card className="mb-6">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 bg-muted/30">
				<CardTitle>Form Fields ({inputs.length})</CardTitle>
				<Button
					variant="outline"
					size="sm"
					onClick={handleSortInputs}
					disabled={inputs.length < 2}
				>
					<ArrowUpDown className="h-4 w-4 mr-2" />
					Sort
				</Button>
			</CardHeader>
			<CardContent className="pt-6">
				{inputs.length === 0 ? (
					<div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
						<p className="text-muted-foreground">No fields added yet</p>
						<p className="text-sm text-muted-foreground mt-1">Start by adding a new field above</p>
					</div>
				) : (
					<div className="space-y-3">
						{inputs.map((input, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-primary/20"
							>
								<div className="flex-1">
									<h3 className="font-medium">{input.name}</h3>
									<p className="text-sm text-muted-foreground">
										Type: <span className="font-medium">{input.type}</span>
										{input.multiLang && (
											<span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
												Multi Language
											</span>
										)}
										{input.required && (
											<span className="ml-2 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
												Required
											</span>
										)}
										{input.isMulti && (
											<span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
												Multi Select
											</span>
										)}
										{input.width && (
											<span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
												Width: {input.width}
											</span>
										)}
									</p>
								</div>
								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleEditInput(index)}
										className="text-gray-500 hover:text-primary"
									>
										<Edit className="h-4 w-4" />
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => handleDeleteInput(index)}
										className="text-gray-500 hover:text-red-500"
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
