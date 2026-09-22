import { View } from "react-native";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import { ReportActivityProps } from "./ReportActivity.types";
import { styles } from "./ReportActivity.styles";

export default function ReportActivity({
  monthlyActivity,
}: ReportActivityProps) {
  const maxTotal = Math.max(
    ...monthlyActivity.map((month) => month.total),
    1
  );

  return (
    <View style={styles.section}>
      <AppText style={styles.sectionTitle}>
        Document Activity
      </AppText>

      <AppCard style={styles.card}>
        {monthlyActivity.length === 0 ? (
          <AppText style={styles.emptyText}>
            No activity data available.
          </AppText>
        ) : (
          <View style={styles.chart}>
            {monthlyActivity.map((month) => {
              const heightPercentage =
                (month.total / maxTotal) * 100;

              return (
                <View
                  key={month.month}
                  style={styles.barColumn}
                >
                  <AppText style={styles.barValue}>
                    {month.total}
                  </AppText>

                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${heightPercentage}%`,
                      },
                    ]}
                  />

                  <AppText style={styles.monthLabel}>
                    {month.month}
                  </AppText>
                </View>
              );
            })}
          </View>
        )}
      </AppCard>
    </View>
  );
}