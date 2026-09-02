"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Package,
  MapPin,
  User,
  Ship,
  Anchor,
  Clock,
  Weight,
  Box,
  Thermometer,
  FileText,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// ─── Types ────────────────────────────────────────────────────────────────────

type CargoType = "fcl" | "lcl" | "bulk" | "roro" | "hazmat" | "reefer" | "";
type ContainerSize = "20ft" | "40ft" | "40hc" | "45ft" | "";
type IncoTerms =
  | "EXW"
  | "FOB"
  | "CIF"
  | "DAP"
  | "DDP"
  | "CFR"
  | "FCA"
  | "CPT"
  | "CIP"
  | "DAT"
  | "";

interface FormData {
  // Step 1 – Cargo Details
  cargoType: CargoType;
  containerSize: ContainerSize;
  quantity: string;
  weight: string;
  commodity: string;
  dangerous: boolean;
  temperature: string;
  specialRequirements: string;
  // Step 2 – Route & Schedule
  originPort: string;
  destinationPort: string;
  readyDate: string;
  incoterms: IncoTerms;
  customsClearance: boolean;
  insurance: boolean;
  warehousing: boolean;
  // Step 3 – Contact Info
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  vatNumber: string;
  notes: string;
}

const INITIAL: FormData = {
  cargoType: "",
  containerSize: "",
  quantity: "",
  weight: "",
  commodity: "",
  dangerous: false,
  temperature: "",
  specialRequirements: "",
  originPort: "",
  destinationPort: "",
  readyDate: "",
  incoterms: "",
  customsClearance: false,
  insurance: false,
  warehousing: false,
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  vatNumber: "",
  notes: ""
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StepIndicator({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div
      className={[
        "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300",
        done ? "bg-primary text-primary-foreground shadow-sm" : "",
        active ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md scale-110" : "",
        !done && !active ? "bg-muted text-muted-foreground" : ""
      ].join(" ")}
    >
      {done ? <CheckCircle2 size={16} /> : step}
    </div>
  );
}

function ToggleChip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground hover:bg-muted/40"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function FieldGroup({
  label,
  htmlFor,
  hint,
  children
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-semibold text-foreground">
        {label}
      </Label>
      {children}
      {hint && <p className="text-[10px] text-muted-foreground leading-snug">{hint}</p>}
    </div>
  );
}

// ─── Step 1: Cargo Details ────────────────────────────────────────────────────

const CARGO_TYPES: { value: CargoType; label: string; icon: React.ReactNode }[] = [
  { value: "fcl", label: "FCL", icon: <Box size={14} /> },
  { value: "lcl", label: "LCL", icon: <Package size={14} /> },
  { value: "bulk", label: "Bulk", icon: <Weight size={14} /> },
  { value: "roro", label: "RoRo", icon: <Ship size={14} /> },
  { value: "hazmat", label: "Hazmat", icon: <FileText size={14} /> },
  { value: "reefer", label: "Reefer", icon: <Thermometer size={14} /> }
];

const CONTAINER_SIZES: ContainerSize[] = ["20ft", "40ft", "40hc", "45ft"];

