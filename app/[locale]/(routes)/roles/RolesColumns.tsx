"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { KeyRound, Shield, CheckCircle2 } from "lucide-react";

interface PermissionItem {
  id: number | string;
  name: string;
}

export default function RolesColumns(): ColumnDef<Record<string, unknown>>[] {
  return [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ getValue }) => (
        <span className="font-mono text-xs font-semibold text-muted-foreground">
          #{String(getValue())}
        </span>
      )
    },
    {
      accessorKey: "name",
      header: "Role",
      cell: ({ getValue }) => {
        const name = String(getValue() || "");
        return (
          <div className="flex items-center gap-2.5 min-w-[160px]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Shield className="h-4 w-4" />
            </div>
            <span className="font-bold text-foreground text-sm capitalize">
              {name}
            </span>
          </div>
        );
      }
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ getValue }) => {
        const rawPermissions = getValue() as (PermissionItem | string)[] | undefined;
        const permissions: string[] = Array.isArray(rawPermissions)
          ? rawPermissions.map((p) => (typeof p === "object" && p !== null ? p.name : String(p)))
          : [];

        if (permissions.length === 0) {
          return <span className="text-xs text-muted-foreground">No permissions</span>;
        }

        const visibleCount = 3;
        const visiblePermissions = permissions.slice(0, visibleCount);
        const remainingCount = permissions.length - visibleCount;

        return (
          <div className="flex flex-wrap items-center gap-1.5 max-w-[450px]">
            {visiblePermissions.map((perm, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-foreground"
              >
                <KeyRound className="h-2.5 w-2.5 text-primary opacity-70" />
                {perm}
              </span>
            ))}

            {remainingCount > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary transition hover:bg-primary/20 cursor-pointer"
                  >
                    +{remainingCount} more
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-3 shadow-xl" align="start">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-primary" />
                        All Permissions
                      </span>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {permissions.length} total
                      </Badge>
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                      {permissions.map((perm, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-md p-1.5 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
                        >
                          <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                          <span className="font-mono text-[11px]">{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        );
      }
    }
  ];
}

