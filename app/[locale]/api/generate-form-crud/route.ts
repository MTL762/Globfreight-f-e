import { createFolderStructure as createFormStructure } from "@/app/[locale]/(dev)/formCardCLI/formCreator.cli";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { exec } from "child_process";
import { NextResponse } from "next/server";
import { withIdempotency } from "@/lib/idempotency";

interface CrudFilter {
	key: string;
	width?: number;
	type: string;
	apiEndpoint?: string;
	labelField?: string;
}

interface GenerateFormCrudRequest {
	projectName: string;
	apiEndpoint: string;
	tableHeader: string;
	crudFilters: CrudFilter[];
	formFields: FormInput[];
	pageInfo: {
		name: string;
		apiUrl: string;
	};
}

const runShellCommand = (command: string) => {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				reject(`Error: ${stderr}`);
			} else {
				resolve(stdout);
			}
		});
	});
};

export async function POST(req: Request) {
	return withIdempotency(req, async () => {
	try {
		const body = (await req.json()) as GenerateFormCrudRequest;
		const { projectName, apiEndpoint, tableHeader, crudFilters, formFields } = body;

		// Validate input
		if (!projectName || !apiEndpoint || !formFields?.length) {
			return NextResponse.json(
				{
					error: "Missing required fields: projectName, apiEndpoint, or formFields",
				},
				{ status: 400 },
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const results: any[] = [];

		// 1. Generate Form Structure
		try {
			const formResult = createFormStructure(projectName, apiEndpoint, formFields);
			results.push({
				type: "form",
				success: true,
				message: "Form structure created successfully",
				data: formResult,
			});
		} catch (formError) {
			results.push({
				type: "form",
				success: false,
				error: formError instanceof Error ? formError.message : "Form generation failed",
			});
		}

		// 2. Generate CRUD Structure (if filters provided)
		if (crudFilters?.length > 0 && tableHeader) {
			try {
				const filtersString = JSON.stringify(crudFilters).replace(/"/g, '\\"');
				const tableHeaderString = JSON.stringify(tableHeader).replace(/"/g, '\\"');
				const command = `npm run create-crud ${projectName} ${apiEndpoint} "${filtersString}" "${tableHeaderString}"`;

				const crudResult = await runShellCommand(command);
				results.push({
					type: "crud",
					success: true,
					message: "CRUD structure created successfully",
					data: crudResult,
				});
			} catch (crudError) {
				results.push({
					type: "crud",
					success: false,
					error: crudError instanceof Error ? crudError.message : "CRUD generation failed",
				});
			}
		}

		// 3. Generate code samples for preview
		const generatedCode = generateCodeSamples(projectName, apiEndpoint, formFields, crudFilters);

		return NextResponse.json({
			success: true,
			message: "Project generation completed",
			results,
			generatedCode,
			files: generateFileList(projectName),
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Failed to generate project";
		return NextResponse.json({ error: message }, { status: 500 });
	}

	});
}

function generateCodeSamples(
	projectName: string,
	apiEndpoint: string,
	formFields: FormInput[],
	crudFilters: CrudFilter[],
) {
	const capitalizedName = projectName.charAt(0).toUpperCase() + projectName.slice(1);
	const kebabName = projectName.toLowerCase().replace(/\s+/g, "-");

	return {
		formCode: generateFormComponentCode(capitalizedName, formFields, apiEndpoint),
		pageCode: generatePageComponentCode(capitalizedName, kebabName, apiEndpoint),
		crudCode: generateCrudCode(capitalizedName, crudFilters),
		typesCode: generateTypesCode(capitalizedName, formFields),
	};
}

function generateFormComponentCode(name: string, fields: FormInput[], apiEndpoint: string): string {
	const fieldsCode = fields
		.map(
			(field) => `
    {
      name: "${field.name}",
      type: "${field.type}",
      ${field.options ? `options: ${JSON.stringify(field.options)},` : ""}
      ${field.multiLang ? `multiLang: true,` : ""}
      required: ${field.required === true ? "true" : "false"}
    }`,
		)
		.join(",");

	return `"use client";

import { CustomForm } from "@/components/common/Form/CustomForm";
import type { FormInput } from "@/components/common/Form/CustomFormTypes.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { use${name}FormLogic } from "./use${name}Form.logic";

interface ${name}FormPageProps {
  data?: any;
  isEdit?: boolean;
}

const ${name}FormPage = ({ data, isEdit = false }: ${name}FormPageProps) => {
  const router = useRouter();
  const { handleSubmit, loading } = use${name}FormLogic({ data, isEdit });

  const inputs: FormInput[] = [${fieldsCode}
  ];

  const onSubmit = async (formData: any) => {
    try {
      const result = await handleSubmit(formData);
      if (result.success) {
        toast.success(isEdit ? "${name} updated successfully" : "${name} created successfully");
        router.push("/${apiEndpoint.replace("/api/", "")}");
      } else {
        toast.error(result.message || "Operation failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? "Edit ${name}" : "Create ${name}"}
      </h1>
      
      <CustomForm
        inputs={inputs}
        onSubmit={onSubmit}
        defaultValues={data}
        loading={loading}
        submitText={isEdit ? "Update" : "Create"}
      />
    </div>
  );
};

export default ${name}FormPage;`;
}

function generatePageComponentCode(name: string, kebabName: string, apiEndpoint: string): string {
	console.log(apiEndpoint);
	return `import { fetchHelper } from "@/api/fetch";
import ${name}FormPage from "@/components/pages/_${kebabName}/${kebabName}Form.page";
import CustomHeader from "@/components/layouts/header/CustomHeader";
import { endpoints } from "@/utils/endpoints";


interface ${name}PageProps {
  params: Promise<{ id?: string }>;
}

export default async function ${name}Page({ params }: ${name}PageProps) {
  const { id } = await params;
  const isEdit = !!id;
  
  let data = null;
  
  if (isEdit) {
    const response = await fetchHelper({
      endPoint: \`\${endpoints.${kebabName}}/\${id}\`,
      method: "GET",
      locale: "admin"
    });
    
    if (response.success) {
      data = response.data;
    }
  }

  return (
    <>
      <CustomHeader />
      <${name}FormPage data={data} isEdit={isEdit} />
    </>
  );
}`;
}

function generateCrudCode(name: string, filters: CrudFilter[]): string {
	const filtersCode = filters
		.map(
			(filter) => `
    {
      key: "${filter.key}",
      type: "${filter.type}",
      width: ${filter.width || 3}
    }`,
		)
		.join(",");

	return `"use client";

import { DataTable } from "@/components/common/Table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { use${name}Table } from "./use${name}Table.logic";

interface ${name}TableProps {
  initialData?: any[];
}

const ${name}Table = ({ initialData }: ${name}TableProps) => {
  const { data, loading, filters, handleFilterChange, handleDelete } = use${name}Table(initialData);

  const tableFilters = [${filtersCode}
  ];

  const columns = [
    // Define your table columns here
    {
      accessorKey: "id",
      header: "ID",
    },
    // Add more columns based on your data structure
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">${name} Management</h1>
        <Link href="/${name.toLowerCase()}/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add ${name}
          </Button>
        </Link>
      </div>

      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        filters={tableFilters}
        onFilterChange={handleFilterChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ${name}Table;`;
}

function generateTypesCode(name: string, fields: FormInput[]): string {
	const interfaceFields = fields
		.map((field) => {
			let type = "string";
			switch (field.type) {
				case "number":
					type = "number";
					break;
				case "checkbox":
					type = "boolean";
					break;
				case "multiSelect":
					type = "string[]";
					break;
				case "file":
				case "img":
					type = "File | string";
					break;
				case "date":
				case "time":
					type = "Date | string";
					break;
			}

			// Handle multi-language fields
			if (field.multiLang) {
				return `  ${field.name}: { ar: ${type}, en: ${type} };`;
			}

			return `  ${field.name}: ${type};`;
		})
		.join("\n");

	return `export interface ${name} {
${interfaceFields}
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ${name}FormData extends Omit<${name}, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ${name}Response {
  success: boolean;
  data?: ${name};
  message?: string;
  error?: string;
}

export interface ${name}ListResponse {
  success: boolean;
  data?: ${name}[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
  error?: string;
}`;
}

function generateFileList(projectName: string): string[] {
	const kebabName = projectName.toLowerCase().replace(/\s+/g, "-");
	const capitalizedName = projectName.charAt(0).toUpperCase() + projectName.slice(1);

	return [
		`components/pages/_${kebabName}/${kebabName}Form.page.tsx`,
		`components/pages/_${kebabName}/use${capitalizedName}Form.logic.tsx`,
		`components/pages/_${kebabName}/${kebabName}.inputs.ts`,
		`components/pages/_${kebabName}/${kebabName}.schema.ts`,
		`app/[locale]/(routes)/${kebabName}/page.tsx`,
		`app/[locale]/(routes)/${kebabName}/create/page.tsx`,
		`app/[locale]/(routes)/${kebabName}/[id]/edit/page.tsx`,
		`types/${kebabName}.types.ts`,
	];
}
