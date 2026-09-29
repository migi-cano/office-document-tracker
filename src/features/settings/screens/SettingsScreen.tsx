import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

import { useAuth } from "../../../providers/AuthProvider";
import { RootStackParamList } from "../../../navigation/navigation.types";

import { SettingsHeader } from "../components";

import { styles } from "./SettingsScreen.styles";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: logout,
        },
      ]
    );
  };

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      <SettingsHeader title="Settings" />

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
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
              onPress={() =>
                navigation.navigate("EditAccount")
              }
            >
              <Ionicons
                name="person-outline"
                size={24}
                color="#2563EB"
              />

              <View style={styles.textContainer}>
                <AppText style={styles.title}>
                  Edit Account
                </AppText>

                <AppText style={styles.subtitle}>
                  Update your account and password
                </AppText>
              </View>
            </Pressable>

            <Pressable
              style={styles.item}
              onPress={handleLogout}
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
          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}