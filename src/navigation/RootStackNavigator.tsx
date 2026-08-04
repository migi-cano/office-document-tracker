import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainTabNavigator from "./MainTabNavigator";
import NotificationsScreen from "../features/notifications/screens/NotificationsScreen";

import { RootStackParamList } from "./navigation.types";

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
    </Stack.Navigator>
  );
}