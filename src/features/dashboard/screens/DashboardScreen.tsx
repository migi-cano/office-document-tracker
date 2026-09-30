import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
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
import { NotificationPopover } from "../../notifications/components";
import { useRealtimeDocuments } from "../../../hooks/useRealtimeDocuments";
import { useAuth } from "../../../providers/AuthProvider";



type Props = BottomTabScreenProps<MainTabParamList, "Dashboard">;

function DashboardSkeleton() {
  const pulse = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 0.9,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.45,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View style={[styles.skeleton, { opacity: pulse }]}>
      <View style={styles.skeletonGreeting}>
        <View style={styles.skeletonGreetingLine} />
        <View style={styles.skeletonGreetingTitle} />
      </View>

      <View style={styles.skeletonMetrics}>
        {Array.from({ length: 4 }).map((_, index) => (
          <View key={index} style={styles.skeletonMetric} />
        ))}
      </View>

      <View style={styles.skeletonSummary}>
        {Array.from({ length: 3 }).map((_, index) => (
          <View key={index} style={styles.skeletonSummaryItem} />
        ))}
      </View>

      <View style={styles.skeletonChart} />

      <View style={styles.skeletonSectionTitle} />
      <View style={styles.skeletonDocument} />
      <View style={styles.skeletonDocument} />
    </Animated.View>
  );
}



export default function DashboardScreen({ navigation }: Props) {

  const { user } = useAuth();
   const userName = user
    ? `${user.firstName} ${user.lastName}`
    : "User";

  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "U";

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
  } = dashboard;

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
         initials={initials}
      />

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {loading ? (
              <DashboardSkeleton />
            ) : (
              <>
                <DashboardGreeting
                  greeting="Good Morning"
                  name={userName}
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
              </>
            )}
          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}