"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import type { FieldErrors } from "react-hook-form";
import { DateTimeInput } from "../Inputs/date/date-time-input";
import PdfInput from "../Inputs/files/PdfInput";
import VideoInput from "../Inputs/files/video-input";
import ColorInput from "../Inputs/other/color-input";
import CustomPhoneInput from "../Inputs/phone/PhoneInput";
import PasswordInput from "../Inputs/text/password-input";
import type { FormInput } from "./CustomFormTypes.types";
import { getNestedError } from "./hooks/errors";
const MapZoneInput = dynamic(() => import("../Inputs/map/MapZoneInput"), { ssr: false });
const MapPointerInput = dynamic(() => import("../Inputs/map/MapPointerInput"), { ssr: false });

const CheckBoxInput = dynamic(() => import("../Inputs/select/CheckBoxInput"));
const DateInput = dynamic(() => import("../Inputs/date/DateInput").then(mod => mod.DateInput));
const FilesUploadInput = dynamic(() => import("../Inputs/files/FilesUploadInput"));
const ImgInput = dynamic(() => import("../Inputs/files/ImgInput"));
const MultiSelectInput = dynamic(() => import("../Inputs/select/MultiSelectInput"));
const NumberInput = dynamic(() => import("../Inputs/text/NumberInput"));
const RadioButtonInput = dynamic(() => import("../Inputs/select/RadioButtonInput"));
const SelectInput = dynamic(() => import("../Inputs/select/SelectInputs"));
const SelectPaginated = dynamic(() => import("../Inputs/select/SelectPaginatedInput"));
const TextEditor = dynamic(() => import("../Inputs/text/TextEditor"));
const TextInput = dynamic(() => import("../Inputs/text/TextInput"));
const TimeInput = dynamic(() => import("../Inputs/text/TimeInput"));
// const TimeInput = dynamic(() => import("../Inputs/TimeInput"));
const YearInput = dynamic(() => import("../Inputs/date/year-input"));
const TagInput = dynamic(() => import("../Inputs/select/tag-input"));

const getErrorMessage = (errors: FieldErrors, name: string): string | undefined => {
  return name.split(".").length === 3
    ? getNestedError(errors, name)
    : (errors[name]?.message as string);
};

