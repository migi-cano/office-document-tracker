import {
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

export interface AppButtonProps
  extends TouchableOpacityProps {
  title: string;

  variant?: "primary" | "secondary" | "outline";

  loading?: boolean;
  disabled?: boolean;

  style?: StyleProp<ViewStyle>;
}