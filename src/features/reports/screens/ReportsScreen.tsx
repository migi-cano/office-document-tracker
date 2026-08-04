import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import {
  AppHeader,
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

import { styles } from "./ReportsScreen.styles";

import { useReports } from "../hooks/useReports";

export default function ReportsScreen() {
  const { summary } = useReports();

  return (
    <SafeScreen>
      <StatusBar style="dark" />

      <AppHeader
        title="Reports"
        subtitle="Office Document Tracker"
      />

      <ScrollableScreen>
        <View style={styles.content}>
          <AppText>
            Incoming: {summary.incoming}
          </AppText>

          <AppText>
            Outgoing: {summary.outgoing}
          </AppText>

          <AppText>
            Pending: {summary.pending}
          </AppText>

          <AppText>
            Completed: {summary.completed}
          </AppText>
        </View>
      </ScrollableScreen>
    </SafeScreen>
  );
}