export type DocumentDirection = "IN" | "OUT";


export enum DocumentStatus {
  PENDING = "PENDING",
  RELEASED = "RELEASED",
  RECEIVED = "RECEIVED",
  COMPLETED = "COMPLETED",
}

export type DocumentFilter =
  | "ALL"
  | "IN"
  | "OUT"
  | "PENDING"
  | "COMPLETED";

export interface Document {
  id: string;

  trackingNumber: string;

  direction: DocumentDirection;

  documentType: string;

  title: string;

  subject: string;

  destination?: string;

  departmentFrom?: string;

  processedBy?: string;

  receivedBy?: string;

  status: DocumentStatus;

  remarks?: string;

  documentDate: string;

  attachmentUrl?: string;

  ocrText?: string;

  createdAt: string;

  updatedAt: string;
  
  imagePath?: string;
}