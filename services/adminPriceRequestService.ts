import {
  PriceRequestFilters,
  ReplyPriceRequestDTO,
  UpdatePriceRequestStatusDTO
} from "@/types/priceRequest";
import { TOKEN } from "@/utils/config";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  (typeof window !== "undefined" ? `${window.location.origin}/api` : "http://localhost:8000/api");

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  // 1. Try localStorage
  const localToken = localStorage.getItem("token") || localStorage.getItem(TOKEN);
  if (localToken) return localToken;

  // 2. Try document.cookie
  const match = document.cookie.match(new RegExp(`(^| )${TOKEN}=([^;]+)`));
  if (match) return decodeURIComponent(match[2]);

  return null;
};

const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const buildApiUrl = (path: string, params?: URLSearchParams): string => {
  const cleanBase = API_BASE.replace(/\/+$/, "");
  const baseWithApi = cleanBase.endsWith("/api") ? cleanBase : `${cleanBase}/api`;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const query = params && params.toString() ? `?${params.toString()}` : "";
  return `${baseWithApi}${cleanPath}${query}`;
};

export const adminPriceRequestApi = {
  // 1. Fetch Paginated Inquiries
  list: async (filters: PriceRequestFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.container_type) params.append("container_type", filters.container_type);
    if (filters.cargo_type) params.append("cargo_type", filters.cargo_type);
    if (filters.page) params.append("page", filters.page.toString());
    if (filters.per_page) params.append("per_page", filters.per_page.toString());

    const url = buildApiUrl("/admin/price-requests", params);
    const res = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders()
    });

    const data = await res.json();
    if (!res.ok) {
      const err: any = new Error(data?.message || "Failed to fetch price requests");
      err.response = { status: res.status, data };
      throw err;
    }
    return data;
  },

  // 2. Fetch Single Inquiry
  getById: async (id: number | string) => {
    const url = buildApiUrl(`/admin/price-requests/${id}`);
    const res = await fetch(url, {
      method: "GET",
      headers: getAuthHeaders()
    });

    const data = await res.json();
    if (!res.ok) {
      const err: any = new Error(data?.message || "Failed to fetch inquiry details");
      err.response = { status: res.status, data };
      throw err;
    }
    return data;
  },

  // 3. Reply & Submit Official Quote
  reply: async (id: number | string, data: ReplyPriceRequestDTO) => {
    const url = buildApiUrl(`/admin/price-requests/${id}/reply`);
    const res = await fetch(url, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });

    const resData = await res.json();
    if (!res.ok) {
      const err: any = new Error(resData?.message || "Failed to submit quote");
      err.response = { status: res.status, data: resData };
      throw err;
    }
    return resData;
  },

  // 4. Change Status
  updateStatus: async (id: number | string, data: UpdatePriceRequestStatusDTO) => {
    const url = buildApiUrl(`/admin/price-requests/${id}/status`);
    const res = await fetch(url, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });

    const resData = await res.json();
    if (!res.ok) {
      const err: any = new Error(resData?.message || "Failed to update status");
      err.response = { status: res.status, data: resData };
      throw err;
    }
    return resData;
  },

  // 5. Delete Inquiry (Soft Delete)
  delete: async (id: number | string) => {
    const url = buildApiUrl(`/admin/price-requests/${id}`);
    const res = await fetch(url, {
      method: "DELETE",
      headers: getAuthHeaders()
    });

    const resData = await res.json();
    if (!res.ok) {
      const err: any = new Error(resData?.message || "Failed to delete inquiry");
      err.response = { status: res.status, data: resData };
      throw err;
    }
    return resData;
  }
};
