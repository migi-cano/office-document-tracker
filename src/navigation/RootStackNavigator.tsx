import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";
import NotificationsScreen from "../features/notifications/screens/NotificationsScreen";
import { RootStackParamList } from "./navigation.types";
import UserManagementScreen from "../features/users/screens/UserManagementScreen";
import AddUserScreen from "../features/users/screens/AddUserScreen";
import EditUserScreen from "../features/users/screens/EditUserScreen";

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
    </Stack.Navigator>
  );
}