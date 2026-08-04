import { Image, View } from "react-native";

import { AppText } from "../../../../components/common";

import { styles } from "./DocumentHero.styles";
import { DocumentHeroProps } from "./DocumentHero.types";

import { DocumentStatus } from "../../types/document.types";

const PdfIcon = require("../../../../../assets/icons/pdf.png");

function getStatusStyles(status: DocumentStatus) {
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
}

export default function DocumentHero({
  document,
}: DocumentHeroProps) {
  const status = getStatusStyles(document.status);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image
          source={PdfIcon}
          style={styles.icon}
        />

        <View style={{ flex: 1 }}>
          <AppText style={styles.title}>
            {document.title}
          </AppText>

          <AppText style={styles.tracking}>
            {document.trackingNumber}
          </AppText>
        </View>
      </View>

      <View
        style={[
          styles.badge,
          {
            backgroundColor: status.backgroundColor,
          },
        ]}
      >
        <AppText
          style={[
            styles.badgeText,
            {
              color: status.color,
            },
          ]}
        >
          {document.status}
        </AppText>
      </View>
    </View>
  );
}