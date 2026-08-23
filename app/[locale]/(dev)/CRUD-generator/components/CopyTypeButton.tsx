"use client";

import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

interface CopyTypeButtonProps {
  data: Record<string, unknown> | string | string[] | unknown;
  interfaceName?: string;
}

const addExportKeyword = (definition: string): string => {
  return definition
    .split("\n")
    .map(line => {
      if (/^export\s+(interface|type)\s+/.test(line)) {
        return line;
      }
      if (/^(interface|type)\s+/.test(line)) {
        return `export ${line}`;
      }
      return line;
    })
    .join("\n");
};

export const buildTypeFileContent = (typeDefinition: string): string => {
  const exportedDefinition = addExportKeyword(typeDefinition);
  return `// Auto-generated type definitions\n\n${exportedDefinition}\n`;
};

// Simple TypeScript interface generator that works in the browser
export const generateTypeScriptInterface = (
  data: unknown,
  interfaceName: string = "ApiResponse",
  generatedInterfaces: Set<string> = new Set()
): string => {
  if (data === null) return `type ${interfaceName} = null;`;
  if (data === undefined) return `type ${interfaceName} = undefined;`;

  if (Array.isArray(data)) {
    if (data.length === 0) return `type ${interfaceName} = unknown[];`;
    const firstItem = data[0];
    const itemInterfaceName = `${interfaceName}Item`;
    const itemInterface = generateTypeScriptInterface(
      firstItem,
      itemInterfaceName,
      generatedInterfaces
    );

    if (itemInterface.includes(`interface ${itemInterfaceName}`)) {
      return `${itemInterface}\n\ntype ${interfaceName} = ${itemInterfaceName}[];`;
    } else {
      const itemTypeName = itemInterface.replace(/^type \w+ = /, "").replace(/;$/, "");
      return `type ${interfaceName} = (${itemTypeName})[];`;
    }
  }

  if (typeof data === "object" && data !== null) {
    const entries = Object.entries(data);
    if (entries.length === 0) return `type ${interfaceName} = Record<string, unknown>;`;

    let nestedInterfaces = "";
    const properties = entries
      .map(([key, value]) => {
        const keyName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        const { valueType, nestedInterface } = inferTypeFromValueWithNested(
          value,
          `${interfaceName}${capitalize(key)}`,
          generatedInterfaces
        );

        if (nestedInterface) {
          nestedInterfaces += nestedInterface + "\n\n";
        }

        const isOptional = value === null || value === undefined ? "?" : "";
        return `  ${keyName}${isOptional}: ${valueType};`;
      })
      .join("\n");

    const mainInterface = `interface ${interfaceName} {
${properties}
}`;

    return nestedInterfaces ? `${nestedInterfaces}${mainInterface}` : mainInterface;
  }

  return `type ${interfaceName} = ${inferTypeFromValue(data)};`;
};

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const inferTypeFromValueWithNested = (
  value: unknown,
  interfaceName: string,
  generatedInterfaces: Set<string>
): { valueType: string; nestedInterface?: string } => {
  if (value === null) return { valueType: "null" };
  if (value === undefined) return { valueType: "undefined" };

  const type = typeof value;
  if (type === "string") return { valueType: "string" };
  if (type === "number") return { valueType: "number" };
  if (type === "boolean") return { valueType: "boolean" };
  if (type === "bigint") return { valueType: "bigint" };
  if (type === "symbol") return { valueType: "symbol" };
  if (type === "function") return { valueType: "Function" };

  if (Array.isArray(value)) {
    if (value.length === 0) return { valueType: "unknown[]" };

    const firstItem = value[0];
    if (typeof firstItem === "object" && firstItem !== null) {
      const itemInterfaceName = `${interfaceName}Item`;
      if (!generatedInterfaces.has(itemInterfaceName)) {
        generatedInterfaces.add(itemInterfaceName);
        const nestedInterface = generateTypeScriptInterface(
          firstItem,
          itemInterfaceName,
          generatedInterfaces
        );
        return {
          valueType: `${itemInterfaceName}[]`,
          nestedInterface: nestedInterface
        };
      }
      return { valueType: `${itemInterfaceName}[]` };
    } else {
      const firstItemType = inferTypeFromValue(firstItem);
      // Check if all items have the same type for better type inference
      const allSameType = value.every(item => inferTypeFromValue(item) === firstItemType);
      return { valueType: allSameType ? `${firstItemType}[]` : "unknown[]" };
    }
  }

  if (type === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return { valueType: "Record<string, unknown>" };

    // Generate a unique interface name and avoid duplicates
    if (!generatedInterfaces.has(interfaceName)) {
      generatedInterfaces.add(interfaceName);
      const nestedInterface = generateTypeScriptInterface(
        value,
        interfaceName,
        generatedInterfaces
      );
      return {
        valueType: interfaceName,
        nestedInterface: nestedInterface
      };
    }
    return { valueType: interfaceName };
  }

  return { valueType: "unknown" };
};

const inferTypeFromValue = (value: unknown): string => {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  const type = typeof value;
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";
  if (type === "bigint") return "bigint";
  if (type === "symbol") return "symbol";
  if (type === "function") return "Function";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const firstItemType = inferTypeFromValue(value[0]);
    // Check if all items have the same type for better type inference
    const allSameType = value.every(item => inferTypeFromValue(item) === firstItemType);
    return allSameType ? `${firstItemType}[]` : "unknown[]";
  }

  if (type === "object") {
    // For nested objects, we could recursively generate interfaces, but for simplicity:
    return "Record<string, unknown>";
  }

  return "unknown";
};

