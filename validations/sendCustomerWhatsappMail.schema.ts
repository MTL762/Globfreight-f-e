import { z } from "zod";

export const createSendWhatsappMailSchema = (t?: (key: string) => string) => {
  const tr = (key: string, fallback: string) => (t ? t(key) || fallback : fallback);

  return z
    .object({
      send_to_all: z.boolean().default(false),
      client_ids: z.array(z.number()).default([]),
      subject: z
        .string()
        .min(1, tr("Validations.required", "Subject is required"))
        .min(3, tr("Validations.min3", "Subject must be at least 3 characters")),
      message: z
        .string()
        .min(1, tr("Validations.required", "Message is required"))
        .min(5, tr("Validations.min5", "Message must be at least 5 characters"))
    })
    .refine(
      data => {
        if (!data.send_to_all) {
          return Array.isArray(data.client_ids) && data.client_ids.length > 0;
        }
        return true;
      },
      {
        message: tr(
          "Validations.selectAtLeastOneClient",
          "Please select at least one customer or enable send to all"
        ),
        path: ["client_ids"]
      }
    );
};

export const SendWhatsappMailSchema = createSendWhatsappMailSchema();
export type SendWhatsappMailFormValues = z.infer<typeof SendWhatsappMailSchema>;
