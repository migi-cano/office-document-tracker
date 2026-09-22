import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import { ReportSummaryCardProps } from "./ReportSummaryCard.types";
import { styles } from "./ReportSummaryCard.styles";

export default function ReportSummaryCard({
  title,
  value,
  icon,
  iconColor,
  iconBackgroundColor,
}: ReportSummaryCardProps) {
  return (
    <AppCard style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: iconBackgroundColor,
          },
        ]}
      >
        <Ionicons
          name={icon as any}
          size={21}
          color={iconColor}
        />
      </View>

      <AppText style={styles.title}>
        {title}
      </AppText>

      <AppText style={styles.value}>
        {value}
      </AppText>
    </AppCard>
  );
}