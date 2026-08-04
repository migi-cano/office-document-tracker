import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

import { useAuth } from "../../../providers/AuthProvider";
import { RootStackParamList } from "../../../navigation/navigation.types";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { user, logout } = useAuth();

  return (
    <SafeScreen>
      <ScreenContainer>

        <AppHeader
          title="Settings"
          subtitle="Manage your account"
        />

        {user?.role === "Admin" && (
          <Pressable
            style={styles.item}
            onPress={() =>
              navigation.navigate("UserManagement")
            }
          >
            <Ionicons
              name="people-outline"
              size={22}
              color="#2563EB"
            />

            <View style={styles.textContainer}>
              <AppText style={styles.title}>
                User Management
              </AppText>

              <AppText style={styles.subtitle}>
                Create and manage users
              </AppText>
            </View>
          </Pressable>
        )}

        <Pressable
          style={styles.item}
          onPress={logout}
        >
          <Ionicons
            name="log-out-outline"
            size={22}
            color="#DC2626"
          />

          <View style={styles.textContainer}>
            <AppText style={styles.title}>
              Logout
            </AppText>

            <AppText style={styles.subtitle}>
              Sign out of your account
            </AppText>
          </View>
        </Pressable>

      </ScreenContainer>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  textContainer: {
    marginLeft: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 2,
  },
});