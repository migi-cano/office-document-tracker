import { View } from "react-native";

import { AppText } from "../../../../components/common";

import { SettingsHeaderProps } from "./SettingsHeader.types";
import { styles } from "./SettingsHeader.styles";

export default function SettingsHeader({
  title = "Settings",
}: SettingsHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {title}
      </AppText>
    </View>
  );
}