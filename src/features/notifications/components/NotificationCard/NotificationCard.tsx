import { Pressable, View } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AppText } from "../../../../components/common";

import { styles } from "./NotificationCard.styles";
import { NotificationCardProps } from "./NotificationCard.types";
import { Ionicons } from "@expo/vector-icons";

dayjs.extend(relativeTime);

export default function NotificationCard({
  notification,
  onPress,
}: NotificationCardProps) {
    const icon = getNotificationIcon(notification.title);

    function getNotificationIcon(title: string) {
            if (title.includes("Incoming")) {
                return {
                icon: "download-outline",
                color: "#16A34A",
                background: "#DCFCE7",
                };
            }

            if (title.includes("Outgoing")) {
                return {
                icon: "paper-plane-outline",
                color: "#2563EB",
                background: "#DBEAFE",
                };
            }

            if (title.includes("Released")) {
                return {
                icon: "send-outline",
                color: "#EA580C",
                background: "#FED7AA",
                };
            }

            if (title.includes("Completed")) {
                return {
                icon: "checkmark-circle-outline",
                color: "#16A34A",
                background: "#DCFCE7",
                };
            }

            if (title.includes("Updated")) {
                return {
                icon: "create-outline",
                color: "#7C3AED",
                background: "#EDE9FE",
                };
            }

            if (title.includes("Deleted")) {
                return {
                icon: "trash-outline",
                color: "#DC2626",
                background: "#FEE2E2",
                };
            }

            return {
                icon: "notifications-outline",
                color: "#6B7280",
                background: "#F3F4F6",
            };
            }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        !notification.isRead && styles.unread,
      ]}
    >
       <View
    style={[
      styles.iconContainer,
      {
        backgroundColor: icon.background,
      },
    ]}
  >
    <Ionicons
      name={icon.icon as any}
      size={20}
      color={icon.color}
    />
  </View>

  <View style={styles.content}>
    <AppText style={styles.title}>
      {notification.title}
    </AppText>

    <AppText style={styles.message}>
      {notification.message}
    </AppText>

    <AppText style={styles.date}>
      {dayjs(notification.createdAt).fromNow()}
    </AppText>
  </View>
    </Pressable>
  );
}