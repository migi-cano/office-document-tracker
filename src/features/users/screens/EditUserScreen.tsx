import {
  Alert,
  Modal,
  Pressable,
  TextInput,
  View,
} from "react-native";

import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";

import {
  SafeScreen,
  ScrollableScreen,
  AppHeader,
} from "../../../components/layout";

import { AppText } from "../../../components/common";

import { formScreenStyles } from "../../../components/styles/FormScreen.styles";

import { RootStackParamList } from "../../../navigation/navigation.types";

import UserForm from "../components/UserForm/UserForm";

import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

import { UserFormData } from "../validation/user.schema";

import { useEffect, useState } from "react";

import { userService } from "../services/user.service";

import { styles } from "./EditUserScreen.styles";

type RouteProps = RouteProp<
  RootStackParamList,
  "EditUser"
>;

type NavigationProps =
  NativeStackNavigationProp<RootStackParamList>;

export default function EditUserScreen() {
  const navigation =
    useNavigation<NavigationProps>();

  const route =
    useRoute<RouteProps>();

  const {
    user,
    loading,
  } = useUser(route.params.userId);

  const [isActive, setIsActive] =
    useState(user?.is_active ?? true);

  const [deleteModalVisible, setDeleteModalVisible] =
    useState(false);

  const [deleteEmail, setDeleteEmail] =
    useState("");

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    if (user) {
      setIsActive(user.is_active);
    }
  }, [user]);

  const {
    updateUser,
    loading: saving,
  } = useUpdateUser();

  async function handleSubmit(
    data: UserFormData
  ) {
    if (!user) return;

    try {
      await updateUser(user.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        isActive,
      });

      navigation.goBack();
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Update Failed",
        "Unable to update this user."
      );
    }
  }

  function openDeleteModal() {
    if (!user) return;

    setDeleteEmail("");
    setDeleteModalVisible(true);
  }

  function closeDeleteModal() {
    if (deleting) return;

    setDeleteEmail("");
    setDeleteModalVisible(false);
  }

  async function confirmDelete() {
    if (!user) return;

    const enteredEmail =
      deleteEmail.trim().toLowerCase();

    const targetEmail =
      user.email.trim().toLowerCase();

    if (enteredEmail !== targetEmail) {
      return;
    }

    try {
      setDeleting(true);

      await userService.deleteUser(user.id);

      setDeleteModalVisible(false);

      Alert.alert(
        "User Deleted",
        `${user.email} has been deleted successfully.`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error: any) {
      console.error(
        "Delete user error:",
        error
      );

      Alert.alert(
        "Delete Failed",
        error?.response?.data?.message ||
          "Unable to delete this user."
      );
    } finally {
      setDeleting(false);
    }
  }

  const emailMatches =
    user &&
    deleteEmail.trim().toLowerCase() ===
      user.email.trim().toLowerCase();

  if (loading || !user) {
    return null;
  }

  const initials =
    `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase();

  return (
    <SafeScreen backgroundColor="#0D1233">
      <AppHeader
        title="Edit User"
        subtitle="Update user information"
      />

      <View style={formScreenStyles.container}>
        <ScrollableScreen
          showsVerticalScrollIndicator={false}
        >
          <View style={formScreenStyles.content}>

            {/* Account Header */}
            <View style={styles.accountHeader}>
              <View style={styles.avatar}>
                <AppText style={styles.avatarText}>
                  {initials}
                </AppText>
              </View>

              <View style={styles.accountInfo}>
                <AppText style={styles.name}>
                  {user.first_name} {user.last_name}
                </AppText>

                <AppText style={styles.email}>
                  {user.email}
                </AppText>

                <AppText style={styles.role}>
                  {user.role}
                </AppText>
              </View>
            </View>

            {/* User Information */}
            <View style={formScreenStyles.section}>
              <AppText
                style={formScreenStyles.sectionTitle}
              >
                Update User Information
              </AppText>

              <UserForm
                loading={saving}
                submitTitle="Save Changes"
                readOnlyEmail
                showPassword={false}
                isActive={isActive}
                onStatusChange={setIsActive}
                defaultValues={{
                  firstName: user.first_name,
                  lastName: user.last_name,
                  email: user.email,
                  role: user.role,
                }}
                onSubmit={handleSubmit}
              />
            </View>

            {/* Delete User */}
            <Pressable
              onPress={openDeleteModal}
              disabled={saving || deleting}
              style={styles.deleteButton}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#DC2626"
              />

              <AppText style={styles.deleteText}>
                Delete User
              </AppText>
            </Pressable>

          </View>
        </ScrollableScreen>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.deleteOverlay}>

          {/* Outside modal */}
          <Pressable
            style={styles.deleteBackdrop}
            onPress={closeDeleteModal}
          />

          <View style={styles.deleteModal}>

            {/* Warning Icon */}
            <View style={styles.warningIcon}>
              <Ionicons
                name="warning-outline"
                size={28}
                color="#DC2626"
              />
            </View>

            {/* Title */}
            <AppText style={styles.deleteTitle}>
              Delete User
            </AppText>

            {/* Description */}
            <AppText style={styles.deleteDescription}>
              This action will permanently delete
              this user's account and profile.
            </AppText>

            {/* User Email */}
            <AppText style={styles.deleteUserEmail}>
              {user.email}
            </AppText>

            {/* Confirmation */}
            <AppText style={styles.confirmLabel}>
              Type the user's email to confirm:
            </AppText>

            <TextInput
              value={deleteEmail}
              onChangeText={setDeleteEmail}
              placeholder={user.email}
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              editable={!deleting}
              style={styles.confirmInput}
            />

            {/* Actions */}
            <View style={styles.deleteActions}>

              <Pressable
                onPress={closeDeleteModal}
                disabled={deleting}
                style={styles.cancelDeleteButton}
              >
                <AppText style={styles.cancelDeleteText}>
                  Cancel
                </AppText>
              </Pressable>

              <Pressable
                onPress={confirmDelete}
                disabled={!emailMatches || deleting}
                style={[
                  styles.confirmDeleteButton,
                  !emailMatches &&
                    styles.confirmDeleteButtonDisabled,
                ]}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color="#FFFFFF"
                />

                <AppText style={styles.confirmDeleteText}>
                  {deleting
                    ? "Deleting..."
                    : "Delete User"}
                </AppText>
              </Pressable>

            </View>
          </View>
        </View>
      </Modal>
    </SafeScreen>
  );
}