// Auto-generated type definitions

export interface rolesPermissionsItem {
  id: number;
  name: string;
}

export interface roles {
  id: number;
  name: string;
  permissions: rolesPermissionsItem[];
}
