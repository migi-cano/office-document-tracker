import { ImageSourcePropType } from "react-native";

export interface DashboardMetric {
  title: string;
  value: number;
  icon: ImageSourcePropType;
  onPress?: () => void;
}

export interface DashboardMetricGridProps {
  metrics: DashboardMetric[];
}