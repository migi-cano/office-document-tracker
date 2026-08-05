import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  AppCard,
  AppText,
} from "../../../../components/common";

import StatusBadge from "../../../../components/common/StatusBadge";

import { UserCardProps } from "./UserCard.types";
import { styles } from "./UserCard.styles";

export default function UserCard({
  user,
  onPress,
}: UserCardProps) {
  return (
    <Pressable
      android_ripple={{
        color: "#E5E7EB",
      }}
      onPress={onPress}
    >
      <AppCard style={styles.card}>
        <View style={styles.header}>
          <AppText style={styles.name}>
            {user.first_name} {user.last_name}
          </AppText>

          <View
            accessibilityLabel={
              user.is_active
                ? "Active user"
                : "Inactive user"
            }
            style={[
              styles.statusDot,
              {
                backgroundColor: user.is_active
                  ? "#22C55E"
                  : "#EF4444",
              },
            ]}
          />
        </View>

        <View style={styles.emailRow}>
          <Ionicons
            name="mail-outline"
            size={16}
            color="#6B7280"
          />

          <AppText style={styles.email}>
            {user.email}
          </AppText>
        </View>

        <View style={styles.footer}>
          <StatusBadge
            label={user.role}
            color={
              user.role === "Admin"
                ? "#2563EB"
                : "#374151"
            }
            backgroundColor={
              user.role === "Admin"
                ? "#DBEAFE"
                : "#F3F4F6"
            }
          />

          <Ionicons
            name="chevron-forward"
            size={22}
            color="#9CA3AF"
          />
        </View>
      </AppCard>
    </Pressable>
  );
}