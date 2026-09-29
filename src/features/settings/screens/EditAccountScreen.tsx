import {
  Alert,
  Pressable,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import {
  AppInput,
  AppText,
} from "../../../components/common";

import { useAuth } from "../../../providers/AuthProvider";

import { SettingsHeader } from "../components";

import { styles } from "./EditAccountScreen.styles";

export default function EditAccountScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  function handleChangePassword() {
    navigation.navigate("ChangePassword" as never);
  }

  return (
    <SafeScreen backgroundColor="#0D1233">
      <SettingsHeader title="Edit Account" />

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>

            <View style={styles.accountHeader}>
              <View style={styles.avatar}>
                <AppText style={styles.avatarText}>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AppText>
              </View>

              <View style={styles.accountInfo}>
                <AppText style={styles.name}>
                  {user.firstName} {user.lastName}
                </AppText>

                <AppText style={styles.email}>
                  {user.email}
                </AppText>

                <AppText style={styles.role}>
                  {user.role}
                </AppText>
              </View>
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>
                Account Information
              </AppText>

              <AppInput
                label="First Name"
                value={user.firstName}
                editable={false}
              />

              <AppInput
                label="Last Name"
                value={user.lastName}
                editable={false}
              />

              <AppInput
                label="Email"
                value={user.email}
                editable={false}
              />
            </View>

            <View style={styles.section}>
              <AppText style={styles.sectionTitle}>
                Security
              </AppText>

              <Pressable
                style={styles.passwordButton}
                onPress={handleChangePassword}
              >
                <View style={styles.passwordIcon}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={22}
                    color="#2563EB"
                  />
                </View>

                <View style={styles.passwordInfo}>
                  <AppText style={styles.passwordTitle}>
                    Change Password
                  </AppText>

                  <AppText style={styles.passwordSubtitle}>
                    Update your account password
                  </AppText>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>

          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}