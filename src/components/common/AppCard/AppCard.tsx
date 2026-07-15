import { View } from "react-native";

import { styles } from "./AppCard.styles";
import { AppCardProps } from "./AppCard.types";

export default function AppCard({
  children,
  style,
  ...props
}: AppCardProps) {
  return (
    <View
      {...props}
      style={[styles.card, style]}
    >
      {children}
    </View>
  );
}