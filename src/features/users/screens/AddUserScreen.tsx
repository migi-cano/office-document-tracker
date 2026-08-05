import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  SafeScreen,
  ScreenContainer,
  AppHeader,
} from "../../../components/layout";

import { RootStackParamList } from "../../../navigation/navigation.types";

import { UserForm } from "../components/UserForm";
import { useCreateUser } from "../hooks/useCreateUser";

import { UserFormData } from "../validation/user.schema";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function AddUserScreen() {
  const navigation = useNavigation<NavigationProp>();

  const {
    createUser,
    loading,
  } = useCreateUser();

  async function handleSubmit(
    data: UserFormData
  ) {
    try {
      await createUser(data);

      Alert.alert(
        "Success",
        "User created successfully."
      );

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message
      );
    }
  }

  return (
    <SafeScreen>
      <ScreenContainer>

        <AppHeader
          title="Add User"
          subtitle="Create a new account"
        />

        <UserForm
          loading={loading}
          onSubmit={handleSubmit}
        />

      </ScreenContainer>
    </SafeScreen>
  );
}