import { FlatList } from "react-native";

import {
  AppHeader,
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import { EmptyState } from "../../../components/common";

import { DepartmentCard } from "../components";

import { useDepartmentsScreen } from "../hooks/useDepartmentsScreen";

export default function DepartmentsScreen() {
  const {
    departments,
    loading,
    refresh,
  } = useDepartmentsScreen();

  return (
    <SafeScreen>
      <ScreenContainer>
        <AppHeader
          title="Departments"
          subtitle="Manage Departments"
        />

        <FlatList
          data={departments}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={refresh}
          renderItem={({ item }) => (
            <DepartmentCard department={item} />
          )}
          ListEmptyComponent={
            <EmptyState
              title="No Departments"
              description="Create your first department."
            />
          }
        />
      </ScreenContainer>
    </SafeScreen>
  );
}