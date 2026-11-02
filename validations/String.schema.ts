import { z } from "zod";
import { isPhoneEmpty, isPhoneValidForCountry } from "@/utils/phoneValidation";
export function StringReq(t: TFunction, min: number = 3) {
  return z
    .string({
      required_error: t(`Validations.required`),
      invalid_type_error: t(`Validations.invalidType`)
    })
    .min(min, { message: t(`Validations.min${min}`) })
    .refine(val => val.length >= min, {
      message: t(`Validations.min${min}`)
    })
    .refine(val => val !== "", { message: t(`Validations.required`) });
}

export function PasswordSchema(t: TFunction) {
  return z
    .string()
    .min(8, { message: t(`Validations.min8`) })
    .refine(val => val.length >= 8, { message: t(`Validations.min8`) })
    .refine(val => val !== "", { message: t(`Validations.required`) });
}
export function StringNotReq() {
  return z.union([
    z.string().nullable().optional(),
    z.number().nullable().optional(),
    z.array(z.string().optional())
  ]);
}

export function EmailReq(t: TFunction) {
  return z
    .string({
      required_error: t(`Validations.required`),
      invalid_type_error: t(`Validations.invalidType`)
    })
    .email({
      message: t(`Validations.invalidEmail`)
    })
    .refine(val => val.length >= 3, { message: t(`Validations.min3`) })
    .refine(val => val !== "", { message: t(`Validations.required`) });
}

export function noSchema() {
  return z.any();
}

// Optional phone: validates based on country key if entered, passes if empty or only dial code
export function PhoneNotReq(t?: TFunction, defaultCountry?: string) {
  return z
    .union([z.string().nullable().optional(), z.number().nullable().optional()])
    .transform(val => {
      if (isPhoneEmpty(val)) return "";
      return String(val);
    })
    .refine(
      val => {
        if (val === "") return true;
        return isPhoneValidForCountry(val, defaultCountry);
      },
      { message: t ? t(`Validations.invalid_phone_format`) : "Invalid phone number format" }
    );
}

// Required phone: requires a subscriber number and validates based on country key
export function PhoneReq(t?: TFunction, defaultCountry?: string) {
  return z
    .union([z.string().nullable().optional(), z.number().nullable().optional()])
    .refine(val => !isPhoneEmpty(val), {
      message: t ? t(`Validations.required`) : "This field is required"
    })
    .transform(val => String(val))
    .refine(
      val => isPhoneValidForCountry(val, defaultCountry),
      { message: t ? t(`Validations.invalid_phone_format`) : "Invalid phone number format" }
    );
}
