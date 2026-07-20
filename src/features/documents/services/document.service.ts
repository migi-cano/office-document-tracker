import {
  Document,
  DocumentStatus,
  DocumentType,
} from "../types/document.types";
import { supabase } from "../../../lib/supabase";
import { documentHistoryService, DocumentHistoryAction } from "../history";

const toDocument = (row: any): Document => ({
  id: row.id,

  trackingNumber: row.tracking_number,

  documentType: row.document_type as DocumentType,

  title: row.title,

  subject: row.subject,

  destination: row.destination,

  departmentFrom: row.department_from,

  processedBy: row.processed_by,

  receivedBy: row.received_by,

  status: row.status,

  remarks: row.remarks,

  documentDate: row.document_date,

  ocrText: row.ocr_text,

  attachmentUrl: row.attachment_url,

  createdAt: row.created_at,

  updatedAt: row.updated_at,
});

 const toDatabase = (document: Partial<Document>) => ({
  tracking_number: document.trackingNumber,

  document_type: document.documentType,

  title: document.title,

  subject: document.subject,

  destination: document.destination,

  department_from: document.departmentFrom,

  processed_by: document.processedBy,

  received_by: document.receivedBy,

  status: document.status,

  remarks: document.remarks,

  document_date: document.documentDate,

  ocr_text: document.ocrText,

  attachment_url: document.attachmentUrl,
});

class DocumentService {
  async getDocuments(): Promise<Document[]> {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return (data ?? []).map(toDocument);
  }

  async addDocument(document: Document): Promise<Document> {
    const { data, error } = await supabase
      .from("documents")
      .insert(toDatabase(document))
      .select()
      .single();

    if (error) {
      throw error;
    }

    const created = toDocument(data);

    await documentHistoryService.addHistory({
      documentId: created.id,
      action: DocumentHistoryAction.DOCUMENT_CREATED,
      oldStatus: undefined,
      newStatus: undefined,
      department:
        created.documentType === "IN"
        ? created.departmentFrom
        : created.destination,
      remarks: "Document created.",
      performedBy: "System",
    });

    return created;
  }

  async getDocumentById(
  id: string
    ): Promise<Document | undefined> {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return undefined;
      }

      return toDocument(data);
    }

  async updateDocument(
  id: string,
  document: Partial<Document>
): Promise<Document | undefined> {

  // Get the current document first
  const current = await this.getDocumentById(id);

  if (!current) {
    return undefined;
  }

  const { data, error } = await supabase
    .from("documents")
    .update({
      ...toDatabase(document),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return undefined;
  }

  const updated = toDocument(data);

  await documentHistoryService.addHistory({
    documentId: updated.id,
    action: DocumentHistoryAction.DOCUMENT_UPDATED,
    oldStatus: undefined,
    newStatus: undefined,
    department:
      updated.documentType === "IN"
        ? updated.departmentFrom
        : updated.destination,
    remarks: "Document details updated.",
    performedBy: "System",
  });

  return updated;
}

  async deleteDocument(
  id: string
): Promise<boolean> {

  const current = await this.getDocumentById(id);

  if (!current) {
    return false;
  }

  await documentHistoryService.addHistory({
    documentId: current.id,
    action: DocumentHistoryAction.DOCUMENT_DELETED,
    oldStatus: undefined,
    newStatus: undefined,
    department:
      current.documentType === "IN"
        ? current.departmentFrom
        : current.destination,
    remarks: "Document deleted.",
    performedBy: "System",
  });

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id);

  return !error;
}

  async updateStatus(
  id: string,
  status: DocumentStatus
): Promise<Document | undefined> {
  // Get the current document first
  const current = await this.getDocumentById(id);

  if (!current) {
    return undefined;
  }

  // Update the document
  const { data, error } = await supabase
    .from("documents")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return undefined;
  }

  const updated = toDocument(data);

  await documentHistoryService.addHistory({
    documentId: updated.id,
    action: DocumentHistoryAction.STATUS_CHANGED,
    oldStatus: undefined,
    newStatus: undefined,
    department:
      updated.documentType === "IN"
        ? updated.departmentFrom
        : updated.destination,
    remarks: `Status changed from ${current.status} to ${updated.status}`,
    performedBy: "System",
  });

  return updated;
}
}
export const documentService = new DocumentService();