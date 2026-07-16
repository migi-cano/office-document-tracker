import { useEffect } from "react";
import { testSupabase } from "./src/lib/testSupabase";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/providers/AuthProvider";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  useEffect(() => {
    testSupabase();
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}