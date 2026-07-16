import { ReceiveDocumentFormData } from "../../validation/receiveDocument.schema";

export interface DocumentFormProps {
  initialValues?: Partial<ReceiveDocumentFormData>;

  submitButtonTitle?: string;

  onSubmit: (
    data: ReceiveDocumentFormData
  ) => Promise<void> | void;
}