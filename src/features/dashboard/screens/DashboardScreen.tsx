import AppButton from "../../../components/common/AppButton";
import AppCard from "../../../components/common/AppCard";
import AppText from "../../../components/common/AppText";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import { useAuth } from "../../../providers/AuthProvider";
import { useDashboard } from "../hooks/useDashboard";
import { DashboardStatCard } from "../../../components/business";

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  const {
    loading,
    totalDocuments,
    receivedDocuments,
    pendingDocuments,
    releasedDocuments,
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

          <AppText>
            Total Documents: {totalDocuments}
          </AppText>

          <AppText>
            Received Documents: {receivedDocuments}
          </AppText>

          <AppText>
            Pending Documents: {pendingDocuments}
          </AppText>

          <AppText>
            Released Documents: {releasedDocuments}
          </AppText>
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
    </SafeScreen>
  );
}