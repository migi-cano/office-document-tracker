import { useCallback, useState } from "react";

import { Icons } from "../../../../assets/icons";
import { dashboardService } from "../services";
import {
  ActivityPoint,
  DashboardMetric,
} from "../types/dashboard.types";
import { useFocusEffect } from "@react-navigation/native";
import { Document } from "../../documents/types/document.types";

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState<ActivityPoint[]>([]);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      const data = await dashboardService.getDashboardData();

      setMetrics([
              {
                title: "Total",
                value: data.metrics.total,
                icon: Icons.paper,
              },
              {
                title: "Pending",
                value: data.metrics.pending,
                icon: Icons.waitingList,
              },
              {
                title: "Outgoing",
                value: data.metrics.outgoing,
                icon: Icons.send,
              },
              {
                title: "Incoming",
                value: data.metrics.incoming,
                icon: Icons.document,
              },
            ]);

            setActivity(data.activity);
            setRecentDocuments(data.recentDocuments);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
  useCallback(() => {
    loadDashboard();
  }, [loadDashboard])
);

  return {
    metrics,
    activity,
    recentDocuments,
    loading,
    refresh: loadDashboard,
  };
}