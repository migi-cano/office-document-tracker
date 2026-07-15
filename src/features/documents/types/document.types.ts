export type DocumentStatus =
  | "Received"
  | "Pending"
  | "Released";

export type DocumentPriority =
  | "Low"
  | "Normal"
  | "High";

export interface Document {
  id: string;

  trackingNumber: string;
  subject: string;

  sender: string;
  receiver: string;

  department: string;

  priority: DocumentPriority;
  status: DocumentStatus;

  remarks: string;

  dateReceived: string;

  createdAt: string;
  updatedAt: string;
}