import { View } from "react-native";
import { AppText } from "../../../../components/common";
import { DashboardHeaderProps } from "./DashboardHeader.types";
import { styles } from "./DashboardHeader.styles";

export default function DashboardHeader({
  greeting,
  title,
}: DashboardHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.greeting}>
        {greeting}
      </AppText>

      <AppText style={styles.title}>
        {title}
      </AppText>
    </View>
  );
}