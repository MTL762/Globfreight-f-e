import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ErrorMessage({
  error,
  className
}: {
  error?: string;
  className?: string;
}) {
  if (!error) return null;
  return (
    <p
      role="alert"
      className={cn(
        "flex items-center gap-1.5 mt-1.5 text-xs text-destructive font-medium animate-in fade-in-50 slide-in-from-top-1 duration-150",
        className
      )}
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>{error}</span>
    </p>
  );
}
