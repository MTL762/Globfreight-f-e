import { fetchHelper } from "@/api/fetch";
import {
  SendCustomerWhatsappMailPayload,
  SendCustomerWhatsappMailResponse,
  customers
} from "@/app/[locale]/(routes)/customers/types";

/**
 * Service to dispatch WhatsApp and Email notifications to customers.
 * Supports sending to all registered customers or specific client IDs.
 *
 * Endpoint: POST /admin/customers/send-whatsapp-mail
 */
export async function sendCustomerWhatsappMail(
  payload: SendCustomerWhatsappMailPayload
): Promise<SendCustomerWhatsappMailResponse> {
  // Ensure payload format matches API contract exactly
  const cleanPayload: SendCustomerWhatsappMailPayload = {
    send_to_all: Boolean(payload.send_to_all),
    subject: payload.subject.trim(),
    message: payload.message.trim(),
    ...(payload.send_to_all
      ? {}
      : { client_ids: (payload.client_ids || []).map(Number) })
  };

  const response = await fetchHelper({
    endPoint: ["adminCustomersSendWhatsappMail"],
    method: "POST",
    body: cleanPayload
  });

  return response;
}

/**
 * Fetch list of customers for lookup and multi-selection
 */
export async function fetchCustomersList(params?: {
  name?: string;
  search?: string;
  page?: number;
  per_page?: number;
}): Promise<{ data: customers[]; total: number }> {
  try {
    const response = await fetchHelper({
      endPoint: ["adminCustomers"],
      method: "GET",
      params: {
        per_page: params?.per_page || 50,
        page: params?.page || 1,
        ...(params?.search ? { name: params.search } : {}),
        ...(params?.name ? { name: params.name } : {})
      }
    });

    return {
      data: Array.isArray(response?.data) ? response.data : [],
      total: response?.total || 0
    };
  } catch (error) {
    console.error("Error fetching customers list:", error);
    return { data: [], total: 0 };
  }
}
