import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import DocumentsScreen from "../features/documents/screens/DocumentsScreen";
import { MainTabParamList } from "./navigation.types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Documents"
        component={DocumentsScreen}
      />
    </Tab.Navigator>
  );
}