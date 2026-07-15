import {
  ActivityItem,
  DashboardStats,
} from "../types/dashboard.types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    return {
      received: 25,
      released: 18,
      pending: 7,
      users: 12,
    };
  },

  async getActivities(): Promise<ActivityItem[]> {
    return [
      {
        id: "1",
        message: "Memo 2026-001 Received",
        date: "Today",
      },
      {
        id: "2",
        message: "Payroll Released",
        date: "Today",
      },
      {
        id: "3",
        message: "Leave Form Approved",
        date: "Today",
      },
    ];
  },
};