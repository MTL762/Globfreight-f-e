"use client";

import { Code, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CombinedFormData, GeneratedOutput } from "../types";

interface FormPreviewProps {
	formData: CombinedFormData;
	generatedOutput: GeneratedOutput | null;
}

export function FormPreview({ formData, generatedOutput }: FormPreviewProps) {
	const renderFormPreview = () => {
		if (formData.formFields.length === 0) {
			return (
				<div className="p-8 text-center border border-dashed rounded-lg">
					<Eye className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
					<p className="text-muted-foreground">No form fields to preview</p>
					<p className="text-sm text-muted-foreground">Add some fields in the Form Builder tab</p>
				</div>
			);
		}

		return (
			<div className="space-y-4 p-6 border rounded-lg bg-background">
				<h3 className="text-lg font-semibold mb-4">
					{formData.pageInfo.name || formData.projectName || "Form"} Preview
				</h3>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{formData.formFields.map((field, index) => (
						<div
							key={index}
							className="space-y-2"
						>
							<label className="text-sm font-medium capitalize">
								{field.name.replace(/([A-Z])/g, " $1").trim()}
							</label>

							{field.type === "textarea" ? (
								<textarea
									className="w-full p-2 border rounded-md bg-muted/50"
									placeholder={`Enter ${field.name}`}
									rows={3}
									disabled
								/>
							) : field.type === "select" ? (
								<select
									className="w-full p-2 border rounded-md bg-muted/50"
									disabled
								>
									<option>Select {field.name}</option>
									{field.options?.map((option, optIndex) => (
										<option
											key={optIndex}
											value={option.value.toString()}
										>
											{option.label || option.value}
										</option>
									))}
								</select>
							) : field.type === "checkbox" ? (
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										disabled
										className="h-4 w-4"
									/>
									<span className="text-sm text-muted-foreground">
										{field.name.replace(/([A-Z])/g, " $1").trim()}
									</span>
								</div>
							) : field.type === "file" ? (
								<div className="w-full p-2 border border-dashed rounded-md bg-muted/50 text-center text-sm text-muted-foreground">
									Click to upload file
								</div>
							) : (
								<input
									type={
										field.type === "number" ? "number" : field.type === "email" ? "email" : "text"
									}
									className="w-full p-2 border rounded-md bg-muted/50"
									placeholder={`Enter ${field.name}`}
									disabled
								/>
							)}
						</div>
					))}
				</div>

				<div className="flex gap-3 pt-4 border-t">
					<Button className="bg-primary">Submit</Button>
					<Button variant="outline">Cancel</Button>
				</div>
			</div>
		);
	};

	const renderCodePreview = () => {
		if (!generatedOutput) {
			return (
				<div className="p-8 text-center border border-dashed rounded-lg">
					<Code className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
					<p className="text-muted-foreground">No generated code available</p>
					<p className="text-sm text-muted-foreground">Generate the form first to see the code</p>
				</div>
			);
		}

		return (
			<Tabs
				defaultValue="form"
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-4">
					<TabsTrigger value="form">Form Component</TabsTrigger>
					<TabsTrigger value="page">Page Component</TabsTrigger>
					<TabsTrigger value="crud">CRUD Component</TabsTrigger>
					<TabsTrigger value="types">Types</TabsTrigger>
				</TabsList>

				<TabsContent
					value="form"
					className="mt-4"
				>
					<pre className="p-4 bg-muted rounded-lg text-sm overflow-auto max-h-96">
						<code>{generatedOutput.formCode}</code>
					</pre>
				</TabsContent>

				<TabsContent
					value="page"
					className="mt-4"
				>
					<pre className="p-4 bg-muted rounded-lg text-sm overflow-auto max-h-96">
						<code>{generatedOutput.pageCode}</code>
					</pre>
				</TabsContent>

				<TabsContent
					value="crud"
					className="mt-4"
				>
					<pre className="p-4 bg-muted rounded-lg text-sm overflow-auto max-h-96">
						<code>{generatedOutput.crudCode}</code>
					</pre>
				</TabsContent>

				<TabsContent
					value="types"
					className="mt-4"
				>
					<pre className="p-4 bg-muted rounded-lg text-sm overflow-auto max-h-96">
						<code>{generatedOutput.typesCode}</code>
					</pre>
				</TabsContent>
			</Tabs>
		);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2 mb-4">
				<Eye className="h-5 w-5 text-primary" />
				<h3 className="text-lg font-semibold">Preview & Code</h3>
			</div>

			<Tabs
				defaultValue="visual"
				className="w-full"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="visual"
						className="flex items-center gap-2"
					>
						<Eye className="h-4 w-4" />
						Visual Preview
					</TabsTrigger>
					<TabsTrigger
						value="code"
						className="flex items-center gap-2"
					>
						<Code className="h-4 w-4" />
						Generated Code
					</TabsTrigger>
				</TabsList>

				<TabsContent
					value="visual"
					className="mt-6"
				>
					<Card>
						<CardHeader>
							<CardTitle>Form Visual Preview</CardTitle>
						</CardHeader>
						<CardContent>{renderFormPreview()}</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value="code"
					className="mt-6"
				>
					<Card>
						<CardHeader>
							<CardTitle>Generated Code Preview</CardTitle>
						</CardHeader>
						<CardContent>{renderCodePreview()}</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{formData.formFields.length > 0 && (
				<div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
					<h4 className="font-medium mb-2 text-blue-900">Project Summary</h4>
					<div className="text-sm text-blue-700 space-y-1">
						<div>
							<strong>Project:</strong> {formData.projectName}
						</div>
						<div>
							<strong>API Endpoint:</strong> {formData.apiEndpoint}
						</div>
						<div>
							<strong>Form Fields:</strong> {formData.formFields.length} fields
						</div>
						<div>
							<strong>Field Types:</strong>{" "}
							{[...new Set(formData.formFields.map((f) => f.type))].join(", ")}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
