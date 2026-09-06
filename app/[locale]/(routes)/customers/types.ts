// Auto-generated type definitions

export interface customers {
  id: number;
  user_id?: null;
  first_name: string;
  last_name: string;
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  alt_phone: string;
  country: string;
  city: string;
  address: string;
  postal_code: string;
  tax_number: string;
  status: string;
  notes: string;
  user?: null;
  created_at: string;
  updated_at: string;
}

export interface SendCustomerWhatsappMailPayload {
  send_to_all: boolean;
  client_ids?: number[];
  subject: string;
  message: string;
}

export interface SendCustomerWhatsappMailResponse {
  success?: boolean;
  status?: boolean;
  message?: string;
  data?: any;
}
