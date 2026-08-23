import { z } from "zod";

export function selectNotReq() {
  return z.union([
    z.string().nullable().optional(),
    z.number().nullable().optional(),
    z.undefined()
  ]);
}
export function BooleanReq(t: TFunction) {
  return z.union([
    z.string({
      required_error: t(`Validations.required`),
      invalid_type_error: t(`Validations.invalidType`)
    }).refine(val => ["0", "1", "true", "false"].includes(val.toLowerCase()), {
      message: t(`Validations.required`)
    }),
    z.boolean({
      required_error: t(`Validations.required`),
      invalid_type_error: t(`Validations.invalidType`)
    }),
    z.number().refine(val => val === 0 || val === 1)
  ]);
}
export function SelectReq(t: TFunction) {
  return z.union([
    z
      .string({
        required_error: t(`Validations.required`),
        invalid_type_error: t(`Validations.invalidType`)
      })
      .nonempty(t("Validations.required")),

    z.number().min(0, t("Validations.required"))
  ]);
}

export function MultiSelectReqWithMax(t: TFunction, max: number = 400) {
  return z.array(SelectReq(t)).max(max, `${t("Validations.max")} ${max}`);
}
