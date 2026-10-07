import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  incomingDocumentSchema,
  receiveDocumentSchema,
  ReceiveDocumentFormData,
} from "../validation/receiveDocument.schema";

export function useReceiveDocument(
  initialValues?: Partial<ReceiveDocumentFormData>,
  direction?: "IN" | "OUT"
) {
  console.log("=== USE RECEIVE DOCUMENT ===");
console.log(initialValues);
  return useForm<ReceiveDocumentFormData>({
    resolver: zodResolver(
      direction === "IN"
        ? incomingDocumentSchema
        : receiveDocumentSchema
    ),

    defaultValues: {
        title: initialValues?.title ?? "",
        documentType: initialValues?.documentType ?? "",
        subject: initialValues?.subject ?? "",

        destination: initialValues?.destination ?? "",
        departmentFrom: initialValues?.departmentFrom ?? "",
        processedBy: initialValues?.processedBy ?? "",
        receivedBy: initialValues?.receivedBy ?? "",
        remarks: initialValues?.remarks ?? "",
      },

    mode: "onTouched",
  });
}