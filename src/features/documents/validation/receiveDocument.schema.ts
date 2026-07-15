import { z } from "zod";

export const receiveDocumentSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required."),

  sender: z
    .string()
    .trim()
    .min(1, "Sender is required."),

  receiver: z
    .string()
    .trim()
    .min(1, "Receiver is required."),

  department: z
    .string()
    .trim()
    .min(1, "Department is required."),

  remarks: z.string().optional(),
});

export type ReceiveDocumentFormData =
  z.infer<typeof receiveDocumentSchema>;