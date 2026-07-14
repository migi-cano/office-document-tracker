import { View } from "react-native";

import { AppButton, AppText } from "../../../components/common";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: 16,
      }}
    >
      <AppText variant="title">
        Office Document Tracker
      </AppText>

      <AppButton
        title="Primary Button"
        onPress={() => console.log("Pressed")}
      />

      <AppButton
        title="Secondary Button"
        variant="secondary"
      />

      <AppButton
        title="Outline Button"
        variant="outline"
      />
    </View>
  );
}