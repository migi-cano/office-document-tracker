import { Alert } from "react-native";
import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import { RootStackParamList } from "../../../navigation/navigation.types";

import UserForm from "../components/UserForm/UserForm";

import { useUser } from "../hooks/useUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { UserFormData } from "../validation/user.schema";
import { useEffect, useState } from "react";

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
  console.log("===== HANDLE SUBMIT =====");
  console.log(data);

  if (!user) return;

  try {
    await updateUser(user.id, {
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      isActive,
    });

    console.log("User updated!");

    navigation.goBack();
  } catch (error) {
    console.error(error);
  }
}
    

  if (loading || !user) {
    return null;
  }

  return (
    <SafeScreen>
      <ScreenContainer>

        <AppHeader
          title="Edit User"
          subtitle="Update user information"
        />

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

      </ScreenContainer>
    </SafeScreen>
  );
}