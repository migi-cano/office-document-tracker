import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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

      subject: initialValues?.subject ?? "",

      destination: initialValues?.destination ?? "",

      departmentFrom:
        initialValues?.departmentFrom ?? "",

      processedBy:
        initialValues?.processedBy ?? "",

      receivedBy:
        initialValues?.receivedBy ?? "",

      remarks: initialValues?.remarks ?? "",
    },

    mode: "onTouched",
  });
  const form = useForm<ReceiveDocumentFormData>({
  resolver: zodResolver(receiveDocumentSchema),
  defaultValues: {
    title: "",
    subject: "",
    destination: "",
    departmentFrom: "",
    processedBy: "",
    receivedBy: "",
    remarks: "",
  },
});

useEffect(() => {
  if (initialValues) {
    form.reset({
      title: initialValues.title ?? "",
      subject: initialValues.subject ?? "",
      destination: initialValues.destination ?? "",
      departmentFrom: initialValues.departmentFrom ?? "",
      processedBy: initialValues.processedBy ?? "",
      receivedBy: initialValues.receivedBy ?? "",
      remarks: initialValues.remarks ?? "",
    });
  }
}, [initialValues, form]);

return form;
}