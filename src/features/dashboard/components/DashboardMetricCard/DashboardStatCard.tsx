import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import AppCard from "../../../../components/common/AppCard";
import AppText from "../../../../components/common/AppText";

import { DashboardStatCardProps } from "../../../../components/business/DashboardStatCard/DashboardStatCard.types";
import { styles } from "../../../../components/business/DashboardStatCard/DashboardStatCard.styles";

export default function DashboardStatCard({
  title,
  value,
  icon,
  onPress,
}: DashboardStatCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
    >
      {({ pressed }) => (
        <AppCard
          style={[
            styles.container,
            pressed && onPress && styles.pressed,
          ]}
        >
          <View style={styles.header}>
            <AppText style={styles.title}>
              {title}
            </AppText>

            <Ionicons
              name={icon}
              size={22}
            />
          </View>

          <AppText style={styles.value}>
            {value}
          </AppText>
        </AppCard>
      )}
    </Pressable>
  );
}