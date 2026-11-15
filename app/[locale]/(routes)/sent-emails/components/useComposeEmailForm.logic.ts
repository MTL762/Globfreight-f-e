"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { fetchHelper } from "@/api/fetch";
import { useRouter } from "@/i18n/navigation";
import { EmailReq, StringReq } from "@/validations/String.schema";

export const createComposeEmailSchema = (t: TFunction) =>
  z.object({
    recipient_email: EmailReq(t),
    recipient_name: z.string().optional(),
    subject: StringReq(t, 3),
    body: StringReq(t, 3)
  });

export type ComposeEmailFormValues = z.infer<ReturnType<typeof createComposeEmailSchema>>;

export function useComposeEmailForm() {
  const t = useTranslations();
  const tCompose = useTranslations("sentEmails.compose");
  const router = useRouter();

  const form = useForm<ComposeEmailFormValues>({
    resolver: zodResolver(createComposeEmailSchema(t)),
    defaultValues: {
      recipient_email: "",
      recipient_name: "",
      subject: "",
      body: ""
    }
  });

  const onSubmit = async (formData: ComposeEmailFormValues) => {
    try {
      const res = await fetchHelper({
        endPoint: ["adminSentEmails"],
        method: "POST",
        body: formData
      });
      if (res?.success !== false) {
        toast.success(tCompose("successMessage"));
        form.reset();
        router.push("/sent-emails");
        router.refresh();
      } else {
        toast.error(res?.result?.message || res?.message || tCompose("errorMessage"));
      }
    } catch {
      toast.error(tCompose("unexpectedError"));
    }
  };

  return { form, onSubmit, router, tCompose };
}
