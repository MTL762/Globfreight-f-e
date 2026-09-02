"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  Shield,
  Search,
  Check,
  CheckCheck,
  X,
  Layers,
  AlertCircle,
  KeyRound,
  FileText,
  Users,
  FolderTree,
  Sliders,
  HelpCircle,
  Mail,
  Eye
} from "lucide-react";
import { fetchHelper } from "@/api/fetch";
import type { RolesType } from "./roles.schema";

interface PermissionApiItem {
  id: number;
  name: string;
}

interface GroupedPermission {
  moduleKey: string;
  moduleTitle: string;
  icon: any;
  items: {
    id: number;
    name: string;
    actionLabel: string;
    actionType: "view" | "create" | "update" | "delete" | "manage" | "other";
  }[];
}

// Icon helper per module
const getModuleIcon = (moduleKey: string) => {
  const key = moduleKey.toLowerCase();
  if (key.includes("user")) return Users;
  if (key.includes("role") || key.includes("permission")) return KeyRound;
  if (key.includes("category") || key.includes("categories")) return FolderTree;
  if (key.includes("blog") || key.includes("post")) return FileText;
  if (key.includes("faq")) return HelpCircle;
  if (key.includes("mail") || key.includes("email")) return Mail;
  if (key.includes("dashboard") || key.includes("stat") || key.includes("visitor")) return Eye;
  if (key.includes("setting")) return Sliders;
  return Layers;
};

// Action formatter helper
const parsePermission = (rawName: string) => {
  let modulePart = "General";
  let actionPart = rawName;

  if (rawName.includes(".")) {
    const parts = rawName.split(".");
    modulePart = parts[0];
    actionPart = parts.slice(1).join(".");
  } else if (rawName.includes("_")) {
    const parts = rawName.split("_");
    if (parts.length > 1) {
      const last = parts[parts.length - 1];
      if (["list", "view", "show", "store", "create", "update", "edit", "destroy", "delete"].includes(last)) {
        actionPart = last;
        modulePart = parts.slice(0, -1).join(" ");
      }
    }
  }

  // Format module title
  const formattedModule = modulePart
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Determine Action Type & Badge
  const lowerAction = actionPart.toLowerCase();
  let actionType: "view" | "create" | "update" | "delete" | "manage" | "other" = "other";
  let actionLabel = actionPart;

  if (lowerAction.includes("list") || lowerAction.includes("index")) {
    actionType = "view";
    actionLabel = "List / View All";
  } else if (lowerAction.includes("view") || lowerAction.includes("show") || lowerAction.includes("read")) {
    actionType = "view";
    actionLabel = "View Details";
  } else if (lowerAction.includes("store") || lowerAction.includes("create") || lowerAction.includes("add")) {
    actionType = "create";
    actionLabel = "Create / Store";
  } else if (lowerAction.includes("update") || lowerAction.includes("edit") || lowerAction.includes("patch")) {
    actionType = "update";
    actionLabel = "Edit / Update";
  } else if (lowerAction.includes("destroy") || lowerAction.includes("delete") || lowerAction.includes("remove")) {
    actionType = "delete";
    actionLabel = "Delete / Remove";
  } else if (lowerAction.includes("manage") || lowerAction.includes("all")) {
    actionType = "manage";
    actionLabel = "Full Management";
  }

  return {
    moduleKey: modulePart.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    moduleTitle: formattedModule,
    actionLabel,
    actionType
  };
};

