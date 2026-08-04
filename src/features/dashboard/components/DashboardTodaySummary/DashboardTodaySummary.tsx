import { View } from "react-native";

import { AppText } from "../../../../components/common";

import { styles } from "./DashboardTodaySummary.styles";
import { DashboardTodaySummaryProps } from "./DashboardTodaySummary.types";

export default function DashboardTodaySummary({
  receivedToday,
  releasedToday,
  pending,
}: DashboardTodaySummaryProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        Today's Summary
      </AppText>

      <View style={styles.row}>
        <View style={styles.left}>
          <AppText style={styles.icon}>📥</AppText>
          <AppText style={styles.label}>
            Received Today
          </AppText>
        </View>

        <AppText style={styles.value}>
          {receivedToday}
        </AppText>
      </View>

      <View style={styles.row}>
        <View style={styles.left}>
          <AppText style={styles.icon}>📤</AppText>
          <AppText style={styles.label}>
            Released Today
          </AppText>
        </View>

        <AppText style={styles.value}>
          {releasedToday}
        </AppText>
      </View>

      <View style={styles.row}>
        <View style={styles.left}>
          <AppText style={styles.icon}>⏳</AppText>
          <AppText style={styles.label}>
            Pending
          </AppText>
        </View>

        <AppText style={styles.value}>
          {pending}
        </AppText>
      </View>
    </View>
  );
}