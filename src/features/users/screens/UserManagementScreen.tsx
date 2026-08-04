import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import {
  AppButton,
  AppCard,
  AppText,
} from "../../../components/common";

import { RootStackParamList } from "../../../navigation/navigation.types";
import { useUsers } from "../hooks/useUsers";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function UserManagementScreen() {
  const navigation = useNavigation<NavigationProp>();

  const {
    users,
    loading,
    refresh,
  } = useUsers();

  return (
    <SafeScreen>
      <ScreenContainer>

        <AppHeader
          title={`Users (${users.length})`}
          subtitle="Manage system users"
        />

        <AppButton
          title="+ Add User"
          onPress={() =>
            navigation.navigate("AddUser")
          }
        />

        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={refresh}
          renderItem={({ item }) => (
            <AppCard
              style={{
                marginTop: 12,
              }}
            >
              <AppText
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                {item.first_name} {item.last_name}
              </AppText>

              <AppText>
                {item.email}
              </AppText>

              <AppText>
                {item.role}
              </AppText>
            </AppCard>
          )}
        />

      </ScreenContainer>
    </SafeScreen>
  );
}