import dayjs from "dayjs";
import {
  SectionList,
  Pressable,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/navigation.types";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

import { NotificationCard } from "../components";
import { useNotifications } from "../hooks/useNotifications";

import { styles } from "./NotificationsScreen.styles";

export default function NotificationsScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();

  const {
    notifications,
    loading,
    refresh,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const sections = [
    {
      title: "Today",
      data: notifications.filter((item) =>
        dayjs(item.createdAt).isSame(
          dayjs(),
          "day"
        )
      ),
    },
    {
      title: "Yesterday",
      data: notifications.filter((item) =>
        dayjs(item.createdAt).isSame(
          dayjs().subtract(1, "day"),
          "day"
        )
      ),
    },
    {
      title: "Earlier",
      data: notifications.filter(
        (item) =>
          !dayjs(item.createdAt).isSame(
            dayjs(),
            "day"
          ) &&
          !dayjs(item.createdAt).isSame(
            dayjs().subtract(1, "day"),
            "day"
          )
      ),
    },
  ].filter(
    (section) =>
      section.data.length > 0
  );

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerTitle}>
          Notifications
        </AppText>
      </View>

      {/* Content */}
      <View style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            notifications.length === 0 &&
              styles.emptyListContent,
          ]}
          ListHeaderComponent={
            notifications.length > 0 ? (
              <View style={styles.actionContainer}>
                <View>
                  <AppText style={styles.notificationCount}>
                    {notifications.length}{" "}
                    {notifications.length === 1
                      ? "notification"
                      : "notifications"}
                  </AppText>

                  <AppText style={styles.actionSubtitle}>
                    Stay updated on document activity
                  </AppText>
                </View>

                <Pressable
                  onPress={markAllAsRead}
                  style={({ pressed }) => [
                    styles.markAllButton,
                    pressed &&
                      styles.markAllButtonPressed,
                  ]}
                >
                  <Ionicons
                    name="checkmark-done-outline"
                    size={17}
                    color="#2563EB"
                  />

                  <AppText
                    style={styles.markAllText}
                  >
                    Mark all as read
                  </AppText>
                </Pressable>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="notifications-outline"
                  size={34}
                  color="#2563EB"
                />
              </View>

              <AppText style={styles.emptyTitle}>
                No notifications yet
              </AppText>

              <AppText style={styles.emptySubtitle}>
                Document activity will appear
                here.
              </AppText>
            </View>
          }
          renderSectionHeader={({
            section,
          }) => (
            <View style={styles.sectionHeader}>
              <AppText
                style={styles.sectionTitle}
              >
                {section.title}
              </AppText>

              <View
                style={styles.sectionLine}
              />
            </View>
          )}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              onPress={async () => {
                await markAsRead(item.id);

                if (item.documentId) {
                  navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: "MainTabs",
                        state: {
                          index: 1,
                          routes: [
                            {
                              name: "Dashboard",
                            },
                            {
                              name: "Documents",
                              state: {
                                index: 1,
                                routes: [
                                  {
                                    name: "DocumentsList",
                                  },
                                  {
                                    name: "DocumentDetails",
                                    params: {
                                      documentId:
                                        item.documentId,
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              name: "Scanner",
                            },
                            {
                              name: "Reports",
                            },
                            {
                              name: "Settings",
                            },
                          ],
                        },
                      },
                    ],
                  });
                }
              }}
            />
          )}
        />
      </View>
    </SafeScreen>
  );
}