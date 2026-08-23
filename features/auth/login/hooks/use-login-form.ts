"use client";

import { setToken } from "@/api/actions";
import { fetchHelper } from "@/api/fetch";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { useFcmToken } from "./use-fcm-token";

export function useLoginForm() {
  const locale = useLocale();
  const router = useRouter();
  const { notificationPermission, requestPermission } = useFcmToken();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    if (!form) {
      console.error("Form element not found");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(form);
    const password = (formData.get("password") as string | null)?.trim();
    const username = (formData.get("username") as string | null)?.trim();

    if (!password) {
      setIsLoading(false);
      return;
    }

    // const fcm = await getLoginFcmToken();

    const requestBody: {
      password: string;
      // fcm: string | null;
      username?: string;
      // locale: string;
    } = {
      password,
      ...(username ? { username } : {})
    };

    const res: any = await fetchHelper({
      endPoint: ["authLogin"],
      method: "POST",
      body: requestBody
    });
    console.log(res, 'sdae2ads')

    if (!res.success) {
      setIsLoading(false);
      toast.error(res.message || res.result?.message || "Login failed");
      return;
    }

    // Handle "not_verified" case specifically
    if (res.data === "not_verified") {
      setIsLoading(false);
      toast.error("Account not verified. Please verify your account first.");
      return;
    }

    // Robust token extraction: handle different possible structures
    const token = res.data?.token || res.data?.accessToken || res.data?.user?.AccessToken;

    if (token) {
      await setToken(token);
      toast.success("Login successful");
      router.push("/dashboard");
    } else {
      setIsLoading(false);
      toast.error("Login failed: Authentication token missing in response.");
    }
  };

  return {
    locale,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    onSubmit,
    notificationPermission,
    requestPermission
  };
}
