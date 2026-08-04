import dayjs from "dayjs";
import { SectionList, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../navigation/navigation.types";

import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import {
  AppButton,
  AppText,
} from "../../../components/common";

import { NotificationCard } from "../components";
import { useNotifications } from "../hooks/useNotifications";
import { MainTabParamList } from "../../../navigation/navigation.types";

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
        dayjs(item.createdAt).isSame(dayjs(), "day")
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
          !dayjs(item.createdAt).isSame(dayjs(), "day") &&
          !dayjs(item.createdAt).isSame(
            dayjs().subtract(1, "day"),
            "day"
          )
      ),
    },
  ].filter((section) => section.data.length > 0);

  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader title="Notifications" />

        <AppButton
          title="Mark All as Read"
          onPress={markAllAsRead}
        />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={refresh}
          contentContainerStyle={
            notifications.length === 0
              ? styles.emptyContainer
              : undefined
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <AppText style={styles.emptyTitle}>
                No notifications yet
              </AppText>

              <AppText style={styles.emptySubtitle}>
                Document activity will appear here.
              </AppText>
            </View>
          }
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <AppText style={styles.sectionTitle}>
                {section.title}
              </AppText>
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
                                          documentId: item.documentId,
                                        },
                                      },
                                    ],
                                  },
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
      </ScreenContainer>
    </SafeScreen>
  );
}