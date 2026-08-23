"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Copy, Download, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { GeneratedOutput } from "../types";

interface GeneratedFilesProps {
	generatedOutput: GeneratedOutput | null;
}

export function GeneratedFiles({ generatedOutput }: GeneratedFilesProps) {
	const [copiedFiles, setCopiedFiles] = useState<Set<string>>(new Set());

	const copyToClipboard = async (content: string, fileName: string) => {
		try {
			await navigator.clipboard.writeText(content);
			setCopiedFiles((prev) => new Set([...prev, fileName]));
			toast.success(`${fileName} copied to clipboard`);

			// Reset the copied state after 3 seconds
			setTimeout(() => {
				setCopiedFiles((prev) => {
					const newSet = new Set(prev);
					newSet.delete(fileName);
					return newSet;
				});
			}, 3000);
		} catch (err) {
			toast.error("Failed to copy to clipboard");
		}
	};

	const downloadFile = (content: string, fileName: string) => {
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		toast.success(`${fileName} downloaded`);
	};

	if (!generatedOutput) {
		return (
			<div className="space-y-6">
				<div className="flex items-center gap-2 mb-4">
					<FileText className="h-5 w-5 text-primary" />
					<h3 className="text-lg font-semibold">Generated Files</h3>
				</div>

				<div className="p-8 text-center border border-dashed rounded-lg">
					<AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
					<p className="text-muted-foreground">No files generated yet</p>
					<p className="text-sm text-muted-foreground">
						Complete the form setup and generate to see files here
					</p>
				</div>
			</div>
		);
	}

	const fileContents = [
		{
			name: "Form Component",
			fileName: "FormComponent.tsx",
			content: generatedOutput.formCode,
			type: "component",
		},
		{
			name: "Page Component",
			fileName: "PageComponent.tsx",
			content: generatedOutput.pageCode,
			type: "page",
		},
		{
			name: "CRUD Component",
			fileName: "CRUDComponent.tsx",
			content: generatedOutput.crudCode,
			type: "crud",
		},
		{
			name: "Types Definition",
			fileName: "types.ts",
			content: generatedOutput.typesCode,
			type: "types",
		},
	];

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<FileText className="h-5 w-5 text-primary" />
					<h3 className="text-lg font-semibold">Generated Files</h3>
				</div>
				<Badge
					variant="secondary"
					className="bg-green-100 text-green-800"
				>
					<CheckCircle className="h-3 w-3 mr-1" />
					{generatedOutput.files.length} files ready
				</Badge>
			</div>

			{/* File Structure Overview */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">Project Structure</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-2 text-sm font-mono">
						{generatedOutput.files.map((filePath, index) => (
							<div
								key={index.toString()}
								className="flex items-center gap-2"
							>
								<FileText className="h-4 w-4 text-muted-foreground" />
								<span className="text-muted-foreground">{filePath}</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Individual File Cards */}
			<div className="grid gap-4">
				{fileContents.map((file, index) => (
					<Card key={index.toString()}>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<FileText className="h-4 w-4" />
									<CardTitle className="text-base">{file.name}</CardTitle>
									<Badge
										variant="outline"
										className="text-xs"
									>
										{file.type}
									</Badge>
								</div>

								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => copyToClipboard(file.content, file.fileName)}
										disabled={copiedFiles.has(file.fileName)}
									>
										{copiedFiles.has(file.fileName) ? (
											<CheckCircle className="h-4 w-4 text-green-600" />
										) : (
											<Copy className="h-4 w-4" />
										)}
									</Button>

									<Button
										variant="ghost"
										size="sm"
										onClick={() => downloadFile(file.content, file.fileName)}
									>
										<Download className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardHeader>

						<CardContent>
							<div className="relative">
								<pre className="p-4 bg-muted rounded-lg text-xs overflow-auto max-h-48 border">
									<code>{file.content}</code>
								</pre>

								{copiedFiles.has(file.fileName) && (
									<div className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
										Copied!
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Action Buttons */}
			<Card>
				<CardHeader>
					<CardTitle className="text-base">Next Steps</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Button
								onClick={() => {
									fileContents.forEach((file) => {
										downloadFile(file.content, file.fileName);
									});
								}}
								className="w-full"
							>
								<Download className="mr-2 h-4 w-4" />
								Download All Files
							</Button>

							<Button
								variant="outline"
								onClick={() => {
									const allContent = fileContents
										.map((file) => `// ${file.fileName}\n${file.content}`)
										.join("\n\n" + "=".repeat(50) + "\n\n");
									copyToClipboard(allContent, "all-files");
								}}
								className="w-full"
							>
								<Copy className="mr-2 h-4 w-4" />
								Copy All to Clipboard
							</Button>
						</div>

						<div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
							<h4 className="font-medium mb-2 text-blue-900">Implementation Guide</h4>
							<ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
								<li>Copy or download the generated files</li>
								<li>Place them in the appropriate directories in your project</li>
								<li>Install any missing dependencies</li>
								<li>Update your routing if needed</li>
								<li>Test the functionality and customize as needed</li>
							</ol>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
