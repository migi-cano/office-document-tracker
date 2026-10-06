import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "./MainTabNavigator";
import NotificationsScreen from "../features/notifications/screens/NotificationsScreen";

import { RootStackParamList } from "./navigation.types";

import UserManagementScreen from "../features/users/screens/UserManagementScreen";
import AddUserScreen from "../features/users/screens/AddUserScreen";
import EditUserScreen from "../features/users/screens/EditUserScreen";

import EditAccountScreen from "../features/settings/screens/EditAccountScreen";
import ChangePasswordScreen from "../features/settings/screens/ChangePasswordScreen";
import RecipientManagementScreen from "../features/recipients/screens/RecipientManagementScreen";
import AddRecipientScreen from "../features/recipients/screens/AddRecipientScreen";
import RecipientQrScreen from "../features/recipients/screens/RecipientQrScreen";
import EditRecipientScreen from "../features/recipients/screens/EditRecipientScreen";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
      />

      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />

      <Stack.Screen
        name="UserManagement"
        component={UserManagementScreen}
      />

      <Stack.Screen
        name="AddUser"
        component={AddUserScreen}
      />

      <Stack.Screen
        name="EditUser"
        component={EditUserScreen}
      />

      <Stack.Screen
        name="EditAccount"
        component={EditAccountScreen}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name="RecipientManagement"
        component={RecipientManagementScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
          name="AddRecipient"
          component={AddRecipientScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="RecipientQr"
          component={RecipientQrScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="EditRecipient"
          component={EditRecipientScreen}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}