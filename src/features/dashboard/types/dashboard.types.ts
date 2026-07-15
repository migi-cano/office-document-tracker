export interface DashboardStats {
  received: number;
  released: number;
  pending: number;
  users: number;
}

export interface ActivityItem {
  id: string;
  message: string;
  date: string;
}