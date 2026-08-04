import { supabase } from "../../../lib/supabase";
import { ReportSummary } from "../types/report.types";

class ReportService {
  async getSummary(): Promise<ReportSummary> {
    const { data, error } = await supabase
      .from("documents")
      .select("direction,status");

    if (error) {
      throw error;
    }

    const summary: ReportSummary = {
      incoming: 0,
      outgoing: 0,
      pending: 0,
      completed: 0,
    };

    data.forEach((document) => {
      if (document.direction === "IN") {
        summary.incoming++;
      }

      if (document.direction === "OUT") {
        summary.outgoing++;
      }

      if (document.status === "PENDING") {
        summary.pending++;
      }

      if (document.status === "COMPLETED") {
        summary.completed++;
      }
    });

    return summary;
  }
}

export default new ReportService();