import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { FormInput } from "../../Form/CustomFormTypes.types";

type RadioButtonInputProps = FormInput & {
  value?: string;
};

export default function RadioButtonInput({
  options,
  onChange,
  name,
  value
}: RadioButtonInputProps) {
  return (
    <div className="w-full">
      <RadioGroup
        value={value?.toString()}
        className="flex flex-wrap gap-2.5 pt-0.5"
        onValueChange={val => onChange?.(val)}
        name={name}
      >
        {options?.map(option => {
          const optValue = option.value.toString();
          const isSelected = value?.toString() === optValue;
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
