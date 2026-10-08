import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, Info } from "lucide-react";
import React from "react";

export default function InputLabel({
  label,
  selectedLang,
  isMultiLang,
  toolTip,
  description,
  toolTipIcon
}: {
  toolTip?: string;
  description?: string;
  label: string;
  selectedLang?: string;
  isMultiLang?: boolean;
  toolTipIcon?: "info" | "alert" | JSX.Element;
}): JSX.Element {
  const tip = toolTip || description;
  const displayLabel = isMultiLang && selectedLang ? `${selectedLang} ${label}` : label;
  return (
    <div className="flex items-center gap-1.5">
      <span>{displayLabel}</span>
      {tip && (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${displayLabel} info`}
                className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-full hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                {toolTipIcon === "alert" ? (
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                ) : React.isValidElement(toolTipIcon) ? (
                  toolTipIcon
                ) : (
                  <Info className="w-3.5 h-3.5 shrink-0" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="max-w-xs text-xs font-normal shadow-md px-3 py-2 leading-relaxed bg-popover text-popover-foreground border z-[9999] rounded-lg">
              <span>{tip}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
