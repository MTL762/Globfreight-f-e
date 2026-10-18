import { useMemo } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Select, { type MultiValue } from "react-select";
import { Option } from "../../Form/CustomFormTypes.types";
import { customStyles } from "./select.config";

interface CustomSelectProps {
  options: Option[];
  value?: any;
  placeholder?: string;
  name?: string;
  onChange?: (selectedOptions: (string | number | boolean)[]) => void;
  error?: string;
}

export default function MultiSelectInput({
  options = [],
  value,
  placeholder,
  name,
  onChange,
  error
}: CustomSelectProps): JSX.Element {
  const t = useTranslations();
  const { resolvedTheme } = useTheme();

  const formattedValue = useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map(val => {
        if (val && typeof val === "object" && "value" in val) return val;
        const found = options?.find(opt => String(opt.value) === String(val));
        return found || { label: String(val), value: val };
      });
    }
    return [];
  }, [value, options]);

  return (
    <div className="flex flex-col w-full gap-2">
      <Select
        value={formattedValue}
        isMulti={true}
        onChange={(selectedOptions: MultiValue<Option>) => {
          const data = selectedOptions.map(item => item.value);
          onChange?.(data);
        }}
        options={options}
        data-testid={name}
        isClearable={true}
        placeholder={placeholder ? placeholder : t("select")}
        name={name}
        styles={customStyles(resolvedTheme === "dark")}
        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
        menuPosition="fixed"
      />
      <ErrorMessage error={error || ""} />
    </div>
  );
}
