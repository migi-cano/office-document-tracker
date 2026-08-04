import { ImageSourcePropType } from "react-native";

export interface DashboardMetric {
  title: string;
  value: number;
  icon: ImageSourcePropType;
}

export interface DashboardMetrics {
  total: number;
  pending: number;
  incoming: number;
  outgoing: number;
}

export interface ActivityPoint {
  label: string;
  value: number;
  date: string;
}

export interface TodaySummary {
  receivedToday: number;
  releasedToday: number;
  pending: number;
}