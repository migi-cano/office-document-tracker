import { Document } from "../types/document.types";

export function toDocument(row: any): Document {
  return {
    id: row.id,

    trackingNumber: row.tracking_number,

    documentType: row.document_type,

    title: row.title,

    subject: row.subject,

    destination: row.destination,

    departmentFrom: row.department_from,

    processedBy: row.processed_by,

    receivedBy: row.received_by,

    status: row.status,

    remarks: row.remarks,

    documentDate: row.document_date,

    attachmentUrl: row.attachment_url,

    ocrText: row.ocr_text,

    createdAt: row.created_at,

    updatedAt: row.updated_at,
  };
}