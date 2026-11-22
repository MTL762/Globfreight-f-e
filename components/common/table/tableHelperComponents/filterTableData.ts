/**
 * Utility to filter table rows locally on the client when search/filter params are present.
 * Acts as an instant client-side fallback if backend returns unfiltered data.
 */

function matchValue(val: unknown, query: string): boolean {
  if (val === null || val === undefined) return false;
  if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
    return String(val).toLowerCase().includes(query);
  }
  if (Array.isArray(val)) {
    return val.some(item => matchValue(item, query));
  }
  if (typeof val === "object") {
    return Object.values(val as Record<string, unknown>).some(item => matchValue(item, query));
  }
  return false;
}

function matchSpecificField(row: Record<string, unknown>, key: string, filterVal: string): boolean {
  const targetVal = row[key];
  const query = filterVal.toLowerCase().trim();

  if (targetVal !== undefined && targetVal !== null) {
    if (
      typeof targetVal === "string" ||
      typeof targetVal === "number" ||
      typeof targetVal === "boolean"
    ) {
      const strVal = String(targetVal).toLowerCase();
      if (key === "status" || key === "id") {
        return strVal === query;
      }
      return strVal.includes(query);
    }
    if (typeof targetVal === "object") {
      return matchValue(targetVal, query);
    }
  }

  // Fallback field aliases
  if (key === "search") {
    return matchValue(row, query);
  }
  if (key === "recipient_email" && (row.email || row.to)) {
    return matchValue(row.email ?? row.to, query);
  }
  if (key === "name" && (row.title || row.label || row.user)) {
    return matchValue(row.title ?? row.label ?? row.user, query);
  }

  return matchValue(row, query);
}

export function filterTableData<T extends Record<string, unknown>>(
  data: T[],
  searchParams: { entries: () => IterableIterator<[string, string]> }
): T[] {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const ignoredKeys = new Set(["page", "per_page", "limit", "pageSize"]);
  const entries = Array.from(searchParams.entries()).filter(
    ([key, val]) => val && val.trim() !== "" && !ignoredKeys.has(key)
  );

  if (entries.length === 0) {
    return data;
  }

  return data.filter(row => {
    return entries.every(([key, val]) => {
      const query = val.toLowerCase().trim();
      if (key === "search" || key === "q" || key === "query") {
        return matchValue(row, query);
      }
      return matchSpecificField(row, key, query);
    });
  });
}
