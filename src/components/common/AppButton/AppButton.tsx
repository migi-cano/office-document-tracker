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
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...props}
      disabled={disabled || loading}
      style={[
  styles.button,
  styles[variant],
  (disabled || loading) && styles.disabled,
]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <AppText
          color={
                  variant === "outline"
                    ? Colors.primary
                    : Colors.white
                }
        >
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
}