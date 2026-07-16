import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  receiveDocumentSchema,
  ReceiveDocumentFormData,
} from "../validation/receiveDocument.schema";

export function useReceiveDocument(
  initialValues?: Partial<ReceiveDocumentFormData>
) {
  return useForm<ReceiveDocumentFormData>({
    resolver: zodResolver(receiveDocumentSchema),

    defaultValues: {
      subject: initialValues?.subject ?? "",
      sender: initialValues?.sender ?? "",
      receiver: initialValues?.receiver ?? "",
      department: initialValues?.department ?? "",
      remarks: initialValues?.remarks ?? "",
    },

    mode: "onTouched",
  });
}