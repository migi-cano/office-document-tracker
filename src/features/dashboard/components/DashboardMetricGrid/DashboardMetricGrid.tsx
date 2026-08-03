import { View } from "react-native";

import DashboardMetricCard from "../DashboardMetricCard";

import { DashboardMetricGridProps } from "./DashboardMetricGrid.types";
import { styles } from "./DashboardMetricGrid.styles";

export default function DashboardMetricGrid({
  metrics,
}: DashboardMetricGridProps) {
  return (
    <View style={styles.container}>
      {metrics.map((metric) => (
        <View
          key={metric.title}
          style={styles.cardWrapper}
        >
          <DashboardMetricCard
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            onPress={metric.onPress}
          />
        </View>
      ))}
    </View>
  );
}