import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../features/dashboard/screens/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
      />
    </Stack.Navigator>
  );
}