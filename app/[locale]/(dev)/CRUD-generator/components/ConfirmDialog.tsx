import { Loader2 } from "lucide-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { FormData } from "../types";

interface ConfirmDialogProps {
	showDialog: boolean;
	setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
	formData: FormData;
	loading: boolean;
	onConfirm: () => void;
}

export const ConfirmDialog = ({
	showDialog,
	setShowDialog,
	formData,
	loading,
	onConfirm,
}: ConfirmDialogProps) => {
	return (
		<Dialog
			open={showDialog}
			onOpenChange={setShowDialog}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Confirm CRUD Generation</DialogTitle>
					<DialogDescription>
						This will generate a complete set of CRUD pages based on your configuration.
					</DialogDescription>
				</DialogHeader>

				<div className="py-4">
					<div className="space-y-4 rounded-md bg-muted p-4">
						<div className="flex justify-between items-center">
							<span className="font-medium">Folder Name:</span>
							<Badge variant="outline">{formData.rootFolderName}</Badge>
						</div>
						<div className="flex justify-between items-center">
							<span className="font-medium">API Endpoint:</span>
							<Badge variant="outline">{formData.apiEndpoint}</Badge>
						</div>
						<div className="flex justify-between items-center">
							<span className="font-medium">Total Filters:</span>
							<Badge>{formData.filters.length}</Badge>
						</div>
						<div className="flex justify-between items-center">
							<span className="font-medium">Details Page:</span>
							<Badge variant="outline">
								{formData.includeIdPage ? "Included" : "Not included"}
							</Badge>
						</div>
					</div>
				</div>

				<DialogFooter className="sm:justify-between">
					<Button
						variant="outline"
						onClick={() => setShowDialog(false)}
					>
						Cancel
					</Button>
					<Button
						onClick={onConfirm}
						disabled={loading}
						className="gap-2"
					>
						{loading ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" /> Processing...
							</>
						) : (
							<>Generate Now</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
