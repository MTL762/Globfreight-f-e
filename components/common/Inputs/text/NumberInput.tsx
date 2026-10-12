import * as React from "react";
import { Input } from "@/components/ui/input";

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  pattern?: string;
  min?: number | string;
  max?: number | string;
}

export default function NumberInput({
  name,
  pattern,
  min,
  max,
  onChange,
  onKeyDown,
  ...props
}: NumberInputProps): JSX.Element {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;

    // Block typing minus sign if min is 0 or positive
    if (min !== undefined && min !== "" && Number(min) >= 0 && (e.key === "-" || e.key === "Minus")) {
      e.preventDefault();
      return;
    }

    // Block exponential notation 'e' or 'E'
    if (e.key === "e" || e.key === "E") {
      e.preventDefault();
      return;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val !== "" && min !== undefined && min !== "") {
      const numVal = Number(val);
      if (!isNaN(numVal) && numVal < Number(min)) {
        e.target.value = String(min);
      }
    }
    onChange?.(e);
  };

  return (
    <Input
      {...props}
      type="number"
      min={min}
      max={max}
      pattern={pattern ?? "[0-9]*"}
      data-testid={name}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    />
  );
}
