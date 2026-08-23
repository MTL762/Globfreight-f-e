import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { Option } from "../../Form/CustomFormTypes.types";

function CheckBoxOption({
  option,
  name,
  isChecked,
  onCheckedChange
}: {
  option: Option;
  name: string;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const t = useTranslations();

  return (
    <div className="flex items-center gap-2" key={option.value.toString()}>
      <Checkbox
        name={name}
        checked={isChecked}
        onCheckedChange={checked => onCheckedChange(!!checked)}
        id={option.value.toString()}
      />
      <label
        htmlFor={option.value.toString()}
        className="text-sm flex gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {/* {option.img && (
					<Image
						src={option.img}
						width={20}
						height={20}
						alt={option.label}
					/>
				)} */}
        {t(option.label)}
      </label>
    </div>
  );
}

export default function CheckBoxInput({
  value,
  onChange,
  name,
  // error,
  options
  // maxSelections = options.length
}: {
  value?: string[];
  onChange: (e: string[]) => void;
  name: string;
  // error?: string;
  options: Option[];
  // maxSelections?: number;
}) {
  const handleCheckedChange = (checked: boolean, optionValue: string) => {
    const newValue = checked
      ? [...(value || []), optionValue]
      : value?.filter(v => v != optionValue) || [];

    onChange(newValue);
  };

  const isChecked = (optionValue: string): boolean => {
    return Array.isArray(value) ? value.includes(optionValue) : false;
  };
  return (
    <div className="flex  gap-2 items-center">
      {options.map(option => (
        <CheckBoxOption
          key={option.value.toString()}
          option={option}
          name={name}
          data-testid={name}
          isChecked={isChecked(option.value.toString())}
          onCheckedChange={checked => handleCheckedChange(checked, option.value.toString())}
        />
      ))}
    </div>
  );
}
