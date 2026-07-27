import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import AppCard from "../../common/AppCard";
import AppText from "../../common/AppText";

import { DashboardStatCardProps } from "./DashboardStatCard.types";
import { styles } from "./DashboardStatCard.styles";

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
      )}
    </Pressable>
  );
}