"use client";

import React from "react";
import { Plus, Trash2, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FaqListInputProps {
  value?: FAQItem[] | string;
  onChange?: (value: FAQItem[]) => void;
  name?: string;
}

export default function FaqListInput({
  value,
  onChange,
  name = "seo_faqs",
}: FaqListInputProps) {
  const faqs: FAQItem[] = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return [];
      }
    }
    return [];
  }, [value]);

  const handleAddFaq = () => {
    const updated = [...faqs, { question: "", answer: "" }];
    onChange?.(updated);
  };

  const handleRemoveFaq = (index: number) => {
    const updated = faqs.filter((_, i) => i !== index);
    onChange?.(updated);
  };

  const handleChangeFaq = (index: number, field: keyof FAQItem, val: string) => {
    const updated = faqs.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: val };
      }
      return item;
    });
    onChange?.(updated);
  };

  return (
    <div className="w-full space-y-3 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>FAQ Items</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                {faqs.length}
              </span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Auto-generates Google FAQPage Schema markup for rich snippet carousels
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddFaq}
          className="gap-1.5 h-8 text-xs font-semibold border-primary/30 text-primary hover:bg-primary/10"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add FAQ Item</span>
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div
          onClick={handleAddFaq}
          className="cursor-pointer border-2 border-dashed border-border/80 hover:border-primary/50 hover:bg-muted/30 rounded-xl p-6 text-center transition-all group"
        >
          <div className="mx-auto w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary flex items-center justify-center transition-colors mb-2">
            <MessageSquare className="h-5 w-5" />
          </div>
          <p className="text-xs sm:text-sm font-semibold text-foreground">
            No FAQs added yet
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Click here or &ldquo;Add FAQ Item&rdquo; to add frequently asked questions and answers
          </p>
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/35 transition-colors p-3.5 sm:p-4 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <span className="h-5 w-5 rounded-md bg-primary/15 text-primary text-[11px] flex items-center justify-center font-mono">
                    #{idx + 1}
                  </span>
                  <span>Question & Answer</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(idx)}
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 inline-flex items-center justify-center transition-colors"
                  title="Remove FAQ"
                  aria-label={`Remove FAQ ${idx + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-2">
                <div>
                  <label
                    htmlFor={`${name}_q_${idx}`}
                    className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1"
                  >
                    Question
                  </label>
                  <Input
                    id={`${name}_q_${idx}`}
                    value={faq.question}
                    onChange={(e) => handleChangeFaq(idx, "question", e.target.value)}
                    placeholder="e.g. How long does express shipping take?"
                    className="h-9 text-xs sm:text-sm bg-background"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${name}_a_${idx}`}
                    className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1"
                  >
                    Answer
                  </label>
                  <Textarea
                    id={`${name}_a_${idx}`}
                    value={faq.answer}
                    onChange={(e) => handleChangeFaq(idx, "answer", e.target.value)}
                    placeholder="e.g. Express air freight usually delivers within 1 to 3 business days worldwide."
                    rows={2}
                    className="text-xs sm:text-sm bg-background resize-y min-h-[60px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
