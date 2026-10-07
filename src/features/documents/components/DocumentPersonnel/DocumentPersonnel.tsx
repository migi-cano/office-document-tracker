import { View } from "react-native";

import { AppText } from "../../../../components/common";
import { DetailRow } from "../../../../components/business";

import { styles } from "./DocumentPersonnel.styles";
import { DocumentPersonnelProps } from "./DocumentPersonnel.types";

export default function DocumentPersonnel({
  document,
  recipient,
}: DocumentPersonnelProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Personnel
      </AppText>

      <DetailRow
        label="Received By"
        value={recipient?.name ?? document.receivedBy ?? "-"}
      />

      <DetailRow
        label="Processed By"
        value={document.processedBy ?? "-"}
      />

      <DetailRow
        label="Department"
        value={recipient?.department ?? "-"}
      />
    </View>
  );
}