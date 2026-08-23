"use client";

import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputsEditor } from "./InputsEditor";

type FormStatus = {
	exists: boolean;
	modified: boolean;
};

type FormCardProps = {
	id: string;
	name: string;
	method: string;
	path: string;
	apiEndpoint: string;
	inputs: FormInput[];
	inputsJson: string;
	inputsError?: string;
	showInputs: boolean;
	showInputsJson: boolean;
	matchedEndpointKey: string | null;
	status?: FormStatus;
	onUpdate: (updates: {
		name?: string;
		method?: string;
		apiEndpoint?: string;
		showInputs?: boolean;
		showInputsJson?: boolean;
		inputsJson?: string;
	}) => void;
	onToggleInputs: () => void;
	onDelete: () => void;
	onReplaceInputs: (inputs: FormInput[]) => void;
	onRemoveInput: (index: number) => void;
	onApplyInputsJson: () => void;
	onResetInputsJson: () => void;
};

const METHOD_OPTIONS = ["GET", "POST", "PATCH", "PUT", "DELETE", "CUSTOM"];

export function FormCard({
	id,
	name,
	method,
	path,
	apiEndpoint,
	inputs,
	inputsJson,
	inputsError,
	showInputs,
	showInputsJson,
	matchedEndpointKey,
	status,
	onUpdate,
	onToggleInputs,
	onDelete,
	onReplaceInputs,
	onRemoveInput,
	onApplyInputsJson,
	onResetInputsJson,
}: FormCardProps) {
	return (
		<Card id={id}>
			<CardHeader>
				<div className="flex flex-wrap items-center justify-between gap-3">
					<div>
						<CardTitle className="text-lg">{name}</CardTitle>
						<CardDescription>{path}</CardDescription>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="secondary">{method}</Badge>
						{matchedEndpointKey ? (
							<Badge>Matched endpoint</Badge>
						) : (
							<Badge variant="destructive">Needs endpoint key</Badge>
						)}
						{status ? (
							status.exists ? (
								<Badge variant="secondary">Existing</Badge>
							) : (
								<Badge variant="outline">New</Badge>
							)
						) : (
							<Badge variant="outline">Not checked</Badge>
						)}
						{status?.modified ? <Badge variant="destructive">Modified</Badge> : null}
						<Button variant="outline" size="sm" onClick={onToggleInputs}>
							{showInputs ? "Hide Inputs" : "Edit Inputs"}
						</Button>
						<Button variant="destructive" size="sm" onClick={onDelete}>
							Delete Form
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<Label>Form Folder Name</Label>
						<Input
							value={name}
							onChange={(event) => onUpdate({ name: event.target.value })}
							placeholder="e.g. users"
						/>
					</div>
					<div className="space-y-2">
						<Label>HTTP Method</Label>
						<select
							value={method}
							onChange={(event) => onUpdate({ method: event.target.value })}
							className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
						>
							{METHOD_OPTIONS.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						<Label>API Endpoint (FormAction expression)</Label>
						<Input
							value={apiEndpoint}
							onChange={(event) => onUpdate({ apiEndpoint: event.target.value })}
							placeholder='e.g. ["users"]'
						/>
					</div>
				</div>

				{showInputs ? (
					<InputsEditor
						inputs={inputs}
						inputsJson={inputsJson}
						inputsError={inputsError}
						showInputsJson={showInputsJson}
						onReplaceInputs={onReplaceInputs}
						onRemoveInput={onRemoveInput}
						onToggleJson={() => onUpdate({ showInputsJson: !showInputsJson })}
						onInputsJsonChange={(value) => onUpdate({ inputsJson: value })}
						onApplyJson={onApplyInputsJson}
						onResetJson={onResetInputsJson}
					/>
				) : null}
			</CardContent>
		</Card>
	);
}
