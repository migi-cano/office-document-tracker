import { Pressable, View } from "react-native";

import { AppText } from "../../common";
import StatusBadge from "../StatusBadge";

import { styles } from "./DocumentCard.styles";
import { DocumentCardProps } from "./DocumentCard.types";

export default function DocumentCard({
  document,
  onPress,
}: DocumentCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="heading">
            {document.trackingNumber}
          </AppText>
        </View>

        <AppText
          variant="body"
          style={styles.subject}
        >
          {document.subject}
        </AppText>

        <AppText variant="caption">
          {document.sender} → {document.receiver}
        </AppText>

        <View style={styles.footer}>
          <StatusBadge
            status={document.status}
          />

          <AppText variant="caption">
            {document.dateReceived}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}