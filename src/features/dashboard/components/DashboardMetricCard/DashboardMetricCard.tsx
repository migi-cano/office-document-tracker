import { AppText } from "../../../../components/common";

import { DashboardMetricCardProps } from "./DashboardMetricCard.types";
import { styles } from "./DashboardMetricCard.styles";
import { Image, Pressable, View } from "react-native";

export default function DashboardMetricCard({
  title,
  value,
  icon,
  onPress,
}: DashboardMetricCardProps) {
  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
    >
      <AppText style={styles.title}>
        {title}
      </AppText>

      <View style={styles.footer}>
        <AppText style={styles.value}>
          {value}
        </AppText>

       <View style={styles.iconContainer}>
          <Image
              source={icon}
              style={styles.icon}
              resizeMode="contain"
          />
      </View>
      </View>
    </Pressable>
  );
}