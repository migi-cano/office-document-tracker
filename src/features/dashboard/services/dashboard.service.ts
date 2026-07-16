import { supabase } from "../../../lib/supabase";

class DashboardService {
  async getStatistics() {
    const { data, error } = await supabase
      .from("documents")
      .select("status, priority");

    if (error) {
      throw error;
    }

    const totalDocuments = data.length;

    const receivedDocuments = data.filter(
      d => d.status === "Received"
    ).length;

    const pendingDocuments = data.filter(
      d => d.status === "Pending"
    ).length;

    const releasedDocuments = data.filter(
      d => d.status === "Released"
    ).length;

    const highPriorityDocuments = data.filter(
      d => d.priority === "High"
    ).length;

    return {
      totalDocuments,
      receivedDocuments,
      pendingDocuments,
      releasedDocuments,
      highPriorityDocuments,
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