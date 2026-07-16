import { DocumentStatus } from "./document.types";

export interface DocumentHistory {
  id: string;
  documentId: string;
  status: DocumentStatus;
  remarks: string;
  performedBy: string;
  createdAt: string;
}