export function PermissionsMatrixSelector({
  control,
  errors
}: {
  control: Control<RolesType>;
  errors?: FieldErrors<RolesType>;
}) {
  const t = useTranslations();
  const [permissions, setPermissions] = useState<PermissionApiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch permissions list from backend
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetchHelper({
          endPoint: ["rolesPermissions"],
          revalidate: 120
        });

        const rawList = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.permissions)
            ? res.permissions
            : Array.isArray(res)
              ? res
              : [];

        // Format items with numeric ID
        const normalized: PermissionApiItem[] = rawList.map((item: any, idx: number) => {
          if (typeof item === "object" && item !== null) {
            return {
              id: Number(item.id || idx + 1),
              name: String(item.name || item.slug || `permission_${idx + 1}`)
            };
          }
          return {
            id: idx + 1,
            name: String(item)
          };
        });

        if (isMounted) {
          setPermissions(normalized);
        }
      } catch (err) {
        console.error("Failed to load permissions:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Group permissions by module
  const groupedModules = useMemo(() => {
    const map = new Map<string, GroupedPermission>();

    permissions.forEach((perm) => {
      const { moduleKey, moduleTitle, actionLabel, actionType } = parsePermission(perm.name);
      if (!map.has(moduleKey)) {
        map.set(moduleKey, {
          moduleKey,
          moduleTitle,
          icon: getModuleIcon(moduleKey),
          items: []
        });
      }
      map.get(moduleKey)!.items.push({
        id: perm.id,
        name: perm.name,
        actionLabel,
        actionType
      });
    });

    return Array.from(map.values());
  }, [permissions]);

  // Filtered modules by search query
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return groupedModules;
    const q = searchQuery.toLowerCase();

    return groupedModules
      .map((mod) => {
        const matchingItems = mod.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.actionLabel.toLowerCase().includes(q) ||
            mod.moduleTitle.toLowerCase().includes(q)
        );
        if (matchingItems.length === 0) return null;
        return {
          ...mod,
          items: matchingItems
        };
      })
      .filter(Boolean) as GroupedPermission[];
  }, [groupedModules, searchQuery]);

  return (
    <Controller
      name="permission_ids"
      control={control}
      render={({ field }) => {
        const selectedIds = new Set<number>(
          Array.isArray(field.value) ? field.value.map(Number) : []
        );

        const totalPermissionsCount = permissions.length;
        const selectedCount = selectedIds.size;
        const percentSelected =
          totalPermissionsCount > 0
            ? Math.round((selectedCount / totalPermissionsCount) * 100)
            : 0;

        // Toggle Single Permission
        const handleTogglePermission = (id: number) => {
          const next = new Set(selectedIds);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          field.onChange(Array.from(next));
        };

        // Toggle All in a Module
        const handleToggleModule = (modItems: { id: number }[]) => {
          const modItemIds = modItems.map((m) => m.id);
          const allSelected = modItemIds.every((id) => selectedIds.has(id));
          const next = new Set(selectedIds);

          if (allSelected) {
            modItemIds.forEach((id) => next.delete(id));
          } else {
            modItemIds.forEach((id) => next.add(id));
          }
          field.onChange(Array.from(next));
        };

        // Global Select All / Deselect All
        const handleSelectAllGlobal = () => {
          if (selectedCount === totalPermissionsCount) {
            field.onChange([]);
          } else {
            field.onChange(permissions.map((p) => p.id));
          }
        };

        return (
          <div className="space-y-5 rounded-2xl bg-card border border-border/80 p-5 sm:p-7 shadow-xs">
            {/* Header & Stats Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {t("Role & Permissions")}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t("Select the access levels and authorized system actions for this role")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats & Progress Pill */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                    <span className="text-primary font-mono">{selectedCount}</span>
                    <span className="text-muted-foreground">of {totalPermissionsCount} Selected</span>
                    <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-muted text-muted-foreground">
                      {percentSelected}%
                    </span>
                  </div>
                  <div className="w-32 h-2 rounded-full bg-muted overflow-hidden mt-1">
                    <div
                      className="h-full bg-primary transition-all duration-300 rounded-full"
                      style={{ width: `${percentSelected}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSelectAllGlobal}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 bg-muted/60 hover:bg-card text-foreground hover:border-primary/40 active:scale-95 shrink-0"
                >
                  {selectedCount === totalPermissionsCount && totalPermissionsCount > 0 ? (
                    <>
                      <X size={14} className="text-destructive" />
                      <span>Deselect All</span>
                    </>
                  ) : (
                    <>
                      <CheckCheck size={14} className="text-primary" />
                      <span>Select All</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter permissions by module or action (e.g. blog, users, delete)..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-muted/30 border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-card transition-all placeholder:text-muted-foreground"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Validation Error Feedback */}
            {errors?.permission_ids && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-semibold">
                <AlertCircle size={15} />
                <span>{errors.permission_ids.message || "Please select at least one permission."}</span>
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-40 rounded-2xl bg-muted/50 border border-border/50" />
                ))}
              </div>
            ) : filteredModules.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border/80">
                No permissions matching "{searchQuery}"
              </div>
            ) : (
              /* Grouped Module Cards Matrix */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {filteredModules.map((mod) => {
                  const Icon = mod.icon;
                  const modItemIds = mod.items.map((m) => m.id);
                  const selectedInModCount = modItemIds.filter((id) => selectedIds.has(id)).length;
                  const isAllModSelected =
                    modItemIds.length > 0 && selectedInModCount === modItemIds.length;
                  const isSomeModSelected =
                    selectedInModCount > 0 && selectedInModCount < modItemIds.length;

                  return (
                    <div
                      key={mod.moduleKey}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                        selectedInModCount > 0
                          ? "bg-card border-primary/40 shadow-xs ring-1 ring-primary/10"
                          : "bg-card/50 border-border/70 hover:border-border"
                      }`}
                    >
                      {/* Module Header */}
                      <div className="flex items-center justify-between p-3.5 sm:p-4 bg-muted/30 border-b border-border/70">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              selectedInModCount > 0
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <Icon size={16} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-foreground truncate">
                              {mod.moduleTitle}
                            </h4>
                            <span className="text-[11px] text-muted-foreground block font-mono">
                              {selectedInModCount} / {mod.items.length} active
                            </span>
                          </div>
                        </div>

                        {/* Module Toggle All Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleModule(mod.items)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            isAllModSelected
                              ? "bg-primary text-primary-foreground border-primary"
                              : isSomeModSelected
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-card text-muted-foreground border-border hover:text-foreground"
                          }`}
                        >
                          {isAllModSelected ? "All Selected" : "Select Module"}
                        </button>
                      </div>

                      {/* Permission Action Chips / Checkbox Grid */}
                      <div className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mod.items.map((perm) => {
                          const isChecked = selectedIds.has(perm.id);

                          return (
                            <button
                              key={perm.id}
                              type="button"
                              onClick={() => handleTogglePermission(perm.id)}
                              className={`group flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                                isChecked
                                  ? "bg-primary/10 border-primary text-foreground shadow-2xs"
                                  : "bg-muted/20 border-border/60 hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <div className="min-w-0 pr-2 space-y-0.5">
                                <span className="block text-xs font-bold leading-tight truncate">
                                  {perm.actionLabel}
                                </span>
                                <span className="block text-[10px] font-mono text-muted-foreground/80 truncate">
                                  {perm.name}
                                </span>
                              </div>

                              <div
                                className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                                  isChecked
                                    ? "bg-primary border-primary text-primary-foreground scale-105"
                                    : "bg-card border-border group-hover:border-primary/50 text-transparent"
                                }`}
                              >
                                <Check size={12} strokeWidth={3} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
