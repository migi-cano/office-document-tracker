import { supabase } from "../../../lib/supabase";
import { DocumentHistory } from "./documentHistory.types";

const TABLE = "document_history";

const toHistory = (data: any): DocumentHistory => ({
  id: data.id,
  documentId: data.document_id,
  action: data.action,
  oldStatus: data.old_status,
  newStatus: data.new_status,
  department: data.department,
  remarks: data.remarks,
  performedBy: data.performed_by,
  createdAt: data.created_at,
});

export const documentHistoryService = {
  async getHistory(documentId: string): Promise<DocumentHistory[]> {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("document_id", documentId)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return (data ?? []).map(toHistory);
  },

  async addHistory(
    history: Omit<DocumentHistory, "id" | "createdAt">
  ): Promise<DocumentHistory> {
    const { data, error } = await supabase
      .from(TABLE)
      .insert({
        document_id: history.documentId,
        action: history.action,
        old_status: history.oldStatus,
        new_status: history.newStatus,
        department: history.department,
        remarks: history.remarks,
        performed_by: history.performedBy,
      })
      .select()
      .single();

    if (error) throw error;

    return toHistory(data);
  },
};