import { FlatList, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import {
  SafeScreen,
  ScreenContainer,
} from "../../../components/layout";

import {
  AppButton,
  AppText,
} from "../../../components/common";

import { RootStackParamList } from "../../../navigation/navigation.types";

import { useUsers } from "../hooks/useUsers";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { Ionicons } from "@expo/vector-icons";

import AppInput from "../../../components/common/AppInput";
import { UserCard } from "../components/UserCard";

import { useAuth } from "../../../providers/AuthProvider";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function UserManagementScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const { user: currentUser } = useAuth();

  const [search, setSearch] = useState("");

  const {
    users,
    loading,
    refresh,
  } = useUsers();

  /*
   * Hide the currently logged-in account
   * from Manage System User.
   */
  const manageableUsers = useMemo(() => {
    if (!currentUser) {
      return users;
    }

    return users.filter(
      (user) =>
        user.auth_id !== currentUser.authId
    );
  }, [users, currentUser]);

  const filteredUsers = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return manageableUsers;
    }

    return manageableUsers.filter((user) => {
      const fullName =
        `${user.first_name} ${user.last_name}`
          .toLowerCase();

      return (
        fullName.includes(keyword) ||
        user.email
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [manageableUsers, search]);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 30,
        }}
      >
        <AppText
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#FFFFFF",
          }}
        >
          Manage System User
        </AppText>
      </View>

      {/* Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <ScreenContainer>

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
                  navigation.navigate(
                    "EditUser",
                    {
                      userId: item.id,
                    }
                  )
                }
              />
            )}
          />

        </ScreenContainer>
      </View>
    </SafeScreen>
  );
}