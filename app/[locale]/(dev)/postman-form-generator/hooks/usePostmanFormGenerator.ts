import { DEFAULT_FILTER, type FormData } from "@/app/[locale]/(dev)/CRUD-generator/types";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { parseOpenAPISpec, isOpenAPISpec } from "@/utils/openapi-parser";
import { normalizePostmanName, parsePostmanCollection, type ParsedPostmanItem } from "@/utils/postman";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import type { CrudState, EditablePostmanItem, FormStatus } from "../types";
import { buildInputsJson, createCrudState, parseApiEndpoints, parseInputsJson } from "../utils";

const EMPTY_FORM_DATA: FormData = {
	rootFolderName: "",
	apiEndpoint: [],
	tableHeader: "",
	filters: [{ ...DEFAULT_FILTER }],
	includeIdPage: false,
};

export const usePostmanFormGenerator = () => {
	const [collectionText, setCollectionText] = useState("");
	const [items, setItems] = useState<EditablePostmanItem[]>([]);
	const [isCreating, setIsCreating] = useState(false);
	const [formStatuses, setFormStatuses] = useState<Record<string, FormStatus>>({});
	const [isCheckingStatus, setIsCheckingStatus] = useState(false);
	const [matchFilter, setMatchFilter] = useState("all");
	const [crudStates, setCrudStates] = useState<Record<string, CrudState>>({});
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [confirmItemId, setConfirmItemId] = useState<string | null>(null);
	const [activeItemId, setActiveItemId] = useState("");
	const [isCopyingEndpoints, setIsCopyingEndpoints] = useState(false);

	const filteredItems = useMemo(() => {
		if (matchFilter === "matched") {
			return items.filter((item) => item.matchedEndpointKey);
		}
		if (matchFilter === "unmatched") {
			return items.filter((item) => !item.matchedEndpointKey);
		}
		return items;
	}, [items, matchFilter]);

	const totalInputs = useMemo(
		() => filteredItems.reduce((count, item) => count + item.inputs.length, 0),
		[filteredItems],
	);

	const handleParseCollection = () => {
		if (!collectionText.trim()) {
			toast.error("Please paste a Postman collection or OpenAPI spec JSON first.");
			return;
		}

		try {
			const parsedCollection = JSON.parse(collectionText);
			let parsedItems: ParsedPostmanItem[];

			if (isOpenAPISpec(parsedCollection)) {
				parsedItems = parseOpenAPISpec(parsedCollection);
			} else {
				parsedItems = parsePostmanCollection(parsedCollection);
			}

			const endpointGroups = parsedItems.reduce((groups, item) => {
				const basePath = item.path;
				if (!groups[basePath]) {
					groups[basePath] = new Map<string, ParsedPostmanItem>();
				}
				groups[basePath].set(item.method, item);
				return groups;
			}, {} as Record<string, Map<string, ParsedPostmanItem>>);

			const filteredParsedItems = Object.entries(endpointGroups)
				.filter(([, methods]) => methods.size >= 2)
				.map(([basePath, methods]) => {
					const methodList = Array.from(methods.keys()).sort();
					const firstItem = Array.from(methods.values())[0];
					return {
						...firstItem,
						path: basePath,
						method: methodList.join(", "),
						methods: methodList,
						name: firstItem.name,
					};
				});

			if (!filteredParsedItems.length) {
				toast.error("No endpoints with at least 2 methods were found in this collection.");
				setItems([]);
				return;
			}

			const newItems: EditablePostmanItem[] = filteredParsedItems.map((item, index) => ({
				id: `${Date.now()}-${index}`,
				name: item.name,
				method: item.method,
				path: item.path,
				apiEndpoint: item.apiEndpoint,
				inputs: item.inputs,
				matchedEndpointKey: item.matchedEndpointKey,
				inputsJson: buildInputsJson(item.inputs),
				showInputs: false,
				showInputsJson: false,
			}));

			setItems(newItems);
			setCrudStates((prev) => {
				const nextStates: Record<string, CrudState> = {};
				newItems.forEach((item) => {
					nextStates[item.id] = prev[item.id] ?? createCrudState(item);
				});
				return nextStates;
			});
			setActiveItemId(newItems[0]?.id ?? "");
			toast.success(`Parsed ${newItems.length} request(s) successfully.`);
		} catch (_error) {
			toast.error("Invalid JSON. Please paste a valid Postman collection or OpenAPI spec.");
		}
	};

	const updateItem = (id: string, updates: Partial<EditablePostmanItem>) => {
		setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
	};

	const handleApplyInputs = (id: string) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id !== id) {
					return item;
				}

				const parsedInputs = parseInputsJson(item.inputsJson);

				if (!parsedInputs) {
					return {
						...item,
						inputsError: "Inputs must be a valid JSON array.",
					};
				}

				return {
					...item,
					inputs: parsedInputs,
					inputsError: undefined,
					inputsJson: buildInputsJson(parsedInputs),
				};
			}),
		);
	};

	const handleRemoveInput = (id: string, index: number) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id !== id) {
					return item;
				}

				const nextInputs = item.inputs.filter((_, inputIndex) => inputIndex !== index);

				return {
					...item,
					inputs: nextInputs,
					inputsJson: buildInputsJson(nextInputs),
					inputsError: undefined,
				};
			}),
		);
	};

	const updateInputs = (id: string, inputs: FormInput[]) => {
		setItems((prev) =>
			prev.map((item) => {
				if (item.id !== id) {
					return item;
				}

				return {
					...item,
					inputs,
					inputsJson: buildInputsJson(inputs),
					inputsError: undefined,
				};
			}),
		);
	};

	const handleAddForm = () => {
		const newItem: EditablePostmanItem = {
			id: `${Date.now()}`,
			name: "New Form",
			method: "POST",
			path: "/api/new",
			apiEndpoint: '["new"]',
			inputs: [],
			matchedEndpointKey: null,
			inputsJson: "[]",
			showInputs: true,
			showInputsJson: false,
		};
		setItems((prev) => [...prev, newItem]);
		setCrudStates((prev) => ({
			...prev,
			[newItem.id]: createCrudState(newItem),
		}));
		setActiveItemId(newItem.id);
		toast.success("New form added. Configure it below.");
	};

	const handleRemoveItem = (id: string) => {
		if (!window.confirm("Delete this form block? This cannot be undone.")) {
			return;
		}

		setItems((prev) => prev.filter((item) => item.id !== id));
		setFormStatuses((prev) => {
			const next = { ...prev };
			delete next[id];
			return next;
		});
		setCrudStates((prev) => {
			const next = { ...prev };
			delete next[id];
			return next;
		});
		setActiveItemId((prev) => (prev === id ? "" : prev));
	};

	const handleCheckStatuses = async (itemsToCheck: EditablePostmanItem[]) => {
		if (!itemsToCheck.length) {
			return;
		}

		setIsCheckingStatus(true);

		try {
			const response = await fetch("/api/postman-form-status", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					items: itemsToCheck.map((item) => ({
						id: item.id,
						name: item.name,
					})),
				}),
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.error || "Failed to check form statuses.");
			}

			setFormStatuses(result.statuses);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Failed to check form statuses.");
		} finally {
			setIsCheckingStatus(false);
		}
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			handleCheckStatuses(items);
		}, 500);

		return () => clearTimeout(timeout);
	}, [items]);

	useEffect(() => {
		if (filteredItems.length === 0) {
			setActiveItemId("");
			return;
		}

		const isActiveValid = filteredItems.some((item) => item.id === activeItemId);
		if (!isActiveValid) {
			setActiveItemId(filteredItems[0]?.id ?? "");
		}
	}, [filteredItems, activeItemId]);

	const handleCreateForms = async () => {
		if (!items.length) {
			toast.error("No forms to create. Parse a Postman collection first.");
			return;
		}

		const invalidItems = items.filter(
			(item) => !item.name.trim() || !item.apiEndpoint.trim() || item.inputs.length === 0,
		);

		if (invalidItems.length) {
			toast.error("Each form must have a name, api endpoint, and at least one input.");
			return;
		}

		setIsCreating(true);

		try {
			const response = await fetch("/api/postman-collection", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					items: items.map((item) => ({
						name: normalizePostmanName(item.name),
						apiEndpoint: item.apiEndpoint,
						inputs: item.inputs,
					})),
				}),
			});

			const result = await response.json();

			if (!response.ok || !result.success) {
				throw new Error(result.error || "Failed to create forms from Postman collection.");
			}

			toast.success("Forms created successfully.");
		} catch (_error) {
			toast.error(_error instanceof Error ? _error.message : "Failed to create forms.");
		} finally {
			setIsCreating(false);
		}
	};

	const validateCrudForm = (itemId: string): boolean => {
		const currentState = crudStates[itemId];
		if (!currentState) {
			return false;
		}
		const { formData } = currentState;
		const errors: { [key: string]: string } = {};

		if (!formData.rootFolderName.trim()) {
			errors.rootFolderName = "Folder name is required";
		}

		if (formData.apiEndpoint.length === 0) {
			errors.apiEndpoint = "API endpoint is required";
		}

		if (!formData.tableHeader.trim()) {
			errors.tableHeader = "Table header is required";
		}

		formData.filters.forEach((filter, index) => {
			if (!filter.key.trim()) {
				errors[`filters[${index}].key`] = "Key is required";
			}
			if (
				filter.width !== undefined &&
				(filter.width < 1 || filter.width > 6 || !Number.isInteger(filter.width))
			) {
				errors[`filters[${index}].width`] = "Width must be an integer between 1 and 6";
			}
			if (!filter.type) {
				errors[`filters[${index}].type`] = "Type is required";
			}

			if (filter.type === "selectMenu" || filter.type === "infiniteMultiSelect") {
				if (!filter.apiEndpoint?.trim()) {
					errors[`filters[${index}].apiEndpoint`] = "API endpoint is required for select types";
				}
				if (!filter.labelField?.trim()) {
					errors[`filters[${index}].labelField`] = "Label field is required for select types";
				}
			}
		});

		setCrudStates((prev) => ({
			...prev,
			[itemId]: {
				...prev[itemId],
				validationErrors: errors,
			},
		}));
		return Object.keys(errors).length === 0;
	};

	const handleCrudSubmit = (itemId: string, event: FormEvent) => {
		event.preventDefault();

		if (!validateCrudForm(itemId)) {
			return;
		}

		setConfirmItemId(itemId);
		setShowConfirmDialog(true);
	};

	const processCrudSubmission = async () => {
		if (!confirmItemId || !crudStates[confirmItemId]) {
			setShowConfirmDialog(false);
			return;
		}
		const { formData, columnConfigs } = crudStates[confirmItemId];
		setShowConfirmDialog(false);
		setCrudStates((prev) => ({
			...prev,
			[confirmItemId]: {
				...prev[confirmItemId]!,
				isLoading: true,
			},
		}));
		try {
			const response = await fetch("/api/crud/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...formData, columnConfigs }),
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: "Unknown error occurred" }));
				throw new Error(errorData.message || "Failed to create CRUD pages");
			}

			toast.success("CRUD pages created successfully!");
		} catch (error) {
			const errorMessage =
				error && typeof error === "object" && "message" in error && typeof error.message === "string"
					? error.message
					: "Error creating CRUD pages";
			toast.error(errorMessage);
		} finally {
			setCrudStates((prev) => ({
				...prev,
				[confirmItemId]: {
					...prev[confirmItemId]!,
					isLoading: false,
				},
			}));
		}
	};

	const handleCopyEndpoints = async () => {
		const endpointList = items.flatMap((item) => parseApiEndpoints(item.apiEndpoint));
		const uniqueEndpoints = Array.from(new Set(endpointList.map((endpoint) => endpoint.trim())))
			.filter(Boolean)
			.sort((a, b) => a.localeCompare(b));

		if (!uniqueEndpoints.length) {
			toast.error("No endpoints available to copy.");
			return;
		}

		setIsCopyingEndpoints(true);
		try {
			await navigator.clipboard.writeText(uniqueEndpoints.join("\n"));
			toast.success(`Copied ${uniqueEndpoints.length} unique endpoint(s).`);
		} catch (_error) {
			toast.error("Failed to copy endpoints. Please try again.");
		} finally {
			setIsCopyingEndpoints(false);
		}
	};

	const handleReset = () => {
		setCollectionText("");
		setItems([]);
		setCrudStates({});
		setActiveItemId("");
	};

	const confirmFormData = confirmItemId
		? crudStates[confirmItemId]?.formData ?? EMPTY_FORM_DATA
		: EMPTY_FORM_DATA;
	const confirmLoading = confirmItemId ? crudStates[confirmItemId]?.isLoading ?? false : false;

	return {
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
	};
};
