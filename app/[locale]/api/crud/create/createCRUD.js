// const fs = require("fs");
// const path = require("path");

// Template for table page
const getTablePageTemplate = (apiEndpoint, filters, tableHeader) => `
import { fetchHelper } from '@/api/fetch';
import TableBasic from '@/components/common/table/TableBasic';
import { endpoints } from '@/utils/config';
import { extractTableHeadersFromRes } from '@/utils/extractTableHeaderFromRes';
import { getTranslations } from 'next-intl/server';
import CustomHeader from "@/components/layouts/header/CustomHeader";
import { Metadata } from "next";
 
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  const headerName= t(${tableHeader});
  return {
     title:  headerName + " - Your Path",
  description: "Manage " + headerName + " items in the Your Path Dashboard"
  };
}
async function page({ searchParams }: { searchParams: SearchParams }): Promise<JSX.Element> {
  const t = await getTranslations();
  const data = await fetchHelper({
    endPoint: ${apiEndpoint},
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

// Template for show page
const getShowPageTemplate = (apiEndpoint) => `
import { fetchData } from '@/api/global/fetchData';
import DefaultItemDetailsCreator from '@/components/common/DefaultItemDetailsComponents/DefaultItemDetailsCreator';
import { endpoints } from '@/utils/config';

async function page({ params }: { params: Params }): Promise<JSX.Element> {
  const data = await fetchData(\`\${endpoints.${apiEndpoint}}/\${(await params).id}\`);

  return (
    <DefaultItemDetailsCreator
      data={data?.data}
      endpoint={endpoints.${apiEndpoint}}
    />
  );
}

export default page;
`;

// Template for create page
const getCreatePageTemplate = (rootFolderName) => `
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

const capitalizeFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Template for edit page
const getEditPageTemplate = (rootFolderName, apiEndpoint) => `
import CustomHeader from "@/components/layouts/header/CustomHeader";

import ${capitalizeFirstChar(
	rootFolderName.split("/")[rootFolderName.split("/").length - 1],
)}FormPage from '@/components/pages/_${rootFolderName}/${
	rootFolderName.split("/")[rootFolderName.split("/").length - 1]
}Form.page';
import { endpoints } from '@/utils/config';
import { fetchHelper } from '@/api/fetch';

const page = async ({ params }: { params: Params }) => {
  const data = await fetchHelper({
    endPoint: \`\${endpoints.${apiEndpoint}}/\${(await params).id}\`,
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

// Template for Form component
// const getFormTemplate = () => `

// function Form({ data }: { data?:  }) {
//   return (
//     <div>
//       <h1>Form</h1>
//       <form>
//         <div>
//           <label>Data: </label>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Form;
// `;

// Create folders and files
function createFolderStructure(rootFolder, apiEndpoint, filters) {
	const rootPath = path.join(
		__dirname,
		"app",
		"[locale]",
		"(routes)",
		rootFolder,
	);
	const idPath = path.join(rootPath, "[id]");
	const createPath = path.join(rootPath, "create");
	const editPath = path.join(idPath, "edit");
	const showPath = path.join(idPath);
	// const formPath = path.join(rootPath, "_form");

	// Create directories
	[
		rootPath,
		idPath,
		createPath,
		editPath,
		showPath,
		// , formPath
	].forEach((dir) => {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
	});

	// Write files
	const filterConfig = filters.map((filter) => ({
		name: filter.key,
		placeholder: filter.placeholder,
		type: filter.type,
		width: filter.width ?? 3,
		...(filter.options ? { options: filter.options } : {}),
		...(filter.apiUrl ? { apiUrl: filter.apiUrl } : {}),
		...(filter.labelKey ? { labelKey: filter.labelKey } : {}),
	}));

	fs.writeFileSync(
		path.join(rootPath, "page.tsx"),
		getTablePageTemplate(apiEndpoint, filterConfig, tableHeader),
	);

	fs.writeFileSync(
		path.join(showPath, "page.tsx"),
		getShowPageTemplate(apiEndpoint),
	);

	fs.writeFileSync(
		path.join(createPath, "page.tsx"),
		getCreatePageTemplate(rootFolderName),
	);

	fs.writeFileSync(
		path.join(editPath, "page.tsx"),
		getEditPageTemplate(rootFolderName, apiEndpoint),
	);

	// fs.writeFileSync(
	//   path.join(formPath, "Form.page.tsx"),
	//   getFormTemplate()
	// );
}

// Command-line inputs
const [, , rootFolderName, apiEndpoint, rawFilters, tableHeader] = process.argv;
if (!rootFolderName || !apiEndpoint || !rawFilters) {
	process.exit(1);
}

const filters = JSON.parse(rawFilters);

createFolderStructure(rootFolderName, apiEndpoint, filters);
