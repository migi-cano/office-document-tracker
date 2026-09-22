import { supabase } from "../../../lib/supabase";

import {
  ReportDepartment,
  ReportDocumentType,
  ReportMonthlyActivity,
  ReportPeriod,
  ReportSummary,
} from "../types/report.types";

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getReportDateRange(period: ReportPeriod) {
  const now = new Date();

  const start = new Date(now);
  const end = new Date(now);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  switch (period) {
    case "day": {
      // Today
      end.setDate(end.getDate() + 1);
      break;
    }

    case "week": {
      // Monday → next Monday
      const day = start.getDay();
      const daysFromMonday = day === 0 ? 6 : day - 1;

      start.setDate(start.getDate() - daysFromMonday);
      end.setTime(start.getTime());
      end.setDate(end.getDate() + 7);

      break;
    }

    case "month": {
      // First day of current month → first day of next month
      start.setDate(1);

      end.setFullYear(
        start.getFullYear(),
        start.getMonth() + 1,
        1
      );

      break;
    }

    case "year": {
      // January 1 → January 1 of next year
      start.setMonth(0, 1);

      end.setFullYear(start.getFullYear() + 1);
      end.setMonth(0, 1);

      break;
    }
  }

  return {
    start: formatDate(start),
    end: formatDate(end),
  };
}

class ReportService {
  async getMonthlyActivity(
    period: ReportPeriod
  ): Promise<ReportMonthlyActivity[]> {
    const { start, end } = getReportDateRange(period);

    const { data, error } = await supabase
      .from("documents")
      .select("direction,document_date")
      .gte("document_date", start)
      .lt("document_date", end);

    if (error) {
      throw error;
    }

    const months: ReportMonthlyActivity[] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].map((month) => ({
      month,
      incoming: 0,
      outgoing: 0,
      total: 0,
    }));

    (data ?? []).forEach((document) => {
      if (!document.document_date) {
        return;
      }

      const date = new Date(document.document_date);

      const monthIndex = date.getMonth();
      const month = months[monthIndex];

      if (!month) {
        return;
      }

      month.total++;

      if (document.direction === "IN") {
        month.incoming++;
      }

      if (document.direction === "OUT") {
        month.outgoing++;
      }
    });

    return months;
  }

  async getDepartments(
    period: ReportPeriod
  ): Promise<ReportDepartment[]> {
    const { start, end } = getReportDateRange(period);

    const { data, error } = await supabase
      .from("documents")
      .select(
        "direction,department_from,destination"
      )
      .gte("document_date", start)
      .lt("document_date", end);

    if (error) {
      throw error;
    }

    const incomingCounts: Record<string, number> = {};
    const outgoingCounts: Record<string, number> = {};

    (data ?? []).forEach((document) => {
      if (document.direction === "IN") {
        const name =
          document.department_from?.trim() ||
          "Unspecified";

        incomingCounts[name] =
          (incomingCounts[name] ?? 0) + 1;
      }

      if (document.direction === "OUT") {
        const name =
          document.destination?.trim() ||
          "Unspecified";

        outgoingCounts[name] =
          (outgoingCounts[name] ?? 0) + 1;
      }
    });

    const incoming = Object.entries(
      incomingCounts
    ).map(([name, count]) => ({
      name,
      count,
      direction: "IN" as const,
    }));

    const outgoing = Object.entries(
      outgoingCounts
    ).map(([name, count]) => ({
      name,
      count,
      direction: "OUT" as const,
    }));

    return [...incoming, ...outgoing].sort(
      (a, b) => b.count - a.count
    );
  }

  async getSummary(
    period: ReportPeriod
  ): Promise<ReportSummary> {
    const { start, end } = getReportDateRange(period);

    const { data, error } = await supabase
      .from("documents")
      .select("direction,status")
      .gte("document_date", start)
      .lt("document_date", end);

    if (error) {
      throw error;
    }

    const summary: ReportSummary = {
      total: data?.length ?? 0,
      incoming: 0,
      outgoing: 0,
      pending: 0,
      released: 0,
      received: 0,
      completed: 0,
    };

    (data ?? []).forEach((document) => {
      if (document.direction === "IN") {
        summary.incoming++;
      }

      if (document.direction === "OUT") {
        summary.outgoing++;
      }

      if (document.status === "PENDING") {
        summary.pending++;
      }

      if (document.status === "RELEASED") {
        summary.released++;
      }

      if (document.status === "RECEIVED") {
        summary.received++;
      }

      if (document.status === "COMPLETED") {
        summary.completed++;
      }
    });

    return summary;
  }

  async getDocumentTypes(
    period: ReportPeriod
  ): Promise<ReportDocumentType[]> {
    const { start, end } = getReportDateRange(period);

    const { data, error } = await supabase
      .from("documents")
      .select("document_type")
      .gte("document_date", start)
      .lt("document_date", end);

    if (error) {
      throw error;
    }

    const counts: Record<string, number> = {};

    (data ?? []).forEach((document) => {
      const type =
        document.document_type?.trim() ||
        "Unspecified";

      counts[type] =
        (counts[type] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([type, count]) => ({
        type,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }
}

export default new ReportService();