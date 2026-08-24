"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api-client";

export function PublicContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.submitContact({
        name,
        email,
        phone,
        subject,
        message
      });
      if (res.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Contact submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center space-y-4 shadow-sm">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-xl font-bold">Inquiry Transmitted</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Thank you, <strong>{name}</strong>. Our European operations desk has received your request regarding "{subject}" and will respond shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setEmail("");
            setPhone("");
            setSubject("");
            setMessage("");
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-6 md:p-8 space-y-5 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">Direct Freight & Customs Quote Inquiry</h3>
        <p className="text-xs text-muted-foreground">
          Submit container or customs specifications directly to our operations team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pf-name">Your Name</Label>
          <Input
            id="pf-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. John Doe"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pf-email">Work Email</Label>
          <Input
            id="pf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pf-phone">Phone / WhatsApp</Label>
          <Input
            id="pf-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 234 567 8900"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pf-subject">Inquiry Subject</Label>
          <Input
            id="pf-subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Shipping Rate Inquiry (Shanghai - Alexandria)"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pf-msg">Message & Shipment Details</Label>
        <Textarea
          id="pf-msg"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please specify container size (20ft/40ft), commodity type, ports of loading/discharge, and required customs services..."
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full gap-2 py-6 text-base font-semibold">
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Transmitting Quote...
          </>
        ) : (
          <>
            <span>Submit Quotation Request</span>
            <ArrowRight size={18} />
          </>
        )}
      </Button>
    </form>
  );
}
