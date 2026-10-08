import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { FormInput } from "../../Form/CustomFormTypes.types";

type RadioButtonInputProps = FormInput & {
  value?: any;
};

export default function RadioButtonInput({
  options,
  onChange,
  name,
  value
}: RadioButtonInputProps) {
  // Find matching option with support for boolean, number, string and truthy/falsy representations
  const selectedOption = options?.find(opt => {
    if (opt.value === value) return true;
    if (value !== undefined && value !== null && String(opt.value) === String(value)) return true;
    const isValTrue = value === true || value === "true" || value === 1 || value === "1";
    const isValFalse = value === false || value === "false" || value === 0 || value === "0";
    const isOptTrue = opt.value === true || opt.value === "true" || opt.value === 1 || opt.value === "1";
    const isOptFalse = opt.value === false || opt.value === "false" || opt.value === 0 || opt.value === "0";
    if (isValTrue && isOptTrue) return true;
    if (isValFalse && isOptFalse) return true;
    return false;
  });

  const selectedOptValue = selectedOption
    ? String(selectedOption.value)
    : value !== undefined && value !== null
    ? String(value)
    : undefined;

  return (
    <div className="w-full">
      <RadioGroup
        value={selectedOptValue}
        className="flex flex-wrap gap-2.5 pt-0.5"
        onValueChange={val => {
          const matched = options?.find(o => String(o.value) === String(val));
          onChange?.((matched ? matched.value : val) as any);
        }}
        name={name}
      >
        {options?.map(option => {
          const optValue = option.value.toString();
          const isSelected = selectedOptValue === optValue;
          const id = `${name}-${optValue}`;
          return (
            <label
              key={optValue}
              htmlFor={id}
              className={cn(
                "inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer transition-all duration-150 select-none",
                isSelected
                  ? "border-primary/50 bg-primary/10 text-primary shadow-xs ring-1 ring-primary/20"
                  : "border-border/80 bg-background/70 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <RadioGroupItem id={id} data-testid={name} value={optValue} />
              <span dangerouslySetInnerHTML={{ __html: option.label }} />
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
