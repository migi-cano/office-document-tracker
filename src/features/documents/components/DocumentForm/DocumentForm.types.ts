import { DocumentType } from "../../types/document.types";
import { ReceiveDocumentFormData } from "../../validation/receiveDocument.schema";

export interface DocumentFormProps {
  documentType: DocumentType;

  initialValues?: Partial<ReceiveDocumentFormData>;

  submitButtonTitle?: string;

  onSubmit: (
    data: ReceiveDocumentFormData
  ) => Promise<void> | void;
}