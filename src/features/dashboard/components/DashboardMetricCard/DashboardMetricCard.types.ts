import { ReactNode } from "react";
import { ImageSourcePropType } from "react-native";

export interface DashboardMetricCardProps {
  title: string;
  value: number;
  icon: ImageSourcePropType;
  onPress?: () => void;
}