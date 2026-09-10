"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type React from "react";
import { useRef, useState, type KeyboardEvent } from "react";

interface TagInputProps {
  value?: string[];
  onChange?: (values: string[]) => void;
  name?: string;
  placeholder?: string;
  className?: string;
  suggestions?: string[];
  maxTags?: number;
  disabled?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  name,
  placeholder,
  className = "",
  suggestions = [],
  maxTags,
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const safeValue: string[] = Array.isArray(value)
    ? value.map(v => (typeof v === "string" ? v : (v as any)?.value ?? String(v)))
    : typeof value === "string" && (value as string).trim()
    ? (value as string).split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    // Don't add duplicate
    if (safeValue.includes(trimmedTag)) {
      setInputValue("");
      return;
    }

    // Check maxTags
    if (maxTags !== undefined && safeValue.length >= maxTags) return;

    const newValues = [...safeValue, trimmedTag];
    onChange?.(newValues);
    setInputValue("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newValues = safeValue.filter(tag => tag !== tagToRemove);
    onChange?.(newValues);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === "Backspace" && !inputValue && safeValue.length > 0) {
      handleRemoveTag(safeValue[safeValue.length - 1]);
    }
  };

  const filteredSuggestions = suggestions.filter(
    suggestion =>
      !safeValue.includes(suggestion) &&
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div
      className={cn(
        "relative flex flex-wrap items-center gap-1.5 p-1.5 min-h-10 rounded-md border border-input bg-background transition-colors",
        isFocused && "ring-1 ring-ring border-input",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => !disabled && inputRef.current?.focus()}
    >
      {safeValue.map((tag, index) => (
        <Badge
          key={`${tag}-${index}`}
          variant="secondary"
          className="h-7 px-2.5 text-xs font-normal gap-1.5 max-w-[200px] truncate bg-muted hover:bg-muted/80 text-foreground transition-colors"
        >
          <span className="truncate">{tag}</span>
          {!disabled && (
            <button
              type="button"
              className="h-3.5 w-3.5 p-0 ml-0.5 rounded-full hover:bg-muted-foreground/20 inline-flex items-center justify-center cursor-pointer text-muted-foreground hover:text-foreground"
              onClick={e => {
                e.stopPropagation();
                handleRemoveTag(tag);
              }}
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}

      <div className="flex-1 min-w-[120px] relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          name={name}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            if (inputValue.trim()) {
              handleAddTag(inputValue);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            safeValue.length === 0
              ? placeholder
                ? typeof placeholder === "string"
                  ? t(placeholder)
                  : placeholder
                : t("Type and press enter to add")
              : ""
          }
          className="shadow-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-7 text-sm placeholder:text-muted-foreground pr-6 bg-transparent"
          disabled={disabled || (maxTags !== undefined && safeValue.length >= maxTags)}
        />
        {inputValue.trim() && (
          <button
            type="button"
            className={cn(
              "h-5 w-5 absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground inline-flex items-center justify-center",
              !disabled && "cursor-pointer hover:text-foreground transition-colors",
              disabled && "opacity-50"
            )}
            onClick={e => {
              e.stopPropagation();
              if (!disabled) handleAddTag(inputValue);
            }}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isFocused && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full bg-popover text-popover-foreground border rounded-md shadow-md z-50 max-h-48 overflow-auto p-1">
          {filteredSuggestions.map(suggestion => (
            <div
              key={suggestion}
              onMouseDown={e => {
                e.preventDefault();
                handleAddTag(suggestion);
              }}
              className="px-2 py-1.5 text-sm rounded hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center justify-between"
            >
              <span>{suggestion}</span>
              <Plus className="h-3 w-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
