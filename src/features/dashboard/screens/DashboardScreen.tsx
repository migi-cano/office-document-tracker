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

export default function DashboardScreen() {
  const { user, logout } = useAuth();

  const {
    loading,
    stats,
    activities,
  } = useDashboard();

  if (loading || !stats) {
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
          <AppText>
            Received Documents: {stats.received}
          </AppText>

          <AppText>
            Released Documents: {stats.released}
          </AppText>

          <AppText>
            Pending Documents: {stats.pending}
          </AppText>

          <AppText>
            Active Users: {stats.users}
          </AppText>
        </AppCard>

        <AppCard>
          <AppText>Recent Activity</AppText>

          {activities.map((item) => (
            <AppText key={item.id}>
              • {item.message}
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