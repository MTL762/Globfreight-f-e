"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, FolderTree } from "lucide-react";
import { useMemo, useState } from "react";

type SectionRecord = {
  id: number | string;
  name?: string | null;
  parent_id?: number | string | null;
  parent?: {
    id?: number | string | null;
  } | null;
};

type SectionNode = {
  item: SectionRecord;
  children: SectionNode[];
};

function normalizeId(value: number | string | null | undefined): string | null {
  if (value === null || value === undefined || value === "") return null;
  return String(value);
}

function buildTree(items: SectionRecord[]): SectionNode[] {
  const nodeMap = new Map<string, SectionNode>();

  for (const item of items) {
    const itemId = normalizeId(item.id);
    if (!itemId) continue;

    nodeMap.set(itemId, {
      item,
      children: []
    });
  }

  const roots: SectionNode[] = [];

  for (const node of nodeMap.values()) {
    const parentId = normalizeId(node.item.parent_id ?? node.item.parent?.id);

    if (!parentId || parentId === normalizeId(node.item.id)) {
      roots.push(node);
      continue;
    }

    const parentNode = nodeMap.get(parentId);
    if (!parentNode) {
      roots.push(node);
      continue;
    }

    parentNode.children.push(node);
  }

  const sortNodes = (nodes: SectionNode[]) => {
    nodes.sort((a, b) => {
      const first = a.item.name ?? "";
      const second = b.item.name ?? "";
      return first.localeCompare(second);
    });

    nodes.forEach(node => sortNodes(node.children));
  };

  sortNodes(roots);
  return roots;
}

export default function SectionsTreeView({ data }: { data: SectionRecord[] }): JSX.Element {
  const tree = useMemo(() => buildTree(data), [data]);

  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    () => new Set(data.map(item => String(item.id)))
  );

  const toggleExpand = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const renderNodes = (nodes: SectionNode[], level = 0): JSX.Element[] => {
    return nodes.flatMap(node => {
      const nodeId = String(node.item.id);
      const hasChildren = node.children.length > 0;
      const isExpanded = expandedNodes.has(nodeId);

      const currentNode = (
        <li key={nodeId} className="list-none">
          <div
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/40",
              level > 0 && "border-s border-border/80"
            )}
            style={{ paddingInlineStart: `${level * 16 + 8}px` }}
          >
            {hasChildren ? (
              <button
                type="button"
                onClick={() => toggleExpand(nodeId)}
                className="rounded p-0.5 hover:bg-muted"
                aria-label={isExpanded ? "Collapse section" : "Expand section"}
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            ) : (
              <span className="inline-block h-5 w-5" />
            )}
            <FolderTree className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{node.item.name || `Section #${node.item.id}`}</span>
            <span className="text-xs text-muted-foreground">(#{node.item.id})</span>
          </div>
        </li>
      );

      if (!hasChildren || !isExpanded) {
        return [currentNode];
      }

      return [currentNode, ...renderNodes(node.children, level + 1)];
    });
  };

  return (
    <Card className="mb-6 border-gray-200/80 dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Sections Tree View</CardTitle>
      </CardHeader>
      <CardContent>
        {tree.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sections available.</p>
        ) : (
          <ul className="space-y-1">{renderNodes(tree)}</ul>
        )}
      </CardContent>
    </Card>
  );
}
