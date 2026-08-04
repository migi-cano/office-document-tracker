import {
  FlatList,
  Modal,
  Pressable,
  View,
} from "react-native";

import { AppText } from "../../../../components/common";

import NotificationCard from "../NotificationCard";

import { styles } from "./NotificationPopover.styles";
import { NotificationPopoverProps } from "./NotificationPopover.types";

export default function NotificationPopover({
  visible,
  notifications,
  unreadCount,
  onClose,
  onViewAll,
  onPressNotification,
}: NotificationPopoverProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable style={styles.container}>
          <View style={styles.header}>
            <AppText style={styles.title}>
              Notifications
            </AppText>

            <AppText style={styles.unread}>
              {unreadCount} new
            </AppText>
          </View>

          <FlatList
                style={styles.list}
                data={notifications}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <View
                    style={{
                        padding: 24,
                        alignItems: "center",
                    }}
                    >
                    <AppText>
                        No recent notifications
                    </AppText>

                    <AppText
                        style={{
                        color: "#6B7280",
                        marginTop: 4,
                        }}
                    >
                        Everything is up to date.
                    </AppText>
                    </View>
                }
                renderItem={({ item }) => (
                    <NotificationCard
                    notification={item}
                    onPress={() =>
                        onPressNotification(item)
                    }
                    />
                )}
                />

          <Pressable
            style={styles.footer}
            onPress={onViewAll}
          >
            <AppText style={styles.viewAll}>
              View All Notifications →
            </AppText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}