import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import DocumentsNavigator from "./DocumentsNavigator";
import ScannerScreen from "../features/scanner/screens/ScannerScreen";
import ReportsScreen from "../features/reports/screens/ReportsScreen";
import SettingsScreen from "../features/settings/screens/SettingsScreen";

import { MainTabParamList } from "./navigation.types";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "Dashboard":
              iconName = "home";
              break;

            case "Documents":
              iconName = "document-text";
              break;

            case "Scanner":
              iconName = "scan";
              break;

            case "Reports":
              iconName = "bar-chart";
              break;

            case "Settings":
              iconName = "settings";
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Documents"
        component={DocumentsNavigator}
      />

      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
      />

      <Tab.Screen
        name="Reports"
        component={ReportsScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}