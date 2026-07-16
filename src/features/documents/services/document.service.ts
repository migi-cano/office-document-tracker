import { Document, DocumentStatus } from "../types/document.types";
import { supabase } from "../../../lib/supabase";

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

  return (data ?? []).map((item) => ({
    id: item.id,

    trackingNumber: item.tracking_number,

    subject: item.subject,

    sender: item.sender,

    receiver: item.receiver,

    department: item.department,

    priority: item.priority,

    status: item.status,

    remarks: item.remarks,

    dateReceived: item.date_received,

    createdAt: item.created_at,

    updatedAt: item.updated_at,
  }));
}

 async addDocument(document: Document): Promise<Document> {

  const { data, error } = await supabase
    .from("documents")
    .insert({
      tracking_number: document.trackingNumber,
      subject: document.subject,
      sender: document.sender,
      receiver: document.receiver,
      department: document.department,
      priority: document.priority,
      status: document.status,
      remarks: document.remarks,
      date_received: document.dateReceived,
    })
    .select();


  if (error) {
    throw error;
  }

  return document;
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

  return {
    id: data.id,
    trackingNumber: data.tracking_number,
    subject: data.subject,
    sender: data.sender,
    receiver: data.receiver,
    department: data.department,
    priority: data.priority,
    status: data.status,
    remarks: data.remarks,
    dateReceived: data.date_received,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

async updateDocument(
  id: string,
  document: Partial<Document>
): Promise<Document | undefined> {
  const { data, error } = await supabase
    .from("documents")
    .update({
      subject: document.subject,
      sender: document.sender,
      receiver: document.receiver,
      department: document.department,
      remarks: document.remarks,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return undefined;
  }

  return {
    id: data.id,
    trackingNumber: data.tracking_number,
    subject: data.subject,
    sender: data.sender,
    receiver: data.receiver,
    department: data.department,
    priority: data.priority,
    status: data.status,
    remarks: data.remarks,
    dateReceived: data.date_received,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

async deleteDocument(
  id: string
): Promise<boolean> {
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

  return {
    id: data.id,
    trackingNumber: data.tracking_number,
    subject: data.subject,
    sender: data.sender,
    receiver: data.receiver,
    department: data.department,
    priority: data.priority,
    status: data.status,
    remarks: data.remarks,
    dateReceived: data.date_received,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

}

export const documentService = new DocumentService();