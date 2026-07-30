import { Pressable, View } from "react-native";

import { AppText } from "../../../../components/common";

import { styles } from "./RecentDocumentCard.styles";
import { RecentDocumentCardProps } from "./RecentDocumentCard.types";

export function RecentDocumentCard({
  document,
  onPress,
}: RecentDocumentCardProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <AppText
            style={styles.title}
            numberOfLines={1}
          >
            {document.title}
          </AppText>

          <AppText style={styles.trackingNumber}>
            {document.trackingNumber}
          </AppText>
        </View>

        <View style={styles.statusBadge}>
          <AppText style={styles.statusText}>
            {document.status}
          </AppText>
        </View>
      </View>

      <View style={styles.body}>
        <AppText
          style={styles.department}
          numberOfLines={1}
        >
          {document.direction === "IN"
            ? document.departmentFrom
            : document.destination}
        </AppText>

        <AppText style={styles.date}>
          {document.documentDate}
        </AppText>
      </View>
    </Pressable>
  );
}