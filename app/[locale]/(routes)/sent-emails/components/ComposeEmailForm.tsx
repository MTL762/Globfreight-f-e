"use client";

import { ArrowLeft, Send } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/navigation";

import { useComposeEmailForm } from "./useComposeEmailForm.logic";

const LABEL_CLASS = "text-xs font-bold text-muted-foreground uppercase tracking-wider";
const INPUT_CLASS = "rounded-2xl border-border/60";

function ComposeEmailHeader({ tCompose }: { tCompose: TFunction }) {
  return (
    <CardHeader className="p-0 pb-6 border-b border-border/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
            <Send className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">{tCompose("title")}</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{tCompose("subtitle")}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild className="rounded-xl">
          <Link href="/sent-emails">
            <ArrowLeft className="h-4 w-4 me-1.5 rtl:rotate-180" />
            <span>{tCompose("backToList")}</span>
          </Link>
        </Button>
      </div>
    </CardHeader>
  );
}

type ComposeInputFieldProps = {
  id: string;
  label: string;
  type?: "text" | "email";
  placeholder: string;
  error?: string;
  registration: UseFormRegisterReturn;
};

function ComposeInputField({
  id,
  label,
  type = "text",
  placeholder,
  error,
  registration
}: ComposeInputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={LABEL_CLASS}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={INPUT_CLASS}
        {...registration}
      />
      <ErrorMessage error={error} />
    </div>
  );
}

function ComposeFormActions({
  isSubmitting,
  onCancel,
  tCompose
}: {
  isSubmitting: boolean;
  onCancel: () => void;
  tCompose: TFunction;
}) {
  return (
    <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
      <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl">
        {tCompose("cancel")}
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl gap-2 font-medium bg-rose-600 hover:bg-rose-700 text-white"
      >
        <Send className="h-4 w-4" />
        <span>{isSubmitting ? tCompose("sending") : tCompose("sendNow")}</span>
      </Button>
    </div>
  );
}

export function ComposeEmailForm() {
  const { form, onSubmit, router, tCompose } = useComposeEmailForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form;

  return (
    <Card className="rounded-3xl border border-border/50 bg-card p-6 shadow-sm max-w-4xl mx-auto">
      <ComposeEmailHeader tCompose={tCompose} />
      <CardContent className="p-0 pt-6">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComposeInputField
              id="recipient_email"
              type="email"
              label={tCompose("recipientEmailLabel")}
              placeholder={tCompose("recipientEmailPlaceholder")}
              error={errors.recipient_email?.message}
              registration={register("recipient_email")}
            />
            <ComposeInputField
              id="recipient_name"
              label={tCompose("recipientNameLabel")}
              placeholder={tCompose("recipientNamePlaceholder")}
              error={errors.recipient_name?.message}
              registration={register("recipient_name")}
            />
          </div>
          <ComposeInputField
            id="subject"
            label={tCompose("subjectLabel")}
            placeholder={tCompose("subjectPlaceholder")}
            error={errors.subject?.message}
            registration={register("subject")}
          />
          <div className="space-y-2">
            <Label htmlFor="body" className={LABEL_CLASS}>
              {tCompose("bodyLabel")}
            </Label>
            <Textarea
              id="body"
              rows={8}
              placeholder={tCompose("bodyPlaceholder")}
              aria-invalid={Boolean(errors.body)}
              className={`${INPUT_CLASS} font-mono text-sm`}
              {...register("body")}
            />
            <ErrorMessage error={errors.body?.message} />
          </div>
          <ComposeFormActions
            isSubmitting={isSubmitting}
            onCancel={() => router.push("/sent-emails")}
            tCompose={tCompose}
          />
        </form>
      </CardContent>
    </Card>
  );
}
