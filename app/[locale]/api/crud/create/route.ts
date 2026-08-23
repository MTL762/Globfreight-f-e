import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { withIdempotency } from "@/lib/idempotency";
import path from "path";

// Template for table page
const getTablePageTemplate = (apiEndpoint: string, filters: any[], tableHeader: string) => `
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import { endpoints } from '@/utils/config';
import { getTranslations } from 'next-intl/server';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import type { Metadata } from "next";
import { TableBasicTanstack } from "@/components/common/table/main/table-basic-tanstack";
import ${tableHeader}Columns from './${tableHeader}Columns';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName= t("${tableHeader}");
  return {
     title:  headerName + " - Your Path",
  description: "Manage " + headerName + " items in the Your Path Dashboard"
  };
}
async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["${apiEndpoint}"],
    method: "GET",
    params: await searchParams,
  });

  if (!data) return <div>Error...</div>;

  const filteredData = data?.data

  return (
    <>
    <CustomHeader />
      <TableBasicTanstack
        data={filteredData}
        columns={${tableHeader}Columns}
        pagination={{
          total: data?.total,
        }}
        tableActions={{
          onEdit: true,
          onDelete: ["${apiEndpoint}"],
          //onInfo: true,
        }}
        cardHeader={t("${tableHeader}")}
        filters={${JSON.stringify(filters)}}
      />
    </>
  );
}

export default page;
`;

// Template for show page
const getShowPageTemplate = (apiEndpoint: string) => `
import { fetchData } from '@/api/global/fetchData';
import DefaultItemDetailsCreator from '@/components/common/DefaultItemDetailsComponents/DefaultItemDetailsCreator';
 
async function page({ params }: { params: Params }): Promise<JSX.Element> {
  const data = await fetchData(['${apiEndpoint}',Number((await params).id)]);

  return (
    <DefaultItemDetailsCreator
      data={data?.data}
    />
  );
}

export default page;
`;

// Template for create page
const getCreatePageTemplate = (rootFolderName: string) => `
import ${capitalizeFirstChar(
	rootFolderName.split("/")[rootFolderName.split("/").length - 1],
)}FormPage from '@/components/pages/_${rootFolderName}/${capitalizeFirstChar(
	rootFolderName.split("/")[rootFolderName.split("/").length - 1],
)}Form.page';
import CustomHeader from "@/components/layouts/header/CustomHeader";


export default async function Page() : Promise<JSX.Element>  {
  return <>
  <CustomHeader />
  <${capitalizeFirstChar(
		rootFolderName.split("/")[rootFolderName.split("/").length - 1],
	)}FormPage /></>;
}
`;

const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Template for edit page
const getEditPageTemplate = (rootFolderName: string, apiEndpoint: string) => `
import CustomHeader from "@/components/layouts/header/CustomHeader";

import ${capitalizeFirstChar(
	rootFolderName.split("/")[rootFolderName.split("/").length - 1],
)}FormPage from '@/components/pages/_${rootFolderName}/${
	rootFolderName.split("/")[rootFolderName.split("/").length - 1]
}Form.page';
 import { fetchHelper } from '@/api/fetch';

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: ['${apiEndpoint}',Number((await params).id)],
    method: "GET",
  });

  return<>
  <CustomHeader />
   <${capitalizeFirstChar(
			rootFolderName.split("/")[rootFolderName.split("/").length - 1],
		)}FormPage data={data?.data} /></>;
};

export default page;
`;

// Create folders and files
async function createFolderStructure({
	rootFolder,
	apiEndpoint,
	filters,
	tableHeader,
	columnConfigs,
	includeIdPage,
}: {
	rootFolder: string;
	apiEndpoint: string;
	filters: any[];
	tableHeader: string;
	columnConfigs: string;
	includeIdPage: boolean;
}) {
	const basePath = process.cwd();
	const rootPath = path.join(basePath, "app", "[locale]", "(routes)", rootFolder);
	const idPath = path.join(rootPath, "[id]");
	const createPath = path.join(rootPath, "create");
	const editPath = path.join(idPath, "edit");
	const showPath = path.join(idPath);

	// Create directories
	const directories = [rootPath, idPath, createPath, editPath, showPath];

	for (const dir of directories) {
		try {
			await fs.mkdir(dir, { recursive: true });
		} catch (error) {
			// Directory might already exist, continue
			console.log(`Directory ${dir} already exists or error creating:`, error);
		}
	}

	// Process filter configuration
	const filterConfig = filters.map((filter: any) => ({
		name: filter.key,
		placeholder: filter.placeholder,
		type: filter.type,
		width: filter.width ?? 6,
		...(filter.options ? { options: filter.options } : {}),
		...(filter.apiUrl ? { apiUrl: filter.apiUrl } : {}),
		...(filter.labelKey ? { labelKey: filter.labelKey } : {}),
	}));

	// Write files
	const files = [
		{
			path: path.join(rootPath, "page.tsx"),
			content: getTablePageTemplate(apiEndpoint, filterConfig, capitalizeFirstChar(tableHeader)),
		},
		{
			path: path.join(rootPath, `${capitalizeFirstChar(rootFolder)}Columns.tsx`),
			content: columnConfigs,
		},
		{
			path: path.join(createPath, "page.tsx"),
			content: getCreatePageTemplate(rootFolder),
		},
		{
			path: path.join(editPath, "page.tsx"),
			content: getEditPageTemplate(rootFolder, apiEndpoint),
		},
	];

	if (includeIdPage) {
		files.push({
			path: path.join(showPath, "page.tsx"),
			content: getShowPageTemplate(apiEndpoint),
		});
	}

	for (const file of files) {
		try {
			await fs.writeFile(file.path, file.content, "utf8");
		} catch (error) {
			throw new Error(`Error writing file ${file.path}: ${error}`);
		}
	}

	return {
		created: files.map((f) => f.path),
		directories: directories,
	};
}

export async function POST(request: Request) {
	return withIdempotency(request, async () => {
	try {
		// Parse the incoming JSON request body
		const {
			rootFolderName,
			apiEndpoint,
			filters,
			tableHeader,
			columnConfigs,
			includeIdPage = false,
		} = await request.json();
		// Validate the required fields
		if (!rootFolderName || !apiEndpoint || !filters || !tableHeader) {
			return NextResponse.json(
				{
					error: "Missing required parameters",
					required: ["rootFolderName", "apiEndpoint", "filters", "tableHeader"],
				},
				{ status: 400 },
			);
		}

		// Validate filters is an array
		if (!Array.isArray(filters)) {
			return NextResponse.json({ error: "Filters must be an array" }, { status: 400 });
		}

		const result = await createFolderStructure({
			rootFolder: rootFolderName,
			apiEndpoint,
			filters,
			tableHeader,
			columnConfigs,
			includeIdPage,
		});

		return NextResponse.json({
			message: "CRUD pages created successfully",
			details: {
				rootFolder: rootFolderName,
				apiEndpoint,
				tableHeader,
				filtersCount: filters.length,
				created: result.created,
				directories: result.directories,
			},
		});
	} catch (error) {
		console.error("Error creating CRUD structure:", error);
		return NextResponse.json(
			{
				error: "Error creating pages",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 },
		);
	}

	});
}
