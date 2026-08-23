"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ReactNode } from "react";

type CollectionCardProps = {
	collectionText: string;
	onChange: (value: string) => void;
	onParse: () => void;
	onClear: () => void;
	onAddForm: () => void;
	onCheckStatuses: () => void;
	onCopyEndpoints: () => void;
	matchFilter: string;
	onMatchFilterChange: (value: string) => void;
	isCheckingStatus: boolean;
	disabledActions: boolean;
	disableCopyEndpoints: boolean;
	stats: ReactNode;
};

export function CollectionCard({
	collectionText,
	onChange,
	onParse,
	onClear,
	onAddForm,
	onCheckStatuses,
	onCopyEndpoints,
	matchFilter,
	onMatchFilterChange,
	isCheckingStatus,
	disabledActions,
	disableCopyEndpoints,
	stats,
}: CollectionCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Postman Collection</CardTitle>
				<CardDescription>Paste the raw JSON collection to extract routes.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="collection-json">Collection JSON</Label>
					<Textarea
						id="collection-json"
						value={collectionText}
						onChange={(event) => onChange(event.target.value)}
						rows={10}
						placeholder="Paste Postman collection JSON here"
						className="font-mono text-sm"
					/>
				</div>
				<div className="flex flex-wrap items-center gap-3">
					<div className="flex items-center gap-2">
						<span className="text-sm text-muted-foreground">Match filter</span>
						<select
							value={matchFilter}
							onChange={(event) => onMatchFilterChange(event.target.value)}
							className="h-9 rounded-md border border-input bg-background px-3 text-sm"
						>
							<option value="all">All</option>
							<option value="matched">Matched endpoints</option>
							<option value="unmatched">Needs endpoint key</option>
						</select>
					</div>
					<Button onClick={onParse}>Parse Collection</Button>
					<Button variant="outline" onClick={onClear}>
						Clear
					</Button>
					<Button variant="secondary" onClick={onAddForm}>
						Add Form
					</Button>
					<Button
						variant="outline"
						onClick={onCheckStatuses}
						disabled={disabledActions || isCheckingStatus}
					>
						{isCheckingStatus ? "Checking..." : "Check Existing Forms"}
					</Button>
					<Button
						variant="outline"
						onClick={onCopyEndpoints}
						disabled={disableCopyEndpoints}
					>
						Copy Endpoints
					</Button>
					<div className="text-sm text-muted-foreground">{stats}</div>
				</div>
			</CardContent>
		</Card>
	);
}
