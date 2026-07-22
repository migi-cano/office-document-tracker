export interface DocumentHistory {
  id: string;

  documentId: string;

  action: string;

  oldStatus?: string;

  newStatus?: string;

  department?: string;

  remarks?: string;

  performedBy?: string;

  createdAt: string;
}