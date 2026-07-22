import { supabase } from "../../../lib/supabase";
import { DocumentStatus } from "../../documents/types/document.types";


export interface DashboardStats {
  totalDocuments: number;

  pending: number;

  received: number;

  released: number;

  completed: number;

  incoming: number;

  outgoing: number;
}

class DashboardService {
  async getStatistics() {
    const { data, error } = await supabase
  .from("documents")
  .select("status, document_type");

    if (error) {
      throw error;
    }

   const totalDocuments = data.length;

const receivedDocuments = data.filter(
  d => d.status === DocumentStatus.RECEIVED
).length;

const pendingDocuments = data.filter(
  d => d.status === DocumentStatus.PENDING
).length;

const releasedDocuments = data.filter(
  d => d.status === DocumentStatus.RELEASED
).length;

const completedDocuments = data.filter(
  d => d.status === DocumentStatus.COMPLETED
).length;

const incomingDocuments = data.filter(
  d => d.document_type === "IN"
).length;

const outgoingDocuments = data.filter(
  d => d.document_type === "OUT"
).length;


    return {
  totalDocuments,
  receivedDocuments,
  pendingDocuments,
  releasedDocuments,
  completedDocuments,
  incomingDocuments,
  outgoingDocuments,
};
  }

  async getRecentDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    if (error) {
      throw error;
    }

    return data;
  }
}

export const dashboardService =
  new DashboardService();