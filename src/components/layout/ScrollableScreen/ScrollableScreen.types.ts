import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ScrollableScreenProps {
  children: ReactNode;

  contentContainerStyle?: ViewStyle;

  showsVerticalScrollIndicator?: boolean;
}