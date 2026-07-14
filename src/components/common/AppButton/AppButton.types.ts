import { TouchableOpacityProps } from "react-native";

export interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
}