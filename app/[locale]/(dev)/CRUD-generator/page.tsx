"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FileCode, Loader2 } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { CrudForm } from "./components/CrudForm";
import ColumnsGenerate from "./components/column-generate";
import type { Filter, FormData } from "./types";

const DEFAULT_FILTER: Filter = { key: "name", width: 3, type: "text" };

const CrudPage = () => {
  const [formData, setFormData] = useState<FormData>({
    rootFolderName: "",
    apiEndpoint: [],
    tableHeader: "",
    filters: [{ ...DEFAULT_FILTER }],
    includeIdPage: false
  });
  const [loading, setLoading] = useState(false);
  const [columnConfigs, setColumnConfigs] = useState<string>("");
  const [typeFileContent, setTypeFileContent] = useState<string>("");
  console.log(columnConfigs, typeFileContent);
  // Refs to always have latest values in processSubmission (avoid stale closure)
  const columnConfigsRef = useRef<string>("");
  const typeFileContentRef = useRef<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.rootFolderName.trim()) {
      errors.rootFolderName = "Folder name is required";
    }

    if (formData.apiEndpoint?.length === 0) {
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

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setShowConfirmDialog(true);
  };

  const processSubmission = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    console.log(columnConfigsRef.current, "columnConfigsRef.current");
    try {
      const response = await fetch("/api/crud/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          columnConfigs: columnConfigsRef.current,
          typeFileContent: typeFileContentRef.current
        })
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Unknown error occurred" }));
        throw new Error(errorData.message || "Failed to create CRUD pages");
      }

      toast.success("CRUD pages created successfully!");
    } catch (err) {
      const errorMessage =
        err && typeof err === "object" && "message" in err && typeof err.message === "string"
          ? err.message
          : "Error creating CRUD pages";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <Card className="border-t-4 border-t-primary shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <FileCode className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">CRUD Generator</CardTitle>
          </div>
        </CardHeader>
        <div className="ps-4 mt-5">Form Configuration</div>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <CrudForm
              formData={formData}
              setFormData={setFormData}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
            />
          </form>
        </CardContent>
        <ColumnsGenerate
          pageName={formData.tableHeader}
          onConfirm={code => {
            setColumnConfigs(code);
            columnConfigsRef.current = code;
          }}
          endpoints={formData.apiEndpoint as any}
          onTypeGenerated={content => {
            setTypeFileContent(content);
            typeFileContentRef.current = content;
          }}
        />

        <CardFooter className="flex items-center justify-between p-6 bg-muted/20 border-t">
          <div className="text-sm text-muted-foreground">
            {formData.filters.length} {formData.filters.length === 1 ? "filter" : "filters"}{" "}
            configured
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            size="lg"
            className="gap-2"
          >
            {loading ? (
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

      <ConfirmDialog
        showDialog={showConfirmDialog}
        setShowDialog={setShowConfirmDialog}
        formData={formData}
        loading={loading}
        onConfirm={processSubmission}
      />
    </div>
  );
};

export default CrudPage;