const InputWrapper = ({
  children,
  error,
  required,
  label,
  name,
  toolTip,
  toolTipIcon
}: {
  name: string;
  required?: boolean;
  label?: string | JSX.Element;
  children: React.ReactNode;
  error?: string;
  multiLang?: boolean;
  toolTip?: string;
  toolTipIcon?: "info" | "alert" | JSX.Element;
}) => {
  const t = useTranslations();
  const labelText = typeof label === "string" ? (t.has?.(label) ? t(label) : label) : label;
  const tooltipText = typeof toolTip === "string" ? (t.has?.(toolTip) ? t(toolTip) : toolTip) : toolTip;

  return (
    <div className="w-full h-full flex flex-col justify-start">
      <div className="flex items-center justify-between gap-1.5 mb-1.5">
        <div className="flex items-center gap-1 flex-wrap min-w-0">
          {labelText && (
            <label
              htmlFor={name}
              className="text-xs sm:text-sm font-medium text-foreground/90 select-none cursor-pointer tracking-normal"
            >
              {labelText}
            </label>
          )}
          {required && (
            <span
              className="text-destructive font-bold text-xs leading-none"
              title="Required"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </div>
        {tooltipText && (
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={typeof labelText === "string" ? `${labelText} info` : "Information"}
                  className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-full hover:bg-muted focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  {toolTipIcon === "alert" ? (
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  ) : React.isValidElement(toolTipIcon) ? (
                    toolTipIcon
                  ) : (
                    <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-primary transition-colors shrink-0" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="max-w-xs text-xs font-normal shadow-md px-3 py-2 leading-relaxed bg-popover text-popover-foreground border z-[9999] rounded-lg"
              >
                <span>{tooltipText}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="relative w-full flex-1 flex flex-col justify-start">
        {children}
        {error && <ErrorMessage error={error} />}
      </div>
    </div>
  );
};

export const renderInput = (item: FormInput, field: any) => {
  const commonProps = {
    value: field.value,
    onChange: field.onChange,
    name: item.name,
    placeholder: item.placeholder,
    className: item.inputClassName
  };
  switch (item.type) {
    case "filesUpload":
      return (
        <FilesUploadInput
          onRemove={item.onRemove}
          {...commonProps}
          maxSelections={item.max}
          minSelections={item.min as number}
        />
      );
    case "multiSelect":
      return (
        <MultiSelectInput
          {...commonProps}
          options={item.options || []}
          onChange={e => field.onChange(e)}
        />
      );
    case "video":
      return <VideoInput {...commonProps} />;
    case "color":
      return <ColorInput {...commonProps} />;
    case "year":
      return <YearInput {...commonProps} />;
    case "textEditor":
      return (
        <TextEditor
          className={item.inputClassName ?? ""}
          name={item.name}
          onChange={field.onChange}
          value={field.value}
        />
      );
    case "hh-mm":
      return <TimeInput {...commonProps} />;
    case "map":
      return <MapPointerInput {...commonProps} />;
    case "map-zone":
      return <MapZoneInput {...commonProps} defaultCenter={item.map?.center} />;
    case "tag-input":
      return <TagInput {...commonProps} suggestions={item.options?.map(o => String(o.value))} />;
    case "selectPaginated":
      return (
        <SelectPaginated
          {...commonProps}
          apiUrl={item.apiUrl || []}
          // options={item.options || []}
          isMulti={item.isMulti}
          labelKey={item.labelKey}
          onChange={e => {
            if (item.onChange) item.onChange(e as any);
            field.onChange(e);
          }}
          searchFilters={item.searchFilters}
          idKey={item.idKey}
        />
      );
    case "checkbox":
      return <CheckBoxInput {...commonProps} options={item.options || []} />;

    case "radioGroup":
      return <RadioButtonInput {...item} {...commonProps} options={item.options || []} />;

    case "select":
      return (
        <SelectInput
          {...commonProps}
          onChange={e => {
            field.onChange(e);
            item.onChange?.(e);
          }}
          options={item.options || []}
        />
      );

    case "img":
      return <ImgInput ratio={item.ratio} {...commonProps} />;

    case "textarea":
      return <Textarea {...commonProps} />;

    case "time":
      return <DateTimeInput {...commonProps} />;

    case "email":
      return <TextInput {...commonProps} type="email" />;

    case "date":
      return <DateInput {...commonProps} min={item?.min as Date} multiple={item?.isMulti} />;

    case "text":
      return <Input {...commonProps} type="text" />;

    case "link":
      return <Input {...commonProps} type="url" />;

    case "number":
      return <NumberInput {...commonProps} pattern="[0-9]*\.?[0-9]*" />;
    case "price":
      return (
        <div className="flex gap-4 items-center">
          <NumberInput {...commonProps} pattern="[0-9]*\.?[0-9]*" />
        </div>
      );

    case "password":
      return <PasswordInput {...commonProps} />;

    case "tel":
      return <CustomPhoneInput {...commonProps} />;

    case "space":
      return <div className="w-full h-4" />;

    case "file":
      return <PdfInput {...commonProps} />;

    default:
      return null;
  }
};

export const renderInputComponent = ({
  item,
  field,
  errors
}: {
  item: FormInput;
  field: any;
  errors: FieldErrors;
}): JSX.Element => {
  const errorMessage = getErrorMessage(errors, item.name);
  return (
    <Suspense fallback={<InputSkeleton />}>
      <InputWrapper
        label={item.label ?? item.name}
        name={item.name}
        required={item.required}
        // multiLang={item.multiLang}
        error={errorMessage}
        toolTip={item.toolTip || item.description}
        toolTipIcon={item.toolTipIcon}
      >
        {renderInput(item, field)}
      </InputWrapper>
    </Suspense>
  );
};

const InputSkeleton = () => (
  <div className="w-full flex flex-col space-y-2 animate-pulse">
    <div className="h-4 w-1/4 rounded-md bg-muted"></div>
    <div className="h-10 w-full rounded-xl bg-muted/60"></div>
  </div>
);

