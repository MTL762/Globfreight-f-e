"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HelpCircle,
  Search,
  Check,
  X,
  ExternalLink,
  Loader2,
  ListPlus,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchHelper } from "@/api/fetch";

export interface FaqSelectOption {
  id: number;
  question: string;
  answer?: string;
}

interface FaqSelectInputProps {
  value?: any;
  onChange?: (val: number[]) => void;
  name?: string;
  categoryId?: number | string;
  subCategoryId?: number | string;
}

export default function FaqListInput({
  value,
  onChange,
  name = "seo_faq_ids",
  categoryId,
  subCategoryId
}: FaqSelectInputProps) {
  // Map of known FAQ items by ID (for title caching)
  const [faqLookup, setFaqLookup] = useState<Record<number, FaqSelectOption>>({});
  const [options, setOptions] = useState<FaqSelectOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize incoming value into an array of numeric IDs and cache existing questions
  const selectedIds: number[] = useMemo(() => {
    if (!value) return [];

    // Array of numbers or strings
    if (Array.isArray(value)) {
      const ids: number[] = [];
      const newCache: Record<number, FaqSelectOption> = {};

      value.forEach((item: any) => {
        if (typeof item === "number" && !isNaN(item)) {
          ids.push(item);
        } else if (typeof item === "string" && !isNaN(Number(item)) && item.trim() !== "") {
          ids.push(Number(item));
        } else if (typeof item === "object" && item !== null) {
          const id = Number(item.id);
          if (!isNaN(id) && id > 0) {
            ids.push(id);
            if (item.question) {
              newCache[id] = { id, question: item.question, answer: item.answer };
            }
          }
        }
      });

      if (Object.keys(newCache).length > 0) {
        setFaqLookup((prev) => ({ ...prev, ...newCache }));
      }

      return Array.from(new Set(ids));
    }

    // Comma-separated or single value
    if (typeof value === "string" && value.trim()) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) {
          return parsed.map((x: any) => (typeof x === "object" ? Number(x.id) : Number(x))).filter(Boolean);
        }
      } catch {
        return value.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n) && n > 0);
      }
    }

    if (typeof value === "number" && !isNaN(value)) {
      return [value];
    }

    return [];
  }, [value]);

  // Fetch FAQ select menu options from GET /api/admin/faq-items/select_menu
  const fetchFaqs = useCallback(
    async (query = "") => {
      setIsLoading(true);
      try {
        const params: Record<string, any> = {
          limit: 100
        };
        if (query.trim()) params.search = query.trim();
        if (categoryId && Number(categoryId) > 0) params.category_id = categoryId;
        if (subCategoryId && Number(subCategoryId) > 0) params.sub_category_id = subCategoryId;

        const res = await fetchHelper({
          endPoint: ["adminFaqItemsSelectMenu"],
          revalidate: 60,
          isLocalized: true,
          params
        });

        const items: any[] = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res)
          ? res
          : [];

        const normalized: FaqSelectOption[] = items
          .map((item: any) => ({
            id: Number(item.id),
            question: item.question || item.name || `FAQ #${item.id}`,
            answer: item.answer
          }))
          .filter((item) => !isNaN(item.id) && item.id > 0);

        setOptions(normalized);

        // Update lookup cache
        setFaqLookup((prev) => {
          const updated = { ...prev };
          normalized.forEach((opt) => {
            updated[opt.id] = opt;
          });
          return updated;
        });
      } catch (err) {
        console.error("Failed to fetch FAQ select menu:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [categoryId, subCategoryId]
  );

  // Initial fetch on mount or when category filters change
  useEffect(() => {
    fetchFaqs("");
  }, [fetchFaqs]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFaqs(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchFaqs]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelectFaq = (faq: FaqSelectOption) => {
    const isSelected = selectedIds.includes(faq.id);
    let nextIds: number[];

    if (isSelected) {
      nextIds = selectedIds.filter((id) => id !== faq.id);
    } else {
      nextIds = [...selectedIds, faq.id];
      // Cache question
      setFaqLookup((prev) => ({ ...prev, [faq.id]: faq }));
    }

    onChange?.(nextIds);
  };

  const removeFaq = (idToRemove: number) => {
    const nextIds = selectedIds.filter((id) => id !== idToRemove);
    onChange?.(nextIds);
  };

  const clearAllFaqs = () => {
    onChange?.([]);
  };

  return (
    <div className="w-full space-y-3.5 rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <span>FAQ Selection (FAQPage Schema)</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                {selectedIds.length} Selected
              </span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Select FAQs from the FAQ module by ID. Questions & answers are automatically localized for visitors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAllFaqs}
              className="h-8 text-xs text-muted-foreground hover:text-destructive px-2"
            >
              Clear All
            </Button>
          )}
          <a
            href="/admin/faq-items"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium px-2 py-1 rounded-md hover:bg-primary/5 transition-colors"
          >
            <span>FAQ Module</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Search & Select Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            id={name}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            placeholder="Search FAQs by question to add..."
            className="ps-9 pe-9 h-10 text-xs sm:text-sm bg-background border-border/80 focus-visible:ring-primary/20"
          />
          {isLoading && (
            <Loader2 className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary animate-spin" />
          )}
          {!isLoading && searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                fetchFaqs("");
              }}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-border bg-popover text-popover-foreground shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
            <div className="max-h-60 overflow-y-auto p-1.5 divide-y divide-border/40">
              {isLoading && options.length === 0 ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>Loading FAQs...</span>
                </div>
              ) : options.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted-foreground space-y-1 px-4">
                  <p className="font-semibold text-foreground">No active FAQs found</p>
                  <p>Create questions in the FAQ module or adjust your search filter.</p>
                </div>
              ) : (
                options.map((faq) => {
                  const isSelected = selectedIds.includes(faq.id);
                  return (
                    <button
                      key={faq.id}
                      type="button"
                      onClick={() => toggleSelectFaq(faq)}
                      className={`w-full text-start flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm transition-colors ${
                        isSelected
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/60 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="shrink-0 h-5 px-1.5 rounded-md bg-muted text-[10px] font-mono font-bold flex items-center justify-center border border-border/50 text-muted-foreground">
                          #{faq.id}
                        </span>
                        <span className="truncate">{faq.question}</span>
                      </div>
                      <div className="shrink-0 ms-2">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
                            <Check className="h-3.5 w-3.5" />
                            <span>Selected</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
                            <ListPlus className="h-3.5 w-3.5" />
                            <span>Add</span>
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Selected FAQs List */}
      <div className="space-y-2 pt-1">
        {selectedIds.length === 0 ? (
          <div
            onClick={() => setIsDropdownOpen(true)}
            className="cursor-pointer border-2 border-dashed border-border/80 hover:border-primary/50 hover:bg-muted/20 rounded-xl p-5 text-center transition-all group"
          >
            <div className="mx-auto w-9 h-9 rounded-xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary flex items-center justify-center transition-colors mb-2">
              <HelpCircle className="h-4 w-4" />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-foreground">
              No FAQs selected yet
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click the search bar above to select existing FAQs by ID (`faq_ids`)
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {selectedIds.map((id, idx) => {
              const faq = faqLookup[id];
              const questionTitle = faq?.question || `FAQ Question #${id}`;

              return (
                <div
                  key={id}
                  className="rounded-xl border border-border/70 bg-card hover:bg-muted/20 transition-colors p-3 flex items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 h-6 px-2 rounded-md bg-primary/10 text-primary text-xs font-mono font-bold flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                        {questionTitle}
                      </p>
                      <p className="text-[11px] text-muted-foreground font-mono">
                        FAQ ID: {id}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFaq(id)}
                    className="shrink-0 h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 inline-flex items-center justify-center transition-colors"
                    title={`Remove FAQ #${id}`}
                    aria-label={`Remove FAQ #${id}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
