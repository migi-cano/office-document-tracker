import { StatusBar } from "expo-status-bar";

import { AppProvider } from "./src/providers";
import { RootNavigator } from "./src/navigation";

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </AppProvider>
  );
}