function Step1({ data, set }: { data: FormData; set: (patch: Partial<FormData>) => void }) {
  return (
    <div className="space-y-6">
      <FieldGroup label="Cargo Type" htmlFor="cargo-type" hint="Select the primary shipment mode for your cargo.">
        <div id="cargo-type" className="flex flex-wrap gap-2 pt-0.5">
          {CARGO_TYPES.map(({ value, label, icon }) => (
            <ToggleChip key={value} active={data.cargoType === value} onClick={() => set({ cargoType: value })}>
              {icon} {label}
            </ToggleChip>
          ))}
        </div>
      </FieldGroup>

      {data.cargoType === "fcl" && (
        <FieldGroup label="Container Size" htmlFor="container-size">
          <div id="container-size" className="flex flex-wrap gap-2 pt-0.5">
            {CONTAINER_SIZES.map((s) => (
              <ToggleChip key={s} active={data.containerSize === s} onClick={() => set({ containerSize: s })}>
                {s}
              </ToggleChip>
            ))}
          </div>
        </FieldGroup>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup label="Quantity (Units / Containers)" htmlFor="qty">
          <Input
            id="qty"
            type="number"
            min={1}
            value={data.quantity}
            onChange={(e) => set({ quantity: e.target.value })}
            placeholder="e.g. 2"
          />
        </FieldGroup>
        <FieldGroup label="Gross Weight (kg)" htmlFor="weight">
          <Input
            id="weight"
            type="number"
            min={0}
            value={data.weight}
            onChange={(e) => set({ weight: e.target.value })}
            placeholder="e.g. 18 500"
          />
        </FieldGroup>
      </div>

      <FieldGroup label="Commodity / Cargo Description" htmlFor="commodity">
        <Input
          id="commodity"
          value={data.commodity}
          onChange={(e) => set({ commodity: e.target.value })}
          placeholder="e.g. Automotive spare parts, steel coils, electronics…"
        />
      </FieldGroup>

      {data.cargoType === "reefer" && (
        <FieldGroup label="Required Temperature (°C)" htmlFor="temp">
          <Input
            id="temp"
            value={data.temperature}
            onChange={(e) => set({ temperature: e.target.value })}
            placeholder="e.g. -18 or +4"
          />
        </FieldGroup>
      )}

      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground">Special Handling</p>
        <div className="flex flex-wrap gap-2">
          <ToggleChip active={data.dangerous} onClick={() => set({ dangerous: !data.dangerous })}>
            <FileText size={14} /> DGR / Dangerous Goods
          </ToggleChip>
        </div>
      </div>

      <FieldGroup label="Additional Cargo Notes" htmlFor="special-req">
        <Textarea
          id="special-req"
          rows={3}
          value={data.specialRequirements}
          onChange={(e) => set({ specialRequirements: e.target.value })}
          placeholder="Stackability restrictions, packaging type, hazmat UN codes, documentation requirements…"
        />
      </FieldGroup>
    </div>
  );
}

// ─── Step 2: Route & Schedule ─────────────────────────────────────────────────

const INCOTERMS: IncoTerms[] = ["EXW", "FOB", "CIF", "DAP", "DDP", "CFR", "FCA", "CPT", "CIP", "DAT"];

function Step2({ data, set }: { data: FormData; set: (patch: Partial<FormData>) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup label="Port / City of Origin" htmlFor="origin" hint="Loading port or pickup location">
          <div className="relative">
            <Anchor size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="origin"
              className="pl-8"
              value={data.originPort}
              onChange={(e) => set({ originPort: e.target.value })}
              placeholder="e.g. Shanghai, Shenzhen, Hamburg"
            />
          </div>
        </FieldGroup>

        <FieldGroup label="Port / City of Destination" htmlFor="destination" hint="Discharge port or delivery address">
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="destination"
              className="pl-8"
              value={data.destinationPort}
              onChange={(e) => set({ destinationPort: e.target.value })}
              placeholder="e.g. Antwerp, Rotterdam, Zeebrugge"
            />
          </div>
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup label="Cargo Ready Date" htmlFor="ready-date" hint="Approximate date cargo is available for pickup">
          <div className="relative">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="ready-date"
              type="date"
              className="pl-8"
              value={data.readyDate}
              onChange={(e) => set({ readyDate: e.target.value })}
            />
          </div>
        </FieldGroup>

        <FieldGroup label="Incoterms" htmlFor="incoterms">
          <select
            id="incoterms"
            value={data.incoterms}
            onChange={(e) => set({ incoterms: e.target.value as IncoTerms })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-foreground"
          >
            <option value="">Select Incoterms…</option>
            {INCOTERMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FieldGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground">Additional Services Required</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {([
            { key: "customsClearance" as const, label: "Customs Clearance", desc: "AEO-F certified declarations", icon: <FileText size={15} className="text-primary" /> },
            { key: "insurance" as const, label: "Cargo Insurance", desc: "All-risk marine coverage", icon: <CheckCircle2 size={15} className="text-primary" /> },
            { key: "warehousing" as const, label: "Bonded Warehousing", desc: "Temperature & security options", icon: <Box size={15} className="text-primary" /> }
          ]).map(({ key, label, desc, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => set({ [key]: !data[key] })}
              className={[
                "flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer",
                data[key]
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40 hover:bg-muted/30"
              ].join(" ")}
            >
              <div className={`mt-0.5 shrink-0 ${data[key] ? "opacity-100" : "opacity-40"}`}>{icon}</div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
                <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{desc}</p>
              </div>
              {data[key] && <CheckCircle2 size={14} className="text-primary ml-auto mt-0.5 shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Contact Info ─────────────────────────────────────────────────────

function Step3({ data, set }: { data: FormData; set: (patch: Partial<FormData>) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup label="Company Name" htmlFor="company">
          <Input
            id="company"
            required
            value={data.companyName}
            onChange={(e) => set({ companyName: e.target.value })}
            placeholder="e.g. Acme Trading BV"
          />
        </FieldGroup>
        <FieldGroup label="VAT / EORI Number" htmlFor="vat" hint="Optional – speeds up customs processing">
          <Input
            id="vat"
            value={data.vatNumber}
            onChange={(e) => set({ vatNumber: e.target.value })}
            placeholder="e.g. BE 0123.456.789"
          />
        </FieldGroup>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldGroup label="Contact Name" htmlFor="contact-name">
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              id="contact-name"
              className="pl-8"
              required
              value={data.contactName}
              onChange={(e) => set({ contactName: e.target.value })}
              placeholder="e.g. Sarah Johnson"
            />
          </div>
        </FieldGroup>
        <FieldGroup label="Work Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            value={data.email}
            onChange={(e) => set({ email: e.target.value })}
            placeholder="sarah@acme.com"
          />
        </FieldGroup>
      </div>

      <FieldGroup label="Phone / WhatsApp" htmlFor="phone">
        <Input
          id="phone"
          value={data.phone}
          onChange={(e) => set({ phone: e.target.value })}
          placeholder="+32 496 00 00 00"
        />
      </FieldGroup>

      <FieldGroup
        label="Additional Notes & Instructions"
        htmlFor="notes"
        hint="Mention any special requirements, preferred shipping lines, or deadlines."
      >
        <Textarea
          id="notes"
          rows={4}
          value={data.notes}
          onChange={(e) => set({ notes: e.target.value })}
          placeholder="e.g. Prefer Maersk or MSC services, cargo must arrive before 15 October…"
        />
      </FieldGroup>
    </div>
  );
}

// ─── Summary Row ──────────────────────────────────────────────────────────────

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-border/40 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0 w-36">{label}</span>
      <span className="text-xs font-semibold text-foreground text-right">{value}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const STEPS = [
  { label: "Cargo Details", icon: <Package size={15} /> },
  { label: "Route & Schedule", icon: <Ship size={15} /> },
  { label: "Contact Info", icon: <User size={15} /> }
];

export function ShipWithUsForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (patch: Partial<FormData>) => setData((prev) => ({ ...prev, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Static simulation — no real API call
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  // ── Success state ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />
        <div className="p-8 sm:p-12 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
            <CheckCircle2 size={34} className="text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
              Shipment Request Received
            </h3>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Thank you,{" "}
              <strong className="text-foreground">{data.contactName || data.companyName}</strong>.
              Our operations desk in Antwerp will review your{" "}
              <strong className="text-foreground">{data.cargoType.toUpperCase() || "cargo"}</strong>{" "}
              request and respond within{" "}
              <strong className="text-foreground">4 business hours</strong>.
            </p>
          </div>

          <div className="w-full max-w-sm rounded-xl bg-muted/40 border border-border/60 p-4 text-left">
            <SummaryRow label="Route" value={`${data.originPort} → ${data.destinationPort}`} />
            <SummaryRow label="Cargo Type" value={data.cargoType.toUpperCase()} />
            <SummaryRow label="Container" value={data.containerSize} />
            <SummaryRow label="Weight" value={data.weight ? `${data.weight} kg` : ""} />
            <SummaryRow label="Ready Date" value={data.readyDate} />
            <SummaryRow label="Email" value={data.email} />
          </div>

          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setSubmitted(false);
              setData(INITIAL);
              setStep(1);
            }}
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  // ── Form ──────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card shadow-sm overflow-hidden">
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

      {/* Step header */}
      <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-border/60">
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar">
          {STEPS.map(({ label, icon }, i) => {
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
                      Step {n}
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
                {i < STEPS.length - 1 && (
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

      {/* Step body */}
      <div className="px-6 sm:px-8 py-7 min-h-[320px]">
        {step === 1 && <Step1 data={data} set={set} />}
        {step === 2 && <Step2 data={data} set={set} />}
        {step === 3 && <Step3 data={data} set={set} />}
      </div>

      {/* Footer navigation */}
      <div className="px-6 sm:px-8 py-5 border-t border-border/60 flex items-center justify-between gap-3 bg-muted/20">
        <div className="text-xs text-muted-foreground">
          Step <strong className="text-foreground">{step}</strong> of {STEPS.length}
        </div>
        <div className="flex items-center gap-2.5">
          {step > 1 && (
            <Button type="button" variant="outline" className="gap-1.5 text-sm" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={15} /> Back
            </Button>
          )}
          {step < STEPS.length ? (
            <Button type="button" className="gap-1.5 text-sm" onClick={() => setStep((s) => s + 1)}>
              Next <ArrowRight size={15} />
            </Button>
          ) : (
            <Button type="submit" disabled={loading} className="gap-2 text-sm px-6">
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Sending Request…</>
              ) : (
                <>Submit Shipment Request <ArrowRight size={15} /></>
              )}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
