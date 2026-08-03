import { SafeAreaView } from "react-native-safe-area-context";

import { SafeScreenProps } from "./SafeScreen.types";

export default function SafeScreen({
  children,
  backgroundColor = "#FFFFFF",
  style,
}: SafeScreenProps) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}