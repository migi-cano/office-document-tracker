import { DocumentStatus } from "./document.types";

export interface DocumentHistory {
  id: string;
  documentId: string;
  action: DocumentHistoryAction;
  oldStatus?: DocumentStatus;
  newStatus?: DocumentStatus;
  department?: string;
  remarks?: string;
  performedBy: string;
  recipientId?: string;
  createdAt: string;
}

export enum DocumentHistoryAction {
  DOCUMENT_CREATED = "DOCUMENT_CREATED",
  STATUS_CHANGED = "STATUS_CHANGED",
  DOCUMENT_UPDATED = "DOCUMENT_UPDATED",
  DOCUMENT_DELETED = "DOCUMENT_DELETED",
  FORWARDED = "FORWARDED",
  APPROVED = "APPROVED",
  RELEASED = "RELEASED",
  COMPLETED = "COMPLETED",
}