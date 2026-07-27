import { Ionicons } from "@expo/vector-icons";

export interface DashboardStatCardProps {
  title: string;
  value: number;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}