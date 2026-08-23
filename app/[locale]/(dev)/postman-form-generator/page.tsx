"use client";

import ColumnsGenerate from "@/app/[locale]/(dev)/CRUD-generator/components/column-generate";
import { ConfirmDialog } from "@/app/[locale]/(dev)/CRUD-generator/components/ConfirmDialog";
import { CrudForm } from "@/app/[locale]/(dev)/CRUD-generator/components/CrudForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { endpointType } from "@/utils/endpoints";
import { ArrowRight, FileCode, Loader2 } from "lucide-react";
import type React from "react";
import { CollectionCard } from "./components/CollectionCard";
import { FormCard } from "./components/FormCard";
import { usePostmanFormGenerator } from "./hooks/usePostmanFormGenerator";
import type { CrudState, EditablePostmanItem } from "./types";
import { createCrudState } from "./utils";

const updateCrudState = (
	setCrudStates: React.Dispatch<React.SetStateAction<Record<string, CrudState>>>,
	item: EditablePostmanItem,
	updater: (state: CrudState) => CrudState,
) => {
	setCrudStates((prev) => {
		const currentState = prev[item.id] ?? createCrudState(item);
		return {
			...prev,
			[item.id]: updater(currentState),
		};
	});
};

export default function PostmanFormGeneratorPage() {
	const {
		activeItemId,
		collectionText,
		confirmFormData,
		confirmLoading,
		crudStates,
		filteredItems,
		formStatuses,
		handleAddForm,
		handleApplyInputs,
		handleCheckStatuses,
		handleCopyEndpoints,
		handleCreateForms,
		handleCrudSubmit,
		handleParseCollection,
		handleRemoveInput,
		handleRemoveItem,
		handleReset,
		isCheckingStatus,
		isCopyingEndpoints,
		isCreating,
		items,
		matchFilter,
		processCrudSubmission,
		setActiveItemId,
		setCollectionText,
		setCrudStates,
		setMatchFilter,
		setShowConfirmDialog,
		showConfirmDialog,
		totalInputs,
		updateItem,
		updateInputs,
	} = usePostmanFormGenerator();

	return (
		<div className="container mx-auto max-w-6xl p-6 space-y-6">
			<div>
				<h1 className="text-3xl font-bold">Postman Collection Form Generator</h1>
				<p className="text-muted-foreground">
					Paste a Postman collection, review the detected routes and inputs, then generate
					forms.
				</p>
			</div>

			<CollectionCard
				collectionText={collectionText}
				onChange={setCollectionText}
				onParse={handleParseCollection}
				onClear={handleReset}
				onAddForm={handleAddForm}
				onCheckStatuses={() => handleCheckStatuses(items)}
				onCopyEndpoints={handleCopyEndpoints}
				matchFilter={matchFilter}
				onMatchFilterChange={setMatchFilter}
				isCheckingStatus={isCheckingStatus}
				disabledActions={items.length === 0}
				disableCopyEndpoints={items.length === 0 || isCopyingEndpoints}
				stats={
					<>
						{filteredItems.length} routes • {totalInputs} inputs
					</>
				}
			/>

			{filteredItems.length > 0 ? (
				<Tabs
					value={activeItemId || filteredItems[0]?.id}
					onValueChange={setActiveItemId}
					className="space-y-4"
				>
					<TabsList className="flex h-auto flex-wrap justify-start gap-2">
						{filteredItems.map((item) => (
							<TabsTrigger key={item.id} value={item.id} className="gap-2">
								<span className="font-semibold">{item.name}</span>
								<span className="text-xs text-muted-foreground">
									{item.method} {item.path}
								</span>
							</TabsTrigger>
						))}
					</TabsList>
					{filteredItems.map((item) => {
						const crudState = crudStates[item.id] ?? createCrudState(item);
						return (
							<TabsContent key={item.id} value={item.id}>
								<Tabs defaultValue="form" className="space-y-6">
									<TabsList>
										<TabsTrigger value="form">Form</TabsTrigger>
										<TabsTrigger value="crud">CRUD Page</TabsTrigger>
									</TabsList>
									<TabsContent value="form" className="space-y-4">
										<FormCard
											id={item.id}
											name={item.name}
											method={item.method}
											path={item.path}
											apiEndpoint={item.apiEndpoint}
											inputs={item.inputs}
											inputsJson={item.inputsJson}
											inputsError={item.inputsError}
											showInputs={item.showInputs}
											showInputsJson={item.showInputsJson}
											matchedEndpointKey={item.matchedEndpointKey}
											status={formStatuses[item.id]}
											onUpdate={(updates) => updateItem(item.id, updates)}
											onToggleInputs={() =>
												updateItem(item.id, { showInputs: !item.showInputs })
											}
											onDelete={() => handleRemoveItem(item.id)}
											onReplaceInputs={(inputs) => updateInputs(item.id, inputs)}
											onRemoveInput={(index) => handleRemoveInput(item.id, index)}
											onApplyInputsJson={() => handleApplyInputs(item.id)}
											onResetInputsJson={() => updateInputs(item.id, item.inputs)}
										/>
									</TabsContent>
									<TabsContent value="crud" className="space-y-4">
										<Card className="border-t-4 border-t-primary shadow-lg">
											<CardHeader className="pb-4">
												<div className="flex items-center gap-2">
													<FileCode className="h-6 w-6 text-primary" />
													<CardTitle className="text-2xl font-bold">CRUD Generator</CardTitle>
												</div>
											</CardHeader>
											<CardContent className="space-y-6">
												<form
													onSubmit={(event) => handleCrudSubmit(item.id, event)}
													className="space-y-8"
												>
													<CrudForm
														formData={crudState.formData}
														setFormData={(formData) =>
															updateCrudState(setCrudStates, item, (state) => ({
																...state,
																formData:
																	typeof formData === "function" ? formData(state.formData) : formData,
															}))
														}
														validationErrors={crudState.validationErrors}
														setValidationErrors={(errors) =>
															updateCrudState(setCrudStates, item, (state) => ({
																...state,
																validationErrors:
																	typeof errors === "function" ? errors(state.validationErrors) : errors,
															}))
														}
													/>
												</form>
											</CardContent>
											<ColumnsGenerate
												pageName={crudState.formData.tableHeader}
												onConfirm={(code) =>
													updateCrudState(setCrudStates, item, (state) => ({
														...state,
														columnConfigs: code,
													}))
												}
												endpoints={crudState.formData.apiEndpoint as endpointType}
											/>
											<CardFooter className="flex items-center justify-between p-6 bg-muted/20 border-t">
												<div className="text-sm text-muted-foreground">
													{crudState.formData.filters.length}{" "}
													{crudState.formData.filters.length === 1 ? "filter" : "filters"} configured
												</div>
												<Button
													type="submit"
													onClick={(event) => handleCrudSubmit(item.id, event)}
													disabled={crudState.isLoading}
													size="lg"
													className="gap-2"
												>
													{crudState.isLoading ? (
														<>
															<Loader2 className="size-5 animate-spin" /> Creating...
														</>
													) : (
														<>
															Generate CRUD Pages <ArrowRight className="size-5" />
														</>
													)}
												</Button>
											</CardFooter>
										</Card>
									</TabsContent>
								</Tabs>
							</TabsContent>
						);
					})}
				</Tabs>
			) : null}

			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="text-sm text-muted-foreground">
					Ensure every route has a valid endpoint key and input list before creating.
				</div>
				<Button onClick={handleCreateForms} disabled={isCreating || items.length === 0}>
					{isCreating ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
						</>
					) : (
						"Create Forms"
					)}
				</Button>
			</div>

			<ConfirmDialog
				showDialog={showConfirmDialog}
				setShowDialog={setShowConfirmDialog}
				formData={confirmFormData}
				loading={confirmLoading}
				onConfirm={processCrudSubmission}
			/>
		</div>
	);
}
