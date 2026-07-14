import { ReactNode } from "react";
import { TextProps } from "react-native";

export interface AppTextProps extends TextProps {
  children: ReactNode;
  variant?: "title" | "heading" | "body" | "caption";
  color?: string;
  center?: boolean;
}