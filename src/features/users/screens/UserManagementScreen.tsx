import { FlatList, Pressable, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
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
import { useCallback, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import StatusBadge from "../../../components/common/StatusBadge";
import AppInput from "../../../components/common/AppInput";
import { UserCard } from "../components/UserCard";


type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function UserManagementScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");

  const {
    users,
    loading,
    refresh,
  } = useUsers();

  const filteredUsers = useMemo(() => {
  const keyword = search.trim().toLowerCase();

  if (!keyword) {
    return users;
  }

  return users.filter((user) => {
    const fullName =
      `${user.first_name} ${user.last_name}`.toLowerCase();

    return (
      fullName.includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
  });
}, [users, search]);

  useFocusEffect(
  useCallback(() => {
    refresh();
  }, [refresh])
);

  return (
    <SafeScreen>
      <ScreenContainer>

        <AppHeader
          title={`Users (${filteredUsers.length})`}
          subtitle="Manage system users"
        />


        <AppButton
          title="+ Add User"
          onPress={() =>
            navigation.navigate("AddUser")
          }
        />

        <AppInput
        placeholder="Search by name or email..."
        value={search}
        onChangeText={setSearch}
        style={{
          marginTop: 12,
          marginBottom: 8,
        }}
      />

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          refreshing={loading}
          onRefresh={refresh}
          contentContainerStyle={{
            paddingBottom: 24,
          }}
          ListEmptyComponent={
                <View
                  style={{
                    alignItems: "center",
                    paddingVertical: 40,
                  }}
                >
                  <Ionicons
                    name="people-outline"
                    size={42}
                    color="#D1D5DB"
                  />

                  <AppText
                    style={{
                      marginTop: 12,
                      color: "#6B7280",
                    }}
                  >
                    No users found.
                  </AppText>
                </View>
              }
          
          renderItem={({ item }) => (
              <UserCard
                user={item}
                onPress={() =>
                  navigation.navigate("EditUser", {
                    userId: item.id,
                  })
                }
              />
            )}
        />

      </ScreenContainer>
    </SafeScreen>
  );
}