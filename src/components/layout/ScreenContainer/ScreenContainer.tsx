import { View } from "react-native";

import { styles } from "./ScreenContainer.styles";

export default function ScreenContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <View style={styles.container}>{children}</View>;
}