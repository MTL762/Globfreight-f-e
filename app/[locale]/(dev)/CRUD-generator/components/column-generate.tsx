"use client";

import { fetchHelper } from "@/api/fetch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import type { endpointType } from "@/utils/endpoints";
import { MessageToast } from "@/utils/FormActions";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import CopyTypeButton, {
  buildTypeFileContent,
  generateTypeScriptInterface
} from "./CopyTypeButton";

type ColumnType =
  | "text"
  | "image"
  | "badge"
  | "date"
  | "link"
  | "status"
  | "toggle"
  | "price"
  | "phone"
  | "color";

interface ColumnConfig {
  id: string;
  accessorKey: string;
  header: string;
  type: ColumnType;
  customCode?: string;

  /** when true: don't auto-overwrite header on accessor change */
  headerTouched?: boolean;
}

const COLUMN_TYPES: {
  value: ColumnType;
  label: string;
  icon: string;
}[] = [
  { value: "text", label: "Simple Text", icon: "📝" },
  { value: "image", label: "Image Cell", icon: "🖼️" },
  { value: "badge", label: "Status Badge", icon: "🏷️" },
  { value: "date", label: "Date Format", icon: "📅" },
  { value: "link", label: "External Link", icon: "🔗" },
  { value: "status", label: "Status Component", icon: "✅" },
  { value: "toggle", label: "Active/Inactive", icon: "🔘" },
  { value: "price", label: "Price Format", icon: "💰" },
  { value: "phone", label: "Phone Number", icon: "📞" },
  { value: "color", label: "Color Display", icon: "🎨" }
];

// ---------- helpers ----------

const extractNestedKeys = (obj: Record<string, unknown>, prefix = ""): string[] => {
  if (!obj || typeof obj !== "object") return [];

  const keys: string[] = [];

  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    keys.push(fullKey);

    // recurse for nested objects (not arrays)
    if (value && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...extractNestedKeys(value as Record<string, unknown>, fullKey));
    }
  }

  return keys;
};

const formatHeaderFromAccessor = (accessorKey: string) =>
  accessorKey
    .split(".")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getValueByPath = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);

const inferColumnType = (accessorKey: string, sampleRow?: Record<string, unknown>): ColumnType => {
  const key = accessorKey.toLowerCase();
  const val = sampleRow ? getValueByPath(sampleRow, accessorKey) : undefined;

  // value-based (strong signal)
  if (typeof val === "boolean") return "toggle";

  if (typeof val === "number") {
    if (
      key.includes("price") ||
      key.includes("amount") ||
      key.includes("total") ||
      key.includes("cost")
    )
      return "price";
    return "text";
  }

  // NOTE: most APIs return dates as strings, so we also check key names below
  if (val instanceof Date) return "date";

  if (typeof val === "string") {
    const v = val.toLowerCase();
    if (v.startsWith("http://") || v.startsWith("https://")) return "link";
    if (v.match(/\.(png|jpg|jpeg|gif|webp|svg)(\?.*)?$/)) return "image";
  }

  // name-based fallback
  if (
    key.includes("image") ||
    key.includes("avatar") ||
    key.includes("logo") ||
    key.includes("thumbnail") ||
    key.includes("photo")
  )
    return "image";

  if (key.includes("url") || key.includes("link") || key.includes("website")) return "link";

  if (
    key.includes("date") ||
    key.includes("createdat") ||
    key.includes("updatedat") ||
    key.includes("deletedat") ||
    key.endsWith("at")
  )
    return "date";

  if (key.includes("status") || key.includes("state")) return "badge";

  if (
    key.includes("active") ||
    key.includes("enabled") ||
    key.includes("is_") ||
    key.startsWith("is")
  )
    return "toggle";

  if (key.includes("phone") || key.includes("mobile") || key.includes("tel")) return "phone";

  if (key.includes("color") || key.includes("hex")) return "color";

  if (
    key.includes("price") ||
    key.includes("amount") ||
    key.includes("total") ||
    key.includes("cost")
  )
    return "price";

  return "text";
};

