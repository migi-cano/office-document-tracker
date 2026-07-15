import { View } from "react-native";

import { AppText } from "../../common";
import { styles } from "./AppHeader.styles";
import { AppHeaderProps } from "./AppHeader.types";

export default function AppHeader({
  title,
  subtitle,
}: AppHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText variant="title">
        {title}
      </AppText>

      {subtitle && (
        <AppText
          variant="caption"
          color="#64748B"
        >
          {subtitle}
        </AppText>
      )}
    </View>
  );
}