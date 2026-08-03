import { Image, Pressable, View } from "react-native";

import { AppText } from "../../../../components/common";

import { styles } from "./RecentDocumentCard.styles";
import { RecentDocumentCardProps } from "./RecentDocumentCard.types";
import { DocumentStatus } from "../../../documents/types/document.types";
import dayjs from "dayjs";

const getStatusStyles = (status: DocumentStatus) => {
  switch (status) {
    case DocumentStatus.RECEIVED:
      return {
        backgroundColor: "#DCFCE7",
        color: "#166534",
      };
      
    case DocumentStatus.PENDING:
      return {
        backgroundColor: "#FEF3C7",
        color: "#92400E",
      };

    case DocumentStatus.RELEASED:
      return {
        backgroundColor: "#DBEAFE",
        color: "#1D4ED8",
      };

    case DocumentStatus.COMPLETED:
      return {
        backgroundColor: "#EDE9FE",
        color: "#6D28D9",
      };

    default:
      return {
        backgroundColor: "#E2E8F0",
        color: "#475569",
      };
  }
};


export function RecentDocumentCard({
  document,
  onPress,
}: RecentDocumentCardProps) {

  const statusStyle = getStatusStyles(document.status);
  const PdfIcon = require("../../../../../assets/icons/pdf.png");

  
  return (
    <Pressable
        onPress={onPress}
        android_ripple={{ color: "#E5E7EB" }}
        style={({ pressed }) => [
          styles.container,
          pressed && { opacity: 0.9 },
        ]}
      >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Image
              source={PdfIcon}
              style={styles.icon}
            />

    <AppText
      style={styles.title}
      numberOfLines={1}
    >
      {document.title}
    </AppText>
  </View>

  <AppText style={styles.trackingNumber}>
    {document.trackingNumber}
  </AppText>
</View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: statusStyle.backgroundColor,
            },
          ]}
        >
          <AppText
            style={[
              styles.statusText,
              {
                color: statusStyle.color,
              },
            ]}
          >
            {document.status}
          </AppText>
        </View>
      </View>

      <View style={styles.body}>
        <AppText style={styles.department}>
          {document.direction === "IN"
            ? `From: ${document.departmentFrom}`
            : `To: ${document.destination}`}
        </AppText>

        <AppText style={styles.date}>
          {dayjs(document.documentDate).format("MMM D, YYYY")}
        </AppText>
      </View>
    </Pressable>
  );
}