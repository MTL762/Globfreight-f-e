import { PhoneNotReq, PhoneReq } from "./String.schema";

/**
 * Validates Saudi Arabia phone numbers based on country key (+966)
 */
export function SaudiPhoneSchema(t?: TFunction, required: boolean = false) {
  return required ? PhoneReq(t, "SA") : PhoneNotReq(t, "SA");
}

/**
 * Validates Qatar phone numbers based on country key (+974)
 */
export function QatarPhoneSchema(t?: (key: string) => string, required: boolean = false) {
  return required ? PhoneReq(t as any, "QA") : PhoneNotReq(t as any, "QA");
}

/**
 * Validates phone numbers for any given country code
 */
export function PhoneInputSchema(
  t?: TFunction,
  countryCode?: string,
  required: boolean = false
) {
  return required ? PhoneReq(t, countryCode) : PhoneNotReq(t, countryCode);
}
