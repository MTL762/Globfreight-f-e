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
  options = [],
  value,
  placeholder,
  className,
  onChange,
  name,
  controllerChange,
  pageSize = 500
}: CustomSelectProps) {
  const t = useTranslations();
  const [isMounted, setIsMounted] = useState(false);
  const [displayedOptions, setDisplayedOptions] = useState<Option[]>(() =>
    options ? options.slice(0, pageSize) : []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (options) {
      setDisplayedOptions(options.slice(0, pageSize));
    }
  }, [options, pageSize]);

  const { theme, resolvedTheme } = useTheme();
  const isDarkMode = (resolvedTheme || theme) === "dark";

  const selectedOption =
    displayedOptions?.find(opt => String(opt.value) === String(value)) ||
    options?.find(opt => String(opt.value) === String(value)) ||
    (value !== undefined && value !== null && value !== ""
      ? { label: String(value), value }
      : null);

  return (
    <div className="flex w-full flex-col gap-3">
      <Select
        instanceId={name}
        isMulti={false}
        onChange={e => {
          const selected = e as Option | null;
          if (selected) {
            onChange?.(selected.value.toString());
            controllerChange?.(selected.value.toString());
          } else {
            onChange?.("");
            controllerChange?.(null);
          }
        }}
        options={displayedOptions}
        value={selectedOption}
        placeholder={placeholder ? (t.has?.(placeholder) ? t(placeholder) : placeholder) : t("select")}
        name={name}
        data-testid={name}
        classNames={{
          control: () => "border-0 shadow-none"
        }}
        styles={customStyles(isDarkMode)}
        className={className || "w-full"}
        menuPortalTarget={isMounted && typeof document !== "undefined" ? document.body : null}
        menuPosition="fixed"
        menuPlacement="auto"
        onMenuScrollToBottom={() => {
          if (!isLoading && options) {
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
