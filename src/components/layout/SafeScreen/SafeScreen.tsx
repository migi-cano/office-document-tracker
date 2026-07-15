import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./SafeScreen.styles";

export default function SafeScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={styles.container}
    >
      {children}
    </SafeAreaView>
  );
}