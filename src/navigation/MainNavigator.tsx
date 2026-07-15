import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../features/dashboard/screens/DashboardScreen";
import DocumentsScreen from "../features/documents/screens/DocumentsScreen";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Stack.Screen
        name="Documents"
        component={DocumentsScreen}
      />
    </Stack.Navigator>
  );
}