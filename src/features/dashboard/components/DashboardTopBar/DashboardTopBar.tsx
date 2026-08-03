import { View } from "react-native";

import { AppText } from "../../../../components/common";

import { DashboardTopBarProps } from "./DashboardTopBar.types";
import { styles } from "./DashboardTopBar.styles";

export default function DashboardTopBar({
  title,
  initials,
}: DashboardTopBarProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {title}
      </AppText>

      <View style={styles.avatar}>
        <AppText style={styles.initials}>
          {initials}
        </AppText>
      </View>
    </View>
  );
}