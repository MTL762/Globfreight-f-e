"use server";

import { fetchHelper } from "@/api/fetch";

export interface PriceRequestPayload {
  from: string;
  to: string;
  container_type: string;
  cargo_type: string;
  weight: string;
  dimensions: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  notes: string;
}

export async function submitPriceRequest(payload: PriceRequestPayload) {
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
