import { View } from "react-native";

import { AppCard, AppText } from "../../../../components/common";

import { ReportStatusDistributionProps } from "./ReportStatusDistribution.types";
import { styles } from "./ReportStatusDistribution.styles";

interface StatusBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
  isLast?: boolean;
}

function StatusBar({
  label,
  value,
  total,
  color,
  isLast = false,
}: StatusBarProps) {
  const percentage =
    total > 0 ? (value / total) * 100 : 0;

  return (
    <View
      style={[
        styles.row,
        isLast && styles.rowLast,
      ]}
    >
      <View style={styles.rowHeader}>
        <AppText style={styles.label}>
          {label}
        </AppText>

        <AppText style={styles.value}>
          {value}
        </AppText>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
}

export default function ReportStatusDistribution({
  summary,
}: ReportStatusDistributionProps) {
  return (
    <View style={styles.section}>
      <AppText style={styles.sectionTitle}>
        Status Distribution
      </AppText>

      <AppCard style={styles.card}>
        <StatusBar
          label="Pending"
          value={summary.pending}
          total={summary.total}
          color="#F59E0B"
        />

        <StatusBar
          label="Released"
          value={summary.released}
          total={summary.total}
          color="#8B5CF6"
        />

        <StatusBar
          label="Received"
          value={summary.received}
          total={summary.total}
          color="#06B6D4"
        />

        <StatusBar
            label="Completed"
            value={summary.completed}
            total={summary.total}
            color="#10B981"
            isLast
            />
      </AppCard>
    </View>
  );
}