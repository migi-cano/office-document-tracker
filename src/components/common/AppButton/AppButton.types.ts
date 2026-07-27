import {
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

export type AppButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger";

export interface AppButtonProps
  extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: AppButtonVariant;
  style?: StyleProp<ViewStyle>;
}