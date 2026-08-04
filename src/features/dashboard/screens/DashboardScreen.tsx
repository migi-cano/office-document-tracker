import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";
import { styles } from "./DashboardScreen.styles";
import {
  DashboardTopBar,
  DashboardGreeting,
  DashboardMetricGrid,
  DashboardActivityChart,
  RecentDocumentsSection,
  DashboardTodaySummary
} from "../components";
import { useDashboard } from "../hooks";
import {
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  MainTabParamList,
} from "../../../navigation/navigation.types";
import { useNotifications } from "../../notifications/hooks/useNotifications";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/navigation.types";
import { useState } from "react";
import { NotificationPopover } from "../../notifications/components";
import { useRealtimeDocuments } from "../../../hooks/useRealtimeDocuments";



type Props = BottomTabScreenProps<MainTabParamList, "Dashboard">;



export default function DashboardScreen({ navigation }: Props) {

  const dashboard = useDashboard();

useRealtimeDocuments(() => {
    dashboard.refresh();
});
  const rootNavigation =
  useNavigation<
    NativeStackNavigationProp<RootStackParamList>
  >();
  const {
  metrics,
  activity,
  recentDocuments,
  todaySummary,
  loading,
} = useDashboard();

const [showNotifications, setShowNotifications] =
  useState(false);

const {
  notifications,
  unreadCount,
  markAsRead,
} = useNotifications();

  

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      <DashboardTopBar
        title="Office Document Tracker"
        initials="JM"
      />

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <DashboardGreeting
              greeting="Good Morning"
              name="Beluga"
              unreadCount={unreadCount}
              onNotificationPress={() =>
                setShowNotifications(true)
              }
            />

              <DashboardMetricGrid metrics={metrics} />

              <DashboardTodaySummary
                receivedToday={todaySummary.receivedToday}
                releasedToday={todaySummary.releasedToday}
                pending={todaySummary.pending}
              />

              <DashboardActivityChart
                  data={activity}
                />

            <RecentDocumentsSection
              documents={recentDocuments}
              onViewAll={() =>
                navigation.navigate("Documents", {
                  screen: "DocumentsList",
                })
              }
              onPressDocument={(documentId) =>
                navigation.navigate("Documents", {
                  screen: "DocumentDetails",
                  params: {
                    documentId: documentId,
                  },
                })
              }
            />
            <NotificationPopover
                visible={showNotifications}
                notifications={notifications.slice(0, 5)}
                unreadCount={unreadCount}
                onClose={() => setShowNotifications(false)}
                onViewAll={() => {
                  setShowNotifications(false);

                  rootNavigation.navigate("Notifications");
                }}
                onPressNotification={async (notification) => {
                  await markAsRead(notification.id);

                  setShowNotifications(false);

                  if (notification.documentId) {
                    navigation.navigate("Documents", {
                      screen: "DocumentDetails",
                      params: {
                        documentId: notification.documentId,
                      },
                    });
                  }
                }}
              />
          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}