export default function ColumnsGenerate({
  endpoints,
  onConfirm,
  pageName,
  onTypeGenerated // Re-added prop
}: {
  pageName: string;
  onConfirm?: (columns: string) => void;
  endpoints: endpointType;
  onTypeGenerated?: (typeContent: string) => void; // Re-added type
}) {
  const [availableColumns, setAvailableColumns] = useState<string[]>([]);
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [columnConfigs, setColumnConfigs] = useState<ColumnConfig[]>([]);
  const t = useTranslations();

  useEffect(() => {
    (async () => {
      if (endpoints.length === 0) return;
      // ... existing fetch ...
      const fetchPromise = fetchHelper({
        endPoint: endpoints,
        params: { limit: 1, page: 1 }
      });

      toast.promise(fetchPromise, {
        loading: "Fetching column data...",
        success: "Column data loaded successfully!",
        error: "Failed to fetch column data"
      });

      try {
        const res = await fetchPromise;
        MessageToast({ res, t });

        const dataObject = res?.data?.[0] || {};

        // ... existing logic ...
        const columns = extractNestedKeys(dataObject);
        setAvailableColumns(columns);

        if (res.total === 0) {
          toast.error(
            "No data found for the selected endpoint. Please ensure the endpoint has data before configuring columns."
          );
        }

        setData(dataObject);

        // ... existing column config init ...
        const topLevelColumns = Object.keys(dataObject);
        // ...
        if (topLevelColumns.length > 0) {
          const initialConfigs: ColumnConfig[] = topLevelColumns.map((col, index) => ({
            id: `col-${index}`,
            accessorKey: col,
            header: formatHeaderFromAccessor(col),
            type: inferColumnType(col, dataObject),
            headerTouched: false
          }));
          setColumnConfigs(initialConfigs);
        }
      } catch (error) {
        console.error("Failed to fetch columns:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoints, t]);

  // Separate useEffect for type generation to prevent refetching when pageName changes
  useEffect(() => {
    if (!data) return;
    const generatedInterfaces = new Set<string>();
    const typeScriptCode = generateTypeScriptInterface(
      data,
      pageName || "ApiResponse",
      generatedInterfaces
    );
    const fileContent = buildTypeFileContent(typeScriptCode);
    onTypeGenerated?.(fileContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, pageName]);
  const addColumn = () => {
    const accessorKey = availableColumns[0] || "id";

    const newColumn: ColumnConfig = {
      id: `col-${Date.now()}`,
      accessorKey,
      header: formatHeaderFromAccessor(accessorKey),
      type: inferColumnType(accessorKey, data ?? undefined),
      headerTouched: false
    };

    setColumnConfigs(prev => [...prev, newColumn]);
  };

  const removeColumn = (id: string) => {
    setColumnConfigs(prev => prev.filter(col => col.id !== id));
  };

  const updateColumn = (id: string, updates: Partial<ColumnConfig>) => {
    setColumnConfigs(prev => prev.map(col => (col.id === id ? { ...col, ...updates } : col)));
  };

  const generateColumnCode = (config: ColumnConfig): string => {
    const { accessorKey, header, type } = config;
    const isNested = accessorKey.includes(".");

    const getNestedAccessor = (key: string) => {
      if (!key.includes(".")) return `row.original.${key}`;
      const parts = key.split(".");
      return `row.original.${parts.join("?.")}`;
    };

    switch (type) {
      case "text":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => {
      const value = ${getNestedAccessor(accessorKey)};
      return <span>{value || '-'}</span>;
    }
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}"
  }`;

      case "image":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => {
      const image = ${getNestedAccessor(accessorKey)};
      return (
        <div className="flex items-center justify-center w-full h-12 overflow-hidden">
          <ImageCell cell={image} />
        </div>
      );
    }
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => {
      const image = getValue() as string;
      return (
        <div className="flex items-center justify-center w-full h-12 overflow-hidden">
          <ImageCell cell={image} />
        </div>
      );
    }
  }`;

      case "link":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => {
      const link = ${getNestedAccessor(accessorKey)};
      if (!link) return <span className="text-gray-400">No link</span>;

      return (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="truncate max-w-[200px]">
              {link?.replace(/^https?:\\/\\//, "")}
            </span>
          </a>
        </Button>
      );
    }
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => {
      const link = getValue() as string;
      if (!link) return <span className="text-gray-400">No link</span>;

      return (
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="truncate max-w-[200px]">
              {link?.replace(/^https?:\\/\\//, "")}
            </span>
          </a>
        </Button>
      );
    }
  }`;

      case "badge": {
        const badgeVarName = accessorKey.replace(/\./g, "_");
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => {
      const ${badgeVarName} = ${getNestedAccessor(accessorKey)};

      return (
        <TableStatusBadge
          status={${badgeVarName}}
        />
      );
    }
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => {
      const ${badgeVarName} = getValue() as string;

      return (
        <TableStatusBadge
          status={${badgeVarName}}
        />
      );
    }
  }`;
      }

      case "date":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
     cell: ({ getValue }) => {
		  return (
			<DateCol date={getValue() as string} />
		  );
		}
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
   cell: ({ getValue }) => {
		  return (
			<DateCol date={getValue() as string} />
		  );
		}
  }`;

      case "status":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => <StatusCol value={${getNestedAccessor(accessorKey)}} />
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => <StatusCol value={getValue() as string} />
  }`;

      case "toggle":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => <ActiveCol value={${getNestedAccessor(accessorKey)}} />
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => <ActiveCol value={getValue() as boolean} />
  }`;

      case "price":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => <PriceAmount value={${getNestedAccessor(accessorKey)}} />
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => <PriceAmount value={getValue() as number} />
  }`;

      case "phone":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => <PhoneDirectionCol value={${getNestedAccessor(accessorKey)}} />
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => <PhoneDirectionCol value={getValue() as string} />
  }`;

      case "color":
        if (isNested) {
          return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ row }) => <ColorCol value={${getNestedAccessor(accessorKey)}} />
  }`;
        }
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}",
    cell: ({ getValue }) => <ColorCol value={getValue() as string} />
  }`;

      default:
        return `  {
    accessorKey: "${accessorKey}",
    header: "${header}"
  }`;
    }
  };

  const generateFullCode = () => {
    const imports = new Set(["'use client'"]);
    const components = new Set(['import { type ColumnDef } from "@tanstack/react-table";']);

    columnConfigs.forEach(config => {
      switch (config.type) {
        case "image":
          components.add('import { ImageCell } from "@/components/common/table/columns/img-cell";');
          break;
        case "badge":
          components.add(
            'import TableStatusBadge from "@/components/common/table/tableHelperComponents/TableStatusBadge";'
          );
          break;
        case "link":
          components.add('import { Button } from "@/components/ui/button";');
          components.add('import { ExternalLink } from "lucide-react";');
          break;
        case "date":
          components.add('import DateCol from "@/components/common/table/columns/date.column";');
          break;
        case "status":
          components.add(
            'import StatusCol from "@/components/common/table/columns/status.column";'
          );
          break;
        case "toggle":
          components.add('import ActiveCol from "@/components/common/table/columns/Ative.column";');
          break;
        case "price":
          components.add('import { PriceAmount } from "@/components/PriceAmount";');
          break;
        case "phone":
          components.add(
            'import PhoneDirectionCol from "@/components/common/table/columns/Phone.direction";'
          );
          break;
        case "color":
          components.add('import ColorCol from "@/components/common/table/columns/color.column";');
          break;
      }
    });

    const columnCodes = columnConfigs.map(generateColumnCode).join(",\n");

    const fnName = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Columns`;

    const code = `${Array.from(imports).join("\n")}
${Array.from(components).join("\n")}

export default function ${fnName}(): ColumnDef<Record<string, unknown>>[] {
  return [
${columnCodes}
  ];
}
`;
    return code;
  };

  const handleConfirm = () => {
    const code = generateFullCode();
    onConfirm?.(code);
  };

  useEffect(() => {
    if (columnConfigs.length > 0) {
      handleConfirm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnConfigs, pageName]);

  const columnsLabel = useMemo(() => {
    return availableColumns.map(col => {
      const isNested = col.includes(".");
      const displayName = isNested
        ? col
            .split(".")
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" > ")
        : col;
      return { col, isNested, displayName };
    });
  }, [availableColumns]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <span>Column Configuration</span>

            <CopyTypeButton data={data} interfaceName={pageName} />

            <Button onClick={addColumn} size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Column
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {columnConfigs.map(config => (
            <Card key={config.id} className="p-5 shadow-sm border">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
                {/* Column Key */}
                <div className="space-y-1">
                  <Label htmlFor={`accessor-${config.id}`}>Column Key</Label>
                  <Select
                    value={config.accessorKey}
                    onValueChange={value => {
                      const nextType = inferColumnType(value, data ?? undefined);

                      updateColumn(config.id, {
                        accessorKey: value,
                        type: nextType,
                        // update header only if user didn't manually edit it
                        header: config.headerTouched
                          ? config.header
                          : formatHeaderFromAccessor(value)
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a column" />
                    </SelectTrigger>
                    <SelectContent>
                      {columnsLabel.map(({ col, isNested, displayName }) => (
                        <SelectItem key={col} value={col}>
                          {displayName}{" "}
                          {isNested && <span className="text-xs text-gray-500 ml-1">(nested)</span>}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Display Header */}
                <div className="space-y-1">
                  <Label htmlFor={`header-${config.id}`}>Display Header</Label>
                  <Input
                    id={`header-${config.id}`}
                    value={config.header}
                    onChange={e =>
                      updateColumn(config.id, {
                        header: e.target.value,
                        headerTouched: true
                      })
                    }
                    placeholder="Enter column name"
                  />
                </div>

                {/* Column Type */}
                <div className="space-y-1">
                  <Label htmlFor={`type-${config.id}`}>Column Type</Label>
                  <Select
                    value={config.type}
                    onValueChange={value =>
                      updateColumn(config.id, {
                        type: value as ColumnConfig["type"]
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLUMN_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <span className="flex items-center gap-2">
                            {type.icon}
                            {type.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Delete Button */}
                <div className="flex justify-end md:justify-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeColumn(config.id)}
                    className="w-full md:w-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
