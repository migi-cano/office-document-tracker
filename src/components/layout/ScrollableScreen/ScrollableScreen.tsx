import { ScrollView } from "react-native";

import { ScrollableScreenProps } from "./ScrollableScreen.types";

export default function ScrollableScreen({
  children,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
}: ScrollableScreenProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[
        {
          flexGrow: 1,
          padding: 16,
        },
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
}