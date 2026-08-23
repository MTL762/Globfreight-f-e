import { fetchHelper } from "@/api/fetch";
import { endLoading, startLoading } from "global-loading-state";
import type { FieldValues, UseFormReset } from "react-hook-form";
import { toast } from "sonner";
import { endpointType } from "./endpoints";
import { redirectServer } from "./redirectServer";

export async function FormAction<T = any>({
  data,
  formData,
  endpoint,
  redirectLink = true,
  reset,
  customReset,
  noId = false,
  method,
  t
}: {
  noId?: boolean;
  t: TFunction;
  reset?: UseFormReset<T extends FieldValues ? T : FieldValues>;
  data?: T & { id?: string | number };
  // data?: T & { id?: string | number; key?: string };
  method?: "POST" | "PATCH"|"PUT";
  redirectLink?: boolean | string;
  // redirectLink?: allRoutes;
  endpoint: endpointType;
  formData: FieldValues;
  customReset?: (res?: unknown) => void;
}): Promise<ApiResponse<T>> {
  startLoading();
  // loadingEmitter.emit(true);
  let res: ApiResponse<T> = {
    message: "",
    success: false,
    total: 0,
    data: null as unknown as T,
    result: {
      message: ""
    }
  };
  if (data?.id) {
    const id = data?.id;
    res = await fetchHelper({
			endPoint: [...endpoint, ...(noId !== true ? [Number(id)] : [])],
      body: formData,
      method: method || "PUT"
    });
  } else {
    res = await fetchHelper({
			endPoint: [...endpoint],
      body: formData,
      method: method || "POST"
    });
  }
  endLoading();
  MessageToast({
    res: res,
    reset: reset,
    customReset,
    t
  });
  // Set the redirect URL in the response if the operation was successful
  if (res?.success && redirectLink != false) {
    await redirectServer();
  }
  // loadingEmitter.emit(false);
  return res;
}

export function MessageToast<T>({
  res,
  reset,
  customReset,
  t
}: {
  t: TFunction;
  res: ApiResponse<any>;

  reset?: UseFormReset<T extends FieldValues ? T : FieldValues>;
  customReset?: () => void;
}): void {
  if (res?.success) {
    if (reset) reset();
    if (customReset) customReset();
    toast.success(t("Success"), {
      id: "success-toast"
    });
  } else {
    toast.error(res?.result?.message, {
      id: "error-toast",
      description: res?.message || t("Something went wrong")
    });
  }
}
