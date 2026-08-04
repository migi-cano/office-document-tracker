import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../providers/AuthProvider";

import AuthNavigator from "./AuthNavigator";
import RootStackNavigator from "./RootStackNavigator";

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <RootStackNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}