import { Pressable, View } from "react-native";

import { AppText } from "../../common";
import StatusBadge from "../StatusBadge";

import { styles } from "./DocumentCard.styles";
import { DocumentCardProps } from "./DocumentCard.types";

export default function DocumentCard({
  document,
  onPress,
}: DocumentCardProps) {
  const isIncoming = document.documentType === "IN";

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <AppText variant="heading">
            {isIncoming ? "📥 Incoming" : "📤 Outgoing"}
          </AppText>

          <StatusBadge status={document.status} />
        </View>

        {/* Document Title */}
        <AppText
          variant="heading"
          style={styles.subject}
        >
          {document.title}
        </AppText>

        {/* Subject */}
        <AppText variant="body">
          {document.subject}
        </AppText>

        {/* Tracking Number */}
        <AppText variant="caption">
          Tracking #: {document.trackingNumber}
        </AppText>

        {/* Incoming Details */}
        {isIncoming && (
          <>
            <AppText variant="caption">
              Department From: {document.departmentFrom ?? "-"}
            </AppText>

            <AppText variant="caption">
              Received By: {document.receivedBy ?? "-"}
            </AppText>
          </>
        )}

        {/* Outgoing Details */}
        {!isIncoming && (
          <>
            <AppText variant="caption">
              Destination: {document.destination ?? "-"}
            </AppText>

            <AppText variant="caption">
              Processed By: {document.processedBy ?? "-"}
            </AppText>
          </>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <AppText variant="caption">
            {document.documentDate}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}