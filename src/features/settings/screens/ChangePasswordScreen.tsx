import {
  Alert,
  Pressable,
  View,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import { useState } from "react";

import { Ionicons } from "@expo/vector-icons";

import {
  SafeScreen,
  ScrollableScreen,
} from "../../../components/layout";

import {
  AppInput,
  AppText,
} from "../../../components/common";

import { SettingsHeader } from "../components";

import { supabase } from "../../../lib/supabase";

import { styles } from "./ChangePasswordScreen.styles";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();

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
        "Required",
        "Please enter your current password."
      );
      return;
    }

    if (!newPassword) {
      Alert.alert(
        "Required",
        "Please enter your new password."
      );
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Your new password must be at least 6 characters."
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
          "Unable to determine the current account."
        );
      }

      // Verify current password
      const {
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        Alert.alert(
          "Incorrect Password",
          "The current password you entered is incorrect."
        );
        return;
      }

      // Update password
      const {
        error: updateError,
      } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      Alert.alert(
        "Password Changed",
        "Your password has been successfully changed.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error(
        "Change password error:",
        error
      );

      Alert.alert(
        "Password Change Failed",
        error?.message ||
          "Unable to change your password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeScreen backgroundColor="#0D1233">
      <SettingsHeader title="Change Password" />

      <View style={styles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>

            <AppText style={styles.description}>
              Enter your current password and choose
              a new password for your account.
            </AppText>

            <AppInput
              label="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              editable={!loading}
              placeholder="Enter current password"
            />

            <AppInput
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              editable={!loading}
              placeholder="Enter new password"
            />

            <AppInput
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              editable={!loading}
              placeholder="Confirm new password"
            />

            <Pressable
              style={[
                styles.button,
                loading && styles.buttonDisabled,
              ]}
              onPress={handleChangePassword}
              disabled={loading}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#FFFFFF"
              />

              <AppText style={styles.buttonText}>
                {loading
                  ? "Changing Password..."
                  : "Change Password"}
              </AppText>
            </Pressable>

          </View>
        </ScrollableScreen>
      </View>
    </SafeScreen>
  );
}