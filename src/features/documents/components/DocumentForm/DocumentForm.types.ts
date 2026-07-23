import { DocumentDirection } from "../../types/document.types";
import { ReceiveDocumentFormData } from "../../validation/receiveDocument.schema";

export interface DocumentFormProps {
  direction: DocumentDirection;

  initialValues?: Partial<ReceiveDocumentFormData>;

  submitButtonTitle?: string;

  onSubmit: (
    data: ReceiveDocumentFormData
  ) => Promise<void> | void;
}