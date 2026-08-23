import { RefreshCw } from "lucide-react";
import SelectInput from "@/components/common/Inputs/select/SelectInputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { endpoints } from "@/utils/endpoints";
import type { FormPageInfo } from "../../helpers/static";

interface PageInfoSectionProps {
	pageInfo: FormPageInfo;
	setPageInfo: React.Dispatch<React.SetStateAction<FormPageInfo>>;
	handleClearAll: () => void;
}

export function PageInfoSection({ pageInfo, setPageInfo, handleClearAll }: PageInfoSectionProps) {
	return (
		<Card className="mb-6">
			<CardHeader className="flex flex-row items-center justify-between space-y-0">
				<CardTitle>Page Information</CardTitle>
				<Button
					variant="outline"
					size="sm"
					onClick={handleClearAll}
				>
					<RefreshCw className="h-4 w-4 mr-2" />
					Clear All
				</Button>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<Label
							htmlFor="pageName"
							className="text-sm font-medium"
						>
							Page Name
						</Label>
						<Input
							id="pageName"
							value={pageInfo.name}
							onChange={(e) => setPageInfo((prev) => ({ ...prev, name: e.target.value }))}
							placeholder="Enter page name (e.g., UserProfile)"
							className="focus:ring-2 focus:ring-primary/20"
						/>
					</div>
					<div className="space-y-2">
						<Label
							htmlFor="apiEndpoint"
							className="text-sm font-medium"
						>
							API Endpoint
						</Label>
						<SelectInput
							name="apiUrl"
							options={Object.entries(endpoints).map(([key, value]) => ({
								value: key,
								label: `${key} ==> ${value}`,
							}))}
							value={pageInfo.apiUrl}
							onChange={(value) => setPageInfo((prev) => ({ ...prev, apiUrl: `['${value}']` }))}
							className="focus:ring-2 focus:ring-primary/20"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
