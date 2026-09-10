"use client";

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
  const id = `${name}-${option.value.toString()}`;

  return (
    <div className="flex items-center gap-2" key={option.value.toString()}>
      <Checkbox
        name={name}
        checked={isChecked}
        onCheckedChange={checked => onCheckedChange(!!checked)}
        id={id}
      />
      <label
        htmlFor={id}
        className="text-sm flex gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        {t(option.label)}
      </label>
    </div>
  );
}

export default function CheckBoxInput({
  value,
  onChange,
  name,
  options
}: {
  value?: any;
  onChange: (e: any) => void;
  name: string;
  options?: Option[];
}) {
  const t = useTranslations();
  const defaultOptions: Option[] = [
    { label: t("true"), value: "1" },
    { label: t("false"), value: "0" }
  ];
  const effectiveOptions = options && options.length > 0 ? options : defaultOptions;

  const handleCheckedChange = (checked: boolean, optionValue: string) => {
    if (Array.isArray(value)) {
      const newValue = checked
        ? [...value, optionValue]
        : value.filter(v => String(v) !== optionValue);
      onChange(newValue);
    } else if (typeof value === "boolean") {
      onChange(checked);
    } else {
      if (optionValue === "1" || optionValue === "0") {
        onChange(checked ? (optionValue === "0" ? "0" : "1") : (optionValue === "1" ? "0" : "1"));
      } else if (optionValue === "true" || optionValue === "false") {
        onChange(checked ? optionValue === "true" : optionValue !== "false");
      } else {
        onChange(checked ? optionValue : "");
      }
    }
  };

  const isChecked = (optionValue: string): boolean => {
    if (Array.isArray(value)) {
      return value.some(v => String(v) === optionValue);
    }
    if (typeof value === "boolean") {
      return value
        ? optionValue === "1" || optionValue === "true"
        : optionValue === "0" || optionValue === "false";
    }
    if (typeof value === "number") {
      return String(value) === optionValue;
    }
    if (typeof value === "string") {
      if (optionValue === "1" || optionValue === "true") {
        return value === "1" || value === "true";
      }
      if (optionValue === "0" || optionValue === "false") {
        return value === "0" || value === "false";
      }
      return value === optionValue;
    }
    return false;
  };

  return (
    <div className="flex gap-4 items-center">
      {effectiveOptions.map(option => (
        <CheckBoxOption
          key={option.value.toString()}
          option={option}
          name={name}
          isChecked={isChecked(option.value.toString())}
          onCheckedChange={checked => handleCheckedChange(checked, option.value.toString())}
        />
      ))}
    </div>
  );
}
