"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Package,
  MapPin,
  User,
  Ship,
  Anchor,
  Weight,
  Loader2,
  Building2,
  Phone,
  Mail,
  Ruler,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitPriceRequest, PriceRequestPayload } from "@/api/price-requests";

// ─── Data Types & Defaults ───────────────────────────────────────────────────

export type PriceRequestFormData = PriceRequestPayload;

const INITIAL_DATA: PriceRequestFormData = {
  from: "",
  to: "",
  container_type: "40ft High Cube",
  cargo_type: "",
  weight: "",
  dimensions: "12.03m x 2.35m x 2.69m",
  name: "",
  email: "",
  phone: "",
  company_name: "",
  notes: ""
};

// ─── Options & Presets ───────────────────────────────────────────────────────

interface ContainerOption {
  value: string;
  label: string;
  desc: string;
  defaultDim: string;
}

const CONTAINER_TYPES: ContainerOption[] = [
  {
    value: "20ft Standard",
    label: "20ft Standard (20' GP)",
    desc: "Standard cargo (33.2 m³)",
    defaultDim: "5.90m x 2.35m x 2.39m"
  },
  {
    value: "40ft Standard",
    label: "40ft Standard (40' GP)",
    desc: "General volume (67.7 m³)",
    defaultDim: "12.03m x 2.35m x 2.39m"
  },
  {
    value: "40ft High Cube",
    label: "40ft High Cube (40' HC)",
    desc: "Max volume (76.4 m³)",
    defaultDim: "12.03m x 2.35m x 2.69m"
  },
  {
    value: "20ft Reefer",
    label: "20ft Reefer (Refrigerated)",
    desc: "Cold cargo (28.3 m³)",
    defaultDim: "5.45m x 2.29m x 2.26m"
  },
  {
    value: "40ft Reefer",
    label: "40ft Reefer (Refrigerated)",
    desc: "Cold cargo (67.3 m³)",
    defaultDim: "11.58m x 2.29m x 2.50m"
  },
  {
    value: "Open Top Container",
    label: "Open Top Container",
    desc: "Top loading / bulky",
    defaultDim: "12.03m x 2.35m x 2.35m"
  },
  {
    value: "Flat Rack Container",
    label: "Flat Rack Container",
    desc: "Over-dimensional cargo",
    defaultDim: "12.03m x 2.44m x 2.59m"
  },
  {
    value: "Less than Container Load (LCL)",
    label: "LCL / Shared Container",
    desc: "Consolidated freight",
    defaultDim: "Custom dimensions"
  }
];

const CARGO_PRESETS = [
  "General Cargo",
  "Electronics & Appliances",
  "Foodstuffs & Perishables",
  "Textiles & Garments",
  "Chemicals / Hazardous (DG)",
  "Automotive & Spare Parts",
  "Heavy Machinery",
  "Other"
];

const NOTE_ASSISTANTS = [
  "Need customs clearance assistance",
  "Best freight rate requested",
  "Requires door-to-door delivery",
  "Marine cargo insurance needed",
  "Bonded warehousing required"
];

// ─── Step Indicator Component ────────────────────────────────────────────────

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300",
        done ? "bg-primary text-primary-foreground shadow-sm" : "",
        active ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md scale-110" : "",
        !done && !active ? "bg-muted text-muted-foreground border border-border" : ""
      ].join(" ")}
    >
      {done ? <CheckCircle2 size={16} /> : step}
    </div>
  );
}

