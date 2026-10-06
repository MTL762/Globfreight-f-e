import Image from "next/image";

/**
 * Globfreight Brand Mark: uses the canonical /logo.png logo asset.
 */
export function BrandMark({
  inverse = false,
  compact = false,
  className = "",
  ariaHidden = false
}: {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-hidden={ariaHidden ? true : undefined}
    >
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 shrink-0">
        <Image
          src="/logo.png"
          alt={ariaHidden ? "" : "Globfreight"}
          fill
          sizes="40px"
          priority
          className="object-contain"
        />
      </div>
      {!compact && (
        <span
          className={`text-lg sm:text-xl font-bold tracking-tight ${
            inverse ? "text-white" : "text-foreground"
          }`}
        >
          Globfreight<span className="text-primary">.</span>
        </span>
      )}
    </div>
  );
}
