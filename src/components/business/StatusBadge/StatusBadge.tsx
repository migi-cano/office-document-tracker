import { View } from "react-native";

import { AppText } from "../../common";
import { Colors } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./StatusBadge.styles";
import { StatusBadgeProps } from "./StatusBadge.types";
import { DocumentStatus } from "../../../features/documents/types/document.types";


export default function StatusBadge({
  status,
}: StatusBadgeProps) {
 let backgroundColor = Colors.warning;
  let textColor = "#FFFFFF";
  let icon: keyof typeof Ionicons.glyphMap = "time-outline";

switch (status) {
  case DocumentStatus.RECEIVED:
    backgroundColor = Colors.received;
    textColor = "#FFFFFF";
    icon = "download-outline";
    break;

  case DocumentStatus.PENDING:
    backgroundColor = Colors.pending;  
    textColor = "#FFFFFF";
    icon = "time-outline";
    break;

  case DocumentStatus.RELEASED:
    backgroundColor = Colors.released;
    textColor = "#FFFFFF";
    icon = "paper-plane-outline";
    break;

  case DocumentStatus.COMPLETED:
    backgroundColor = Colors.completed;
    textColor = "#FFFFFF";
    icon = "checkmark-circle-outline";
    break;
}

  return (
    <View
  style={[
    styles.badge,
    { backgroundColor },
  ]}
>
  <Ionicons
    name={icon}
    size={14}
    color={textColor}
  />

  <AppText
    style={[
      styles.text,
      { color: textColor },
    ]}
  >
    {status}
  </AppText>
</View>
  );
}