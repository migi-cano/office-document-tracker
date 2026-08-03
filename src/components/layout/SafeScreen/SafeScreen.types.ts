import { ReactNode } from "react";
import { ColorValue, StyleProp, ViewStyle } from "react-native";

export interface SafeScreenProps {
  children: ReactNode;
  backgroundColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
}