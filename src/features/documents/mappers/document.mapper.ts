import { Document } from "../types/document.types";

export function toDocument(row: any): Document {
  return {
    id: row.id,
    trackingNumber: row.tracking_number,
    subject: row.subject,
    sender: row.sender,
    receiver: row.receiver,
    department: row.department,
    priority: row.priority,
    status: row.status,
    remarks: row.remarks,
    dateReceived: row.date_received,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}