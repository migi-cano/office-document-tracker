import { View } from "react-native";

import { AppText } from "../../common";
import { Colors } from "../../../theme";

import { styles } from "./StatusBadge.styles";
import { StatusBadgeProps } from "./StatusBadge.types";
import { DocumentStatus } from "../../../features/documents/types/document.types";

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  let backgroundColor = Colors.warning;

  switch (status) {
    case DocumentStatus.RECEIVED:
      backgroundColor = Colors.info;
      break;

    case DocumentStatus.PENDING:
      backgroundColor = Colors.warning;
      break;

    case DocumentStatus.RELEASED:
      backgroundColor = Colors.success;
      break;

    case DocumentStatus.COMPLETED:
      backgroundColor = Colors.success;
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
      <AppText style={styles.text}>
        {status}
      </AppText>
    </View>
  );
}