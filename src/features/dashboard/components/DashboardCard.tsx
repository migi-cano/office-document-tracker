import { StyleSheet, View } from "react-native";

import AppCard from "../../../components/common/AppCard";
import AppText from "../../../components/common/AppText";

interface DashboardCardProps {
  title: string;
  value: number;
}

export default function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <AppCard style={styles.card}>
      <AppText>{title}</AppText>

      <View style={styles.spacing} />

      <AppText variant="title">
        {value}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    justifyContent: "center",
    alignItems: "center",
  },

  spacing: {
    height: 8,
  },
});