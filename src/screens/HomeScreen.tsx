import { View } from "react-native";

import { AppText } from "../components/ui/AppText";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText variant="title">
        Office Document Tracker
      </AppText>

      <AppText variant="caption">
        Sprint 3 is working 🚀
      </AppText>
    </View>
  );
}