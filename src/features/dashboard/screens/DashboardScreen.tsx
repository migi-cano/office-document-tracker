import AppButton from "../../../components/common/AppButton";
import AppCard from "../../../components/common/AppCard";
import AppText from "../../../components/common/AppText";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DocumentsStackParamList } from "../../../navigation/navigation.types";


import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
  ScrollableScreen,
} from "../../../components/layout";

import { useAuth } from "../../../providers/AuthProvider";
import { useDashboard } from "../hooks/useDashboard";
import { DashboardStatCard } from "../../../components/business";

type NavigationProps =
  NativeStackNavigationProp<DocumentsStackParamList>;

export default function DashboardScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { user, logout } = useAuth();

  const {
  loading,
  totalDocuments,
  receivedDocuments,
  pendingDocuments,
  releasedDocuments,
  completedDocuments,
  incomingDocuments,
  outgoingDocuments,
  recentDocuments,
} = useDashboard();

  if (loading) {
    return (
      <SafeScreen>
        <ScreenContainer>
          <AppText>Loading...</AppText>
        </ScreenContainer>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <ScrollableScreen>
      <ScreenContainer>
        <AppHeader
          title="Office Document Tracker"
          subtitle={`Welcome, ${user?.name}`}
        />

        <AppCard>
          <DashboardStatCard
              title="Total Documents"
              value={totalDocuments}
              icon="document-text"
          />

          <DashboardStatCard
              title="Received"
              value={receivedDocuments}
              icon="mail"
          />

          <DashboardStatCard
              title="Pending"
              value={pendingDocuments}
              icon="time"
          />

          <DashboardStatCard
              title="Released"
              value={releasedDocuments}
              icon="checkmark-circle"
          />

          <DashboardStatCard
              title="Completed"
              value={completedDocuments}
              icon="checkmark-done"
            />

            <DashboardStatCard
              title="Incoming"
              value={incomingDocuments}
              icon="download"
              onPress={() =>
                navigation.navigate("DocumentsList", {
                  filter: "IN",
                })
              }
            />

            <DashboardStatCard
              title="Outgoing"
              value={outgoingDocuments}
              icon="paper-plane"
              onPress={() =>
                navigation.navigate("DocumentsList", {
                  filter: "OUT",
                })
              }
            />
        </AppCard>

        <AppCard>
          <AppText>Recent Documents</AppText>

          {recentDocuments.map((document) => (
            <AppText key={document.id}>
              • {document.subject}
            </AppText>
          ))}
        </AppCard>

        <AppButton
          title="Logout"
          onPress={logout}
        />
      </ScreenContainer>
      </ScrollableScreen>
    </SafeScreen>
  );
}