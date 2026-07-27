import { View } from "react-native";

import { AppText } from "../../common";

import { styles } from "./DetailRow.styles";
import { DetailRowProps } from "./DetailRow.types";

export default function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <View style={styles.container}>
      <AppText
        variant="caption"
        style={styles.label}
      >
        {label}
      </AppText>

      <AppText
        variant="body"
        style={styles.value}
      >
        {value || "-"}
      </AppText>
    </View>
  );
}