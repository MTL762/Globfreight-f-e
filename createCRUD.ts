import * as fs from "fs";
import * as path from "path";

// Define types
interface Filter {
  key: string;
  placeholder: string;
  type: string;
  width?: number;
  options?: any[];
  apiUrl?: string;
  labelKey?: string;
}

interface FilterConfig {
  name: string;
  placeholder: string;
  type: string;
  width: number;
  options?: any[];
  apiUrl?: string;
  labelKey?: string;
}

// Helper functions
const capitalizeFirstChar = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const getComponentName = (rootFolderName: string): string => {
  const parts = rootFolderName.split("/");
  return capitalizeFirstChar(parts[parts.length - 1]);
};

// Template generators
const getTablePageTemplate = (
  apiEndpoint: string,
  filters: FilterConfig[],
  tableHeader: string
): string => `
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import { endpoints } from "@/utils/endpoints";
import { extractTableHeadersFromRes } from '@/utils/extractTableHeaderFromRes';
import { getTranslations } from 'next-intl/server';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import { Metadata } from "next";
 
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName= t(${tableHeader});
  return {
     title:  headerName + " - Quran",
     description: "Manage " + headerName + " items in the Quran Dashboard"
  };
}

async function page({searchParams}:{searchParams:SearchParams}): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ["${apiEndpoint}"],
    method: 'GET',
    params: await searchParams,
  });

  if (!data) return <div>Error...</div>;

  const filteredData = data?.data
  const headers = extractTableHeadersFromRes(filteredData);

  return (
    <>
      <CustomHeader />
      <TableBasic
        data={filteredData}
        headers={headers}
        pagination={{
          total: data?.total,
        }}
        tableActions={{
          onEdit: true,
          onDelete: endpoints.${apiEndpoint},
          //onInfo: true,
        }}
        cardHeader={t(${tableHeader})}
        filters={${JSON.stringify(filters)}}
      />
    </>
  );
}

export default page;
`;

const getShowPageTemplate = (apiEndpoint: string): string => `
import { fetchData } from '@/api/global/fetchData';
import DefaultItemDetailsCreator from '@/components/common/DefaultItemDetailsComponents/DefaultItemDetailsCreator';
import { endpoints } from "@/utils/endpoints";

async function page({params}:{params:Params}): Promise<JSX.Element> {
  const {id, locale} = await params;
  const data = await fetchData(\`\${endpoints.${apiEndpoint}}/\${id}\`);

  return (
    <DefaultItemDetailsCreator
      data={data?.data}
      endpoint={endpoints.${apiEndpoint}}
      pathname={\`/\${locale}/${apiEndpoint}\`}
    />
  );
}

export default page;
`;

const getCreatePageTemplate = (rootFolderName: string): string => {
  const componentName = getComponentName(rootFolderName);

  return `
import ${componentName}FormPage from '@/components/pages/_${rootFolderName}/${componentName}Form.page';
import CustomHeader from "@/components/layouts/header/CustomHeader";

export default async function Page(): Promise<JSX.Element> {
  return (
    <>
      <CustomHeader />
      <${componentName}FormPage />
    </>
  );
}
`;
};

const getEditPageTemplate = (rootFolderName: string, apiEndpoint: string): string => {
  const componentName = getComponentName(rootFolderName);
  return `
import CustomHeader from "@/components/layouts/header/CustomHeader";
import ${componentName}FormPage from '@/components/pages/_${rootFolderName}/${componentName}Form.page';
import { endpoints } from "@/utils/endpoints";
import { fetchHelper } from '@/api/fetch';

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }): Promise<JSX.Element> => {
  const { id } = await params;
  
  const data = await fetchHelper({
    endPoint: \`\${endpoints.${apiEndpoint}}/\${id}\`,
    method: "GET",
  });

  return (
    <>
      <CustomHeader />
      <${componentName}FormPage data={data} />
    </>
  );
};

export default page;
`;
};

// Main function to create folders and files
function createFolderStructure(
  rootFolder: string,
  apiEndpoint: string,
  filters: Filter[],
  tableHeader: string
): void {
  const rootPath = path.join(__dirname, "app", "[locale]", "(routes)", rootFolder);
  const idPath = path.join(rootPath, "[id]");
  const createPath = path.join(rootPath, "create");
  const editPath = path.join(idPath, "edit");
  const showPath = path.join(idPath);

  // Create directories
  [rootPath, idPath, createPath, editPath, showPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Create filter configuration
  const filterConfig: FilterConfig[] = filters.map(filter => ({
    name: filter.key,
    placeholder: filter.placeholder,
    type: filter.type,
    width: filter.width ?? 3,
    ...(filter.options ? { options: filter.options } : {}),
    ...(filter.apiUrl ? { apiUrl: filter.apiUrl } : {}),
    ...(filter.labelKey ? { labelKey: filter.labelKey } : {})
  }));

  // Write files
  fs.writeFileSync(
    path.join(rootPath, "page.tsx"),
    getTablePageTemplate(apiEndpoint, filterConfig, tableHeader)
  );

  fs.writeFileSync(path.join(showPath, "page.tsx"), getShowPageTemplate(apiEndpoint));

  fs.writeFileSync(path.join(createPath, "page.tsx"), getCreatePageTemplate(rootFolder));

  fs.writeFileSync(path.join(editPath, "page.tsx"), getEditPageTemplate(rootFolder, apiEndpoint));

  console.log(`✅ CRUD files generated successfully for ${rootFolder}`);
}

const [, , rootFolderName, apiEndpoint, rawFilters, tableHeader] = process.argv;

if (!rootFolderName || !apiEndpoint || !rawFilters || !tableHeader) {
  console.error(
    "❌ Missing required arguments. Usage: ts-node createCRUD.ts <rootFolderName> <apiEndpoint> <filters> <tableHeader>"
  );
  process.exit(1);
}

try {
  const filters: Filter[] = JSON.parse(rawFilters);
  createFolderStructure(rootFolderName, apiEndpoint, filters, tableHeader);
} catch (error) {
  console.error("❌ Error parsing filters:", error);
  process.exit(1);
}
