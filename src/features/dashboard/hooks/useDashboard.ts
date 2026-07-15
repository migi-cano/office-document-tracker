import { useEffect, useState } from "react";

import { dashboardService } from "../services/dashboard.service";

import {
  ActivityItem,
  DashboardStats,
} from "../types/dashboard.types";

export function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [activities, setActivities] =
    useState<ActivityItem[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const statsData =
        await dashboardService.getStats();

      const activitiesData =
        await dashboardService.getActivities();

      setStats(statsData);
      setActivities(activitiesData);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    stats,
    activities,
    refresh: loadDashboard,
  };
}