import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { documentService } from "../services/document.service";
import { generateTrackingNumber } from "../utils/generateTrackingNumber";
import { v4 as uuid } from "uuid";
import {
  receiveDocumentSchema,
  ReceiveDocumentFormData,
} from "../validation/receiveDocument.schema";

import { Document } from "../types/document.types";

export function useReceiveDocument() {
  const form = useForm<ReceiveDocumentFormData>({
    resolver: zodResolver(receiveDocumentSchema),

    defaultValues: {
      subject: "",
      sender: "",
      receiver: "",
      department: "",
      remarks: "",
    },
    

    mode: "onTouched",
  });
  

  async function submit(data: ReceiveDocumentFormData) {
    const now = new Date();

    const document: Document = {
  id: Date.now().toString(),

  trackingNumber: generateTrackingNumber(),

  subject: data.subject,

  sender: data.sender,

  receiver: data.receiver,

  department: data.department,

  priority: "Normal",

  status: "Received",

  remarks: data.remarks ?? "",

  dateReceived: now.toISOString().split("T")[0],

  createdAt: now.toISOString(),

  updatedAt: now.toISOString(),
};
    await documentService.addDocument(document);

    form.reset();

    return document;
  }

  return {
    ...form,
    submit,
  };
}