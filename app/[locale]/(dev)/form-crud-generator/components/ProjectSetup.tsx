"use client";

import { ArrowRight, FolderOpen, Globe } from "lucide-react";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CombinedFormData } from "../types";

interface ProjectSetupProps {
	formData: CombinedFormData;
	setFormData: React.Dispatch<React.SetStateAction<CombinedFormData>>;
	onNext: () => void;
}

export function ProjectSetup({ formData, setFormData, onNext }: ProjectSetupProps) {
	const updateFormData = (field: keyof CombinedFormData, value: string | object) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const generateApiEndpoint = () => {
		if (formData.projectName) {
			const endpoint = `/api/${formData.projectName.toLowerCase().replace(/\s+/g, "-")}`;
			updateFormData("apiEndpoint", endpoint);
			updateFormData("pageInfo", {
				...formData.pageInfo,
				name: formData.projectName,
				apiUrl: endpoint,
			});
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2 mb-4">
				<FolderOpen className="h-5 w-5 text-primary" />
				<h3 className="text-lg font-semibold">Project Configuration</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<div>
						<Label
							htmlFor="projectName"
							className="text-sm font-medium"
						>
							Project Name *
						</Label>
						<Input
							id="projectName"
							value={formData.projectName}
							onChange={(e) => updateFormData("projectName", e.target.value)}
							placeholder="e.g., User Management"
							className="mt-1"
						/>
						<p className="text-xs text-muted-foreground mt-1">
							This will be used for folder names and component names
						</p>
					</div>

					<div>
						<Label
							htmlFor="apiEndpoint"
							className="text-sm font-medium"
						>
							API Endpoint *
						</Label>
						<div className="flex gap-2 mt-1">
							<Input
								id="apiEndpoint"
								value={formData.apiEndpoint}
								onChange={(e) => updateFormData("apiEndpoint", e.target.value)}
								placeholder="e.g., /api/users"
							/>
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={generateApiEndpoint}
								disabled={!formData.projectName}
							>
								<Globe className="h-4 w-4 mr-1" />
								Auto
							</Button>
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Base API endpoint for CRUD operations
						</p>
					</div>

					<div>
						<Label
							htmlFor="tableHeader"
							className="text-sm font-medium"
						>
							Table Header
						</Label>
						<Input
							id="tableHeader"
							value={formData.tableHeader}
							onChange={(e) => updateFormData("tableHeader", e.target.value)}
							placeholder="e.g., User Management"
							className="mt-1"
						/>
						<p className="text-xs text-muted-foreground mt-1">Header text for the data table</p>
					</div>
				</div>

				<div className="space-y-4">
					<div className="p-4 bg-muted/50 rounded-lg">
						<h4 className="font-medium mb-2">Project Structure Preview</h4>
						<div className="text-sm text-muted-foreground space-y-1">
							{formData.projectName ? (
								<>
									<div>
										📁 components/pages/
										{formData.projectName.toLowerCase().replace(/\s+/g, "-")}/
									</div>
									<div className="ml-4">
										📄 {formData.projectName.replace(/\s+/g, "")}Form.page.tsx
									</div>
									<div>
										📁 app/[locale]/(routes)/
										{formData.projectName.toLowerCase().replace(/\s+/g, "-")}/
									</div>
									<div className="ml-4">📄 page.tsx</div>
									<div className="ml-4">📁 [id]/edit/</div>
									<div className="ml-8">📄 page.tsx</div>
									<div>📁 types/</div>
									<div className="ml-4">
										📄 {formData.projectName.toLowerCase().replace(/\s+/g, "-")}
										.types.ts
									</div>
								</>
							) : (
								<div className="text-xs italic">Enter a project name to see structure preview</div>
							)}
						</div>
					</div>

					<div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
						<h4 className="font-medium mb-2 text-blue-900">Quick Setup Tips</h4>{" "}
						<ul className="text-sm text-blue-700 space-y-1">
							<li>&bull; Use descriptive project names (e.g., &quot;User Management&quot;)</li>
							<li>&bull; API endpoints should follow REST conventions</li>
							<li>&bull; Table headers will appear in the data table</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="flex justify-end pt-4 border-t">
				{" "}
				<Button
					disabled={!formData.projectName || !formData.apiEndpoint}
					onClick={onNext}
				>
					Continue to Form Builder
					<ArrowRight className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
