import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import AppCard from "../../common/AppCard";
import AppText from "../../common/AppText";

import { DashboardStatCardProps } from "./DashboardStatCard.types";
import { styles } from "./DashboardStatCard.styles";

export default function DashboardStatCard({
  title,
  value,
  icon,
}: DashboardStatCardProps) {
  return (
    <AppCard style={styles.container}>
      <View style={styles.header}>
        <AppText>{title}</AppText>

        <Ionicons
          name={icon}
          size={24}
        />
      </View>

      <AppText style={styles.value}>
        {value}
      </AppText>
    </AppCard>
  );
}