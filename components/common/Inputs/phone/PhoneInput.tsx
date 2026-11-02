import {
  isPhoneEmpty,
  isPhoneValidForCountry as validatePhoneForCountry,
  getCountryFromPhone,
} from "@/utils/phoneValidation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Dark mode styles, invalid-number styles, and custom Syria flag
const darkModeStyles = `
.dark .react-tel-input .form-control {
   background-color: #1f2937;
   color: #e5e7eb;
   border-color: #4b5563;
}

.dark .react-tel-input .selected-flag {
   background-color: #374151;
}

.dark .react-tel-input .selected-flag:hover {
   background-color: #4b5563;
}

.dark .react-tel-input .country-list {
   background-color: #1f2937;
   border-color: #4b5563;
}

.dark .react-tel-input .country-list .country {
   color: #e5e7eb;
}

.dark .react-tel-input .country-list .country:hover {
   background-color: #374151;
}

.dark .react-tel-input .country-list .country.highlight {
   background-color: #4b5563;
}

.dark .react-tel-input .flag-dropdown.open {
   background-color: #1f2937;
   border-color: #4b5563;
}

.dark .react-tel-input .search-box {
   background-color: #1f2937;
   color: #e5e7eb;
   border-color: #4b5563;
}

/* Invalid number state styles */
.react-tel-input .form-control.invalid-number {
   border-color: #ef4444 !important;
}

.react-tel-input .form-control.invalid-number:focus {
   border-color: #ef4444 !important;
   box-shadow: 0 0 0 1px #ef4444 !important;
}

.dark .react-tel-input .form-control.invalid-number {
   background-color: #1f2937 !important;
   border-color: #ef4444 !important;
   color: #fca5a5 !important;
}

.dark .react-tel-input .form-control.invalid-number:focus {
   border-color: #ef4444 !important;
   box-shadow: 0 0 0 1px #ef4444 !important;
}

/* Custom Syria flag override */
.react-tel-input .flag.sy,
.react-tel-input .country-list .country .flag.sy,
.react-tel-input .selected-flag .flag.sy {
   background-image: url('/media/flags/syria.svg') !important;
   background-position: center !important;
   background-repeat: no-repeat !important;
   background-size: cover !important;
   box-shadow: 0 0 1px #0003;
   border-radius: 2px;
}
`;

export const isPhoneValidForCountry = validatePhoneForCountry;

export interface CustomPhoneInputProps {
  value?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string, isValid?: boolean) => void;
  defaultCountry?: string;
  error?: string;
  showInlineError?: boolean;
  onBlur?: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const CustomPhoneInput = ({
  name,
  placeholder = "",
  disabled,
  value,
  onChange,
  defaultCountry = "sa",
  error,
  showInlineError = false,
  onBlur,
}: CustomPhoneInputProps) => {
  const [phoneValue, setPhoneValue] = useState(value || "");
  const [country, setCountry] = useState(defaultCountry);
  const [isTouched, setIsTouched] = useState(false);
  const { theme } = useTheme();
  const t = useTranslations();

  useEffect(() => {
    if (value !== undefined && value !== phoneValue) {
      setPhoneValue(value || "");
      if (value) {
        const detected = getCountryFromPhone(value);
        if (detected) {
          setCountry(detected.toLowerCase());
        }
      }
    }
  }, [value]);

  const handleChange = (
    inputValue: string,
    countryData: any,
    _event: React.ChangeEvent<HTMLInputElement>,
    _formattedValue: string,
  ) => {
    setPhoneValue(inputValue);

    const selectedCountry =
      countryData?.countryCode?.toLowerCase() || country;
    if (selectedCountry && selectedCountry !== country) {
      setCountry(selectedCountry);
    }

    // Detect if user entered a number with a different international calling code
    const detectedCountry = getCountryFromPhone(inputValue, selectedCountry);
    if (detectedCountry && detectedCountry.toLowerCase() !== country) {
      setCountry(detectedCountry.toLowerCase());
    }

    const valid = validatePhoneForCountry(inputValue, selectedCountry);
    onChange(inputValue, valid);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    _data: any,
  ) => {
    setIsTouched(true);
    onBlur?.(e);
  };

  // Inject dark mode styles
  useEffect(() => {
    if (!document.getElementById("phone-input-dark-mode-styles")) {
      const styleElement = document.createElement("style");
      styleElement.id = "phone-input-dark-mode-styles";
      styleElement.innerHTML = darkModeStyles;
      document.head.appendChild(styleElement);

      return () => {
        const styleTag = document.getElementById(
          "phone-input-dark-mode-styles",
        );
        if (styleTag) {
          document.head.removeChild(styleTag);
        }
      };
    }
  }, []);

  const hasEnteredNumber = !isPhoneEmpty(phoneValue);
  const isValid = hasEnteredNumber ? validatePhoneForCountry(phoneValue, country) : true;
  const isInvalid = isTouched && hasEnteredNumber && !isValid;

  return (
    <div className=" !w-full">
      <div
        dir="ltr"
        className={`border-none w-full focus-visible:!border-none focus:border-none border-gray-300 dark:border-gray-700 rounded-md`}
      >
        <PhoneInput
          autoFormat
          enableAreaCodeStretch
          containerClass="w-full"
          inputClass={`w-full border dark:bg-gray-800 dark:text-gray-200 ${theme === "dark" ? "dark:border-gray-700" : "border-gray-300"
            }`}
          buttonClass="rounded-md !bg-transparent mr-[2rem]"
          searchClass="mr-2"
          dropdownClass="w-full !overflow-x-hidden"
          enableSearch
          disableSearchIcon
          value={phoneValue}
          country={country || undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          isValid={(inputNumber, countryData: any) => {
            if (!inputNumber) return true;
            if (isPhoneEmpty(inputNumber)) return true;
            const currentCountry = countryData?.countryCode || country;
            return validatePhoneForCountry(inputNumber, currentCountry);
          }}
          inputProps={{
            name: name,
            required: true,
            placeholder: placeholder,
            disabled: disabled,
          }}
          countryCodeEditable
          preferredCountries={["sa", "ae", "us", "gb", "eg"]}
          excludeCountries={["il"]}
        />
      </div>
      {(error || (showInlineError && isInvalid)) && (
        <p className="mt-1.5 text-xs text-red-500 font-medium">
          {error || t("Validations.invalid_phone_format")}
        </p>
      )}
    </div>
  );
};

export default CustomPhoneInput;
