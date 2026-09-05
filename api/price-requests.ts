"use server";

import { fetchHelper } from "@/api/fetch";
import {
  CreatePriceRequestDTO,
  ReplyPriceRequestDTO,
  UpdatePriceRequestStatusDTO,
  PriceRequestFilters
} from "@/types/priceRequest";
import { revalidatePath, revalidateTag } from "next/cache";

export type PriceRequestPayload = CreatePriceRequestDTO;

// ─── Public Submission ────────────────────────────────────────────────────────
export async function submitPriceRequest(payload: CreatePriceRequestDTO) {
  try {
    const res = await fetchHelper({
      endPoint: ["priceRequests"],
      method: "POST",
      body: payload
    });
    return res;
  } catch (error) {
    console.error("Error submitting price request:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to submit price request"
    };
  }
}

// ─── Admin Listing ────────────────────────────────────────────────────────────
export async function adminGetPriceRequests(filters: PriceRequestFilters = {}) {
  try {
    const res = await fetchHelper({
      endPoint: ["adminPriceRequests"],
      method: "GET",
      params: filters,
      tags: ["adminPriceRequests"],
      cache: "no-cache"
    });
    return res;
  } catch (error) {
    console.error("Error fetching price requests:", error);
    return {
      success: false,
      data: [],
      total: 0,
      message: error instanceof Error ? error.message : "Failed to fetch price requests"
    };
  }
}

// ─── Admin Single Resource ───────────────────────────────────────────────────
export async function adminGetPriceRequestById(id: number | string) {
  try {
    const res = await fetchHelper({
      endPoint: ["adminPriceRequests", Number(id)],
      method: "GET",
      cache: "no-cache"
    });
    return res;
  } catch (error) {
    console.error(`Error fetching price request #${id}:`, error);
    return {
      success: false,
      data: null,
      message: error instanceof Error ? error.message : "Failed to fetch price request details"
    };
  }
}

// ─── Admin Reply & Submit Quote ──────────────────────────────────────────────
export async function adminReplyPriceRequest(id: number | string, data: ReplyPriceRequestDTO) {
  try {
    const res = await fetchHelper({
      endPoint: ["adminPriceRequests", Number(id), "reply"],
      method: "POST",
      body: data
    });

    try {
      revalidateTag("adminPriceRequests", "max");
      revalidatePath("/[locale]/(routes)/price-requests", "page");
    } catch {
      // Ignored if outside request context
    }

    return res;
  } catch (error) {
    console.error(`Error replying to price request #${id}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to reply to price request"
    };
  }
}

// ─── Admin Update Status ──────────────────────────────────────────────────────
export async function adminUpdatePriceRequestStatus(id: number | string, data: UpdatePriceRequestStatusDTO) {
  try {
    const res = await fetchHelper({
      endPoint: ["adminPriceRequests", Number(id), "status"],
      method: "PATCH",
      body: data
    });

    try {
      revalidateTag("adminPriceRequests", "max");
      revalidatePath("/[locale]/(routes)/price-requests", "page");
    } catch {
      // Ignored if outside request context
    }

    return res;
  } catch (error) {
    console.error(`Error updating status for price request #${id}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update price request status"
    };
  }
}

// ─── Admin Delete (Soft Delete) ──────────────────────────────────────────────
export async function adminDeletePriceRequest(id: number | string) {
  try {
    const res = await fetchHelper({
      endPoint: ["adminPriceRequests", Number(id)],
      method: "DELETE"
    });

    try {
      revalidateTag("adminPriceRequests", "max");
      revalidatePath("/[locale]/(routes)/price-requests", "page");
    } catch {
      // Ignored if outside request context
    }

    return res;
  } catch (error) {
    console.error(`Error deleting price request #${id}:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete price request"
    };
  }
}
