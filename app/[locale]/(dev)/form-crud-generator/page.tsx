"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode, Loader2, Zap } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { CrudSettings } from "./components/CrudSettings";
import { FormCrudGenerator } from "./components/FormCrudGenerator";
import { FormPreview } from "./components/FormPreview";
import { GeneratedFiles } from "./components/GeneratedFiles";
import { ProjectSetup } from "./components/ProjectSetup";
import type { CombinedFormData, GeneratedOutput } from "./types";

type TabKey = "setup" | "form" | "crud" | "preview" | "files";

const INITIAL_FORM_DATA: CombinedFormData = {
  projectName: "",
  apiEndpoint: "",
  tableHeader: "",
  crudFilters: [],
  formFields: [],
  pageInfo: {
    name: "",
    apiUrl: ""
  }
};

const MemoProjectSetup = memo(ProjectSetup);
const MemoFormCrudGenerator = memo(FormCrudGenerator);
const MemoCrudSettings = memo(CrudSettings);
const MemoFormPreview = memo(FormPreview);
const MemoGeneratedFiles = memo(GeneratedFiles);

export default function FormCrudGeneratorPage() {
  const [formData, setFormData] = useState<CombinedFormData>(INITIAL_FORM_DATA);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("setup");
  const [generatedOutput, setGeneratedOutput] = useState<GeneratedOutput | null>(null);

  const setTab = useCallback((tab: TabKey) => {
    setActiveTab(tab);
  }, []);

  const hasFormFields = formData.formFields.length > 0;

  const validateForm = useCallback((): boolean => {
    if (!formData.projectName.trim()) {
      toast.error("Project name is required");
      setTab("setup");
      return false;
    }

    if (!formData.apiEndpoint.trim()) {
      toast.error("API endpoint is required");
      setTab("setup");
      return false;
    }

    if (!hasFormFields) {
      toast.error("At least one form field is required");
      setTab("form");
      return false;
    }

    return true;
  }, [formData.projectName, formData.apiEndpoint, hasFormFields, setTab]);

  const handleGenerateAll = useCallback(async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/generate-form-crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Generation failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Generation failed");
      }

      const output: GeneratedOutput = {
        formCode: result.generatedCode.formCode,
        crudCode: result.generatedCode.crudCode,
        pageCode: result.generatedCode.pageCode,
        typesCode: result.generatedCode.typesCode,
        files: result.files
      };

      setGeneratedOutput(output);
      toast.success("Form and CRUD files generated successfully!");
      setTab("files");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate files";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [formData, setTab, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setGeneratedOutput(null);
    setTab("setup");
  }, [setTab]);

  const goToForm = useCallback(() => setTab("form"), [setTab]);
  const goToPreview = useCallback(() => setTab("preview"), [setTab]);

  const isGenerateDisabled = useMemo(() => loading || !hasFormFields, [loading, hasFormFields]);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          Form & CRUD Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate complete form components and CRUD operations in one workflow
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Generator</CardTitle>
          <CardDescription>
            Create forms, CRUD operations, and pages with a unified interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabKey)}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="setup">Project Setup</TabsTrigger>
              <TabsTrigger value="form">Form Builder</TabsTrigger>
              <TabsTrigger value="crud">CRUD Settings</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="files">Generated Files</TabsTrigger>
            </TabsList>{" "}
            <TabsContent value="setup" className="mt-6">
              <MemoProjectSetup
                formData={formData}
                setFormData={setFormData}
                onNext={goToForm}
              />
            </TabsContent>
            <TabsContent value="form" className="mt-6">
              <MemoFormCrudGenerator formData={formData} setFormData={setFormData} />
            </TabsContent>{" "}
            <TabsContent value="crud" className="mt-6">
              <MemoCrudSettings formData={formData} setFormData={setFormData} />
            </TabsContent>
            <TabsContent value="preview" className="mt-6">
              <MemoFormPreview formData={formData} generatedOutput={generatedOutput} />
            </TabsContent>
            <TabsContent value="files" className="mt-6">
              <MemoGeneratedFiles generatedOutput={generatedOutput} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button variant="outline" onClick={resetForm}>
              Reset All
            </Button>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={goToPreview}
                disabled={!hasFormFields}
              >
                Preview
              </Button>

              <Button
                onClick={handleGenerateAll}
                disabled={isGenerateDisabled}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    <FileCode className="mr-2 h-4 w-4" />
                    Generate All
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
