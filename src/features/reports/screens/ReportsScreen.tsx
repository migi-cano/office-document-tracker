import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import {
  ReportActivity,
  ReportDirection,
  ReportDocumentTypes,
  ReportFilter,
  ReportOverview,
  ReportProcessing,
  ReportTraffic,
  ReportsHeader,
} from "../components";

import { useReports } from "../hooks/useReports";
import { styles } from "./ReportsScreen.styles";

export default function ReportsScreen() {
  const {
  period,
  setPeriod,
  summary,
  documentTypes,
  departments,
  monthlyActivity,
} = useReports();

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      <ReportsHeader
        title="Reports"
        subtitle="Office Document Tracker"
      />

      <View style={styles.container}>
        <ScrollableScreen showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <ReportFilter
              value={period}
              onChange={setPeriod}
            />

            <ReportOverview summary={summary} />

            <View style={styles.graphRow}>
              <ReportDirection
                summary={summary}
              />

              <ReportProcessing
                summary={summary}
              />
            </View>

            <ReportDocumentTypes
              documentTypes={documentTypes}
            />

            <ReportTraffic
              departments={departments}
            />

            <ReportActivity
              monthlyActivity={monthlyActivity}
            />
          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}