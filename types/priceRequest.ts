export type PriceRequestStatus = 'pending' | 'reviewing' | 'quoted' | 'rejected' | 'archived';

export interface UserSummary {
  id: number;
  name: string;
  email: string;
}

export interface PriceRequest {
  id: number;
  from: string;
  to: string;
  container_type: string;
  cargo_type: string;
  weight: string;
  dimensions?: string | null;
  name: string;
  email: string;
  phone: string;
  company_name?: string | null;
  notes?: string | null;
  status: PriceRequestStatus;
  quoted_price?: string | number | null;
  currency: string;
  admin_notes?: string | null;
  reply_message?: string | null;
  replied_at?: string | null;
  replied_by?: UserSummary | null;
  created_at: string;
  updated_at: string;
}

// Payload for Public Quote Submission
export interface CreatePriceRequestDTO {
  from: string;               // e.g. "Shanghai, China"
  to: string;                 // e.g. "Alexandria, Egypt"
  container_type: string;     // e.g. "20ft Standard" | "40ft High Cube" | "Reefer"
  cargo_type: string;         // e.g. "Electronics" | "General Cargo" | "Perishables"
  weight: string;             // e.g. "18,500 KG"
  dimensions?: string;        // e.g. "12m x 2.4m x 2.6m" (optional)
  name: string;               // Requester full name
  email: string;              // Requester valid email
  phone: string;              // Requester phone / WhatsApp
  company_name?: string;      // Company name (optional)
  notes?: string;             // Customer special notes (optional)
}

// Payload for Admin Quoting / Replying
export interface ReplyPriceRequestDTO {
  quoted_price: number;       // e.g. 3450.00
  currency?: string;          // default "USD"
  reply_message: string;      // Formal reply message sent to customer email
  admin_notes?: string;       // Internal notes visible only to team
}

// Payload for Admin Status Update
export interface UpdatePriceRequestStatusDTO {
  status: PriceRequestStatus;
  admin_notes?: string;
}

// Query Filters for Admin Listing
export interface PriceRequestFilters {
  search?: string;            // Searches: name, email, phone, from, to, company_name
  status?: PriceRequestStatus;
  container_type?: string;
  cargo_type?: string;
  page?: number;
  per_page?: number;
}

// Status Meta Configuration matching Guide Section 4
export interface StatusMeta {
  value: PriceRequestStatus;
  labelEn: string;
  labelAr: string;
  badgeClass: string;
  borderClass: string;
  descriptionEn: string;
  descriptionAr: string;
}

export const PRICE_REQUEST_STATUS_CONFIG: Record<PriceRequestStatus, StatusMeta> = {
  pending: {
    value: 'pending',
    labelEn: 'Pending',
    labelAr: 'قيد الانتظار',
    badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-300 dark:border-amber-700/50',
    borderClass: 'border-amber-300',
    descriptionEn: 'New inquiry awaiting review.',
    descriptionAr: 'طلب جديد بانتظار المراجعة.'
  },
  reviewing: {
    value: 'reviewing',
    labelEn: 'Reviewing',
    labelAr: 'قيد المراجعة',
    badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-300 dark:border-blue-700/50',
    borderClass: 'border-blue-300',
    descriptionEn: 'Team is calculating freight rates.',
    descriptionAr: 'فريق العمل يقوم بحساب أسعار الشحن.'
  },
  quoted: {
    value: 'quoted',
    labelEn: 'Quoted',
    labelAr: 'تم التسعير والرد',
    badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700/50',
    borderClass: 'border-emerald-300',
    descriptionEn: 'Price quoted and emailed to customer.',
    descriptionAr: 'تم إرسال عرض السعر للعميل.'
  },
  rejected: {
    value: 'rejected',
    labelEn: 'Rejected',
    labelAr: 'مرفوض / غير متاح',
    badgeClass: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-300 dark:border-rose-700/50',
    borderClass: 'border-rose-300',
    descriptionEn: 'Route unavailable or cargo rejected.',
    descriptionAr: 'المسار غير متوفر أو نوع البضاعة مرفوض.'
  },
  archived: {
    value: 'archived',
    labelEn: 'Archived',
    labelAr: 'مؤرشف',
    badgeClass: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    borderClass: 'border-slate-300',
    descriptionEn: 'Completed or closed inquiry.',
    descriptionAr: 'طلب مكتمل أو مغلق.'
  }
};

// Container types specified in Guide Section 5.A
export const CONTAINER_TYPE_OPTIONS = [
  "20ft Standard Container (20' GP)",
  "40ft Standard Container (40' GP)",
  "40ft High Cube (40' HC)",
  "20ft Reefer (Refrigerated)",
  "40ft Reefer (Refrigerated)",
  "Open Top Container",
  "Flat Rack Container",
  "Less than Container Load (LCL)"
] as const;

// Cargo types specified in Guide Section 5.A
export const CARGO_TYPE_OPTIONS = [
  "General Cargo",
  "Electronics & Appliances",
  "Foodstuffs & Perishables",
  "Textiles & Garments",
  "Chemicals / Hazardous (DG)",
  "Automotive & Spare Parts",
  "Heavy Machinery",
  "Other"
] as const;

// Standard Currencies
export const CURRENCY_OPTIONS = ["USD", "EUR", "EGP", "SAR", "AED"] as const;
