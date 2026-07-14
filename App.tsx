import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppNavigator } from "./src/navigation";
import { AppProvider } from "./src/providers";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </GestureHandlerRootView>
  );
}