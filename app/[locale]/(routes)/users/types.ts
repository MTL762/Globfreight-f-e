// Auto-generated type definitions

export interface usersRole {
  id: number;
  name: string;
}

export interface users {
  id: number;
  name: string;
  email: string;
  phone?: null;
  type: string;
  email_verified_at: string;
  phone_verified_at?: null;
  role: usersRole;
  avatar?: null;
}
