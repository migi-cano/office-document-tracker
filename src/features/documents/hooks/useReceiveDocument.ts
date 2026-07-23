import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  receiveDocumentSchema,
  ReceiveDocumentFormData,
} from "../validation/receiveDocument.schema";

export function useReceiveDocument(
  
  initialValues?: Partial<ReceiveDocumentFormData>
) {
  console.log("=== USE RECEIVE DOCUMENT ===");
console.log(initialValues);
  return useForm<ReceiveDocumentFormData>({
    resolver: zodResolver(receiveDocumentSchema),

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