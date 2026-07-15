import { View } from "react-native";

import { AppText } from "../../common";

import { Colors } from "../../../theme";

import { styles } from "./StatusBadge.styles";
import { StatusBadgeProps } from "./StatusBadge.types";

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  let backgroundColor = Colors.warning;

  switch (status) {
    case "Received":
      backgroundColor = Colors.info;
      break;

    case "Released":
      backgroundColor = Colors.success;
      break;

    case "Pending":
      backgroundColor = Colors.warning;
      break;
  }

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor,
        },
      ]}
    >
      <AppText
        style={styles.text}
      >
        {status}
      </AppText>
    </View>
  );
}