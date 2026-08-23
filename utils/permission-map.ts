export type PermissionAction = "get" | "post" | "put" | "patch" | "delete";

export const routePermissionMap: Record<string, string> = {
  banners: "Banners",
  branches: "branches",
  category: "Categories",
  categories: "Categories",
  cities: "Cities",
  complaint: "Complaints",
  coupons: "Coupons",
  customers: "Customers",
  delivery: "deliveryAll",
  modules: "Modules",
  permissions: "Permissions",
  roles: "Roles",
  schedule: "Schedule",
  services: "Service",
  socialMedia: "Social Media",
  stores: "Stores",
  transactions: "transactions",
  users: "users",
  withdraw: "withdraw",
  banks: "banks",
  bankAccounts: "bankAccounts",
  zones: "Zones"
};

export function resolvePermissionKeyFromPath(pathname: string): string | undefined {
  const segments = pathname.split("/").filter(Boolean);
  const routeSegment = segments[1];
  return routeSegment ? routePermissionMap[routeSegment] : undefined;
}
