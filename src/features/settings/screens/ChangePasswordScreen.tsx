import {
  Alert,
  View,
} from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import {
  AppButton,
  AppInput,
  AppText,
} from "../../../components/common";

import { supabase } from "../../../lib/supabase";

import { RootStackParamList } from "../../../navigation/navigation.types";

import { styles } from "./ChangePasswordScreen.styles";

type NavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    "ChangePassword"
  >;

export default function ChangePasswordScreen() {
  const navigation =
    useNavigation<NavigationProp>();

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleChangePassword() {
    if (!currentPassword) {
      Alert.alert(
        "Missing Password",
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      Alert.alert(
        "Missing Password",
        "Please enter your new password."
      );
      return;
    }

    if (newPassword.length < 8) {
        Alert.alert(
          "Invalid Password",
          "Your new password must be at least 8 characters long."
        );
        return;
      }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Passwords Do Not Match",
        "The new password and confirmation password must match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert(
        "Invalid Password",
        "Your new password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      const {
        data: {
          user,
        },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user?.email) {
        throw new Error(
          "Unable to retrieve your account information."
        );
      }

      /*
       * Verify the current password first.
       */
      const {
        error: verifyError,
      } =
        await supabase.auth.signInWithPassword({
          email: user.email,
          password: currentPassword,
        });

      if (verifyError) {
        Alert.alert(
          "Incorrect Password",
          "The current password you entered is incorrect."
        );
        return;
      }

      /*
       * Update the password.
       */
      const {
        error: updateError,
      } =
        await supabase.auth.updateUser({
          password: newPassword,
        });

      if (updateError) {
        throw updateError;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      Alert.alert(
        "Password Changed",
        "Your password has been changed successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error(
        "Change password error:",
        error
      );

      Alert.alert(
        "Change Password Failed",
        error instanceof Error
          ? error.message
          : "Unable to change your password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeScreen backgroundColor="#0D1233">
      <StatusBar style="light" />

      <View style={styles.header}>
        <AppText style={styles.headerTitle}>
          Change Password
        </AppText>
      </View>

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>

            <View style={styles.intro}>
              <AppText style={styles.sectionTitle}>
                Update Your Password
              </AppText>

              <AppText style={styles.description}>
                Enter your current password and choose
                a new password for your account.
              </AppText>
            </View>

            <View style={styles.formCard}>

              <AppInput
                label="Current Password"
                placeholder="Enter current password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />

              <View style={styles.fieldSpacing}>
                <AppInput
                  label="New Password"
                  placeholder="Enter new password"
                  secureTextEntry
                  value={newPassword}
                  onChangeText={setNewPassword}
                />
              </View>

              <View style={styles.fieldSpacing}>
                <AppInput
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>

              <View style={styles.buttonContainer}>
                <AppButton
                  title="Change Password"
                  loading={loading}
                  onPress={handleChangePassword}
                />
              </View>

            </View>

            <View style={styles.requirements}>
              <AppText style={styles.requirementsTitle}>
                Password requirements
              </AppText>

              <AppText style={styles.requirement}>
                • At least 8 characters
              </AppText>

              <AppText style={styles.requirement}>
                • Must be different from your current password
              </AppText>

              <AppText style={styles.requirement}>
                • Confirmation must match the new password
              </AppText>
            </View>

          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}