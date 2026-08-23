/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { createInputsFile } = require("./formInputFile");
const { createSchemaFile } = require("./formSchema");
const { createFormPageFile } = require("./formPage");
const { createFormDevTest } = require("./formTestWarn");

const { createFormLogicFile } = require("./formLogic.cli");
const { createTestFile } = require("./test.cli");
// Get the project root directory
const projectRoot = path.resolve(process.cwd());

// Template for inputs file

// Capitalize first character helper function
const capitalizeFirstChar = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Create folders and files
export function createFolderStructure(rootFolderName, apiEndpoint, inputs) {
	if (!rootFolderName || !apiEndpoint || !inputs) {
		throw new Error("Missing required parameters: rootFolderName, apiEndpoint, inputs");
	}
	// rootFolderName =
	// 	rootFolderName.split("/")[rootFolderName.split("/").length - 1]; // Remove any slashes from the root folder name
	const capitalizedRootFolder = capitalizeFirstChar(rootFolderName);
	const pagePath = path.join(projectRoot, "app", "[locale]", "(routes)", rootFolderName);
	const testPath = path.join(projectRoot, "tests", "pages", rootFolderName);
	const componentsPath = path.join(projectRoot, "components", "pages", `_${rootFolderName}`);
	// const idPath = path.join(pagePath, "[id]");
	// const createPath = path.join(pagePath, "create");
	// const editPath = path.join(idPath, "edit");
	// const showPath = path.join(idPath);

	// Create directories
	[componentsPath, testPath].forEach((dir) => {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
	});
	// Create inputs file
	const inputsFilePath = path.join(componentsPath, `${rootFolderName}.inputs.ts`);
	const schemaFilePath = path.join(componentsPath, `${rootFolderName}.schema.ts`);
	const pageFilePath = path.join(componentsPath, `${rootFolderName}Form.page.tsx`);
	const testFilePath = path.join(testPath, `${rootFolderName}.test.tsx`);
	const formValidationCheck = path.join(
		componentsPath,
		`${rootFolderName}-check-form-validation.tsx`,
	);
	const logicFilePath = path.join(
		componentsPath,
		`use${capitalizeFirstChar(rootFolderName)}Form.logic.tsx`,
	);
	fs.writeFileSync(inputsFilePath, createInputsFile(capitalizedRootFolder, inputs));
	fs.writeFileSync(logicFilePath, createFormLogicFile(capitalizedRootFolder, inputs, apiEndpoint));
	fs.writeFileSync(schemaFilePath, createSchemaFile(capitalizedRootFolder, inputs));
	fs.writeFileSync(testFilePath, createTestFile(capitalizedRootFolder, inputs));
	fs.writeFileSync(
		pageFilePath,
		createFormPageFile(
			capitalizedRootFolder,
			inputs.filter((input) => input.multiLang),
			apiEndpoint,
		),
	);
	fs.writeFileSync(formValidationCheck, createFormDevTest(capitalizedRootFolder));

	return {
		success: true,
		message: "Form structure created successfully",
		data: {
			rootFolder: capitalizedRootFolder,
			inputsFilePath,
			pagePath,
			componentsPath,
		},
	};
}

// Only run this if called directly from command line
if (require.main === module) {
	const [, , rootFolderName, apiEndpoint, inputsJson] = process.argv;

	if (!rootFolderName || !apiEndpoint) {
		console.error("Please provide the required parameters: rootFolderName, apiEndpoint");
		process.exit(1);
	}

	const inputs = inputsJson ? JSON.parse(inputsJson) : [];
	createFolderStructure(rootFolderName, apiEndpoint, inputs);
}
