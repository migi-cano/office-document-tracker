import dayjs from "dayjs";

import { supabase } from "../../../lib/supabase";

import {
  ActivityPoint,
  DashboardMetrics,
} from "../types/dashboard.types";

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

  async getRecentDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      throw error;
    }

    return data;
  }

  async getDashboardData() {
    const [
      metrics,
      activity,
      recentDocuments,
    ] = await Promise.all([
      this.getMetrics(),
      this.getActivityOverview(),
      this.getRecentDocuments(),
    ]);

    return {
      metrics,
      activity,
      recentDocuments,
    };
  }
}

export default new DashboardService();