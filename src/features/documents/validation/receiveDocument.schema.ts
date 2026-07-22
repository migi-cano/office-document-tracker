import { z } from "zod";

export const receiveDocumentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Document title is required."),

  subject: z
    .string()
    .trim()
    .min(1, "Subject is required."),

  destination: z.string().trim().optional(),

  departmentFrom: z.string().trim().optional(),

  processedBy: z.string().trim().optional(),

  receivedBy: z.string().trim().optional(),

  remarks: z.string().trim().optional(),

  documentType: z.string().min(1, "Document type is required"),
});

export type ReceiveDocumentFormData =
    z.infer<typeof receiveDocumentSchema>;