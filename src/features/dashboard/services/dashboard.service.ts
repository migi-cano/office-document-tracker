import dayjs from "dayjs";

import { supabase } from "../../../lib/supabase";

import {
  ActivityPoint,
  DashboardMetrics,
} from "../types/dashboard.types";
import { Document } from "../../documents/types/document.types";

class DashboardService {
  async getMetrics(): Promise<DashboardMetrics> {
    const { data, error } = await supabase
      .from("documents")
      .select("status,direction");

    if (error) {
      throw error;
    }

    const metrics: DashboardMetrics = {
      total: data.length,
      pending: 0,
      incoming: 0,
      outgoing: 0,
    };

    data.forEach((document) => {
      const status = document.status?.trim().toUpperCase();
      const direction = document.direction?.trim().toUpperCase();

      switch (status) {
        case "PENDING":
          metrics.pending++;
          break;
      }

      switch (direction) {
        case "IN":
          metrics.incoming++;
          break;

        case "OUT":
          metrics.outgoing++;
          break;
      }
    });

    return metrics;
  }

  async getActivityOverview(): Promise<ActivityPoint[]> {
    const { data, error } = await supabase
      .from("documents")
      .select("created_at")
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    const activity: ActivityPoint[] = Array.from(
      { length: 7 },
      (_, index) => {
        const date = dayjs().subtract(6 - index, "day");

        return {
          label: date.format("ddd"),
          date: date.format("YYYY-MM-DD"),
          value: 0,
        };
      }
    );

    data.forEach((document) => {
      const created = dayjs(document.created_at).format("YYYY-MM-DD");

      const point = activity.find(
        (item) => item.date === created
      );

      if (point) {
        point.value++;
      }
    });

    return activity;
  }

  async getRecentDocuments(): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    throw error;
  }

  return data.map((row) => ({
    id: row.id,
    trackingNumber: row.tracking_number,
    direction: row.direction,
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

    imagePath: row.image_path,
  }));
}

  async getDashboardData() {
    const [
      metrics,
      activity,
      recentDocuments,
      todaySummary,
    ] = await Promise.all([
      this.getMetrics(),
      this.getActivityOverview(),
      this.getRecentDocuments(),
      this.getTodaySummary(),
    ]);
    return {
      metrics,
      activity,
      recentDocuments,
      todaySummary,
    };
  }

          async getTodaySummary() {
          const today = dayjs().format("YYYY-MM-DD");

          const { data, error } = await supabase
            .from("documents")
            .select("status, created_at")
            .gte("created_at", `${today}T00:00:00`)
            .lte("created_at", `${today}T23:59:59`);

          if (error) {
            throw error;
          }

          let receivedToday = 0;
          let releasedToday = 0;
          let pending = 0;

          data.forEach((document) => {
            switch (document.status?.trim().toUpperCase()) {
              case "RECEIVED":
                receivedToday++;
                break;

              case "RELEASED":
                releasedToday++;
                break;

              case "PENDING":
                pending++;
                break;
            }
          });

          return {
            receivedToday,
            releasedToday,
            pending,
          };
        }

}



export default new DashboardService();