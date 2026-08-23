/**
 * Globfreight Brand Mark: Precision vector monogram representing a directed European freight corridor.
 */
export function BrandMark({
  inverse = false,
  compact = false,
  className = ""
}: {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`brand-mark ${inverse ? "brand-mark--inverse" : ""} ${
        compact ? "brand-mark--compact" : ""
      } ${className}`}
      aria-label="Globfreight"
    >
      <svg
        className="brand-mark__svg"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="18"
          cy="18"
          r="14.5"
          stroke={inverse ? "rgba(255, 255, 255, 0.25)" : "rgba(10, 25, 47, 0.15)"}
          strokeWidth="2.5"
        />
        <path
          d="M18 3.5C26.0081 3.5 32.5 9.99187 32.5 18C32.5 26.0081 26.0081 32.5 18 32.5C9.99187 32.5 3.5 26.0081 3.5 18"
          stroke="#0080FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M18 18H32"
          stroke="#0080FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle
          cx="18"
          cy="18"
          r="3"
          fill={inverse ? "#FFFFFF" : "#0A192F"}
        />
        <circle
          cx="32"
          cy="18"
          r="2.5"
          fill="#10B981"
        />
      </svg>
      {!compact && (
        <span className="brand-mark__word">
          globfreight<span className="brand-mark__dot">.</span>
        </span>
      )}
    </div>
  );
}
