import {
  type CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString
} from "libphonenumber-js/max";

// Cache all valid global country calling codes
const callingCodesSet = new Set<string>();
for (const country of getCountries()) {
  try {
    callingCodesSet.add(getCountryCallingCode(country));
  } catch {
    // ignore
  }
}

/**
 * Checks if a value is effectively empty:
 * - null, undefined, whitespace, or just "+"
 * - or contains ONLY a country calling code (e.g., "966", "+966", "20", "1") without subscriber digits
 */
export function isPhoneEmpty(value?: string | number | null): boolean {
  if (value == null) return true;
  const str = String(value).trim();
  if (!str || str === "+") return true;

  const digits = str.replace(/\D/g, "");
  if (!digits) return true;

  // In phone inputs (like react-phone-input-2), selecting a country populates the dial code.
  // If the user hasn't typed subscriber digits, the length is <= 4 and it matches a known calling code.
  if (digits.length <= 4 && callingCodesSet.has(digits)) {
    return true;
  }

  return false;
}

/**
 * Validates a phone number based on its country key / dial code.
 *
 * Handles:
 * - International numbers starting with "+" (e.g. "+966 51 234 5678", "+1 202 555 0123")
 * - International numbers without "+" (standard output from react-phone-input-2, e.g. "966512345678")
 * - Local/national numbers when a country code is provided (e.g. "0512345678" with country "SA")
 *
 * @param value The phone number string or number.
 * @param countryCode Optional 2-letter ISO country code (e.g., 'SA', 'EG', 'US', 'sa').
 * @returns true if the phone number is valid for the corresponding country.
 */
export function isPhoneValidForCountry(
  value?: string | number | null,
  countryCode?: string
): boolean {
  if (isPhoneEmpty(value)) return false;

  const str = String(value).trim();
  const digits = str.replace(/\D/g, "");
  if (!digits) return false;

  const upperCountry = countryCode
    ? (countryCode.toUpperCase() as CountryCode)
    : undefined;

  try {
    // 1. If starts with "+", parse directly as international number
    if (str.startsWith("+")) {
      const parsed = parsePhoneNumberFromString(str, upperCountry);
      if (parsed && parsed.isValid()) return true;
    }

    // 2. Try with "+" prepended (react-phone-input-2 output: "966512345678")
    const withPlus = parsePhoneNumberFromString(`+${digits}`, upperCountry);
    if (withPlus && withPlus.isValid()) return true;

    // 3. If a country code is provided, try parsing as a local/national number
    if (upperCountry) {
      const national = parsePhoneNumberFromString(digits, upperCountry);
      if (national && national.isValid()) return true;
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Parses and returns the ISO country code (e.g., 'SA', 'EG') from a phone number if possible.
 */
export function getCountryFromPhone(
  value?: string | number | null,
  fallbackCountry?: string
): CountryCode | undefined {
  if (isPhoneEmpty(value)) return undefined;

  const str = String(value).trim();
  const digits = str.replace(/\D/g, "");
  const fallback = fallbackCountry ? (fallbackCountry.toUpperCase() as CountryCode) : undefined;

  try {
    const formatted = str.startsWith("+") ? str : `+${digits}`;
    const parsed = parsePhoneNumberFromString(formatted, fallback);
    return parsed?.country;
  } catch {
    return undefined;
  }
}

/**
 * Normalizes a phone number to standard E.164 format (+XXXXXXXXXXX).
 * Returns an empty string if empty.
 */
export function formatPhoneE164(
  value?: string | number | null,
  countryCode?: string
): string {
  if (isPhoneEmpty(value)) return "";

  const str = String(value).trim();
  const digits = str.replace(/\D/g, "");
  const upperCountry = countryCode ? (countryCode.toUpperCase() as CountryCode) : undefined;

  try {
    if (str.startsWith("+")) {
      const parsed = parsePhoneNumberFromString(str, upperCountry);
      if (parsed && parsed.isValid()) return parsed.format("E.164");
    }
    const withPlus = parsePhoneNumberFromString(`+${digits}`, upperCountry);
    if (withPlus && withPlus.isValid()) return withPlus.format("E.164");

    if (upperCountry) {
      const national = parsePhoneNumberFromString(digits, upperCountry);
      if (national && national.isValid()) return national.format("E.164");
    }
  } catch {
    // ignore
  }

  return str.startsWith("+") ? str : `+${digits}`;
}

