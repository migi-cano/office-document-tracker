import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "../../../../components/common";

import { DashboardGreetingProps } from "./DashboardGreeting.types";
import { styles } from "./DashboardGreeting.styles";

export default function DashboardGreeting({
  name,
  greeting,
  onNotificationPress,
}: DashboardGreetingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <AppText style={styles.greeting}>
          {greeting}, {name}!
        </AppText>

        <AppText style={styles.subtitle}>
          Welcome back! Here's today's overview.
        </AppText>
      </View>

      <Pressable
        style={styles.notificationButton}
        onPress={onNotificationPress}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color="#111827"
        />
      </Pressable>
    </View>
  );
}