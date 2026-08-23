"use client";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Option } from "../../Form/CustomFormTypes.types";
import { customStyles } from "./select.config";

interface CustomSelectProps {
  options: Option[];
  value?: string | number;
  placeholder?: string;
  className?: string;
  onChange?: (selectedOption: string) => void;
  controllerChange?: (selectedOption: string | null) => void;
  name: string;
  pageSize?: number;
}

export default function SelectInput({
  options,
  value,
  placeholder,
  onChange,
  name,
  controllerChange,
  pageSize = 500
}: CustomSelectProps) {
  const t = useTranslations();
  const [displayedOptions, setDisplayedOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisplayedOptions(options.slice(0, pageSize));
  }, [options, pageSize]);
  const { theme } = useTheme();

  return (
    <div className="flex w-full flex-col gap-3">
      <Select
        isMulti={false}
        onChange={e => {
          const selectedOption = e as Option | null;
          if (selectedOption) {
            onChange?.(selectedOption.value.toString());
            controllerChange?.(selectedOption.value.toString());
          }
        }}
        options={displayedOptions}
        value={displayedOptions?.find(opt => opt.value == value)}
        placeholder={placeholder ? t(placeholder) : t("select")}
        name={name}
        data-testid={name}
        classNames={{
          control: () => "border-0 shadow-none"
        }}
        styles={customStyles(theme === "dark")}
        className="w-full"
        menuPosition="fixed"
        menuPlacement="auto"
        onMenuScrollToBottom={() => {
          if (!isLoading) {
            setIsLoading(true);
            const currentLength = displayedOptions.length;
            const nextBatch = options.slice(currentLength, currentLength + pageSize);

            if (nextBatch.length > 0) {
              setDisplayedOptions(prev => [...prev, ...nextBatch]);
            }
            setIsLoading(false);
          }
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