const CopyTypeButton: React.FC<CopyTypeButtonProps> = ({ data, interfaceName }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedType, setGeneratedType] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">("idle");
  const [copyFileStatus, setCopyFileStatus] = useState<"idle" | "success" | "error">("idle");
  const [showSelect, setShowSelect] = useState(false);

  // Function to generate TypeScript interface using our browser-compatible generator
  const generateType = useCallback(
    async (jsonObject: unknown) => {
      setIsGenerating(true);
      try {
        // Add a small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 100));

        // Create a new Set for tracking generated interfaces to avoid duplicates
        const generatedInterfaces = new Set<string>();
        const result = generateTypeScriptInterface(
          jsonObject,
          interfaceName || "ApiResponse",
          generatedInterfaces
        );

        // Clean up the result - remove extra newlines and format nicely
        const cleanedResult = result
          .split("\n\n")
          .filter(section => section.trim() !== "")
          .join("\n\n");

        setGeneratedType(cleanedResult);
      } catch (error) {
        console.warn("Error generating type:", error);
        setGeneratedType(
          `// Error generating TypeScript interface\n// ${error instanceof Error ? error.message : "Unknown error"}`
        );
      } finally {
        setIsGenerating(false);
      }
    },
    [interfaceName]
  );

  // Copy type to clipboard
  const copyTypeToClipboard = async () => {
    if (!generatedType) return;

    try {
      await navigator.clipboard.writeText(generatedType);
      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const copyTypeFileToClipboard = async () => {
    if (!generatedType) return;

    try {
      const fileContent = buildTypeFileContent(generatedType);
      await navigator.clipboard.writeText(fileContent);
      setCopyFileStatus("success");
      setTimeout(() => setCopyFileStatus("idle"), 2000);
    } catch {
      setCopyFileStatus("error");
      setTimeout(() => setCopyFileStatus("idle"), 2000);
    }
  };

  // Generate type when component mounts or data changes
  React.useEffect(() => {
    if (data) {
      generateType(data);
    }
  }, [data, generateType, interfaceName]);

  // Get copy button icon based on status
  const getCopyIcon = () => {
    switch (copyStatus) {
      case "success":
        return "✓";
      case "error":
        return "✗";
      default:
        return "📋";
    }
  };

  // Get copy button class based on status
  const getCopyButtonClass = () => {
    const baseClass =
      "p-1.5 rounded-md transition-all duration-200 flex items-center justify-center min-w-[28px] h-7";
    switch (copyStatus) {
      case "success":
        return `${baseClass} bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400`;
      case "error":
        return `${baseClass} bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400`;
      default:
        return `${baseClass} bg-white text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:bg-slate-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-slate-700`;
    }
  };

  const getCopyFileIcon = () => {
    switch (copyFileStatus) {
      case "success":
        return "✓";
      case "error":
        return "✗";
      default:
        return "🗂️";
    }
  };

  const getCopyFileButtonClass = () => {
    const baseClass =
      "p-1.5 rounded-md transition-all duration-200 flex items-center justify-center min-w-[28px] h-7";
    switch (copyFileStatus) {
      case "success":
        return `${baseClass} bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400`;
      case "error":
        return `${baseClass} bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400`;
      default:
        return `${baseClass} bg-white text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 dark:bg-slate-800 dark:text-neutral-400 dark:hover:text-neutral-300 dark:hover:bg-slate-700`;
    }
  };

  // Get the current language info

  if (
    !data ||
    (typeof data === "object" && Object.keys(data).length === 0) ||
    (Array.isArray(data) && data.length === 0)
  ) {
    return <div />;
  }
  return (
    <div className="flex items-center gap-1">
      {/* Copy Button */}
      <div className="relative group">
        <button
          type="button"
          onClick={() => {
            copyTypeToClipboard();
          }}
          onMouseEnter={() => {
            setShowSelect(true);
          }}
          onMouseLeave={() => {
            setShowSelect(false);
          }}
          disabled={isGenerating || !generatedType}
          className={getCopyButtonClass()}
          title={
            copyStatus === "success"
              ? "Copied!"
              : copyStatus === "error"
                ? "Copy failed"
                : "Copy TypeScript interface to clipboard"
          }
        >
          <span className="text-xs">{getCopyIcon()}</span>
        </button>

        {/* Tooltip showing generated TypeScript interface on hover */}
        {showSelect && generatedType && (
          <div
            className={twMerge(
              "absolute bottom-full right-0 mb-2 p-4 bg-gray-900 text-white text-xs rounded-lg shadow-xl z-50",
              "max-w-lg max-h-96 overflow-auto whitespace-pre-wrap font-mono leading-relaxed",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none",
              "border border-gray-700"
            )}
          >
            <div className="mb-2 text-gray-300 font-sans text-xs uppercase tracking-wide">
              Generated TypeScript Interface:
            </div>
            <div className="text-green-300">{generatedType}</div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
      <div className="relative group">
        <button
          type="button"
          onClick={() => {
            copyTypeFileToClipboard();
          }}
          onMouseEnter={() => {
            setShowSelect(true);
          }}
          onMouseLeave={() => {
            setShowSelect(false);
          }}
          disabled={isGenerating || !generatedType}
          className={getCopyFileButtonClass()}
          title={
            copyFileStatus === "success"
              ? "Copied!"
              : copyFileStatus === "error"
                ? "Copy failed"
                : "Copy TypeScript file content to clipboard"
          }
        >
          <span className="text-xs">{getCopyFileIcon()}</span>
        </button>
      </div>
    </div>
  );
};

export default CopyTypeButton;