function FieldGroup({
  label,
  htmlFor,
  hint,
  required,
  error,
  children
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor} className="text-xs font-semibold text-foreground flex items-center gap-1">
          {label}
          {required && <span className="text-destructive font-bold">*</span>}
        </Label>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1 animate-in fade-in">
          <AlertCircle size={12} className="shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

// ─── Step 1: Route & Container ───────────────────────────────────────────────

function Step1({
  data,
  set,
  errors
}: {
  data: PriceRequestFormData;
  set: (patch: Partial<PriceRequestFormData>) => void;
  errors?: Record<string, string[]>;
}) {
  const t = useTranslations("ShipWithUs.form");

  const handleSelectContainer = (option: ContainerOption) => {
    set({
      container_type: option.value,
      dimensions: option.defaultDim || data.dimensions
    });
  };

  return (
    <div className="space-y-6">
      {/* Route: From & To */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldGroup
          label={t("from.label")}
          htmlFor="from"
          required
          hint={t("from.hint")}
          error={errors?.from?.[0]}
        >
          <div className="relative">
            <Anchor size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="from"
              required
              autoComplete="off"
              className={`ps-9 ${errors?.from ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={data.from}
              onChange={(e) => set({ from: e.target.value })}
              placeholder={t("from.placeholder")}
            />
          </div>
        </FieldGroup>

        <FieldGroup
          label={t("to.label")}
          htmlFor="to"
          required
          hint={t("to.hint")}
          error={errors?.to?.[0]}
        >
          <div className="relative">
            <MapPin size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="to"
              required
              autoComplete="off"
              className={`ps-9 ${errors?.to ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={data.to}
              onChange={(e) => set({ to: e.target.value })}
              placeholder={t("to.placeholder")}
            />
          </div>
        </FieldGroup>
      </div>

      {/* Container Type */}
      <FieldGroup
        label={t("container.label")}
        htmlFor="container-type"
        required
        hint={t("container.hint")}
        error={errors?.container_type?.[0]}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
          {CONTAINER_TYPES.map((c) => {
            const isSelected = data.container_type === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => handleSelectContainer(c)}
                className={[
                  "flex flex-col text-left rtl:text-right p-3 rounded-xl border transition-all cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/20 shadow-xs"
                    : "border-border bg-card hover:border-primary/40 hover:bg-muted/30 text-muted-foreground"
                ].join(" ")}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-xs font-bold ${isSelected ? "text-primary" : "text-foreground"}`}>
                    {c.label}
                  </span>
                  {isSelected && <CheckCircle2 size={13} className="text-primary shrink-0" />}
                </div>
                <span className="text-[10px] text-muted-foreground">{c.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Custom container type input */}
        <div className="pt-2">
          <Input
            id="container-type"
            autoComplete="off"
            value={data.container_type}
            onChange={(e) => set({ container_type: e.target.value })}
            placeholder={t("container.customPlaceholder")}
            className="text-xs"
          />
        </div>
      </FieldGroup>
    </div>
  );
}

// ─── Step 2: Cargo Specifications ────────────────────────────────────────────

function Step2({
  data,
  set,
  errors
}: {
  data: PriceRequestFormData;
  set: (patch: Partial<PriceRequestFormData>) => void;
  errors?: Record<string, string[]>;
}) {
  const t = useTranslations("ShipWithUs.form");
  const currentContainerOption = CONTAINER_TYPES.find((c) => c.value === data.container_type);

  return (
    <div className="space-y-6">
      {/* Cargo Type */}
      <FieldGroup
        label={t("cargo.label")}
        htmlFor="cargo_type"
        required
        hint={t("cargo.hint")}
        error={errors?.cargo_type?.[0]}
      >
        <div className="relative">
          <Package size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            id="cargo_type"
            required
            autoComplete="off"
            className={`ps-9 ${errors?.cargo_type ? "border-destructive focus-visible:ring-destructive" : ""}`}
            value={data.cargo_type}
            onChange={(e) => set({ cargo_type: e.target.value })}
            placeholder={t("cargo.placeholder")}
          />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {CARGO_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => set({ cargo_type: preset })}
              className={[
                "text-[10px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer",
                data.cargo_type === preset
                  ? "bg-primary text-primary-foreground border-primary font-medium"
                  : "bg-muted/50 border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
              ].join(" ")}
            >
              {preset}
            </button>
          ))}
        </div>
      </FieldGroup>

      {/* Weight & Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldGroup
          label={t("weight.label")}
          htmlFor="weight"
          required
          hint={t("weight.hint")}
          error={errors?.weight?.[0]}
        >
          <div className="relative">
            <Weight size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="weight"
              required
              autoComplete="off"
              className={`ps-9 ${errors?.weight ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={data.weight}
              onChange={(e) => set({ weight: e.target.value })}
              placeholder={t("weight.placeholder")}
            />
          </div>
        </FieldGroup>

        <FieldGroup
          label={t("dimensions.label")}
          htmlFor="dimensions"
          hint={t("dimensions.hint")}
          error={errors?.dimensions?.[0]}
        >
          <div className="relative">
            <Ruler size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="dimensions"
              autoComplete="off"
              className="ps-9"
              value={data.dimensions}
              onChange={(e) => set({ dimensions: e.target.value })}
              placeholder={t("dimensions.placeholder")}
            />
          </div>
          {currentContainerOption?.defaultDim && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => set({ dimensions: currentContainerOption.defaultDim })}
                className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline cursor-pointer"
              >
                <Sparkles size={11} /> {t("dimensions.useStandard", { label: currentContainerOption.label, dim: currentContainerOption.defaultDim })}
              </button>
            </div>
          )}
        </FieldGroup>
      </div>

      {/* Helpful quote specifications helper */}
      <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
        <p className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Sparkles size={13} className="text-primary" /> {t("specialRequirements.title")}
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {t("specialRequirements.hint")}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {NOTE_ASSISTANTS.map((req) => {
            const currentNotes = data.notes || "";
            const hasIt = currentNotes.includes(req);
            return (
              <button
                key={req}
                type="button"
                onClick={() => {
                  if (hasIt) {
                    const cleaned = currentNotes
                      .replace(req, "")
                      .replace(/,\s*,/g, ",")
                      .replace(/^\s*,\s*|\s*,\s*$/g, "")
                      .trim();
                    set({ notes: cleaned });
                  } else {
                    const sep = currentNotes.trim() ? (currentNotes.trim().endsWith(".") ? " " : ". ") : "";
                    set({ notes: `${currentNotes.trim()}${sep}${req}.` });
                  }
                }}
                className={[
                  "text-[10px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer",
                  hasIt
                    ? "bg-primary text-primary-foreground border-primary font-medium"
                    : "bg-background border-border/80 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                ].join(" ")}
              >
                {hasIt ? `✓ ${req}` : `+ ${req}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Contact Details & Review ────────────────────────────────────────

function Step3({
  data,
  set,
  errors
}: {
  data: PriceRequestFormData;
  set: (patch: Partial<PriceRequestFormData>) => void;
  errors?: Record<string, string[]>;
}) {
  const t = useTranslations("ShipWithUs.form");

  return (
    <div className="space-y-6">
      {/* Contact person & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldGroup
          label={t("contact.name.label")}
          htmlFor="name"
          required
          hint={t("contact.name.hint")}
          error={errors?.name?.[0]}
        >
          <div className="relative">
            <User size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="name"
              required
              autoComplete="off"
              className={`ps-9 ${errors?.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={data.name}
              onChange={(e) => set({ name: e.target.value })}
              placeholder={t("contact.name.placeholder")}
            />
          </div>
        </FieldGroup>

        <FieldGroup
          label={t("contact.company.label")}
          htmlFor="company_name"
          hint={t("contact.company.hint")}
          error={errors?.company_name?.[0]}
        >
          <div className="relative">
            <Building2 size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="company_name"
              autoComplete="off"
              className={`ps-9 ${errors?.company_name ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={data.company_name}
              onChange={(e) => set({ company_name: e.target.value })}
              placeholder={t("contact.company.placeholder")}
            />
          </div>
        </FieldGroup>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FieldGroup
          label={t("contact.email.label")}
          htmlFor="email"
          required
          hint={t("contact.email.hint")}
          error={errors?.email?.[0]}
        >
          <div className="relative">
            <Mail size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="email"
              type="email"
              required
              autoComplete="off"
              className={`ps-9 ${errors?.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={data.email}
              onChange={(e) => set({ email: e.target.value })}
              placeholder={t("contact.email.placeholder")}
            />
          </div>
        </FieldGroup>

        <FieldGroup
          label={t("contact.phone.label")}
          htmlFor="phone"
          required
          hint={t("contact.phone.hint")}
          error={errors?.phone?.[0]}
        >
          <div className="relative">
            <Phone size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="phone"
              type="tel"
              required
              autoComplete="off"
              className={`ps-9 ${errors?.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
              value={data.phone}
              onChange={(e) => set({ phone: e.target.value })}
              placeholder={t("contact.phone.placeholder")}
            />
          </div>
        </FieldGroup>
      </div>

      {/* Notes */}
      <FieldGroup
        label={t("contact.notes.label")}
        htmlFor="notes"
        hint={t("contact.notes.hint")}
        error={errors?.notes?.[0]}
      >
        <Textarea
          id="notes"
          rows={3}
          autoComplete="off"
          value={data.notes}
          onChange={(e) => set({ notes: e.target.value })}
          placeholder={t("contact.notes.placeholder")}
        />
      </FieldGroup>

      {/* Live Quote Summary Card */}
      <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold text-foreground uppercase tracking-wide">{t("overview.title")}</p>
          <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
            {data.container_type || t("overview.customEquipment")}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
          <div className="flex justify-between border-b border-border/40 py-1">
            <span className="text-muted-foreground">{t("overview.route")}:</span>
            <span className="font-semibold text-foreground truncate max-w-[200px]">
              {data.from || "—"} → {data.to || "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-border/40 py-1">
            <span className="text-muted-foreground">{t("overview.cargo")}:</span>
            <span className="font-semibold text-foreground truncate max-w-[200px]">
              {data.cargo_type || "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-border/40 py-1">
            <span className="text-muted-foreground">{t("overview.weight")}:</span>
            <span className="font-semibold text-foreground">
              {data.weight || "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-border/40 py-1">
            <span className="text-muted-foreground">{t("overview.dimensions")}:</span>
            <span className="font-semibold text-foreground truncate max-w-[200px]">
              {data.dimensions || "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Summary Row ──────────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border/40 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0 w-32">{label}</span>
      <span className="text-xs font-semibold text-foreground text-right rtl:text-left">{value}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ShipWithUsForm() {
  const t = useTranslations("ShipWithUs.form");
  const [step, setStep] = useState(1);
  const [data, setData] = useState<PriceRequestFormData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const steps = [
    { label: t("steps.route"), icon: <Ship size={15} /> },
    { label: t("steps.cargo"), icon: <Package size={15} /> },
    { label: t("steps.contact"), icon: <User size={15} /> }
  ];

  const set = (patch: Partial<PriceRequestFormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    if (errorMessage) setErrorMessage(null);
    if (Object.keys(fieldErrors).length > 0) {
      const updated = { ...fieldErrors };
      Object.keys(patch).forEach((key) => {
        delete updated[key];
      });
      setFieldErrors(updated);
    }
  };

  // Step validation
  const validateStep = (currentStep: number): boolean => {
    if (currentStep === 1) {
      if (!data.from.trim()) {
        toast.error(t("validation.fromRequired"));
        return false;
      }
      if (!data.to.trim()) {
        toast.error(t("validation.toRequired"));
        return false;
      }
      if (!data.container_type.trim()) {
        toast.error(t("validation.containerRequired"));
        return false;
      }
    } else if (currentStep === 2) {
      if (!data.cargo_type.trim()) {
        toast.error(t("validation.cargoRequired"));
        return false;
      }
      if (!data.weight.trim()) {
        toast.error(t("validation.weightRequired"));
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) return;

    if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
      toast.error(t("validation.contactRequired"));
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const payload: PriceRequestPayload = {
        from: data.from.trim(),
        to: data.to.trim(),
        container_type: data.container_type.trim(),
        cargo_type: data.cargo_type.trim(),
        weight: data.weight.trim(),
        dimensions: data.dimensions?.trim() || undefined,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        company_name: data.company_name?.trim() || undefined,
        notes: data.notes?.trim() || undefined
      };

      const res = await submitPriceRequest(payload);

      if (res && res.success) {
        toast.success(t("validation.successToast"));
        setSubmitted(true);
      } else {
        const backendErrors = res?.errors || res?.result?.errors;
        if (backendErrors && typeof backendErrors === "object") {
          setFieldErrors(backendErrors);
          if (backendErrors.from || backendErrors.to || backendErrors.container_type) setStep(1);
          else if (backendErrors.cargo_type || backendErrors.weight || backendErrors.dimensions) setStep(2);
          else if (backendErrors.name || backendErrors.email || backendErrors.phone || backendErrors.company_name) setStep(3);
        }
        const msg = res?.result?.message || res?.message || t("validation.genericError");
        setErrorMessage(msg);
        toast.error(msg);
      }
    } catch (err: any) {
      console.error("Price request submission error:", err);
      const backendErrors = err?.response?.data?.errors;
      if (backendErrors && typeof backendErrors === "object") {
        setFieldErrors(backendErrors);
        if (backendErrors.from || backendErrors.to || backendErrors.container_type) setStep(1);
        else if (backendErrors.cargo_type || backendErrors.weight || backendErrors.dimensions) setStep(2);
        else if (backendErrors.name || backendErrors.email || backendErrors.phone || backendErrors.company_name) setStep(3);
      }
      const msg = err?.response?.data?.message || (err instanceof Error ? err.message : t("validation.unexpectedError"));
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Success State ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden animate-in fade-in-50 duration-300">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
        <div className="p-8 sm:p-12 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
            <CheckCircle2 size={34} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
              {t("success.title")}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {t("success.thankYou")}, <strong className="text-foreground">{data.name}</strong>
              {data.company_name ? <> {t("success.fromCompany")} <strong className="text-foreground">{data.company_name}</strong></> : ""}.{" "}
              {t("success.loggedNotice", { container: data.container_type, from: data.from, to: data.to, email: data.email })}
            </p>
          </div>

          <div className="w-full max-w-md rounded-xl bg-muted/40 border border-border/60 p-4 text-left rtl:text-right">
            <SummaryRow label={t("overview.route")} value={`${data.from} → ${data.to}`} />
            <SummaryRow label={t("container.label")} value={data.container_type} />
            <SummaryRow label={t("overview.cargo")} value={data.cargo_type} />
            <SummaryRow label={t("overview.weight")} value={data.weight} />
            {data.dimensions && <SummaryRow label={t("overview.dimensions")} value={data.dimensions} />}
            <SummaryRow label={t("overview.contact")} value={data.company_name ? `${data.name} (${data.company_name})` : data.name} />
            <SummaryRow label={t("overview.email")} value={data.email} />
            <SummaryRow label={t("overview.phone")} value={data.phone} />
            {data.notes && <SummaryRow label={t("overview.notes")} value={data.notes} />}
          </div>

          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setSubmitted(false);
              setData(INITIAL_DATA);
              setStep(1);
            }}
          >
            {t("success.submitAnother")}
          </Button>
        </div>
      </div>
    );
  }

  // ── Form State ────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

      {/* Step Header */}
      <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-border/60">
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar">
          {steps.map(({ label, icon }, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <React.Fragment key={n}>
                <div className="flex items-center gap-2.5 shrink-0">
                  <StepIndicator step={n} current={step} />
                  <div>
                    <p
                      className={[
                        "text-[10px] uppercase tracking-widest font-bold leading-none mb-0.5 transition-colors",
                        active ? "text-primary" : done ? "text-primary/60" : "text-muted-foreground"
                      ].join(" ")}
                    >
                      {t("steps.step")} {n}
                    </p>
                    <p
                      className={[
                        "text-xs font-semibold leading-none transition-colors flex items-center gap-1",
                        active ? "text-foreground" : "text-muted-foreground"
                      ].join(" ")}
                    >
                      {icon} {label}
                    </p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={[
                      "flex-1 h-px min-w-[24px] transition-colors duration-300",
                      step > n ? "bg-primary/40" : "bg-border"
                    ].join(" ")}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="mx-6 sm:mx-8 mt-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-2.5 text-xs">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-semibold">{t("submissionFailed")}</p>
            <p className="text-destructive/90">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Step Body */}
      <div className="px-6 sm:px-8 py-7 min-h-[340px]">
        {step === 1 && <Step1 data={data} set={set} errors={fieldErrors} />}
        {step === 2 && <Step2 data={data} set={set} errors={fieldErrors} />}
        {step === 3 && <Step3 data={data} set={set} errors={fieldErrors} />}
      </div>

      {/* Footer Navigation */}
      <div className="px-6 sm:px-8 py-5 border-t border-border/60 flex items-center justify-between gap-3 bg-muted/20">
        <div className="text-xs text-muted-foreground">
          {t("steps.step")} <strong className="text-foreground">{step}</strong> {t("steps.of")} {steps.length}
        </div>
        <div className="flex items-center gap-2.5">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              className="gap-1.5 text-sm"
              disabled={loading}
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft size={15} className="rtl:rotate-180" /> {t("buttons.back")}
            </Button>
          )}

          {step < steps.length ? (
            <Button type="button" className="gap-1.5 text-sm" onClick={handleNext}>
              {t("buttons.next")} <ArrowRight size={15} className="rtl:rotate-180" />
            </Button>
          ) : (
            <Button type="submit" disabled={loading} className="gap-2 text-sm px-6">
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> {t("buttons.submitting")}
                </>
              ) : (
                <>
                  {t("buttons.submit")} <ArrowRight size={15} className="rtl:rotate-180" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
