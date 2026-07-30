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
  RecentDocumentsSection
} from "../components";
import { useDashboard } from "../hooks";
import {
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import {
  MainTabParamList,
} from "../../../navigation/navigation.types";

type Props = BottomTabScreenProps<MainTabParamList, "Dashboard">;



export default function DashboardScreen({ navigation }: Props) {
  const {
    metrics,
    activity,
    recentDocuments,
    loading,
  } = useDashboard();

  

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
                onNotificationPress={() => {
                  // TODO: Navigate to notifications
                }}
              />

              <DashboardMetricGrid metrics={metrics} />

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
          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}