import {
  Document,
  DocumentStatus,
} from "../types/document.types";
import { supabase } from "../../../lib/supabase";
import { documentHistoryService, DocumentHistoryAction } from "../history";
import notificationService from "../../notifications/services/notification.service";

const toDocument = (row: any): Document => ({
  id: row.id,

  trackingNumber: row.tracking_number,

  direction: row.direction,

  documentType: row.document_type,

  title: row.title,

  subject: row.subject,

  imagePath: row.image_path,

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

  direction: document.direction,

  document_type: document.documentType,

  title: document.title,

  subject: document.subject,
  
  image_path: document.imagePath,

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
  async getDocuments(search?: string): Promise<Document[]> {
    let query = supabase
  .from("documents")
  .select("*")
  .order("created_at", {
    ascending: false,
  });

if (search && search.trim() !== "") {
  query = query.or(
    [
      `tracking_number.ilike.%${search}%`,
      `title.ilike.%${search}%`,
      `subject.ilike.%${search}%`,
    ].join(",")
  );
}

const { data, error } = await query;

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
    
    await notificationService.createNotification({
      title:
        created.direction === "IN"
          ? "New Incoming Document"
          : "New Outgoing Document",

      message: `${created.title} has been created.`,

      documentId: created.id,
    });

    await documentHistoryService.addHistory({
      documentId: created.id,
      action: DocumentHistoryAction.DOCUMENT_CREATED,
      oldStatus: undefined,
      newStatus: undefined,
      department:
        created.direction === "IN"
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
 
  if (updated) {
  await notificationService.createNotification({
    title: `Document ${status}`,
    message: `${updated.title} is now ${status}.`,
    documentId: updated.id,
  });
}
  await documentHistoryService.addHistory({
    documentId: updated.id,
    action: DocumentHistoryAction.DOCUMENT_UPDATED,
    oldStatus: undefined,
    newStatus: undefined,
    department:
      updated.direction === "IN"
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

  await notificationService.createNotification({
  title: "Document Deleted",
  message: `${current.title} has been deleted.`,
  documentId: current.id,
});

  await documentHistoryService.addHistory({
    documentId: current.id,
    action: DocumentHistoryAction.DOCUMENT_DELETED,
    oldStatus: undefined,
    newStatus: undefined,
    department:
       current.direction === "IN"
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
  documentId: string,
  status: DocumentStatus
) {

  const titleMap: Record<DocumentStatus, string> = {
  PENDING: "Document Pending",
  RELEASED: "Document Released",
  RECEIVED: "Document Received",
  COMPLETED: "Document Completed",
};

  const { error } = await supabase
    .from("documents")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", documentId);

  if (error) {
    throw error;
  }

  const updated = await this.getDocumentById(documentId);

  if (updated) {
    await notificationService.createNotification({
      title: titleMap[status],
      message: `${updated.title} is now ${status.toLowerCase()}.`,
      documentId: updated.id,
    });
  }

  await documentHistoryService.addHistory({
    documentId,
    action: `Status updated to ${status}`,
  });

  return updated;
}
}
export const documentService = new DocumentService();