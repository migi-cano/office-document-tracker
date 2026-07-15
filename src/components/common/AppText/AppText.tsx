import React from "react";
import { Text } from "react-native";

import { Colors, Typography } from "../../../theme";
import { styles } from "./AppText.styles";
import { AppTextProps } from "./AppText.types";

const typographyVariants = {
  title: Typography.title,
  heading: Typography.heading,
  body: Typography.body,
  caption: Typography.caption,
};

export default function AppText({
  children,
  variant = "body",
  color = Colors.textPrimary,
  center = false,
  style,
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.text,
        typographyVariants[variant], // ✅ Apply the whole typography object
        {
          color,
          textAlign: center ? "center" : "left",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}