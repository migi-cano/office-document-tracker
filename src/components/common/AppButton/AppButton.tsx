import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { Colors } from "../../../theme";
import AppText from "../AppText";
import { styles } from "./AppButton.styles";
import { AppButtonProps } from "./AppButton.types";

export default function AppButton({
  title,
  variant = "primary",
  loading = false,
  style,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <AppText
          color={
            variant === "outline"
              ? Colors.primary
              : "#fff"
          }
        >
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}